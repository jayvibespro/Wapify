import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Wapify';

  constructor(private afAuth:AngularFireAuth,
    private snackBar:MatSnackBar,
    private routers:Router){
    this.afAuth.user.subscribe(user=>{
      if(user !== null){
        this.snackBar.open("Welcom Back","",{duration:2000});
        this.routers.navigate(['/all'])
      }
    })
  }

}
