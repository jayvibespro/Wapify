import { Component, DoCheck, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { strict } from 'assert';
import * as firebase from 'firebase';
import { title } from 'process';
import { AllFirebaseServiceService } from '../../all-firebase-service.service';

@Component({
  selector: 'app-upload-songs',
  templateUrl: './upload-songs.component.html',
  styleUrls: ['./upload-songs.component.css']
})
export class UploadSongsComponent implements OnInit,DoCheck {

  progressStatus:boolean = false;

  audioFileUrl:File = null;
  imageFileUrl:File;
  imageUrl:any = "assets/wapify_image.gif";
  imageFirebaseUrl;
  swicthStatus:boolean = false;
  audioFileName:any;
  audioDownloadUrl:any;

  artistName:string;
  title:string;
  producer:string;
  genre:string;
  year:string;
  description:string;
  progress:number;


  userUidValue:any;
  uniqueMusicId:any;
  uniquePhotoId:any;


  constructor(private afAuth:AngularFireAuth,
    private serviceFb:AllFirebaseServiceService,
    private db: AngularFirestore,
    private snackBack:MatSnackBar,
    private afStorage: AngularFireStorage) { }



  ngDoCheck(){
    console.log(String(this.progress))

    }
  ngOnInit(): void {

    this.afAuth.user.subscribe(userData=>{
      this.userUidValue = userData.uid;
    })

  }

  uploadAudio(event){
    this.audioFileUrl = event.target.files[0];
    this.audioFileName = this.audioFileUrl.name;

    this.uploadAudioOnly();

  }

  selectImage(event){
    this.imageFileUrl = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
    reader.readAsDataURL(this.imageFileUrl);
  }

  uploadAudioOnly(){

    this.progressStatus = true;
    let storageRef = firebase.storage().ref();

    let audioRef = storageRef.child('Songs/'+this.makeid(5));
    audioRef.put(this.audioFileUrl).then((snapshotResult)=>{
      audioRef.getDownloadURL().then((url)=>{
        this.audioDownloadUrl = url;
        this.progressStatus = false;
        this.snackBack.open("Music Uploade Successfully","",{duration:2000})
      })
    });
  }

  uploadMusicData(){
    this.progressStatus = true;
    let storageRef = firebase.storage().ref();
    let coverPhotoRef = storageRef.child('Cover_Photo/'+this.makeid(6));

    coverPhotoRef.put(this.imageFileUrl).then(()=>{
      coverPhotoRef.getDownloadURL().then(url=>{

    this.imageFirebaseUrl = url;
    this.serviceFb.uploadSongs({
      artirst:this.artistName,
      title:this.title,
      description:this.description,
      genre:this.genre,
      year:this.year,
      producer:this.producer,
      songUrl:this.audioDownloadUrl,
      userId:this.userUidValue,
      count:0,
      imageCover:this.imageFirebaseUrl
    }).then(()=>{
      this.progressStatus = false;
      this.snackBack.open("Successfull Uploaded!","",{duration:2000})
      this.title = "";
      this.description = "";
      this.genre = "";
      this.year = "";
      this.producer = "";
      this.audioFileUrl = null;
    })

      });
    });


  }

  makeid(length) {
    var result  = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }



}
