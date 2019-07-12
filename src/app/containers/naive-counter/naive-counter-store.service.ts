import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import * as counter from '../../actions/counter.actions';

import { Counter } from '../../models/counter.model';

import * as fromCounter from '../../reducers/index';

@Injectable()
export class CounterStoreService {
  
  constructor(protected store$: Store<fromCounter.State>) {
  }

  getCounterEntities(): Observable<{ [id: string]: Counter }> {
    return this.store$.pipe(select(fromCounter.getCounterEntities));
  }

  addCounter(c: Counter): void {
    const payload = { counter: c };
    this.store$.dispatch(new counter.AddCounter(payload));
  }

  updateCounter(c: Update<Counter>): void {
    const payload = { counter: c };
    this.store$.dispatch(new counter.UpdateCounter(payload));
  }

  clearCounter(id: string): void {
    const payload = { id: id };
    this.store$.dispatch(new counter.ClearCounter(payload));
  }
}