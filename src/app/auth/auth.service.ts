import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootUrl = 'https://api.angular-email.com';
  usernameAvailable(username: string){
// `${this.rootUrl}/auth/username` = this.rootUrl + '/auth/username'
    return this.http
      .post<UsernameAvailableResponse>(`${this.rootUrl}/auth/username`, {
        username
      })

  }

  signup(credintials: signupCredentials){
    
    return this.http.post<SignupResponse>(`${this.rootUrl}/auth/signup`, credintials)


  }

  constructor(private http: HttpClient) { }
}
