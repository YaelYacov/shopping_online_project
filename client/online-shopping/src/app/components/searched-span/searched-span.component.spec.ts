import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedSpanComponent } from './searched-span.component';

describe('SearchedSpanComponent', () => {
  let component: SearchedSpanComponent;
  let fixture: ComponentFixture<SearchedSpanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchedSpanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchedSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
