import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
 // private baseUrl = 'http://localhost:8080/api/students';
  private baseUrl = 'https://studentmanagementapi-ng.onrender.com/api/students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl);
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${id}`);
  }

  createStudent(student: Student): Observable<any> {
    return this.http.post(this.baseUrl, student, { responseType: 'text' });
  }

  updateStudent(id: number, student: Student): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, student, { responseType: 'text' });
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
