import { TestBed } from '@angular/core/testing';

import { AutenticacionesService } from './autenticaciones.service';

describe('AutenticacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutenticacionesService = TestBed.get(AutenticacionesService);
    expect(service).toBeTruthy();
  });
});
