import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideFirestore,getFirestore, connectFirestoreEmulator } from '@angular/fire/firestore';
import { AuthFormComponent } from "./shared/auth-form/auth-form.component";
import { ErrorMessageComponent } from './shared/auth-form/components/error-message/error-message.component';

@NgModule({
    declarations: [AppComponent],
    providers: [provideHttpClient()
    ],
    bootstrap: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => {
            const auth = getAuth();
            connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
            return auth;
        }), provideFirestore(() => {
            const firestore = getFirestore();
            connectFirestoreEmulator(firestore, "http://localhost", 9098);
            return firestore;
        }), AuthFormComponent]
})
export class AppModule {}
