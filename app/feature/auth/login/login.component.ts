import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // loginForm: FormGroup<Login> = this.fb.nonNullable.group({
  //   userName: ['', [Validators.required]],
  //   password: ['', [Validators.required]],
  // });

  onLogin() {
    this.router.navigateByUrl('/home');
  }

  routeNavigation() {
    this.router.navigate(['app/dashboard-services']);
  }
}
