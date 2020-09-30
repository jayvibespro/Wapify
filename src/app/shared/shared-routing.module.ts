import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllComponent } from './all/all.component';
import { UploadComponent } from './upload/upload.component';
import { UploadSongsComponent } from './upload-songs/upload-songs.component';
import { UploadBeatsComponent } from './upload-beats/upload-beats.component';
import { UploadCoverComponent } from './upload-cover/upload-cover.component';
import { AllUploadsComponent } from './all-uploads/all-uploads.component';
import { ProfileComponent } from './profile/profile.component';


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
  },
  {
    path:'upload_cover',component:UploadCoverComponent
  },
  {
    path:'my_uploads',component:AllUploadsComponent
  },

  {
    path:'profile',component:ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
