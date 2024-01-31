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
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: boolean;
  authsubscription: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authsubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
      }
    );
  }
  Ontogglesidenav() {
    this.sidenavToggle.emit();
  }
  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authsubscription.unsubscribe();
  }
}
