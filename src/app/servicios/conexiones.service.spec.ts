import { TestBed } from '@angular/core/testing';

import { ConexionesService } from './conexiones.service';

describe('ConexionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConexionesService = TestBed.get(ConexionesService);
    expect(service).toBeTruthy();
  });
});
