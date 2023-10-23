import { Injectable } from '@angular/core';



@Injectable()
export class DeckService {
  private readonly suits = ['♥', '♦', '♣', '♠'];
  private readonly ranks = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
    'A'
  ];
  shuffledCards: string[];

  constructor() {
    this.shuffle();
  }

  get cards() {
    return this.suits
      .map(s => this.ranks.map(r => r + s))
      .reduce((x, y) => x.concat(y), []);
  }

  get numberOfCards() {
    return this.cards.length;
  }

  get playerCards() {
    return [this.shuffledCards.pop(), this.shuffledCards.pop()];
  }

  get computerCards() {
    return [this.shuffledCards.pop(), this.shuffledCards.pop()];
  }

  getcommunityCards(move: string) {
    if (move === 'flop') {
      return [
        this.shuffledCards.pop(),
        this.shuffledCards.pop(),
        this.shuffledCards.pop()
      ];
    } else {
      return [this.shuffledCards.pop()];
    }
  }

  shuffle() {
    const newCards = this.cards;
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = newCards[newIndex];
      newCards[newIndex] = newCards[i];
      newCards[i] = oldValue;
    }
    this.shuffledCards = newCards;
  }
}
