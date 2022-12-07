import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailShowComponent } from './email-show/email-show.component';
import { HomeComponent } from './home/home.component';
import { PlaceHolderComponent } from './place-holder/place-holder.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,

    children: [
      {
        path: ':id', component: EmailShowComponent
      },

      {
        path: '', component: PlaceHolderComponent
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
