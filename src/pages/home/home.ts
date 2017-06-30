import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


import { Firebase } from '@ionic-native/firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tokens: FirebaseListObservable<any>;
  firemsg: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public afd: AngularFireDatabase, private afAuth: AngularFireAuth, private firebase: Firebase) {
    this.tokens=afd.list('/pushtoken')
    this.firemsg=afd.list('/messages')
    this.tokensetup().then((token) => {
      this.storetoken(token);
    })
  }

  ionViewDidLoad() {
    this.firebase.onNotificationOpen().subscribe(data=>{
      if(data.wasTapped){
        //Notification was received on device tray and tapped by the user.
        alert( JSON.stringify(data) );
      }else{
        //Notification was received in foreground. Maybe the user needs to be notified.
        alert( JSON.stringify(data) );
      }
    });
    this.firebase.onTokenRefresh().subscribe(token=>{
      alert( token );
    });
  }

  tokensetup() {
    var promise = new Promise((resolve, reject) => {
      this.firebase.getToken().then(token=>{
        resolve(token);
      }, (err) => {
        reject(err);
      });
    })
    return promise;
  }
  storetoken(t) {

    this.tokens.push({
      devtoken: t

    }).then(() => {
      alert('Token stored');
    }).catch((e) => {
      alert('Token not stored'+e);
    })

    this.firemsg.push({
      //sendername: this.afAuth.auth.currentUser.displayName,
      message: 'hello'
    }).then(() => {
      alert('Message stored');
    }).catch(() => {
      alert('Message not stored');
    })
  }


}
