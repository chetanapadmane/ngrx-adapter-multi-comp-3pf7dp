import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Counter } from '../models/counter.model';

export enum CounterActionTypes {
  ADD_COUNTER = '[Counter] Add counter',
  UPDATE_COUNTER = '[Counter] Update counter',
  CLEAR_COUNTER = '[Counter] Clear counter',
}

export class AddCounter implements Action {
  readonly type = CounterActionTypes.ADD_COUNTER;

  constructor(public payload: { counter: Counter }) {
  }
}

export class UpdateCounter implements Action {
  readonly type = CounterActionTypes.UPDATE_COUNTER;

  constructor(public payload: { counter: Update<Counter> }) {
  }
}

export class ClearCounter implements Action {
  readonly type = CounterActionTypes.CLEAR_COUNTER;

  constructor(public payload: { id: string }) {
  }
}

export type CounterActions =
    AddCounter |
    UpdateCounter |
    ClearCounter;