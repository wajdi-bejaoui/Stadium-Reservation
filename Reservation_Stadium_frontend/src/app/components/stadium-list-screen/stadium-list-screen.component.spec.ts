import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadiumListScreenComponent } from './stadium-list-screen.component';

describe('StadiumListScreenComponent', () => {
  let component: StadiumListScreenComponent;
  let fixture: ComponentFixture<StadiumListScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StadiumListScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StadiumListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
