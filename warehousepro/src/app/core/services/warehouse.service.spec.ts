import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WarehouseService } from './warehouse.service';
import { Warehouse } from '../models/warehouse.model';

describe('WarehouseService', () => {
  let service: WarehouseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WarehouseService]
    });

    service = TestBed.inject(WarehouseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all warehouses', () => {
    const mockWarehouses: Warehouse[] = [
      {
        id: 1,
        name: 'Main Warehouse',
        code: 'WH001',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        isActive: true
      }
    ];

    service.getAll().subscribe(warehouses => {
      expect(warehouses.length).toBe(1);
      expect(warehouses).toEqual(mockWarehouses);
    });

    const req = httpMock.expectOne('https://localhost:7000/api/warehouses');
    expect(req.request.method).toBe('GET');
    req.flush(mockWarehouses);
  });

  it('should fetch warehouse by id', () => {
    const mockWarehouse: Warehouse = {
      id: 1,
      name: 'Main Warehouse',
      code: 'WH001',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      isActive: true
    };

    service.getById(1).subscribe(warehouse => {
      expect(warehouse).toEqual(mockWarehouse);
    });

    const req = httpMock.expectOne('https://localhost:7000/api/warehouses/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockWarehouse);
  });

  it('should create a new warehouse', () => {
    const newWarehouse: Warehouse = {
      id: 0,
      name: 'New Warehouse',
      code: 'WH002',
      address: '456 Oak Ave',
      city: 'Boston',
      state: 'MA',
      zipCode: '02101',
      country: 'USA',
      isActive: true
    };

    service.create(newWarehouse).subscribe(warehouse => {
      expect(warehouse.id).toBe(2);
    });

    const req = httpMock.expectOne('https://localhost:7000/api/warehouses');
    expect(req.request.method).toBe('POST');
    req.flush({ ...newWarehouse, id: 2 });
  });

  it('should delete a warehouse', () => {
    service.delete(1).subscribe();

    const req = httpMock.expectOne('https://localhost:7000/api/warehouses/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
