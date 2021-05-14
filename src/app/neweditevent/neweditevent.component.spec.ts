import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewediteventComponent } from './neweditevent.component';

describe('NewediteventComponent', () => {
  let component: NewediteventComponent;
  let fixture: ComponentFixture<NewediteventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewediteventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewediteventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
