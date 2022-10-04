import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerNavComponent } from './volunteer-nav.component';

describe('AdminNavComponent', () => {
  let component: VolunteerNavComponent;
  let fixture: ComponentFixture<VolunteerNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
