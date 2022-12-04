import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchPassword } from '../validatros/match-password';
import { UniqueUsername } from '../validatros/unique-username';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  authForm = new FormGroup({
    userName: new FormControl('',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
        Validators.pattern(/^[a-z0-9]+$/),
      ],[this.uniqueUsername.validate]),
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
    { validators: [this.matchPassword.validate]});

constructor(private matchPassword: MatchPassword , private uniqueUsername:UniqueUsername){}
  


  ngOnInit(): void {
  }

}


