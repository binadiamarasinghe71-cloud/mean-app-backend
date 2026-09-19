import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = 'http://localhost:5300';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.url}/employees`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.url}/employees`, employee);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.url}/employees/${id}`);
  }

  // Add this update method
  updateEmployee(id: string, employee: Employee): Observable<any> {
    return this.http.put(`${this.url}/employees/${id}`, employee, { responseType: 'text' });
  }
}