import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,
  AlertController } from 'ionic-angular';


import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { EmailValidator } from '../../validators/email';

import {HomePage}from'../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public signupForm;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authData: AuthData,
              public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {

    this.signupForm = formBuilder.group({
      name:'',
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      volunteer:''
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser() {
    if (!this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password,this.signupForm.value.name,this.signupForm.value.volunteer)
          .then((profile) => {
            alert('Registered');
            alert(profile);

            this.loading.dismiss().then(() => {
              this.navCtrl.setRoot(HomePage);
            });
          }, (error) => {
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

}
