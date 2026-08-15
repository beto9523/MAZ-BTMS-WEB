import { EnumPermission } from '@Utils/enums/enumPermission';
import {
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DataTableService } from '../../../core/services/table/table.service';
import { NgbdSortableHeader } from '@Services/table/sortable.directive';
import { UserViewModel } from '@ViewModels/users/UserViewModel';
import { SignalRService } from '@Services/signalR/signalR.service';
import { NotificationService } from '@Services/notifications/notification.service';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { UserService } from '@Services/user/user.service';


export type Color = 'red' | 'white' | 'blue';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.css',
})
export class TableUsersComponent implements OnInit, OnDestroy {
  data$: Observable<UserViewModel[]>;
  total$: Observable<number>;
  pagL$: Observable<number>;
  pagR$: Observable<number>;

  enumPermission = EnumPermission;
  messageSubscription: Subscription;
  idRol: number | null = null;

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;
  @ViewChild(ModalUserComponent) modalUser!: ModalUserComponent;

  constructor(
    public service: DataTableService<UserViewModel>,
    private notificacionService: NotificationService,
    private signalRService: SignalRService, private userService:UserService
    ) {
      
    this.data$ = this.service.data$;
    this.total$ = this.service.total$;
    this.pagL$ = this.service.pagL$;
    this.pagR$ = this.service.pagR$;

    this.idRol = userService.getUserRole();

    this.messageSubscription = this.signalRService.messageReceived.subscribe(
      (message: string) => {
        this.notificacionService.showSuccess(message, 'Signal R Messagge');
      }
    );
  }
  ngOnInit() {
    this.service.sortDirection = 'desc';
    this.service.sortColumn = 'userCode';
    this.service.url = 'User/GetUsersPagination';

  }

  sendMessage(id: number) {
    let date = new Date();
    this.signalRService.sendMessage(`id: ${id}, ${date.toDateString()}`);
  }

  editUser(user: UserViewModel) {
    this.modalUser.open(user);
  }

  reloadTable() {
    this.service.reload();
  }

  resetPassword(id: number) {
    this.userService.resetPassword(id).subscribe({
      next: (r) =>
        this.notificacionService.showSuccess(
          'Password reset successfully',
          'Reset password'
        ),
    });
  }
  switchEnableUser(id: number, isEnable: boolean) {
    this.userService.switchEnabledUser(id).subscribe({
      next: (r) => {
        this.notificacionService.showSuccess(
          `User ${isEnable ? 'enabled' : 'disabled'} successfully`,
          'User'
        );
        this.reloadTable();
      },
    });
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

  /**
   * Table Services method
   *
   */
  onSort({ column, direction }: any) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
