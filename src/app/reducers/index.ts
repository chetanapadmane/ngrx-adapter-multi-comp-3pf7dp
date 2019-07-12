import { InjectionToken } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromCounter from './counter.reducer';

export interface State {
  counter: fromCounter.State;
}

// -----------------
// ------------ AOT
export const TOKEN = new InjectionToken<ActionReducerMap<State>>('AppReducers');

export function getReducers(): ActionReducerMap<State, any> {
  return {
    counter: fromCounter.reducer,
  };
}

export const reducerProvider = [
  { provide: TOKEN, useFactory: getReducers },
];

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = [logger, storeFreeze];

// -----------------
// --- counter selectors
export const getCounterState = createFeatureSelector<fromCounter.State>('counter');

export const getCounterIds = createSelector(getCounterState, fromCounter.getCounterIds);
export const getCounterEntities = createSelector(getCounterState, fromCounter.getCounterEntities);
export const getAllCounter = createSelector(getCounterState, fromCounter.getAllCounter);
export const getTotalCounter = createSelector(getCounterState, fromCounter.getTotalCounter);

export const getCounterEntityById = (id: string) => createSelector(getCounterState, fromCounter.getEntityById(id));
