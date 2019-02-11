import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';

import { ProjetRoutingModule } from './projet-routing.module';
import { DetailsProjetComponent } from './details-projet/details-projet.component';
import { ListeProjetComponent } from './liste-projet/liste-projet.component';
import { ProjetComponent } from './projet.component';
import { EffectsModule } from '@ngrx/effects';
import { ProjetsEffects } from './config/projets.effects';
import { CreateProjetComponent } from './create-projet/create-projet.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import {AgmCoreModule} from '@agm/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCE0nvTeHBsiQIrbpMVTe489_O5mwyqofk'}),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    ProjetRoutingModule,
    EffectsModule.forFeature([ProjetsEffects]),
    NgxSpinnerModule,
    NgMultiSelectDropDownModule.forRoot(),

  ],
  declarations: [
    DetailsProjetComponent,
    ListeProjetComponent,
    ProjetComponent,
    CreateProjetComponent,
  ],
})
export class ProjetModule { }
