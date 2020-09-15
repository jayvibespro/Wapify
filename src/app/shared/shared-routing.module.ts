import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllComponent } from './all/all.component';
import { UploadComponent } from './upload/upload.component';
import { UploadSongsComponent } from './upload-songs/upload-songs.component';
import { UploadBeatsComponent } from './upload-beats/upload-beats.component';


const routes: Routes = [
  {
    path:'',component:AllComponent
  },
  {
    path:'studio',component:UploadComponent
  },
  {
    path:'upload_song',component:UploadSongsComponent
  },
  {
    path:'upload_beat',component:UploadBeatsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
