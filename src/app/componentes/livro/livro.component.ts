import { Component, Input } from '@angular/core';
import { Livro } from 'src/app/models/livro';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent {

  @Input() livro: Livro;
  modalAberto: boolean;

  onModelChange(evento: boolean) {
    this.modalAberto = evento;
  }
}
