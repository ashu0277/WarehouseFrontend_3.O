import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm = '';

  ngOnInit() {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data;
      },
      error: (err) => console.error('Error loading users', err)
    });
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(u => {
      return !this.searchTerm || 
        u.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        u.role.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.filteredUsers = this.users;
  }
}
