import { TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { UserService } from '../../core/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('UserFormComponent - Final v3', () => {
  let mockUserService: any;
  let mockDialogRef: any;
  let mockSnackBar: any;

  beforeEach(() => {
    mockUserService = {
      addUser: vi.fn(),
      updateUser: vi.fn(),
    };
    mockDialogRef = { close: vi.fn() };
    mockSnackBar = { open: vi.fn() };
  });

  it('deve forçar a execução do save de ADICIONAR', async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: MAT_DIALOG_DATA, useValue: null },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(UserFormComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    vi.spyOn(component.userForm, 'valid', 'get').mockReturnValue(true);

    component.userForm.patchValue({ nome: 'Isaac', email: 'i@i.com' });

    component.save();

    expect(mockUserService.addUser).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('deve forçar a execução do save de EDITAR', async () => {
    const dataFake = { id: 1, nome: 'Giana' };

    await TestBed.configureTestingModule({
      imports: [UserFormComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: MAT_DIALOG_DATA, useValue: dataFake },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(UserFormComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    vi.spyOn(component.userForm, 'valid', 'get').mockReturnValue(true);

    component.save();

    expect(mockUserService.updateUser).toHaveBeenCalled();
  });
});