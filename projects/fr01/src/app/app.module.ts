import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule  } from '@angular/material/toolbar';

import {ScoringModule} from 'scoring';
import {FleetRaceModule} from 'fleetrace';
import {FrLocalModule} from 'fr-local';
import {FrRemoteModule} from 'fr-remote';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,    
    HttpClientModule,
    LayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,    
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,        
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatBadgeModule,
    ScoringModule,
    FleetRaceModule,
    FrLocalModule,
    FrRemoteModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
