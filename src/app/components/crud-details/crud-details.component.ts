import { Component, Input, OnInit } from '@angular/core';
import { Crud } from '../../models/crud.model';
import { CrudService } from '../../services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crud-details',
  templateUrl: './crud-details.component.html',
  styleUrl: './crud-details.component.css'
})
export class CrudDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentCrud: Crud = {
    title: '',
    description: '',
    published: false
  };
  
  message = '';

  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getCrud(this.route.snapshot.params["id"]);
    }
  }

  getCrud(id: string): void {
    this.crudService.get(id)
      .subscribe({
        next: (data) => {
          this.currentCrud = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentCrud.title,
      description: this.currentCrud.description,
      published: status
    };

    this.message = '';

    this.crudService.update(this.currentCrud.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentCrud.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateCrud(): void {
    this.message = '';

    this.crudService.update(this.currentCrud.id, this.currentCrud)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Crud was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteCrud(): void {
    this.crudService.delete(this.currentCrud.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/cruds']);
        },
        error: (e) => console.error(e)
      });
  }

}
