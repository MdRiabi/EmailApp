import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';


interface UsernameAvailableResponse{
  available: boolean;
}
interface signupCredentials{
  username: string;
  password: string;
  passwordConfirmation: string;
}
interface SignupResponse{
  username: string;
}
interface signedinResponse{
  authenticated:boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  signedin$ = new BehaviorSubject(false);

  rootUrl = 'https://api.angular-email.com';
  usernameAvailable(username: string){
// `${this.rootUrl}/auth/username` = this.rootUrl + '/auth/username'
    return this.http
      .post<UsernameAvailableResponse>(`${this.rootUrl}/auth/username`, {
        username
      })

  }

  signup(credintials: signupCredentials){
    
    return this.http.
    post<SignupResponse>
    (`${this.rootUrl}/auth/signup`, credintials)
    .pipe(
      tap(() =>{
        this.signedin$.next(true);
      })
    )

  }
  checkAuth(){
    return this.http.
    get<signedinResponse>(`${this.rootUrl}/auth/signedin`).
    pipe(
      tap(({authenticated}) =>{
        this.signedin$.next(authenticated);
      })
    )
  }


  signout(){
    return this.http.post(`${this.rootUrl}/auth/signout`,{}).pipe(

tap(()  =>{
  this.signedin$.next(false);
})


    )
  }
 
}
