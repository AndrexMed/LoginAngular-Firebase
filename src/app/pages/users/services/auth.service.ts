import { Injectable, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, User, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signInWithRedirect } from 'firebase/auth';

interface ErrorResponse {
  code: string
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly route = inject(Router)
  private readonly auth = inject(Auth)
  private readonly googleProvider = new GoogleAuthProvider()

  constructor() {
    //this.SingOut()
   }

  get userState$() {
    return authState(this.auth)
  }

  async signInGoogle(): Promise<void> {
    try {
      await signInWithRedirect(this.auth, this.googleProvider)
    } catch (error) {
      console.log("Google Login ", error)
    }
  }

  async SingOut(): Promise<void> {
    try {
      this.auth.signOut()
    } catch (error: unknown) {
      console.log(error)
    }
  }

  async SingUp(email: string, password: string): Promise<void> {
    try {
      //Create Account
      const { user } = await createUserWithEmailAndPassword(this.auth, email, password)
      await sendEmailVerification(user)
      //Send Email
      this.route.navigate(['/user/email-verification'])
      //Redirect to Welcome Home

    } catch (error: unknown) {
      const { code, message } = error as ErrorResponse
      console.log("Code: ", code)
      console.log("Message: ", message)
    }
  }

  async SingIn(email: string, password: string): Promise<void> {
    try {
      const { user } = await signInWithEmailAndPassword(this.auth, email, password)
      console.log(user)

      this.checkUserIsVerified(user)

      
    } catch (error: unknown) {
      const { code, message } = error as ErrorResponse
      console.log("Code: ", code)
      console.log("Message: ", message)
    }
  }

  async sendEmailVerification(user: User): Promise<void> {
    try {
      await sendEmailVerification(user)
    } catch (error: unknown) {
      console.log(error)
    }
  }

  private checkUserIsVerified(user: User): boolean{
    this.route.navigate(['/user/profile'])
    return true
  }

}
