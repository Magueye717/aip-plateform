import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjetComponent } from './projet.component';
import { DetailsProjetComponent } from './details-projet/details-projet.component';
import { ListeProjetComponent } from './liste-projet/liste-projet.component';

const projetRoutes: Routes = [
  {
    path: '',
    component: ProjetComponent,
    children: [
      {
        path: '',
        component: ListeProjetComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(projetRoutes)],
  exports: [RouterModule]
})
export class ProjetRoutingModule { }
