import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Card } from '../models/Card';

@Component({
  selector: 'app-form-card',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './form-card.component.html',
  styleUrl: './form-card.component.css'
})
export class FormCardComponent {
  formulaire = new FormGroup({
    name : new FormControl('', Validators.required),
    code : new FormControl('', [Validators.pattern("([0-9]{4}\.){3}([0-9]{4})"),Validators.required]),
    ccv: new FormControl(0, Validators.max(999)),
    date: new FormControl('', Validators.required),
  })

  errorTxt: String = ""
  constructor(private apiService : ApiService) {}

  valid() {
    if (this.formulaire.controls.name.errors) {
      this.errorTxt = "Nom requis";
      return
    }
    if (this.formulaire.controls.code.errors) {
      if (this.formulaire.controls.code.errors['required']) {
        this.errorTxt = "Code requis";
      }
      else {
        this.errorTxt = "Ne respect pas la forme du code (0000.0000.0000.0000)";
      }
      return
    }
    if (this.formulaire.controls.ccv.errors) {
      this.errorTxt = "Le CCV doit être inférieur à " + this.formulaire.controls.ccv.errors['max'].max;
      return
    }
    if (this.formulaire.controls.date.errors) {
      this.errorTxt = "Date requise";
      return
    }

    this.errorTxt = "";
    let temp = this.apiService.getCards();
    
    this.apiService.addCard({
      id: temp && temp.length ? temp[temp.length - 1].id + 1 : 0, 
      name : this.formulaire.controls.name.value ? this.formulaire.controls.name.value : undefined,
      code : this.formulaire.controls.code.value?.split('.'),
      ccv : this.formulaire.controls.ccv.value ? this.formulaire.controls.ccv.value : undefined,
      date : this.formulaire.controls.date.value?.split('/')
    })
  }

  restrict_inputchar(event: any) {
    var k;  
    k = event.charCode;
    return k >= 46 && k <= 57; 
  }

}
