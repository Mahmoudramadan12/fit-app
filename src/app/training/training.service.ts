import { Subject, Subscription } from 'rxjs';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class TrainingService {
  constructor(private db: AngularFirestore) {}
  private availableExercises: Exercise[] = [];
  private fbsubs: Subscription[] = [];
  exercisesChanged = new Subject<Exercise[]>();
  finishedExerciseChanged = new Subject<Exercise[]>();
  private runningExercise: Exercise;
  exerciseChanged = new Subject<Exercise>();
  fetchavailableExercises() {
    this.fbsubs.push(
      this.db
        .collection<Exercise>(' Available Exercise')
        .snapshotChanges()
        .pipe(
          map((docArray) => {
            return docArray.map((doc) => {
              let exercise: Exercise = {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data().name,
                duration: doc.payload.doc.data().duration,
                calories: doc.payload.doc.data().calories,
              };
              //console.log(exercise);
              return exercise;
            });
          })
        )
        .subscribe((exercises: Exercise[]) => {
          this.availableExercises = exercises;
          this.exercisesChanged.next([...this.availableExercises]);
        })
    );
  }

  startExercise(selectedId: string) {
    this.db;
    //.doc(' Available Exercise/' + selectedId).update({ lastselected: new Date() });
    const selectedExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    );
    this.runningExercise = selectedExercise;
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  getrunningExercise() {
    return { ...this.runningExercise };
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  fetchcompleteExerciseOrcancelExercise() {
    this.fbsubs.push(
      this.db
        .collection('finishedExercise')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.finishedExerciseChanged.next(exercises);
        })
    );
  }

  cancelSubscription() {
    this.fbsubs.forEach((sub) => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercise').add(exercise);
  }
}
