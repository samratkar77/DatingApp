import { Routes } from '@angular/router';
import { HomeComponent } from '../features/home/home.component';
import { MemberListComponent } from '../features/members/member-list/member-list.component';
import { MemberDetailedComponent } from '../features/members/member-detailed/member-detailed.component';
import { ListsComponent } from '../features/lists/lists.component';
import { MessagesComponent } from '../features/messages/messages.component';
import { authGuard } from '../core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'members', component: MemberListComponent, canActivate: [authGuard] },
  { path: 'members/:id', component: ListsComponent },
  { path: 'lists', component: MemberDetailedComponent },
  { path: 'messages', component: MessagesComponent },
  { path: '**', component: HomeComponent },
];
