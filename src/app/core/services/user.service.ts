import { Injectable, signal } from '@angular/core';
import { User } from './user.model';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usuariosIniciais: User[] = [
    { 
      id: 1, 
      nome: 'Giana Sandrini', 
      email: 'giana@attornatus.com.br', 
      cpf: '123.456.789-00', 
      telefone: '11999999999' 
    }
  ];

  private usersState = signal<User[]>(this.usuariosIniciais);

  constructor() { }

  getUsers() {
    return of(this.usersState()).pipe(delay(800));
  }

  addUser(user: User) {
    this.usersState.update(lista => [...lista, { ...user, id: Date.now() }]);
  }

  updateUser(updatedUser: User) {
    this.usersState.update(lista => 
      lista.map(u => u.id === updatedUser.id ? updatedUser : u)
    );
  }
}