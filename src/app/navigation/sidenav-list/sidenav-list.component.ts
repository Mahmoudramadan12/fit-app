import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.css',
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavclose = new EventEmitter();
  authsubscription: Subscription;
  isAuth: boolean;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authsubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
      }
    );
  }
  Sidenavclose() {
    this.sidenavclose.emit();
  }
  ngOnDestroy(): void {
    this.authsubscription.unsubscribe();
  }
  onLogout() {
    this.authService.logout();
    this.Sidenavclose();
  }
}
