import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  faUser = faUser;
  faLock = faLock;

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router,
    private toastr: ToastrService

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.loginForm.markAllAsTouched();  // Force all fields to show validation

    console.log(this.loginForm.valid)
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          this.toastr.success('Login successful!', 'Success');
          this.router.navigate(['/home']);
        },
        (error) => {
          this.toastr.error('Login failed. Please try again.', 'Error');
          console.error('Login failed:', error);
        }
      );
    }
  }

}
