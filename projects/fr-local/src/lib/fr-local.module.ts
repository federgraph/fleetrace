import { NgModule } from '@angular/core';

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

import {ScoringModule} from 'scoring';
import {FleetRaceModule} from 'fleetrace';

import { BibComponent } from './bib/bib.component';
import { EntriesComponent } from './entries/entries.component';
import { RaceComponent } from './race/race.component';
import { EventComponent } from './event/event.component';

import { FormEntryRowComponent } from './form-entry-row/form-entry-row.component';

import { FormEventParamsComponent } from './form-event-params/form-event-params.component';
import { FormEventParamsQuickComponent } from './form-event-params-quick/form-event-params-quick.component';

import { FormEventPropsComponent } from './form-event-props/form-event-props.component';
import { FormEventPropsQuickComponent } from './form-event-props-quick/form-event-props-quick.component';

import { IconBarLegendComponent } from './icon-bar-legend/icon-bar-legend.component';
import { IconLegendComponent } from './icon-legend/icon-legend.component';

import { JsonInfoComponent } from './json-info/json-info.component';
import { ResultHashComponent } from './result-hash/result-hash.component';

import { TimingButtonsComponent } from './timing-buttons/timing-buttons.component';
import { TimingWidgetComponent } from './timing-widget/timing-widget.component';

@NgModule({
  declarations: [
    BibComponent,
    EntriesComponent,
    RaceComponent,
    EventComponent,
    FormEntryRowComponent,
    FormEventParamsComponent,
    FormEventParamsQuickComponent,
    FormEventPropsComponent,
    FormEventPropsQuickComponent,
    IconBarLegendComponent,
    IconLegendComponent,
    JsonInfoComponent,
    ResultHashComponent,
    TimingButtonsComponent,
    TimingWidgetComponent,
  ],
  imports: [
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
  ],
  exports: [
    BibComponent,
    EntriesComponent,
    RaceComponent,
    EventComponent,
    FormEntryRowComponent,
    FormEventParamsComponent,
    FormEventParamsQuickComponent,
    FormEventPropsComponent,
    FormEventPropsQuickComponent,
    IconBarLegendComponent,
    IconLegendComponent,
    JsonInfoComponent,
    ResultHashComponent,
    TimingButtonsComponent,
    TimingWidgetComponent,
  ]
})
export class FrLocalModule { }
