import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * BaseApiService - Generic service for all HTTP operations
 * This is the foundation that all other services extend
 * T represents the type of entity (Warehouse, Zone, Item, etc.)
 */
@Injectable({
  providedIn: 'root'
})
export class BaseApiService<T> {
  // Inject HttpClient using the new inject() function (standalone style)
  protected http = inject(HttpClient);
  
  // Base URL for all API calls
  protected baseUrl = environment.apiUrl;
  
  // The specific endpoint for this service (e.g., 'warehouses', 'zones')
  protected endpoint = '';

  /**
   * Get all entities
   * Example: GET /api/warehouses
   */
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${this.endpoint}`);
  }

  /**
   * Get a single entity by ID
   * Example: GET /api/warehouses/5
   */
  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${this.endpoint}/${id}`);
  }

  /**
   * Create a new entity
   * Example: POST /api/warehouses
   */
  create(entity: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${this.endpoint}`, entity);
  }

  /**
   * Update an existing entity
   * Example: PUT /api/warehouses/5
   */
  update(id: number, entity: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${this.endpoint}/${id}`, entity);
  }

  /**
   * Delete an entity
   * Example: DELETE /api/warehouses/5
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${this.endpoint}/${id}`);
  }
}
