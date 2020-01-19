import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesPageComponent } from './favoritesPage.component';

describe('FavoritesPageComponent', () => {
  let component: FavoritesPageComponent;
  let fixture: ComponentFixture<FavoritesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
