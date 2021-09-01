import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper/'
import {TextFieldModule} from '@angular/cdk/text-field';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthService } from 'services/auth.service';
import 'rxjs/operator/shareReplay'
import { AuthComponent } from './components/auth/auth.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule, 
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatStepperModule,
    MatCardModule,
    TextFieldModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AuthComponent,
    AdminLayoutComponent,

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
