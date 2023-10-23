import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';
import { TableComponent } from './table/table.component';

import { DeckService } from './deck.service';
import { PlayerService } from './player.service';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, HomeComponent, CardComponent, TableComponent],
  bootstrap: [AppComponent],
  providers: [DeckService, PlayerService]
})
export class AppModule {}
