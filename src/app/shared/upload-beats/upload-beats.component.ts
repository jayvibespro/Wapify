import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as firebase from 'firebase';
import { AllFirebaseServiceService } from 'src/app/all-firebase-service.service';

@Component({
  selector: 'app-upload-beats',
  templateUrl: './upload-beats.component.html',
  styleUrls: ['./upload-beats.component.css']
})
export class UploadBeatsComponent implements OnInit {

  progressStatus:boolean = false;

  audioDemoFileUrl:File = null;
  audioOriginalFileUrl:File = null;


  imageFileUrl:File;
  imageUrl:any = "https://img.icons8.com/fluent/96/000000/image.png";
  imageFirebaseUrl;
  swicthStatus:boolean = false;

  audioDemoFileName:any;
  audioOriginalFileName:any;

  audioDemoDownloadUrl:any;
  audioOriginalDownloadUrl:any;

  price:string;

  artistName:string;
  title:string;
  producer:string;
  genre:string;
  year:string;
  description:string;

  userUidValue:any;


  constructor(private afAuth:AngularFireAuth,
    private serviceFb:AllFirebaseServiceService,
    private db: AngularFirestore,
    private snackBack:MatSnackBar,
    private afStorage: AngularFireStorage) { }

  ngOnInit(): void {

    this.afAuth.user.subscribe(userData=>{
      this.userUidValue = userData.uid;
    })

  }

  uploadDemoAudio(event){

    this.audioDemoFileUrl = event.target.files[0];
    this.audioDemoFileName = this.audioDemoFileUrl.name;
    this.uploadDemoAudioOnly();

  }

  uploadOriginalBeat(event){

    this.audioOriginalFileUrl = event.target.files[0];
    this.audioOriginalFileName = this.audioOriginalFileUrl.name;
    this.uploadOriginalAudioOnly();
  }

  selectImage(event){
    this.imageFileUrl = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
    reader.readAsDataURL(this.imageFileUrl);
  }

  uploadDemoAudioOnly(){
    this.progressStatus = true;
    let storageRef = firebase.storage().ref();
    let audioRef = storageRef.child('DemoBeats/'+this.makeid(8));
    audioRef.put(this.audioDemoFileUrl).then((snapshotResult)=>{
      audioRef.getDownloadURL().then((url)=>{
        this.audioDemoDownloadUrl = url;
        this.progressStatus = false;
        this.snackBack.open("Demo Beat uploaded Successfully","",{duration:2000})
      })
    });
  }

  uploadOriginalAudioOnly(){
    this.progressStatus = true;
    let storageRef = firebase.storage().ref();
    let audioRef = storageRef.child('OriginalBeats/'+this.makeid(9));
    audioRef.put(this.audioOriginalFileUrl).then((snapshotResult)=>{
      audioRef.getDownloadURL().then((url)=>{
        this.audioOriginalDownloadUrl = url;
        this.progressStatus = false;
        this.snackBack.open("Original Beat Uploaded Successfully","",{duration:2000})
      })
    });
  }



  uploadMusicData(){
    this.progressStatus = true;
    let storageRef = firebase.storage().ref();
    let coverPhotoRef = storageRef.child('Cover_Photo/'+this.makeid(10));

    coverPhotoRef.put(this.imageFileUrl).then(()=>{
      coverPhotoRef.getDownloadURL().then(url=>{

    this.imageFirebaseUrl = url;
    this.serviceFb.uploadBeats({
      producer:this.producer,
      beatName:this.title,
      price:this.price,
      beatGenre:this.genre,
      year:this.year,
      beatDescription:this.description,
      beatCoverImage:this.imageFirebaseUrl,
      demoBeatUrl:this.audioDemoDownloadUrl,
      userId:this.userUidValue,
      count:0,
      originalBeatUrl:this.audioOriginalDownloadUrl

    }).then(()=>{
      this.progressStatus = false;
      this.snackBack.open("Successfull Uploaded!","",{duration:2000})
      this.producer = "";
      this.title = "";
      this.price = "";
      this.genre = "";
      this.year = "";
      this.description = "";
      this.imageFirebaseUrl = "";
      this.audioDemoDownloadUrl = "";
      this.audioOriginalDownloadUrl = "";
      this.audioDemoFileUrl = null;
      this.audioOriginalFileUrl = null;

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

