import { ComponentFactoryResolver, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BaseModule } from "../common/base-module";
import { Dynamic1Component } from "./dynamic1/dynamic1.component";

@NgModule({
  imports: [CommonModule],
  declarations: [Dynamic1Component]
})
export class Child1Module extends BaseModule {
  dynamicComponents = [Dynamic1Component];

  constructor(componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }
}
