import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Crud } from '../models/crud.model';

const baseUrl = 'http://localhost:8080/api/crud';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Crud[]> {
    return this.http.get<Crud[]>(baseUrl);
  }

  get(id: any): Observable<Crud> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Crud[]> {
    return this.http.get<Crud[]>(`${baseUrl}?title=${title}`);
  }
}
