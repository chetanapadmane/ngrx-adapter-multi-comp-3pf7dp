import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { TOKEN, reducerProvider, metaReducers } from './reducers/index';

import { AppComponent } from './app.container';
import { CounterComponent } from './components/counter.component';
import { NaiveCounterContainer } from './containers/naive-counter/naive-counter.container';
import { SmartCounterContainer } from './containers/smart-counter/smart-counter.container';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot(TOKEN, { metaReducers }),
    StoreDevtoolsModule.instrument({ name: 'NgRx-App DevTools' }),
  ],
  declarations: [
    AppComponent,
    CounterComponent,
    NaiveCounterContainer,
    SmartCounterContainer,
  ],
  providers: [
    reducerProvider,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
