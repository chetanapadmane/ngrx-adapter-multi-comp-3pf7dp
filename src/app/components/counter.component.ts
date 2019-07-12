import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Counter } from '../models/counter.model';

@Component({
  selector: 'cp-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent {
  @Input() counter: Counter;
  @Output() decrease: EventEmitter<void>;
  @Output() increase: EventEmitter<void>;

  constructor() {
    this.decrease = new EventEmitter<void>();
    this.increase = new EventEmitter<void>();
  }

  get lastRefresh(): string {
    return Date.now().toString();
  }

  triggerDecrease(): void {
    this.decrease.emit();
  }

  triggerIncrease(): void {
    this.increase.emit();
  }
}
