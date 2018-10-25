import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil.component';
import { DefaultComponent } from './default/default.component';

const accueilRoutes: Routes = [
  {
    path: '',
    component: AccueilComponent,
    children: [
      {
        path: '',
        component: DefaultComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(accueilRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AccueilRoutingModule { }
