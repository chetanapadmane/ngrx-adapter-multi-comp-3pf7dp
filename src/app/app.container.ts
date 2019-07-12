import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `    
    <div class="app-container">
      <h3 class="naive">{{ naiveDesc }}</h3>
    
      <ng-container *ngFor="let id of naiveCounterComponentIds">
        <ct-naive-counter [counterId]="id"></ct-naive-counter>
      </ng-container>
    </div>
  `,
  styles: [
    `
    .naive {
      color: red;
    }
    .smart {
      color: green;
    }
    .app-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  `,
  ],
})
export class AppComponent {
  naiveCounterComponentIds: string[];
  smartCounterComponentIds: string[];

  constructor() {
    this.naiveCounterComponentIds = [`${this.createUUID()}`, `id-${this.createUUID()}`];
    this.smartCounterComponentIds = [`${this.createUUID()}`, `id-${this.createUUID()}`];
  }

  get naiveDesc(): string {
    return `Naive: when you click +/- btns, all counters-comp are refreshed (values don't change)`;
  }

  get smartDesc(): string {
    return `Smart: when you click +/- btns, only one counter-comp is refreshed`;
  }

  createUUID(): string {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
}
