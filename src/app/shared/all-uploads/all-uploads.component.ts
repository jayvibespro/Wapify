import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StreamState } from 'src/app/models/stream.model';
import { AllFirebaseServiceService } from 'src/app/all-firebase-service.service';
import { AudioService } from 'src/app/services/audio.service';
import { SongService } from 'src/app/services/song.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../../action-dialog/delete/delete.component';

@Component({
  selector: 'app-all-uploads',
  templateUrl: './all-uploads.component.html',
  styleUrls: ['./all-uploads.component.css']
})
export class AllUploadsComponent implements OnInit {
  progressStatus:boolean = false;

  status:"photo"|"music"|"beat" = "music";
  songUrls:any;
  showVolumeSlider:boolean = true;

  savePauseTime:any = null;

  audioStreamerFromFirebase:any;
  beatStreamFromFirebase:any;

  noResultLayoutStatus:boolean = false;


  changeStatus(val?:any,category?:any){
    this.status = val;
    this.progressStatus = true;
  }

  files: Array<any> = [];
  state: StreamState;
  currentFile: any = {};

  constructor(public audioService: AudioService,
    private songServ:SongService,
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private firebaseServ:AllFirebaseServiceService,
    private router:Router,
    private snackBar:MatSnackBar,
    private afAuth:AngularFireAuth) {


    // listen to stream state
    this.audioService.getState()
    .subscribe(state => {
      this.state = state;
    });
   }

  ngOnInit(): void {
    this.progressStatus = true;

    this.afAuth.user.subscribe(user=>{
      if(user !== null){
        console.log(user.uid)
        this.progressStatus = false;

        this.firebaseServ.getAllSongsForContentCreator(user.uid).subscribe(data=>{
          if(data.length !== 0){
            this.audioStreamerFromFirebase = data;
            this.progressStatus = false;

          }else{
            console.log("No data")
            this.progressStatus = false;
            this.snackBar.open("No Music!","Okay",{duration:2000});

          }
        })

      }else{
        console.log("NO USER")
        this.progressStatus = false;
        this.snackBar.open("Please Login!","Login",{duration:2000});
        this.router.navigate(['/login']);
      }

    })

  }

  playStream(artist:any,title:any,imageCover:any,songUrl:any) {
    this.songServ.songArtist = artist;
    this.songServ.songName = title;
    this.songServ.songCoverImg = imageCover;
    this.songServ.songStreamUrl = songUrl;
    
  }

  deleteMusic(uid:any){
    this.dialog.open(DeleteComponent,
      {
        data:{userId:uid
    }});
  }

  deleteBeat(){
    this.dialog.open(DeleteComponent);

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

