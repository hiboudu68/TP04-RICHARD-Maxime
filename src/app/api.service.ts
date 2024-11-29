import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, pipe } from 'rxjs';
import { Card } from './models/Card';
import { environment } from '../environements/environement';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private cardsSubject = new BehaviorSubject<Card[]>([]); 
  private cards: Card[] = [];

  getCardsObservable(): Observable<Card[]> {
    return this.cardsSubject.asObservable();
  }

  getCards() : Card[] {
    return this.cards;
  }

  addCard(card: Card): void {
    if (card) {
      this.cards.push(card);
      this.cardsSubject.next([...this.cards]);
    }
  }

  removeCard(id: number): void {
    this.cards = this.cards.filter(el => el.id !== id);
    this.cardsSubject.next([...this.cards]);
  }

  updateCard(id: number, newCard: Card): void {
    if (newCard) {
      this.cards[this.cards.findIndex(el => el.id === id)] = newCard;
      this.cardsSubject.next([...this.cards]);
    }
  }


}