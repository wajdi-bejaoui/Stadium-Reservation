import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StadiumListScreenComponent } from './components/stadium-list-screen/stadium-list-screen.component';
import { CardComponent } from './components/card/card.component';
import { SkeletonCardComponent } from './components/skeleton-card/skeleton-card.component';
import { StadiumDetailScreenComponent } from './components/stadium-detail-screen/stadium-detail-screen.component';
import { ContactUsScreenComponent } from './components/contact-us-screen/contact-us-screen.component';
import { FooterComponent } from './components/footer/footer.component';
import { provideHttpClient } from '@angular/common/http';
import { ReviewRatingComponent } from './components/review-rating/review-rating.component';
import { ReservationComponent } from './reservation/reservation.component';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import { stadiumReducer } from './state/stadium/stadium.reducer';
import { StadiumEffects } from './state/stadium/stadium.effects';
import { AddStadiumComponent } from './components/add-stadium/add-stadium.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';



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
    FooterComponent,
    ReviewRatingComponent,
    ReservationComponent,
    TimeFormatPipe,
    AddStadiumComponent,
    FileUploadComponent,
    MyReservationsComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ stadiums: stadiumReducer }),
    EffectsModule.forRoot([StadiumEffects ]),
    // StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [provideHttpClient()], // add it here 
  bootstrap: [ AppComponent ]
})
export class AppModule { }
