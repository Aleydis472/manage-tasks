import { computed, effect, Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';
import { v4 as uuidv4 } from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // Signal para almacenar las tareas, cargadas desde el localStorage
  private tasks = signal<Task[]>(this.loadTasksFromStorage());

  // Computed signal para obtener la lista de tareas actualizada
  taskList = computed(() => this.tasks());

  private filter = signal<'all' | 'completed' | 'pending'>('all'); 

  filteredTasks = computed(() => {
    const currentFilter = this.filter(); 
    const currentTasks = this.tasks();    

    switch (currentFilter) {
      case 'completed':
        return currentTasks.filter(task => task.completed);
      case 'pending':
        return currentTasks.filter(task => !task.completed);
      default: 
        return currentTasks;
    }
  });

  constructor() {
    // Efecto que guarda las tareas en localStorage cada vez que cambian
    effect(() => {
      this.saveTasksToStorage(this.tasks());
    });
  } 

  // Método para cambiar el filtro
  setFilter(filter: 'all' | 'completed' | 'pending') {
    this.filter.set(filter);  
  } 

  filterSelected() {
    return this.filter();
  }

  addTask(task: Task) {
    const currentTasks = this.tasks();
    this.tasks.set([...currentTasks, { ...task, id: uuidv4() }]);
  }

  removeTask(id: string) {
    const currentTasks = this.tasks();
    this.tasks.set(currentTasks.filter(task => task.id !== id));
  }

  // Marcar una tarea como completada
  toggleTaskCompletion(id: string) {
    const updatedTasks = this.tasks().map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.tasks.set(updatedTasks);
  }

  private saveTasksToStorage(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Cargar las tareas desde localStorage, o devolver un array vacío si no existen
  private loadTasksFromStorage(): Task[] {
    const tasks = localStorage.getItem('tasks');

    return tasks ? JSON.parse(tasks) : [];
  }

}


