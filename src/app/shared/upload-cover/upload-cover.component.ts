import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-cover',
  templateUrl: './upload-cover.component.html',
  styleUrls: ['./upload-cover.component.css']
})
export class UploadCoverComponent implements OnInit {

  progressStatus:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
