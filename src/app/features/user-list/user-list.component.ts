import { Component, OnInit, signal, computed, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/services/user.model';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);
  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);

  searchControl = new FormControl('');
  filterText = signal('');
  loading = signal(false);
  errorMessage = signal<string | null>(null);
  users = signal<User[]>([]);

  filteredUsers = computed(() => {
    const text = this.filterText().toLowerCase();
    if (!text) return this.users();
    return this.users().filter(u => u.nome.toLowerCase().includes(text));
  });

  ngOnInit() {
    this.load();

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(value => this.filterText.set(value || ''));
  }

  load() {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Ops! Ocorreu um erro ao carregar os usuários. Tente novamente.');
        this.loading.set(false);
      }
    });
  }

  openForm(user?: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '500px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.load();
    });
  }
}