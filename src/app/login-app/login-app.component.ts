import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-app',
  templateUrl: './login-app.component.html',
  styleUrls: ['./login-app.component.css']
})
export class LoginAppComponent implements OnInit {

  email:string;
  password:string;
  progressStatus:boolean = false;

  constructor(
    private afAuth:AngularFireAuth,private router:Router) { }

    

  ngOnInit(): void {
  }

  login(){
    this.progressStatus = true;

    this.afAuth.signInWithEmailAndPassword(this.email,this.password)
    .then(()=>{
      this.progressStatus = false;
      this.router.navigate(['/all'])
    })
    .catch(error=>{
      console.log(error)
    })
  }

}
