import { Component, Input, signal } from '@angular/core';
import { RegisterComponent } from '../account/register/register';
import { User } from '../../types/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  protected registerMode = signal(false);
  showRegister(value: boolean) {
    this.registerMode.set(value);
  }
}
