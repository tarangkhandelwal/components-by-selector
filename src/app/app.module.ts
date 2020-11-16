import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { DynamicSelectorComponent } from './dynamic-selector/dynamic-selector.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, DynamicSelectorComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {}
