import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, catchError, debounceTime, filter, map, switchMap, throwError } from 'rxjs';
import { Item, Livro } from 'src/app/models/livro';
import { LivroVolumeInfo } from 'src/app/models/livro-volume-info';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  campoBusca= new FormControl();
  errorMessage = ''

  constructor(
    private service: LivroService
  ) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(1000),
    filter(valorDigitado => valorDigitado.length >= 3),
    switchMap(valorDigitado => this.service.buscar(valorDigitado)),
    map(items => this.livrosResultadoParaLivros(items)),
    catchError(() => {
      return throwError(() => new Error(
        this.errorMessage = 'Ops, ocorreu um erro, Recarregue a aplicação!'
      ))
    })
  )

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => new LivroVolumeInfo(item));
  }
}



