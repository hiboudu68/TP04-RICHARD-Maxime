import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormCardComponent } from "./form-card/form-card.component";
import { ListeComponent } from "./liste/liste.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormCardComponent, ListeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TP04-RICHARD-Maxime';
}
