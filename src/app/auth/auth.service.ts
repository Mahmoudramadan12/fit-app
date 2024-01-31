import { Subject } from 'rxjs';
import { AuthData } from './auth.data.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TrainingService } from '../training/training.service';
@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private afauth: AngularFireAuth,
    private trainingService: TrainingService
  ) {}
  private isAuthenticated = false;
  authChange = new Subject<boolean>();
  registerUser(authData: AuthData) {
    this.afauth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.authsuccessfully();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.afauth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.authsuccessfully();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    this.trainingService.cancelSubscription();
    this.afauth.signOut();
    this.authChange.next(false);
    this.router.navigate(['/login']);
    this.isAuthenticated = false;
  }

  isAuth() {
    return this.isAuthenticated;
  }
  private authsuccessfully() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/trainging']);
  }
}
