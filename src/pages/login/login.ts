import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController,LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar';


import {AuthData} from "../../providers/auth-data";
import { EmailValidator } from '../../validators/email';


import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { ResetPasswordPage } from '../reset-password/reset-password';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm;
  loading: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private menu: MenuController, public statusbar:StatusBar,
              public formBuilder: FormBuilder, public alertCtrl: AlertController,
              public loadingCtrl: LoadingController, public authData: AuthData) {
    this.menu.swipeEnable(false, 'menu1');

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    alert("Login clicked");

    this.navCtrl.setRoot(HomePage);
  }

  loginUser(): void {
    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(authData => {
        this.loading.dismiss().then(() => {
          this.navCtrl.setRoot(HomePage);
        });
      }, error => {
        this.loading.dismiss().then(() => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }


  signupPage() {
    this.navCtrl.push(SignupPage);
  }

  goToResetPassword(): void {
    this.navCtrl.push(ResetPasswordPage);
  }

}
