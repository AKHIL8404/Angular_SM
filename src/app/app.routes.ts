import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentCreateComponent } from './components/student-create/student-create.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list', component: StudentListComponent },
  { path: 'add', component: StudentCreateComponent },   // ✅ Add Student Route
  { path: 'edit/:id', component: StudentEditComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: 'error' }
];
