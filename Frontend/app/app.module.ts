import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ProfileComponent, HomeComponent } from './components/index';
import { routing, appRoutingProviders} from './app.routes';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [ appRoutingProviders ]
})
export class AppModule { }
