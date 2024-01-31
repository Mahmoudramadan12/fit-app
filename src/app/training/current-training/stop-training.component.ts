import { Component, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-stop-training',
  templateUrl: './Dialog.html',
})
export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedDate: any) {}
}
