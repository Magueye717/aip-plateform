import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjetComponent } from './projet.component';
import { DetailsProjetComponent } from './details-projet/details-projet.component';
import { ListeProjetComponent } from './liste-projet/liste-projet.component';
import { CreateProjetComponent } from './create-projet/create-projet.component';

const projetRoutes: Routes = [
  {
    path: '',
    component: ProjetComponent,
    children: [
      {
        path: '',
        component: ListeProjetComponent
      },
      {
        path: ':id',
        component: DetailsProjetComponent
      },
      {
        path: 'add',
        component: CreateProjetComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(projetRoutes)],
  exports: [RouterModule]
})
export class ProjetRoutingModule { }
