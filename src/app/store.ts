import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import intervalCognition from 'features/intervalCognition';

export const store = configureStore({
  reducer: {
    intervalCognition,
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
