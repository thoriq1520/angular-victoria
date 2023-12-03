import { Component } from '@angular/core';
import { Crud } from '../../models/crud.model';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-crud-list',
  templateUrl: './crud-list.component.html',
  styleUrl: './crud-list.component.css'
})
export class CrudListComponent {
  cruds?: Crud[];
  currentCrud: Crud = {};
  currentIndex = -1;
  title = '';

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.retrieveCruds();
  }

  retrieveCruds(): void {
    this.crudService.getAll()
      .subscribe({
        next: (data) => {
          this.cruds = data;
          console.log("ini data" + data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveCruds();
    this.currentCrud = {};
    this.currentIndex = -1;
  }

  setActiveCrud(crud: Crud, index: number): void {
    this.currentCrud = crud;
    this.currentIndex = index;
  }

  removeAllCruds(): void {
    this.crudService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentCrud = {};
    this.currentIndex = -1;

    this.crudService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.cruds = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}
