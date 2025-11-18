import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student-edit.component.html'
})
export class StudentEditComponent {
  id!: number;
  student: Student = { id: 0, name: '', email: '', phone: '' };
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (Number.isNaN(this.id)) {
      this.router.navigate(['/list']);
      return;
    }
    this.studentService.getStudent(this.id).subscribe({
      next: (data) => (this.student = data),
      error: (err) => {
        console.error('Load student error:', err);
        this.errorMessage = 'Unable to load student.';
      }
    });
  }

  updateStudent() {
    this.errorMessage = null;
    this.studentService.updateStudent(this.id, this.student).subscribe({
      next: () => {
        alert('✅ Student Updated Successfully!');
        this.router.navigate(['/list']);
      },
      error: (err) => {
        console.error('Update error:', err);
        this.errorMessage = (err?.error || 'Failed to update student').toString();
      }
    });
  }

  back() {
    this.router.navigate(['/list']);
  }

  cancel() {
    this.router.navigate(['/list']);
  }
}
