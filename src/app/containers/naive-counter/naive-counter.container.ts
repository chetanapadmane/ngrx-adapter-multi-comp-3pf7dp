import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy } from '@angular/core';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Counter } from '../../models/counter.model';

import { CounterStoreService } from './naive-counter-store.service';

@Component({
  selector: 'ct-naive-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CounterStoreService,
  ],
  template: `
    <div>
      <cp-counter
        [counter]="counter$ | async"
        (decrease)="decrease()"
        (increase)="increase()">
      </cp-counter>
    </div>
  `,
})
export class NaiveCounterContainer implements OnInit, OnDestroy {
  @Input() readonly counterId: string;

  counter$: Observable<Counter | undefined>;
  counter: Counter | undefined;

  constructor(protected counterStore: CounterStoreService) {
    this.counter$ = this.counterStore.getCounterEntities()
      .pipe(
        map((entities: { [id: string]: Counter }) => {
          return this.counter = entities[this.counterId];
        }),
    );
  }

  ngOnInit(): void {
    const newCounter: Counter = {
      id: this.counterId,
      value: 0,
    };
    this.counterStore.addCounter(newCounter);
  }

  ngOnDestroy(): void {
    this.counterStore.clearCounter(this.counterId);
  }

  decrease(): void {
    const updatedCounter: Update<Counter> = {
      id: this.counterId,
      changes: {
        value: this.counter.value - 1,
      }
    };
    this.counterStore.updateCounter(updatedCounter);
  }

  increase(): void {
    const updatedCounter: Update<Counter> = {
      id: this.counterId,
      changes: {
        value: this.counter.value + 1,
      }
    };
    this.counterStore.updateCounter(updatedCounter);
  }
}
