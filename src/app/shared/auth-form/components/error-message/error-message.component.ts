import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { validatorErrorMessage } from './validator-message';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-error-message',
  template: `
  <div class="flex items-center font-medium text-red-500 text-xs mt-1 ml-1">
    {{ errorMessage }}
    </div>
  `,

})
export class ErrorMessageComponent {
  
  @Input() control!: AbstractControl

  get errorMessage(): string {
    const error = this.control?.errors
    const validatorName = Object.keys(error ?? {})[0]

    return this.control.touched && validatorName
    ? validatorErrorMessage(validatorName)
    : ""
  }
}
