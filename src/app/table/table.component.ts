import { Component, OnInit } from '@angular/core';
import { DeckService } from '../deck.service';
import { PlayerService } from '../player.service';

interface Hand {
  name: string;
  score: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css', './table-desktop.component.css'],
})
export class TableComponent implements OnInit {
  playerCards: string[] = [];
  communityCards: string[] = [];
  computerCards: string[] = [];
  hideComputerCards = true;
  playerWon = false;
  chips = null;

  playerHand: Hand;
  computerHand: Hand;

  constructor(
    private deckService: DeckService,
    private playerService: PlayerService
  ) {}

  ngOnInit() {}

  get isCheckedEnabled() {
    return this.communityCards.length <= 4 && this.playerCards.length > 0;
  }

  showPlayerCards() {
    this.playerCards = this.deckService.playerCards;
    this.getHandRank();
  }

  showComputerCards() {
    this.computerCards = this.deckService.computerCards;
  }

  showcommunityCards() {
    switch (this.communityCards.length) {
      case 0:
        this.communityCards.push(...this.deckService.getcommunityCards('flop'));
        break;
      case 3:
        this.communityCards.push(...this.deckService.getcommunityCards('turn'));
        break;
      case 4:
        this.communityCards.push(
          ...this.deckService.getcommunityCards('river')
        );
        this.hideComputerCards = false;
        break;
      default:
        return;
    }
  }

  restartGame() {
    this.playerCards = [];
    this.communityCards = [];
    this.computerCards = [];
    this.playerHand = null;
    this.computerHand = null;
    this.chips = null;
    this.hideComputerCards = true;
    this.deckService.shuffle();
  }

  startGame() {
    this.restartGame();
    this.showComputerCards();
    this.showPlayerCards();
  }

  getHandRank() {
    this.playerHand = this.playerService.getHandRank(
      this.playerCards,
      this.communityCards
    );

    this.computerHand = this.playerService.getHandRank(
      this.computerCards,
      this.communityCards
    );

    if (this.playerHand.score > this.computerHand.score) {
      this.playerWon = true;
    } else if (this.playerHand.score < this.computerHand.score) {
      this.playerWon = false;
    }
  }

  check() {
    this.showcommunityCards();
    this.getHandRank();
  }

  bet() {
    this.showcommunityCards();
    this.getHandRank();
    this.chips += 100;
  }

  fold() {
    this.restartGame();
  }
}
