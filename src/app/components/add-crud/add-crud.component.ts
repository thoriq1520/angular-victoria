import { Component, OnInit } from '@angular/core';
import { Crud } from '../../models/crud.model';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-add-crud',
  templateUrl: './add-crud.component.html',
  styleUrl: './add-crud.component.css'
})
export class AddCrudComponent implements OnInit {
  crud: Crud = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
  }

  saveCrud(): void {
    const data = {
      title: this.crud.title,
      description: this.crud.description
    };

    this.crudService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newCrud(): void {
    this.submitted = false;
    this.crud = {
      title: '',
      description: '',
      published: false
    };
  }
}
