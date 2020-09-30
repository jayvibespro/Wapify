import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-toolbar',
  templateUrl: './all-toolbar.component.html',
  styleUrls: ['./all-toolbar.component.css']
})
export class AllToolbarComponent implements OnInit {

  constructor(private afAuth:AngularFireAuth,
    private router:Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.afAuth.user.subscribe(user=>{
      if(user !== null){
        this.afAuth.signOut().then(()=>{
          this.router.navigate(['/login']);
        })
      }

    })

  }

}
