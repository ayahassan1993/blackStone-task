import { Injectable } from '@angular/core';
import { User } from '../models/user.modal';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: User[] = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
  ];

  getUsers() {
    return this.users;
  }
}
