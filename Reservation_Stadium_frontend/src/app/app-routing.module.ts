import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { StadiumListScreenComponent } from './components/stadium-list-screen/stadium-list-screen.component';
import { StadiumDetailScreenComponent } from './components/stadium-detail-screen/stadium-detail-screen.component';
import { ContactUsScreenComponent } from './components/contact-us-screen/contact-us-screen.component';

const routes: Routes = [
  { path: '', component: HomeScreenComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'stadiums', component: StadiumListScreenComponent },
  { path: 'stadium_detail/:id', component: StadiumDetailScreenComponent },
  { path: 'contact', component: ContactUsScreenComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Wildcard route to redirect to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
