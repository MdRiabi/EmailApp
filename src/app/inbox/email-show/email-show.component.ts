import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {
email: Email;
  constructor(private route: ActivatedRoute, private emailService: EmailService) { }

  /* this.route.params.subscribe(value => {console.log(value);}); = console.log(this.route.snapshot.params.id);
   */

  ngOnInit(): void {
    /*  this.route.params.subscribe(({id}) => 
     {
       this.emailService.getEmail(id).subscribe(email =>{
 console.log(email);
       })
     }    
     ); */

    this.route.params.pipe(
      switchMap(({ id }) => {
        return this.emailService.getEmail(id);
      })
    ).subscribe(email => {
      this.email = email;
    });
  }
}
