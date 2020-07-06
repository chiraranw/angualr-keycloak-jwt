import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Users.ListComponent } from './users.list.component';

describe('Users.ListComponent', () => {
  let component: Users.ListComponent;
  let fixture: ComponentFixture<Users.ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Users.ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Users.ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
