import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AllFirebaseServiceService } from 'src/app/all-firebase-service.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  docRefId:any;

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    private firebaseServ:AllFirebaseServiceService,
    private snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.docRefId = data.userId
      console.log(this.docRefId)
    }

  ngOnInit(): void {
  }

  cancelDialog(){
    this.dialogRef.close()
  }

  delete(){
    this.firebaseServ.deleteSong(this.docRefId);

  }
}
