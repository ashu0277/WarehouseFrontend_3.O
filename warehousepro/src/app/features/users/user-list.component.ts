import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Shared Components
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

// Services & Models
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, SidebarComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);

  // Data Lists
  users: User[] = [];
  filteredUsers: User[] = [];

  // UI State
  loading = false;
  error = '';
  success = '';
  searchTerm = '';
  showForm = false;
  editMode = false;
  editID = 0;

  // Form Fields
  fName = '';
  fRole = 0; // Keeping as number for the select dropdown
  fEmail = '';
  fPhone = '';
  fPassword = '';
  fConfirm = '';

  roles = [
    { value: 0, label: 'Operator' },
    { value: 1, label: 'Supervisor' },
    { value: 2, label: 'Planner' },
    { value: 3, label: 'Logistics' },
    { value: 4, label: 'Admin' }
  ];

  ngOnInit() {
    this.loadAll();
  }

  // --- Data Loading & Filtering ---

  loadAll() {
    this.loading = true;
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        this.filterUsers();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  filterUsers() {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(u => {
      return !this.searchTerm || 
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.role.toLowerCase().includes(term);
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.filteredUsers = this.users;
  }

  // --- Form Actions ---

  openAdd() {
    this.showForm = true;
    this.editMode = false;
    this.fName = ''; this.fRole = 0; this.fEmail = '';
    this.fPhone = ''; this.fPassword = ''; this.fConfirm = '';
    this.error = ''; this.success = '';
  }

  openEdit(u: User) {
    this.showForm = true;
    this.editMode = true;
    this.editID = u.userID;
    this.fName = u.name;
    this.fRole = this.roleToNumber(u.role);
    this.fEmail = u.email;
    this.fPhone = u.phone ?? '';
    this.error = ''; this.success = '';
  }

  cancel() {
    this.showForm = false;
  }

 save() {
  this.error = ''; 
  this.success = '';

  if (this.editMode) {
    // Matches UserUpdateDto
    const updatePayload = {
      name: this.fName, 
      role: Number(this.fRole), // Backend expects UserRole Enum (int)
      phone: this.fPhone || null, 
      isDeleted: false
    };

    this.userService.update(this.editID, updatePayload as any).subscribe({
      next: () => { 
        this.success = 'User updated!'; 
        this.showForm = false; 
        this.loadAll(); 
      },
      error: (err) => { 
        this.error = 'Update failed. Check console for validation errors.';
        console.error(err);
      }
    });
  } else {
    // Validation for creation
    if (this.fPassword !== this.fConfirm) { 
      this.error = 'Passwords do not match.'; 
      return; 
    }
    if (this.fPassword.length < 8) {
      this.error = 'Password must be at least 8 characters.';
      return;
    }

    // Matches UserCreateDto exactly
    const createPayload = {
      Name: this.fName,
      Role: Number(this.fRole), // Backend expects UserRole Enum (int)
      Email: this.fEmail,
      Phone: this.fPhone || null,
      Password: this.fPassword,
      ConfirmPassword: this.fConfirm
    };

    this.userService.create(createPayload as any).subscribe({
      next: () => { 
        this.success = 'User created!'; 
        this.showForm = false; 
        this.loadAll(); 
      },
      error: (err) => { 
        // This will now catch 400 errors and show you exactly what field failed
        this.error = 'Create failed. ' + (err.error?.title || 'Check validation.');
        console.error('Validation Error Details:', err.error);
      }
    });
  }
}

  delete(id: number) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.userService.delete(id).subscribe({
      next: () => { 
        this.success = 'User deleted!'; 
        this.loadAll(); 
      },
      error: () => { this.error = 'Delete failed.'; }
    });
  }

  // --- Helpers ---

  roleToNumber(role: string): number {
    const map: Record<string, number> = { Operator: 0, Supervisor: 1, Planner: 2, Logistics: 3, Admin: 4 };
    return map[role] ?? 0;
  }

  numberToRole(roleNumber: number): string {
    const map: Record<number, string> = { 0: 'Operator', 1: 'Supervisor', 2: 'Planner', 3: 'Logistics', 4: 'Admin' };
    return map[roleNumber] ?? 'Operator';
  }

  getRoleBadge(role: string): string {
    const map: Record<string, string> = { 
      Admin: 'bg-danger', 
      Supervisor: 'bg-warning text-dark',
      Planner: 'bg-info text-dark', 
      Logistics: 'bg-primary', 
      Operator: 'bg-success' 
    };
    return map[role] || 'bg-secondary';
  }
}