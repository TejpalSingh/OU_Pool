import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import {ResetPasswordPage}from '../pages/reset-password/reset-password';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Firebase } from '@ionic-native/firebase';
import { AuthData } from '../providers/auth-data';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


var config = {
  apiKey: "AIzaSyBKFxYpNeDwOn5KF0Lmp5Z8OE2qXDJzweY",
  authDomain: "carpool-88c08.firebaseapp.com",
  databaseURL: "https://carpool-88c08.firebaseio.com",
  projectId: "carpool-88c08",
  storageBucket: "",
  messagingSenderId: "204716269086"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage
  ],
  providers: [
    AuthData,
    StatusBar,
    SplashScreen,
    Firebase,
    AngularFireDatabaseModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
