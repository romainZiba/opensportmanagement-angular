import { LayoutState } from './layout.state';
import { TeamsState } from './teams.state';

export const CoreState = [LayoutState, TeamsState];

export * from './layout.actions';
export * from './layout.state';
export * from './teams.actions';
export * from './teams.state';
