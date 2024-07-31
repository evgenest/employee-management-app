import { Component, inject } from '@angular/core';
import {
  // ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { EmployeeTableComponent } from './employee-table/employee-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EmployeeTableComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'employee-management-app';
  navbarRoutes = inject(Router).config.filter((route) => route.title);
  // currentUrl: string = '';

  constructor(
    // private router: Router, 
    // private activatedRoute: ActivatedRoute
  ) {}

  // ngOnInit() {
  //   this.updateCurrentUrl();

  //   // Подписка на изменения URL
  //   this.router.events.subscribe(() => {
  //     this.updateCurrentUrl();
  //   });
  // }

  // private updateCurrentUrl() {
  //   this.currentUrl = this.router.url;
  // }

  // isActive(url: string): boolean {
  //   return this.router.isActive(url, {
  //     paths: 'exact',
  //     queryParams: 'exact',
  //     fragment: 'ignored',
  //     matrixParams: 'ignored',
  //   });
  // }
}
