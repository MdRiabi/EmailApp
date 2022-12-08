import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';


interface UsernameAvailableResponse {
  available: boolean;
}
interface signupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}
interface SignupResponse {
  username: string;
}
interface signedinResponse {
  authenticated: boolean;
}
interface signinCredentials{
  username:string;
  password:string;
}
interface SigninResponse {
  username: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
 
  constructor(private http: HttpClient) { }
  signedin$ = new BehaviorSubject(false);

  rootUrl = 'https://api.angular-email.com';

  username: ' ';
  
  usernameAvailable(username: string) {
    // `${this.rootUrl}/auth/username` = this.rootUrl + '/auth/username'
    return this.http
      .post<UsernameAvailableResponse>(`${this.rootUrl}/auth/username`, {
        username
      })

  }

  signup(credintials: signupCredentials) {

    return this.http.
      post<SignupResponse>
      (`${this.rootUrl}/auth/signup`, credintials)
      .pipe(
        tap(({username}) => {
          this.signedin$.next(true);
/*           this.username = username;
 */        })
      )

  }

  checkAuth() {
    return this.http.
      get<signedinResponse>(`${this.rootUrl}/auth/signedin`).
      pipe(
        tap(({ authenticated,/* username */ }) => {

          this.signedin$.next(authenticated);
/*           this.username = username;
 */        })
      )
  }


  signout() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {}).pipe(

      tap(() => {
        this.signedin$.next(false);
      })


    )
  }

  signin(credentials: signinCredentials) {
    return this.http.post<SigninResponse>(`${this.rootUrl}/auth/signin`,credentials)
    .pipe(
      tap(({username}) =>{
        this.signedin$.next(true);
       /*  this.username = username; */
      })
    )
  }

}
