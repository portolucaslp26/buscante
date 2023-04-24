import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Item, LivrosResultado } from '../models/livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes'

  constructor(
    private http: HttpClient
  ) { }

  buscar(value: string): Observable<Item[]>{
    const params = new HttpParams().append('q', value)
    return this.http.get<LivrosResultado>(`${this.API}`, { params }).pipe(
      map(retorno => retorno.items ?? []),
    )
  }
}
