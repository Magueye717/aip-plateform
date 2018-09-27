import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { ProjetRoutingModule } from './projet-routing.module';
import { DetailsProjetComponent } from './details-projet/details-projet.component';
import { ListeProjetComponent } from './liste-projet/liste-projet.component';
import { ProjetComponent } from './projet.component';
import { FooterComponent } from './ui/footer/footer.component';
import { EnteteComponent } from './ui/entete/entete.component';
import { EffectsModule } from '@ngrx/effects';
import { ProjetsEffects } from './config/projets.effects';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    ProjetRoutingModule,
    EffectsModule.forFeature([ProjetsEffects])
  ],
  declarations: [
    DetailsProjetComponent,
    ListeProjetComponent,
    ProjetComponent,
    FooterComponent,
    EnteteComponent,
  ]
})
export class ProjetModule { }
