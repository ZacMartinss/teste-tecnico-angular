import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Injector, runInInjectionContext } from '@angular/core';

describe('UserFormComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FormBuilder, useClass: FormBuilder },
        { provide: UserService, useValue: { getUsers: () => ({ subscribe: () => {} }) } },
        { provide: MatSnackBar, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    });
  });

  it('deve existir o componente de formulário', () => {
    const injector = TestBed.inject(Injector);
    const component = runInInjectionContext(injector, () => new UserFormComponent());
    expect(component).toBeTruthy();
  });
});