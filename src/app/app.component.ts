import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', component: HomePage},
      {title: 'Login', component: LoginPage},
      {title: 'Home', component: HomePage},
      {title: 'List', component: ListPage}
    ];

    var config = {
      apiKey: "AIzaSyBKFxYpNeDwOn5KF0Lmp5Z8OE2qXDJzweY",
      authDomain: "carpool-88c08.firebaseapp.com",
      databaseURL: "https://carpool-88c08.firebaseio.com",
      projectId: "carpool-88c08",
      storageBucket: "",
      messagingSenderId: "204716269086"
    };

    firebase.initializeApp(config);
    // firebase.auth().onAuthStateChanged((user) => {
    //   alert(user);
    //   if (!user) {
    //     console.log("not login");
    //     this.rootPage = LoginPage;
    //
    //
    //   } else {
    //     console.log("login");
    //     this.rootPage = HomePage;
    //
    //   }
    //
    //
    //
    // });
    this.rootPage = HomePage;


    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //this.openPage(this.rootPage);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
