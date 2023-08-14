import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '@app/pages/users/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  user$!: Observable<User | null>
  private readonly authService = inject(AuthService)

  constructor(){
    this.user$ = this.authService.userState$
  }

  async onSingOut(): Promise<void>{
    await this.authService.SingOut()
  }
}
