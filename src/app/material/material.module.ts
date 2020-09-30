import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
const material = [
  MatToolbarModule,
  MatButtonModule,
  MatDialogModule,
  MatCardModule,
  MatTooltipModule,
  MatExpansionModule,
  MatSidenavModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatSnackBarModule,
  FlexLayoutModule,
  MatMenuModule,
  MatStepperModule,
  MatBottomSheetModule,
  MatChipsModule,
  MatSliderModule,
  MatProgressBarModule,
  MatSelectModule,
  MatRadioModule,
  MatListModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    material
  ],
  exports:[material]
})
export class MaterialModule { }
