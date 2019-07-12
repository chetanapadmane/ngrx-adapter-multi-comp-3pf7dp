import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy } from '@angular/core';
import { Update } from '@ngrx/entity';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Counter } from '../../models/counter.model';

import { CounterStoreService } from './smart-counter-store.service';

@Component({
  selector: 'ct-smart-counter',
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
export class SmartCounterContainer implements OnInit, OnDestroy {
  @Input() readonly counterId: string;

  counter$: Observable<Counter | undefined>;
  counter: Counter | undefined;

  constructor(protected counterStore: CounterStoreService) {
  }

  observablesSetup(): void {
    this.counter$ = this.counterStore.getCounterEntityById(this.counterId)
      .pipe(
        map((counter: Counter) => {
          return this.counter = counter;
        }),
    );
  }

  ngOnInit(): void {
    this.observablesSetup();
    
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
