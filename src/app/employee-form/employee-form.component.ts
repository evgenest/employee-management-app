import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { FormsModule, NgModel } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    position: '',
  };

  isEditing: boolean = false;
  formText: string = 'Create';

  errorMessage: string = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const navigation = this.router.getCurrentNavigation();
    const data = navigation?.extras?.state?.['data'];
    if (data) this.employee = data;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((result) => {
      const id = result.get('id');
      if (id) {
        this.isEditing = true;
        this.formText = 'Edit';

        // Check if we have got an employee from EmployeeTableComponent, if not, get it from the server
        if (this.employee.id === 0) {
          this.employeeService.getEmployeeById(Number(id)).subscribe({
            next: (result) => {
              this.employee = result;
            },
            error: (err) => {
              if (err.status === 404) {
                this.errorMessage =
                  'Employee not found, redirecting to the home page.';
                this.router.navigate(['']);
              }
              console.error('Error loading employee', err);
            },
          });
        }
      }
    });
  }

  onSubmit(): void {
    const proceed = {
      next: () => {
        this.router.navigate(['']);
      },
      error: (err: Error) => {
        console.error(err);
        this.errorMessage = err.message;
      },
    };

    if (this.isEditing) {
      this.employeeService.editEmployee(this.employee).subscribe(proceed);
    } else {
      this.employeeService.createEmployee(this.employee).subscribe(proceed);
    }
  }

  isInvalidByRequired(reference: NgModel, error: string = 'required'): boolean {
    if (reference.invalid && (reference.touched || reference.dirty))
      return reference.errors?.[error];
    return false;
  }
}
