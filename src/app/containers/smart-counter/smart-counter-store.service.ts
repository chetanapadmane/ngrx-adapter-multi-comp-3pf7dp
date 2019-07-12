import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';

import * as counter from '../../actions/counter.actions';

import { Counter } from '../../models/counter.model';

import * as fromCounter from '../../reducers/index';

@Injectable()
export class CounterStoreService {
  private counterEntityById$: Observable<Counter>;

  constructor(protected store$: Store<fromCounter.State>) {
  }

  getCounterEntityById(id: string): Observable<Counter> {
    if (this.counterEntityById$ === undefined) {
      this.counterEntityById$ = this.store$.pipe(select(fromCounter.getCounterEntityById(id)));
    }

    return this.counterEntityById$; 
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