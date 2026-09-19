import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  employees$!: Observable<Employee[]>;
  newEmployee: Employee = { name: '', position: '', level: 'junior' };
  
  isEditing: boolean = false;
  currentEditId: string | null = null;
  
  // Search filter property
  searchQuery: string = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.employees$ = this.employeeService.getEmployees().pipe(
      map(employees => employees.filter(emp => 
        emp.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        emp.position.toLowerCase().includes(this.searchQuery.toLowerCase())
      ))
    );
  }

  onSearchChange() {
    this.fetchEmployees();
  }

  onSubmit() {
    console.log('Save button clicked! Payload:', this.newEmployee);
    
    if (this.isEditing && this.currentEditId) {
      this.employeeService.updateEmployee(this.currentEditId, this.newEmployee).subscribe({
        next: () => {
          this.resetForm();
          this.fetchEmployees();
        },
        error: (err) => console.error('Error updating employee:', err)
      });
    } else {
      this.employeeService.createEmployee(this.newEmployee).subscribe({
        next: () => {
          this.resetForm();
          this.fetchEmployees();
        },
        error: (err) => console.error('Error creating employee:', err)
      });
    }
  }

  editEmployee(emp: Employee) {
    this.isEditing = true;
    this.currentEditId = emp._id || null;
    this.newEmployee = { name: emp.name, position: emp.position, level: emp.level };
  }

  resetForm() {
    this.newEmployee = { name: '', position: '', level: 'junior' };
    this.isEditing = false;
    this.currentEditId = null;
  }

  deleteEmployee(id?: string) {
    if (!id) return;
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => this.fetchEmployees(),
      error: (err) => console.error('Error deleting employee:', err)
    });
  }
}