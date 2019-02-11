import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { AccueilComponent } from './accueil.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgSelectModule } from '@ng-select/ng-select';
import { AccueilRoutingModule } from './accueil-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { CountriesMapModule } from 'countries-map';
import {AgmCoreModule} from '@agm/core';




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
  AccueilRoutingModule,
  NgMultiSelectDropDownModule.forRoot(),
  AgmCoreModule.forRoot({apiKey: 'AIzaSyCE0nvTeHBsiQIrbpMVTe489_O5mwyqofk'}),
  FormsModule,
  NgSelectModule,
  NgxMapboxGLModule.withConfig({
    accessToken: 'pk.eyJ1IjoicGFwYW91c21hbmUiLCJhIjoiY2pvMDN5MHlsMDYwdjNwcGJlYmJxajI5OCJ9.OmLCeU1G-rS8UB_YTRI59w',
    geocoderAccessToken: 'pk.eyJ1IjoicGFwYW91c21hbmUiLCJhIjoiY2pvMDN5MHlsMDYwdjNwcGJlYmJxajI5OCJ9.OmLCeU1G-rS8UB_YTRI59w'
  }),
  CountriesMapModule,
  HighchartsChartModule
  ],
  declarations: [
    AccueilComponent
  ]
})
export class AccueilModule { }
