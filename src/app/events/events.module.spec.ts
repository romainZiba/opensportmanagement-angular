import { EventsModule } from './events.module';

describe('EventsModule', () => {
  let teamsModule: EventsModule;

  beforeEach(() => {
    teamsModule = new EventsModule();
  });

  it('should create an instance', () => {
    expect(teamsModule).toBeTruthy();
  });
});
