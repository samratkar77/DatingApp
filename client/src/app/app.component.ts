import { NgClass, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavComponent } from '../layout/nav/nav.component';
import { lastValueFrom } from 'rxjs';
import { AccountService } from '../core/services/account-service';
import { HomeComponent } from '../features/home/home.component';
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class App implements OnInit {
  private accountService = inject(AccountService);
  protected router = inject(Router);
  private http = inject(HttpClient);
  protected title = 'RahiApp';
  protected members = signal<User[]>([]);

  async ngOnInit() {
    this.members.set(await this.getmembers());
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  async getmembers() {
    try {
      return lastValueFrom(
        this.http.get<User[]>('https://localhost:5001/api/members')
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
