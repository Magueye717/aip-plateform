import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './accueil.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { DefaultComponent } from './default/default.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgSelectModule } from '@ng-select/ng-select';
import { AccueilRoutingModule } from './accueil-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { GoogleChartsModule } from 'angular-google-charts';
import { CountriesMapModule } from 'countries-map';
import { HighchartsChartModule } from 'highcharts-angular';



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
  FormsModule,
  NgSelectModule,
  LeafletModule,
  NgxMapboxGLModule.withConfig({
    accessToken: 'pk.eyJ1IjoicGFwYW91c21hbmUiLCJhIjoiY2pvMDN5MHlsMDYwdjNwcGJlYmJxajI5OCJ9.OmLCeU1G-rS8UB_YTRI59w',
    geocoderAccessToken: 'pk.eyJ1IjoicGFwYW91c21hbmUiLCJhIjoiY2pvMDN5MHlsMDYwdjNwcGJlYmJxajI5OCJ9.OmLCeU1G-rS8UB_YTRI59w'
  }),
  GoogleChartsModule.forRoot('AIzaSyCz9zg30tKjU9TVrClw38S_6x1z0Bu4XwA'),
  CountriesMapModule,
  HighchartsChartModule
  ],
  declarations: [
    AccueilComponent,
    DefaultComponent
  ]
})
export class AccueilModule { }
