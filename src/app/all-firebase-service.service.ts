import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { SongInterface } from './models/UploadSong';
import { UserAccount } from './models/user.account.model';
import { UploadBeat } from './models/upload.beat';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { DeleteComponent } from './action-dialog/delete/delete.component';

@Injectable({
  providedIn: 'root'
})
export class AllFirebaseServiceService {

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFirestore,private snackBar:MatSnackBar) { }

  //Create Songs
  async uploadSongs(data: SongInterface) {
    const user = await this.afAuth.currentUser;

    return this.db.collection('Songs').add({
      ...data
    }).catch((error) => {
      console.log(error);
    });
  }

  //Create Beats
  async uploadBeats(data: UploadBeat) {
    const user = await this.afAuth.currentUser;
    return this.db.collection('Beats').add({
      ...data
    }).catch((error) => {
      console.log(error);
    });
  }


  //Upload user to firebase
  async setUserAccount(userData:UserAccount){
    return this.db.collection("AllUsers").add({
      ...userData
    }).catch(error=>{
      console.log(error)
    })
  }


  //UPADATE

  addMusicCount(docId:any,countValue){
    this.db.collection('Songs')
    .doc(docId)
    .update({
      count:countValue
    })
   }

  //END -> UPDATE



  //Getting all

  getAllSongs(){
    return this.db.collection("Songs").snapshotChanges();
  }


  getAllSongsForContentCreator(userUid:any){
    return this.db.collection("Songs",ref=>ref.where("userId","==",userUid)).snapshotChanges()
  }
  getAllBeatForContentCreator(userUid:any){
    return this.db.collection("Beats",ref=>ref.where("userId","==",userUid)).snapshotChanges()
  }

  getBeats(){
    return this.db.collection("Beats").snapshotChanges();
  }

  getSongDueToCategory(category:any){

    return this.db.collection("Songs",ref=>ref.where("genre","==",category)).snapshotChanges()
  }

  //Deleting
  deleteSong(docId:any){
    this.db.collection('Songs')
    .doc(docId)
    .delete()
    .then(()=>{
      this.snackBar.open("Deleted","",{duration:2000});

    });
  }
}
