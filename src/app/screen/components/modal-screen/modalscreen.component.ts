import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CatalogViewModel } from '@ViewModels/shared/CatalogViewModel';
import { NotificationService } from '@Services/notifications/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestStatusService } from '@Services/testCatalogs/TestStatus/test-status.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-modalscreen',
  templateUrl: './modalscreen.component.html',
  styleUrls: ['./modalscreen.component.css'],
})
export class ModalscreenComponent {
  @ViewChild('content') content: any;
  modalReference: any;
  @Input() isEdit = false;
  @Output() reloadTable: EventEmitter<void> = new EventEmitter<void>();
  @Output() sendCheckBoxForTestType: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendCheckBoxForMethod: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendCheckBoxForGeometry: EventEmitter<any> = new EventEmitter<any>();

  title: string = '';
  namePattern: any = /^[^0-9]+$/;
  currentUser: string = '';
  testForm!: FormGroup;
  isSubmitting: boolean = true;
  ComboList: CatalogViewModel[] = [];
  permissionList: CatalogViewModel[] = [];
  selectedCategory: any = null;
  selectedValuestype: string[] = [];
  selectedValuesmethod: string[] = [];
  selectedValuesgeometry: string[] = [];
  PWO = {
    pwoname: '',
  };
  temporalValuesForRadio = {
    selectedTestType: 0,
    TemporalSelectedTestType: 0,
    selectedMethod: 0,
    TemporalSelectedMethod: 0,
    selectedGeometry: 0,
    TemporalSelectedGeometry: 0,
  };

  constructor(
    private modalService: NgbModal,
    private not: NotificationService,
    private fb: FormBuilder,
    private testStatusService: TestStatusService
  ) {
    this.GetTestSetupValues();
    this.setFormValuesModal();
  }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
  setFormValuesModal() {
    this.testForm = this.fb.group({
      idTestType: [this.temporalValuesForRadio.TemporalSelectedTestType , [Validators.required]],
      idMethod: [this.temporalValuesForRadio.TemporalSelectedMethod, [Validators.required]],
      idGeometry: [this.temporalValuesForRadio.TemporalSelectedGeometry, [Validators.required]],
    });
    this.currentUser = '';
  }

  CleaningRadios() {
    this.testForm = this.fb.group({
      idTestType: ['', [Validators.required]],
      idMethod: ['', [Validators.required]],
      idGeometry: ['', [Validators.required]],
    });
    this.currentUser = '';
  }
  GetTestSetupValues() {
    this.testStatusService.GetTestMethods().subscribe({
      next: (value) => {
        {
          this.method = value.dataResponse;
        }
      },
    });
    this.testStatusService.GetTestGeometry().subscribe({
      next: (value) => {
        {
          this.geometry = value.dataResponse;
        }
      },
    });
    this.testStatusService.GetTestType().subscribe({
      next: (value) => {
        {
          this.testtype = value.dataResponse;
        }
      },
    });
  }

  testtype: any[] = [];
  method: any[] = [];
  geometry: any[] = [];

  sendSelectedTesttype(testtype: any) {
    this.testForm.value.idTestType = testtype.id;
    this.testtype.values = testtype;
    this.temporalValuesForRadio.selectedTestType = testtype.id;
  }
  sendSelectedMethod(method: any) {
    this.testForm.value.idmethod = method.id;
    this.method.values = method;
    this.temporalValuesForRadio.selectedMethod = method.id;
  }
  sendSelectedGeometry(geometry: any) {
    this.testForm.value.idgeometry = geometry.id;
    this.geometry.values = geometry;
    this.temporalValuesForRadio.selectedGeometry = geometry.id;
  }


  selectedCategories: any[] = [];

  openTestSetup() {
    this.title = 'Test Setup';
    this.modalService
      .open(this.content, {
        ariaLabelledBy: 'screen-modal',
        size: 'lg',
        keyboard: false,
        backdrop: 'static'
      })
      .result.then();
  }

  changeFlag() {
    this.temporalValuesForRadio.TemporalSelectedTestType = this.temporalValuesForRadio.selectedTestType
    this.temporalValuesForRadio.TemporalSelectedMethod = this.temporalValuesForRadio.selectedMethod
    this.temporalValuesForRadio.TemporalSelectedGeometry = this.temporalValuesForRadio.selectedGeometry

    this.sendCheckBoxForTestType.emit(this.testtype.values);
    this.sendCheckBoxForMethod.emit(this.method.values);
    this.sendCheckBoxForGeometry.emit(this.geometry.values);

  }
}
