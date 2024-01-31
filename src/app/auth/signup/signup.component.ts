import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  maxdate;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.maxdate = new Date();
    this.maxdate.setFullYear(this.maxdate.getFullYear() - 18);
  }
  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }
}
