import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { RealHomeComponent } from './real-home/real-home.component';
import { AllComponent } from './all/all.component';
import { SharedModule } from './shared/shared.module';
import { LoginAppComponent } from './login-app/login-app.component';
import { RegisterComponent } from './register/register.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { environment } from 'src/environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MAT_BOTTOM_SHEET_DEFAULT_OPTIONS } from '@angular/material/bottom-sheet';
import { DeleteComponent } from './action-dialog/delete/delete.component';

@NgModule({
  declarations: [
    AppComponent,
    RealHomeComponent,
    AllComponent,
    LoginAppComponent,
    RegisterComponent,
    ToolbarComponent,
    DeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    AngularFireAnalyticsModule,
    ReactiveFormsModule,
    MatProgressBarModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,// storage
  ],
  providers: [
    {provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  entryComponents:[DeleteComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
