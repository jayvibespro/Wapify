import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  songArtist:string;
  songName:string;
  songCoverImg:string;
  songStreamUrl:string;

  songArray:any;

  songUrlIndex:number;

  constructor() { }
}
