import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Card } from '../models/Card';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.css'
})
export class ListeComponent implements OnInit {

  cards: Card[] | undefined;
  constructor(private apiservice: ApiService) {}

  ngOnInit(): void {
    this.apiservice.getCardsObservable().subscribe(updatedItems => {
      this.cards = updatedItems;
    });
  }

  removeCard(index: number) {
    this.apiservice.removeCard(index);
  }

  editId: number | undefined;
  update = new FormGroup({
    nameUpdate : new FormControl('', Validators.required),
    codeUpdate : new FormControl('', [Validators.pattern("([0-9]{4}\.){3}([0-9]{4})"),Validators.required]),
    ccvUpdate : new FormControl(0, Validators.max(999)),
    dateUpdate : new FormControl('', Validators.required),
  })

  editCard(id: number) {
    this.editId = id;
  }

  saveEdit(id: number) {
    console.log()
    this.apiservice.updateCard(id, {
      id: id, 
      name : this.update.controls.nameUpdate.value ? this.update.controls.nameUpdate.value : undefined,
      code : this.update.controls.codeUpdate.value?.split('.'),
      ccv : this.update.controls.ccvUpdate.value ? this.update.controls.ccvUpdate.value : undefined,
      date : this.update.controls.dateUpdate.value?.split('/')
    });
    this.editId = undefined;
  }

  cancelEdit() {
    this.editId = undefined;
  }

  restrict_inputchar(event: any) {
    var k;  
    k = event.charCode;
    return k >= 46 && k <= 57;
  }

}
