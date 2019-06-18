import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

describe('GameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameService = TestBed.get(GameService);
    expect(service).toBeTruthy();
  });

  it('should find closest points', () => {
      const lat = '44.8200277';
      const lon = '20.4584467';

      const service: GameService = TestBed.get(GameService);
      console.log(service.getClosestPoints(lat, lon, 500, 3));
  });
});
