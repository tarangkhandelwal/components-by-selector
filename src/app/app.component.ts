import { Component, VERSION, ViewChild, ViewContainerRef } from "@angular/core";
import { DynamicComponentServiceService } from "./common/dynamic-component-service.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;

  @ViewChild("container", { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  constructor(private componentService: DynamicComponentServiceService) {}

  addDynamicComponent() {
    const componentFactory = this.componentService
      .getComponentBySelector("app-dynamic1", () =>
        import("./child1/child1.module").then(m => m.Child1Module)
      )
      .then(componentRef => {
        this.container.insert(componentRef.hostView);
      });
  }
}
