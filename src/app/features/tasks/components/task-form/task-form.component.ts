import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { v4 as uuidv4 } from 'uuid'
import { ValidatorForm } from 'src/app/core/utils/validator-form';
import { Alerts } from 'src/app/core/utils/alerts';
import { Modal } from 'src/app/core/utils/modal';

declare const $: any;
@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})

export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    
  }
  ngOnInit(): void {
    this.buildForm();
  }


  buildForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      dateEnd: ['', [Validators.required, this.futureDateValidator]],
      people: this.fb.array([], this.uniquePersonName()) // Array de personas
    });
  }

  addPerson(): void {
    const personForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([this.fb.control('', Validators.required)])  // Arreglo de habilidades
    });
    this.people.push(personForm);
  }

  removePerson(index: number): void {
    this.people.removeAt(index);
  }

  getSkills(index: number): FormArray<any> {
    return this.people.at(index).get('skills') as FormArray;
  }

  addSkill(index: number): void {
    this.getSkills(index).push(this.fb.control('', Validators.required));
  }

  removeSkill(personIndex: number, skillIndex: number): void {
    this.getSkills(personIndex).removeAt(skillIndex);
  }

  save(): void {
    if (ValidatorForm.validateForm(this.taskForm)) {
      const newTask = { ...this.taskForm.value, id: uuidv4(), completed: false };
      this.taskService.addTask(newTask);
      this.taskForm.reset();
      Alerts.customized({ icon: 'success', title: '', html: 'Se guardó la tarea correctamente', confirmButtonText: 'Aceptar', })
      Modal.hideModal('#taskform')
    }
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = control.value;
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split('T')[0];
    return selectedDate < currentDateString ? { invalidDate: true } : null;
  }

  uniquePersonName(): Validators {
    return (formArray: FormArray) => {
      const names = formArray.controls.map(control =>
        control.get('name')?.value.trim().toLowerCase()
      );
      const uniqueNames = new Set(names);

      // Si el tamaño del Set es menor que el array de nombres, hay nombres duplicados
      return names.length !== uniqueNames.size ? { duplicateNames: true } : null;
    };
  }

  get people() {
    return this.taskForm.get('people') as FormArray;
  } 

}


