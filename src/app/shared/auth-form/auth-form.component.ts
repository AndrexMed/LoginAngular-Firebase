import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageComponent } from "./components/error-message/error-message.component";
import { AuthService } from '@app/pages/users/services/auth.service';
import { Observable } from 'rxjs';

const actionType = {
  signIn: {
    action: "signIn",
    title: "Sing In"
  },
  signUp: {
    action: "signUp",
    title: "Sign Up"
  } as const
}

type ActionType = keyof typeof actionType

@Component({
  selector: 'app-auth-form',
  standalone: true,
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ErrorMessageComponent]
})
export class AuthFormComponent implements OnInit {

  private readonly authService = inject(AuthService)
  user$!: Observable<any>

  @Input() action!: ActionType
  form!: FormGroup
  tittle!: string

  private fb = inject(FormBuilder)
  private readonly emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ngOnInit(): void {
    this.tittle =
      this.action === actionType.signIn.action ? actionType.signIn.title : actionType.signUp.title

    this.initForm()
    this.user$ = this.authService.userState$
  }

  initForm(): void {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ["", [Validators.required, Validators.minLength(5)]]
    })
  }

  hasError(field: string): boolean {
    const fieldName = this.form.get(field)
    return !!fieldName?.invalid && fieldName.touched
  }

  signInGoogle(): void {
    this.authService.signInGoogle()
  }

  onSubmit(): void {
    const { email, password } = this.form.value //Desestructuracion
    this.action === actionType.signIn.action ? this.authService.SingIn(email,password) : this.authService.SingUp(email,password)
  }
}
