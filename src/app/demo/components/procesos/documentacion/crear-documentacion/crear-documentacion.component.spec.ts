import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDocumentacionComponent } from './crear-documentacion.component';

describe('CrearDocumentacionComponent', () => {
  let component: CrearDocumentacionComponent;
  let fixture: ComponentFixture<CrearDocumentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearDocumentacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearDocumentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
