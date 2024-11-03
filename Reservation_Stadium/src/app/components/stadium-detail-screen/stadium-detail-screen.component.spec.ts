import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadiumDetailScreenComponent } from './stadium-detail-screen.component';

describe('StadiumDetailScreenComponent', () => {
  let component: StadiumDetailScreenComponent;
  let fixture: ComponentFixture<StadiumDetailScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StadiumDetailScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StadiumDetailScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
