import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from '../../core/services/user.model';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './user-form.html', 
  styleUrl: './user-form.scss'
})
export class UserFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private snackBar = inject(MatSnackBar);
  
  public dialogRef = inject(MatDialogRef<UserFormComponent>);
  public data = inject<User>(MAT_DIALOG_DATA);

  userForm: FormGroup;
  isEdit: boolean;

  constructor() {

    this.isEdit = !!this.data;
    
    this.userForm = this.fb.group({
      id: [this.data?.id || null],
      nome: [this.data?.nome || '', [Validators.required]],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      cpf: [this.data?.cpf || '', [Validators.required]],
      telefone: [this.data?.telefone || '', [Validators.required]],
      tipoTelefone: ['CELULAR']
    });
  }

  ngOnInit(): void {}

  save() {
    if (this.userForm.valid) {
      if (this.isEdit) {
        this.userService.updateUser(this.userForm.value);
      } else {
        this.userService.addUser(this.userForm.value);
      }

    
      this.snackBar.open('Usuário salvo com sucesso!', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });

      this.dialogRef.close(true);
    }
  }

  close() {
    this.dialogRef.close();
  }
}