import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student-create.component.html'
})
export class StudentCreateComponent {

  student: Student = { id: 0, name: '', email: '', phone: '' };
  errorMessage: string = '';

  constructor(private service: StudentService, private router: Router) {}

  addStudent(f: NgForm) {
    if (f.invalid) return;

    this.service.createStudent(this.student).subscribe({
      next: () => this.router.navigate(['/list']),
      error: (err) => this.errorMessage = err.error || "Something went wrong."
    });
  }

  cancel() {
    this.router.navigate(['/list']);
  }
}
