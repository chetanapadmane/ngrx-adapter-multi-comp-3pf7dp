import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { CounterActionTypes, CounterActions } from '../actions/counter.actions';

import { Counter } from '../models/counter.model';

export interface State extends EntityState<Counter> {
}

export const adapter: EntityAdapter<Counter> = createEntityAdapter<Counter>({
  selectId: (counter: Counter) => counter.id,
});

export const initialState: State = adapter.getInitialState({
});

export function reducer(state = initialState, action: CounterActions): State {
  switch (action.type) {
    case CounterActionTypes.ADD_COUNTER: {
      return adapter.addOne(action.payload.counter, state);
    }
    case CounterActionTypes.UPDATE_COUNTER: {
      return adapter.updateOne(action.payload.counter, state);
    }
    case CounterActionTypes.CLEAR_COUNTER: {
      return adapter.removeOne(action.payload.id, state);
    }
    default: {
      return state;
    }
  }
}

export const {
  selectIds: getCounterIds,
  selectEntities: getCounterEntities,
  selectAll: getAllCounter,
  selectTotal: getTotalCounter,
} = adapter.getSelectors();

export const getEntityById = (id: string) => (state: State) => state.entities[id];
