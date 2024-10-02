import { UntypedFormGroup, Validators } from '@angular/forms';
import { Alerts, BUTTON_COLOR } from './alerts';

export class ValidatorForm extends Validators {

    static validateForm(form: UntypedFormGroup, message?: string): boolean {
        this.markInvalidFields(form);
        if (!form.valid) {
            Alerts.customized({title:'Atención', html: message || 'Falta llenar campos obligatorios' , icon:'error', confirmButtonText: 'Aceptar'});
        }
        return form.valid;
    }

    static markInvalidFields(form: UntypedFormGroup): void {
        // eslint-disable-next-line guard-for-in
        for(const i in form.controls){
            form.controls[i].setValue(form.controls[i].value);
            form.controls[i].markAllAsTouched();
            form.controls[i].markAsDirty();
          }
    }
}
