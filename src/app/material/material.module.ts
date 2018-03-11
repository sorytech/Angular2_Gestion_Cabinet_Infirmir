import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatDatepickerModule,
  MatSortModule,
  MatInputModule,
  MatFormFieldModule,
  MatRadioModule,
  MatTableModule,
  MatTabsModule,


} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatTableModule,
    MatTabsModule

  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatTableModule,
    MatTabsModule

  ]
})


export class MaterialModule { }





