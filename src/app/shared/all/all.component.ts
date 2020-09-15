import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { StreamState } from 'src/app/models/stream.model';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  status: "R&B"|"pop"|"beat"|"chart"="R&B";
  soundIconStatus: "sound"|"mute" = "sound";

  showVolumeSlider:boolean = true;

  savePauseTime:any = null;

  changeStatus(val){
    this.status = val;
  }

  files: Array<any> = [];
  state: StreamState;
  currentFile: any = {};

  constructor(public audioService: AudioService,) {
    // get media files
    // cloudService.getFiles().subscribe(files => {
    //   this.files = files;
    // });

    // listen to stream state
    this.audioService.getState()
    .subscribe(state => {
      this.state = state;
    });
   }

  ngOnInit(): void {
  }

  playStream() {
    if(this.savePauseTime !== null){
      console.log("Audio data is Present",this.savePauseTime)
      this.audioService.seekTo(this.savePauseTime);
      this.audioService.play()
    }else{
      this.audioService.playStream("https://firebasestorage.googleapis.com/v0/b/wapify-277cd.appspot.com/o/Tommy%20Flavour%20ft%20Alikiba%20-%20OMUKWANO%20(Official%20Music%20Video).mp3?alt=media&token=4fd43eee-d55b-466b-b3bc-466930657187")
      .subscribe(events => {
        // listening for fun here
      });
    }

  }

  openFile(file, index) {
    this.currentFile = { index, file };
    this.audioService.stop();
    //this.playStream(file.url);
  }

  pause() {
    this.audioService.pause();
    this.savePauseTime = this.audioService.getSeekTime();
    //localStorage.setItem('songTime', this.savePauseTime);
    console.log(this.savePauseTime)
  }

  play() {
    this.audioService.play();
    if(this.savePauseTime !== null){

    }
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
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



}
