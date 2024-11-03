import { Component } from '@angular/core';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  faUser = faUser;
  faLock = faLock;


}
