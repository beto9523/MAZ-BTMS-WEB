import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ElementRef, AfterViewInit } from '@angular/core';
import { fadeInOutAnimation } from '@Utils/animation';
import { MenuModel } from '@InternalModels/shared/menuModel';
import { UserService } from '@Services/user/user.service';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.template.html',
  animations: [fadeInOutAnimation],
})
export class NavigationComponent implements AfterViewInit {
  isDropdownOpen: boolean = false;
  menu: MenuModel[] = [];

  loggedIn: boolean = false;

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private userService: UserService
  ) {
    this.loggedIn = userService.isAuthenticated();

    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      this.menu.forEach((menu) => {
        const subMenu = menu.subMenu.find((s) =>
          event.url.toUpperCase().includes(s.path.slice(2).toUpperCase())
        );
        if (subMenu) {
          menu.isActived = true;
          this.closeOthers(menu.name);
        }
      });
    });

    if (this.loggedIn)
      this.menu = [
        {
          name: 'Tests Operation',
          isActived: false,
          icon: 'fa fa-exclamation-triangle',
          subMenu: [
            {
              name: 'Start Test',
              path: '/Screen/test',
            },
            {
              name: 'Calibration Certificate',
              path: '/calibrationcert/Managment',
            },
            {
              name: 'HMI',
              path: '*',
            },
          ],
        },

        {
          name: 'Tests Management',
          isActived: false,
          icon: 'fa fa-tasks',
          subMenu: [
            {
              name: 'Management',
              path:'/test/management'
            }
          ],
        },
        {
          name: 'Tests Dashboard',
          isActived: false,
          icon: 'fa fa-dashboard',
          subMenu: [
            {
              name: 'Test Dashboard',
              path: '/test/dashboard',
            },
          ],
        },
        // {
        //   name: 'Users',
        //   isActived: false,
        //   icon: 'fa fa-users',
        //   subMenu: [

        //     // {
        //     //   name: 'Change Password',
        //     //   path: '/Users/ChangePassword',
        //     // },
        //   ],
        // },
        {
          name: 'Configuration',
          isActived: false,
          icon: 'fa fa-cog',
          subMenu: [
            {
              name: 'WO Management',
              path: '/WorkOrder/Management',
            },
            {
              name: 'User Management',
              path: '/Users/Management',
            },
          ],
        },
      ];
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  ngAfterViewInit(): void {
    const nativeElement = this.elementRef.nativeElement;
  }

  closeOthers(name: string) {
    this.menu.forEach((item) => {
      if (item.name != name) item.isActived = false;
    });
  }
}
