import { Component, OnInit, DoCheck } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { StreamState } from 'src/app/models/stream.model';
import { AllFirebaseServiceService } from '../../all-firebase-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { SongService } from 'src/app/services/song.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SongInterface } from 'src/app/models/UploadSong';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit,DoCheck {
  progressStatus:boolean = false;

  status: "musicCategory"|"beat"|"chart"|"homeStart"="homeStart";
  soundIconStatus: "sound"|"mute" = "sound";

  songUrls:any;
  showVolumeSlider:boolean = true;

  savePauseTime:any = null;

  audioStreamerFromFirebase:any;
  beatStreamFromFirebase:any;

  totalMusicNumber:any;
  documentId:any;
  countMusic:number;
  allSongUrlArray:SongInterface[] = [];

  noResultLayoutStatus:boolean = false;
  musicListClicked:boolean = false;

  state: StreamState;

  nextIndex:any;
  prevIndex:any;

  constructor(public audioService: AudioService,
    public songServ:SongService,
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

  changeStatus(val?:any,category?:any){
    this.status = val;
    this.progressStatus = true;
    if(val !== 'beat'){
      this.firebaseServ.getSongDueToCategory(category).subscribe(data=>{
        if(data.length !== 0){
          this.totalMusicNumber = data.length;
          this.audioStreamerFromFirebase = data;
          this.progressStatus = false;
          this.noResultLayoutStatus = false;

          data.forEach(result=>{
            this.allSongUrlArray.push({
              artirst:result.payload.doc.data()["artirst"],
              title:result.payload.doc.data()["title"],
              description:result.payload.doc.data()["description"],
              genre:result.payload.doc.data()["genre"],
              year:result.payload.doc.data()["year"],
              producer:result.payload.doc.data()["producer"],
              songUrl:result.payload.doc.data()["songUrl"],
              userId:result.payload.doc.data()["userId"],
              count:result.payload.doc.data()["count"],
              imageCover:result.payload.doc.data()["imageCover"]
            })
          })
        }else{
          console.log("No data")
          this.progressStatus = false;
          this.snackBar.open("No "+category+" Songs!","",{duration:2000});
          this.noResultLayoutStatus = true;

        }
      })
    }else{
      console.log("beat Clicked")
      this.firebaseServ.getBeats().subscribe(data=>{
        if(data.length !== 0){
          this.beatStreamFromFirebase = data;
          this.progressStatus = false;
          this.noResultLayoutStatus = false;

        }else{
          console.log("No data")
          this.progressStatus = false;
          this.snackBar.open("No Music!","Okay",{duration:2000});
          this.noResultLayoutStatus = true;
        }
      })
    }

  }

  ngOnInit(): void {
    this.progressStatus = true;

    this.afAuth.user.subscribe(user=>{
      if(user !== null){
        this.progressStatus = false;
      }else{
        console.log("NO USER")
        this.progressStatus = false;
        this.snackBar.open("Please Login!","Login",{duration:2000});
        this.router.navigate(['/login']);
      }

    })

  }

  ngDoCheck(){
  }

  playStream(docId,musicIndex:number,artist:any,title:any,imageCover:any,songUrl:any,count?:number) {
    this.musicListClicked = true;
    this.songServ.songArtist = artist;
    this.songServ.songName = title;
    this.songServ.songCoverImg = imageCover;
    this.songServ.songStreamUrl = songUrl;
    this.songServ.songUrlIndex = musicIndex;
    this.documentId = docId;
    this.countMusic = count;
    this.play();

  }



  play() {

    if(this.savePauseTime !== null){
      this.state.playing = false;
      this.audioService.seekTo(this.savePauseTime);
      this.audioService.play()

    }else{
      this.state.playing = true;
      this.audioService.playStream(this.songServ.songStreamUrl)
      .subscribe(events => {
        // listening for fun here
      });


      this.firebaseServ.addMusicCount(this.documentId,this.countMusic+1);
    }

  }
  pause() {
    this.audioService.pause();
    this.savePauseTime = this.audioService.getSeekTime();
    this.state.playing = false;
    console.log("pauseTime "+this.savePauseTime);
  }


  stop() {
    this.audioService.stop();
  }

  next() {

    if(this.prevIndex === 0){
      this.prevIndex + 1;
    }
   this.nextIndex = this.songServ.songUrlIndex + 1;

    if(this.nextIndex > this.songServ.songUrlIndex){
      if(this.savePauseTime !== null){
        this.audioService.resetState();

        this.playStream(this.documentId,this.nextIndex,
          this.allSongUrlArray[this.nextIndex].artirst,
          this.allSongUrlArray[this.nextIndex].title,
          this.allSongUrlArray[this.nextIndex].imageCover,
          this.allSongUrlArray[this.nextIndex].songUrl
          );
      }else{

        this.playStream(this.documentId,this.nextIndex,
          this.allSongUrlArray[this.nextIndex].artirst,
          this.allSongUrlArray[this.nextIndex].title,
          this.allSongUrlArray[this.nextIndex].imageCover,
          this.allSongUrlArray[this.nextIndex].songUrl,
          this.allSongUrlArray[this.nextIndex].count+1);

      }


    }else{
    }



  }

  previous() {

    if(this.nextIndex === this.totalMusicNumber-1){
      this.nextIndex-1;
    }

    this.prevIndex = this.songServ.songUrlIndex  - 1;
    if(this.prevIndex < this.songServ.songUrlIndex){
      if(this.savePauseTime !== null){
        this.audioService.resetState();
        this.playStream(this.documentId,this.prevIndex,
          this.allSongUrlArray[this.prevIndex].artirst,
          this.allSongUrlArray[this.prevIndex].title,
          this.allSongUrlArray[this.prevIndex].imageCover,
          this.allSongUrlArray[this.prevIndex].songUrl)

      }

      this.playStream(this.documentId,this.prevIndex,
        this.allSongUrlArray[this.prevIndex].artirst,
        this.allSongUrlArray[this.prevIndex].title,
        this.allSongUrlArray[this.prevIndex].imageCover,
        this.allSongUrlArray[this.prevIndex].songUrl,
        this.allSongUrlArray[this.prevIndex].count+1)


    }else{
    }
  }

  isFirstPlaying() {
    return this.prevIndex === 0;

  }

  isLastPlaying() {
    return this.nextIndex === this.totalMusicNumber-1;
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }

  onVolumeChange(volume){
    this.audioService.setVolume(volume.value)
  }



  unMute(){
    this.soundIconStatus = "mute";
    this.audioService.setVolume(0.0)
    this.showVolumeSlider = false;

  }

  mute(){
    this.soundIconStatus = "sound";
    this.audioService.setVolume(0.5)
    this.showVolumeSlider = true;
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
