import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrl: './training.component.css',
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  exercisesSubscription: Subscription;
  constructor(private trainingservice: TrainingService) {}
  ngOnInit(): void {
    this.trainingservice.exerciseChanged.subscribe((exercise) => {
      if (exercise) {
        this.ongoingTraining = true;
      } else {
        this.ongoingTraining = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.exercisesSubscription.unsubscribe();
  }
}
