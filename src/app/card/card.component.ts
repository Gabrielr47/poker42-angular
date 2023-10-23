import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() card: string;
  @Input() hidden: boolean = false;

  get getColor() {
    const suit = this.card.slice(-1);
    return suit === '♣' || suit === '♠' ? 'black' : 'red';
  }
}
