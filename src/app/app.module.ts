import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GridViewComponent } from "./grid-view/grid-view.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";

@NgModule({
  declarations: [AppComponent, GridViewComponent, NavBarComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
