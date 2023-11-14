import { RootState } from './store';

export const getActivities = (state: RootState) => state.activities.items;
