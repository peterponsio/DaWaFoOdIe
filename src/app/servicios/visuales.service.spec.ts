import { TestBed } from '@angular/core/testing';

import { VisualesService } from './visuales.service';

describe('VisualesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisualesService = TestBed.get(VisualesService);
    expect(service).toBeTruthy();
  });
});
