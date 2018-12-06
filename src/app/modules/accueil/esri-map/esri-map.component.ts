/*
  Copyright 2018 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { loadModules } from 'esri-loader';
import esri = __esri;

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent implements OnInit {
  @Output() mapLoaded = new EventEmitter<boolean>();
  @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  private _zoom = 4;
  private _center: Array<number> = [2.0000003, 15.9999997];
  private _basemap = 'streets';

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: Array<number>) {
    this._center = center;
  }

  get center(): Array<number> {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }

  template = {
    // autocasts as new PopupTemplate()
    title: 'Marriage in NY, Zip Code: {ZIP}',
    content: [
      {
        // It is also possible to set the fieldInfos outside of the content
        // directly in the popupTemplate. If no fieldInfos is specifically set
        // in the content, it defaults to whatever may be set within the popupTemplate.
        type: 'fields',
        fieldInfos: [
          {
            fieldName: 'MARRIEDRATE',
            label: 'Married %',
            visible: true
          },
          {
            fieldName: 'MARRIED_CY',
            label: 'People Married',
            visible: true,
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: 'NEVMARR_CY',
            label: 'People that Never Married',
            visible: true,
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: 'DIVORCD_CY',
            label: 'People Divorced',
            visible: true,
            format: {
              digitSeparator: true,
              places: 0
            }
          }
        ]
      }
    ]
  };

  constructor() {}

  async initializeMap() {
    try {
      const [EsriMap, EsriMapView, EsriFeatureLayer] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/layers/FeatureLayer'
      ]);

      // Set type of map
      const mapProperties: esri.MapProperties = {
        basemap: this._basemap
      };

      const map: esri.Map = new EsriMap(mapProperties);

      // Set type of map view
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: map,
        highlightOptions: {
          color: 'orange'
        }
      };

      const featureLayerProperties: esri.FeatureLayer = new EsriFeatureLayer({
        url:
          'https://services.arcgis.com/d3voDfTFbHOCRwVR/arcgis/rest/services/Esri_Afrique/FeatureServer/0',
        outFields: ['*'],
        popupTemplate: this.template
      });

      map.add(featureLayerProperties);

      const mapView: esri.MapView = new EsriMapView(mapViewProperties);

      // All resources in the MapView and the map have loaded.
      // Now execute additional processes
      mapView.when(() => {
        this.mapLoaded.emit(true);
      });
    } catch (error) {
      console.log('We have an error: ' + error);
    }
  }

  ngOnInit() {
    this.initializeMap();
  }
}
