import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCrudComponent } from './components/add-crud/add-crud.component';
import { CrudDetailsComponent } from './components/crud-details/crud-details.component';
import { CrudListComponent } from './components/crud-list/crud-list.component';

const routes: Routes = [

  { path: '', redirectTo: 'cruds', pathMatch: 'full' },
  { path: 'crud', component: CrudListComponent },
  { path: 'crud/:id', component: CrudDetailsComponent },
  { path: 'add', component: AddCrudComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
