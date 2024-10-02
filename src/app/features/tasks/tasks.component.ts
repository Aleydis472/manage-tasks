import { Component, computed, effect, inject, Injector, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskService } from './services/task.service';
import { Task } from './models/task.model';
import { Alerts, BUTTON_COLOR } from './../../core/utils/alerts';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export default class TasksComponent {

  taskService = inject(TaskService);

  toggleTaskCompletion(id: string) {
    this.taskService.toggleTaskCompletion(id);
  }

  deleteTask(task: Task): void {
    Alerts.customized({ icon: 'question', html: `¿Desea elimina la tarea <b>${task.title}</b> ?`, confirmButtonText: 'Si', confirmButtonColor: BUTTON_COLOR.DANGER, cancelButtonText: 'Cancelar', showCancelButton: true }).then(result => {
      if (result.value) {
        this.taskService.removeTask(task.id);
      }
    });
  }

  toggleCompletion(id: string): void {
    this.taskService.toggleTaskCompletion(id);
  }

  setFilter(filter: 'all' | 'completed' | 'pending'): void {
    this.taskService.setFilter(filter);
  } 

  

}


