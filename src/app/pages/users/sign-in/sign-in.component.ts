import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  template: `<app-auth-form [action]="'signIn'" />`,
  // styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

}
