import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from '../material/material.module';
import { AllComponent } from './all/all.component';
import { AllToolbarComponent } from './all-toolbar/all-toolbar.component';
import { UploadComponent } from './upload/upload.component';
import { UploadToolbarComponent } from './upload-toolbar/upload-toolbar.component';
import { UploadSongsComponent } from './upload-songs/upload-songs.component';
import { UploadBeatsComponent } from './upload-beats/upload-beats.component';

@NgModule({

    declarations: [AllComponent,AllToolbarComponent, UploadComponent, UploadToolbarComponent, UploadSongsComponent, UploadBeatsComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
  ],

})
export class SharedModule { }
