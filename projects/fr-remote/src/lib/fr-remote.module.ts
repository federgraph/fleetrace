import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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

import {ScoringModule} from 'scoring';
import {FleetRaceModule} from 'fleetrace';
import {FrLocalModule} from 'fr-local';

import { ApiComponent } from './api/api.component';
import { LoadComponent } from './load/load.component';
import { SaveComponent } from './save/save.component';
import { ResultUploadComponent } from './result-upload/result-upload.component';

@NgModule({
  declarations: [
    ApiComponent,
    LoadComponent,
    SaveComponent,
    ResultUploadComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,    
    LayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,    
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,        
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatBadgeModule,
    ScoringModule,
    FleetRaceModule,
    FrLocalModule,
  ],
  exports: [
    ApiComponent,
    LoadComponent,
    SaveComponent,
    ResultUploadComponent,
  ]
})
export class FrRemoteModule {
}
