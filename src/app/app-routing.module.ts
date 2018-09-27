import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './ui/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'projets',
    loadChildren: './modules/projet/projet.module#ProjetModule'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
