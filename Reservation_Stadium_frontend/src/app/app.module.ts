import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { StadiumListScreenComponent } from './components/stadium-list-screen/stadium-list-screen.component';
import { CardComponent } from './components/card/card.component';
import { SkeletonCardComponent } from './components/skeleton-card/skeleton-card.component';
import { StadiumDetailScreenComponent } from './components/stadium-detail-screen/stadium-detail-screen.component';
import { ContactUsScreenComponent } from './components/contact-us-screen/contact-us-screen.component';
import { FooterComponent } from './components/footer/footer.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeScreenComponent,
    SigninComponent,
    SignupComponent,
    SidebarComponent,
    StadiumListScreenComponent,
    CardComponent,
    SkeletonCardComponent,
    StadiumDetailScreenComponent,
    ContactUsScreenComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [provideHttpClient()], // add it here 
  bootstrap: [ AppComponent ]
})
export class AppModule { }
