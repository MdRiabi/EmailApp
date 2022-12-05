import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { MatchPassword } from '../validatros/match-password';
import { UniqueUsername } from '../validatros/unique-username';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup(
    {
      userName: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(25),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        [this.uniqueUsername.validate]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
      ]),
    },
    { validators: [this.matchPassword.validate] }
  );

  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authServices: AuthService
  ) { }

  ngOnInit(): void { }
  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    return this.authServices
      .signup(this.authForm.value)
      .subscribe({

        next: response => {
          console.log(response)
        },
        error: err => {
          if (!err.status) {
            this.authForm.setErrors({ noConnection: true });
          }
          else{
            this.authForm.setErrors({ unknownError: true });

          }
        }


      });

    /* console.log(this.authForm.value); */
  }
}
