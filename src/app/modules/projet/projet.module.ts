import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

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
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
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
    LeafletModule
  ],
  declarations: [
    DetailsProjetComponent,
    ListeProjetComponent,
    ProjetComponent,
    CreateProjetComponent,
  ],
})
export class ProjetModule { }
