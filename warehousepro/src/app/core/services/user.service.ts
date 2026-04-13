import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { User } from '../models/user.model';

/**
 * UserService - Handles user management API calls
 */
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiService<User> {
  protected override endpoint = 'user';
}
