import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import intervalCognition from 'features/intervalCognition';
import chordCognition from 'features/chordCognition';

export const store = configureStore({
  reducer: {
    intervalCognition,
    chordCognition,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
