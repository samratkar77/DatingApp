import { Routes } from '@angular/router';
import { HomeComponent } from '../features/home/home';
import { MemberListComponent } from '../features/members/member-list/member-list';
import { MemberDetailedComponent } from '../features/members/member-detailed/member-detailed';
import { ListsComponent } from '../features/lists/lists';
import { MessagesComponent } from '../features/messages/messages';
import { authGuard } from '../core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'members', component: MemberListComponent },
      { path: 'members/:id', component: ListsComponent },
      { path: 'lists', component: MemberDetailedComponent },
      { path: 'messages', component: MessagesComponent },
    ],
  },

  { path: '**', component: HomeComponent },
];
