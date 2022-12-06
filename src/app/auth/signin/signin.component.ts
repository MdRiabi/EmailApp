import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService) { }

  authForm = new FormGroup(
    {
      userName: new FormControl(
        '',
        
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
      ])
    }
  );

  ngOnInit(): void {
  }
onSubmit(){
  if(this.authForm.invalid){
return;
  }
  this.authService.signin(this.authForm.value).subscribe({
    next:() =>{},

    error:({error})  =>{
      if(error.userName || error.password){
        this.authForm.setErrors({credentials: true})

      }

    }
  })
}


}
