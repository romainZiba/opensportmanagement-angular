import { inject, TestBed } from "@angular/core/testing";

import { OpponentService } from "./opponent.service";

describe("OpponentService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpponentService]
    });
  });

  it("should be created", inject(
    [OpponentService],
    (service: OpponentService) => {
      expect(service).toBeTruthy();
    }
  ));
});
