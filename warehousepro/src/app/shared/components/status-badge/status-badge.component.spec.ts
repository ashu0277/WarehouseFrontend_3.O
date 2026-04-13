import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusBadgeComponent } from './status-badge.component';

describe('StatusBadgeComponent', () => {
  let component: StatusBadgeComponent;
  let fixture: ComponentFixture<StatusBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBadgeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StatusBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return bg-success for completed status', () => {
    component.status = 'Completed';
    expect(component.getBadgeClass()).toBe('bg-success');
  });

  it('should return bg-warning for pending status', () => {
    component.status = 'Pending';
    expect(component.getBadgeClass()).toContain('bg-warning');
  });

  it('should return bg-info for inprogress status', () => {
    component.status = 'InProgress';
    expect(component.getBadgeClass()).toContain('bg-info');
  });

  it('should return bg-danger for cancelled status', () => {
    component.status = 'Cancelled';
    expect(component.getBadgeClass()).toBe('bg-danger');
  });

  it('should return bg-secondary for unknown status', () => {
    component.status = 'Unknown';
    expect(component.getBadgeClass()).toBe('bg-secondary');
  });

  it('should handle case-insensitive status', () => {
    component.status = 'COMPLETED';
    expect(component.getBadgeClass()).toBe('bg-success');
  });
});
