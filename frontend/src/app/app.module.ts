import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSelectModule } from '@angular/material/select'

import { NavigationComponent } from './components/navigation/navigation.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminPlacesComponent } from './components/admin/places/places.component';

import { AdminNavigationComponent } from './components/admin/navigation/navigation.component';
import { AdminCommentsComponent } from './components/admin/comments/comments.component';
import { AdminUsersComponent } from './components/admin/users/users.component';
import { AdminFlightsComponent } from './components/admin/flights/flights.component';
import { AdminMainComponent } from './components/admin/admin-main/admin-main.component';
import { PlaceCreateComponent } from './components/admin/place-create/place-create.component';
import { FlightCreateComponent } from './components/admin/flight-create/flight-create.component';

import { AuthInterceptorService } from './services/auth/auth-interceptor.service';
import { TreeComponent } from './components/tree/tree.component';
import { SearchFlightComponent } from './components/search-flight/search-flight.component';
import { PlaceCommentsComponent } from './components/place-comments/place-comments.component';
import { FlightCommentsComponent } from './components/flight-comments/flight-comments.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    AdminPlacesComponent,
    AdminNavigationComponent,
    AdminCommentsComponent,
    AdminUsersComponent,
    AdminFlightsComponent,
    PlaceCreateComponent,
    AdminMainComponent,
    FlightCreateComponent,
    TreeComponent,
    SearchFlightComponent,
    PlaceCommentsComponent,
    FlightCommentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
