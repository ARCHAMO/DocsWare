import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPaginaComponent } from './crear-pagina.component';

describe('CrearPaginaComponent', () => {
  let component: CrearPaginaComponent;
  let fixture: ComponentFixture<CrearPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPaginaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
