import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  faUser = faUser;
  faLock = faLock;

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router,
    private toastr: ToastrService
) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.registerForm.markAllAsTouched();  // Force all fields to show validation

    console.log(this.registerForm.valid)
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response) => {
          console.log('Registration successful', response);
          this.toastr.success('Registration successful!', 'Success');
          this.router.navigate(['/signin']);

        },
        (error) => {
          console.error('Registration failed', error);
          this.toastr.error('Registration failed. Please try again.', 'Error');
        }
      );
    }
  }
}

