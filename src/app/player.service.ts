import { Injectable } from '@angular/core';

@Injectable()
export class PlayerService {
  ranks: string[];
  suits: string[];

  handName: string;
  handScore: number;

  combinedCards: string[];

  constructor() {}

  private findDuplicates(combinedCards: string[]) {
    return combinedCards.filter(
      (item, index) => combinedCards.indexOf(item) !== index
    );
  }

  getHandRank(playerCards: string[], communityCards: string[]) {
    this.combinedCards = [...playerCards, ...communityCards];

    this.ranks = this.combinedCards.map((c) => c.slice(0, -1));
    this.suits = this.combinedCards.map((c) => c.slice(-1));

    this.handName = 'Higher Cards';
    this.handScore = 1;

    if (this.isOnePair) {
      this.handName = 'One Pair';
      this.handScore = 2;
    }

    if (this.isTwoPairs) {
      this.handName = 'Two Pairs';
      this.handScore = 3;
    }

    if (this.isThreeOfKind) {
      this.handName = 'Three Of Kind';
      this.handScore = 4;
    }

    if (this.isFlush) {
      this.handName = 'Flush';
      this.handScore = 5;
    }

    if (this.isFullHouse) {
      this.handName = 'Full House';
      this.handScore = 6;
    }

    if (this.isFourOfKind) {
      this.handName = 'Four Of Kind';
      this.handScore = 7;
    }

    return { name: this.handName, score: this.handScore };
  }

  private get isFourOfKind() {
    const twoPairs = this.findDuplicates(this.ranks);
    const threeOfKind = this.findDuplicates(twoPairs);
    const isFourOfKind = this.findDuplicates(threeOfKind);
    return isFourOfKind.length === 1;
  }

  private get isFullHouse() {
    const twoPairs = this.findDuplicates(this.ranks);
    const threeOfKind = this.findDuplicates(twoPairs);
    return twoPairs.length === 3 && threeOfKind.length === 1;
  }

  private get isFlush() {
    const hearts = this.suits.filter((value) => {
      return value === '♥';
    }).length;

    const diamonts = this.suits.filter((value) => {
      return value === '♦';
    }).length;

    const clubs = this.suits.filter((value) => {
      return value === '♣';
    }).length;

    const spades = this.suits.filter((value) => {
      return value === '♠';
    }).length;
    return hearts === 5 || diamonts === 5 || clubs === 5 || spades === 5;
  }

  private get isThreeOfKind() {
    const twoPairs = this.findDuplicates(this.ranks);
    const threeOfKind = this.findDuplicates(twoPairs);
    return threeOfKind.length === 1;
  }

  private get isTwoPairs() {
    const twoPairs = this.findDuplicates(this.ranks);
    return twoPairs.length === 2;
  }

  private get isOnePair() {
    const onePair = this.findDuplicates(this.ranks);
    return onePair.length === 1;
  }
}
