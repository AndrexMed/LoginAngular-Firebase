import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { filter, tap } from 'rxjs';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent {
  user: User | null = null
  private readonly authService = inject(AuthService)

  constructor() {
    this.authService.userState$
      .pipe(
        filter((authState) => authState != null),
        tap((user) => (this.user = user)),
        tap(() => this.authService.SingOut())
      )
      .subscribe()
  }

  onResendEmail(): void {
    if (this.user) {
      this.authService.sendEmailVerification(this.user)
    }
  }

}
