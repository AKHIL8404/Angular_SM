import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './student-list.component.html'
})
export class StudentListComponent {
  allStudents: Student[] = [];
  students: Student[] = [];
  searchKeyword: string = '';

  constructor(private service: StudentService, private router: Router) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.service.getStudents().subscribe({
      next: (data) => {
        this.allStudents = data || [];
        this.students = [...this.allStudents];
      }
    });
  }

  search() {
    const k = this.searchKeyword.trim().toLowerCase();
    if (!k) {
      this.students = [...this.allStudents];
      return;
    }
    this.students = this.allStudents.filter((s) =>
      s.id.toString().includes(k) ||
      (s.name ?? '').toLowerCase().includes(k) ||
      (s.email ?? '').toLowerCase().includes(k) ||
      (s.phone ?? '').toLowerCase().includes(k)
    );
  }

  resetSearch() {
    this.searchKeyword = '';
    this.students = [...this.allStudents];
  }

  edit(id: number) {
    this.router.navigate(['/edit', id]);
  }

  delete(id: number) {
    if (!confirm("Delete this student?")) return;

    this.service.deleteStudent(id).subscribe({
      next: () => {
        // Remove row immediately (no manual refresh needed)
        this.allStudents = this.allStudents.filter(s => Number(s.id) !== Number(id));
        this.students = this.students.filter(s => Number(s.id) !== Number(id));
      }
    });
  }
}
