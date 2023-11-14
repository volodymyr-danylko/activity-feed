import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

type ActyvityType = 'message' | 'phone' | 'coffe' | 'beer' | 'meeting';

export type ActivitiesItem = {
  id: string;
  type: ActyvityType;
  date: Date;
  note: string;
};

interface ActivitieState {
  items: ActivitiesItem[];
}

const initialState: ActivitieState = {
  items: [],
};

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    addActivity: {
      reducer(state, action: PayloadAction<ActivitiesItem>) {
        state.items = [...state.items, action.payload];
      },
      prepare({ type, note }) {
        return {
          payload: { id: nanoid(), type, note, date: new Date() },
        };
      },
    },
    removeActivity(state, action) {
      state.items = state.items.filter((activity) => activity.id !== action.payload);
    },
  },
});

const persistConfig = {
  key: 'activities',
  storage,
};
export const activitiesReducer = persistReducer(persistConfig, activitiesSlice.reducer);

export const { addActivity, removeActivity } = activitiesSlice.actions;
