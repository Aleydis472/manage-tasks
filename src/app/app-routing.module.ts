import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tareas',
    pathMatch: 'full' 
  },
  {
    path: 'tareas',
    loadComponent: () => import('./features/tasks/tasks.component')
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
