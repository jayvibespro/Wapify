import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { AllFirebaseServiceService } from '../all-firebase-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  progressStatus:boolean = false;

  accountType:string;
  username:string;
  email:string;
  password:string;
  confirmPass:string;
  userUid:any;
  avatarFile:File = null;
  avatarFileUrl :any  = "assets/avatar.png";
  avatarUrlFirebase:any;



  constructor(private firebaseServ:AllFirebaseServiceService,
    private afAuth:AngularFireAuth,
    private router:Router,
    private afStorage: AngularFireStorage) {

    }

  ngOnInit(): void {
  }

  imageSelector(event){
    this.avatarFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.avatarFileUrl = reader.result;
    };
    reader.readAsDataURL(this.avatarFile);
  }

  registerUser(){
    this.progressStatus = true;
    if(this.avatarFile !== null){

      let storageRef = firebase.storage().ref();
      let avatarRef = storageRef.child('AllUserImages/'+this.username);

      avatarRef.put(this.avatarFile).then(()=>{
        this.afAuth.createUserWithEmailAndPassword(this.email,this.password).then(()=>{

          avatarRef.getDownloadURL().then(url=>{
            this.avatarUrlFirebase = url;

            this.firebaseServ.setUserAccount({
              imgFile:this.avatarUrlFirebase,
              username:this.username,
              email:this.email,
              password:this.password,
              accountType:this.accountType
            }).then(()=>{
              this.router.navigate(['/login']);
              this.progressStatus = false;
            })
          });
        })

      });
    }else{
      this.afAuth.createUserWithEmailAndPassword(this.email,this.password).then(()=>{
        this.firebaseServ.setUserAccount({
          username:this.username,
          email:this.email,
          password:this.password,
          accountType:this.accountType
        }).then(()=>{
          this.router.navigate(['/login']);
          this.progressStatus = false;
        })
      })
    }




  }



}
