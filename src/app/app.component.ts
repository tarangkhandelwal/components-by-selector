import { Component, ComponentRef, VERSION, ViewChild, ViewContainerRef } from "@angular/core";
import { DynamicComponentService } from "./common/dynamic-component.service";

export interface DynamicContentInputs { [k: string]: any; };

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;

  @ViewChild("container", { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  showComponent = false;
  constructor(private componentService: DynamicComponentService) {}

  addDynamicComponent() {
    this.componentService
      .getComponentBySelector("app-dynamic1", () =>
        import("./child1/child1.module").then(m => m.Child1Module)
      )
      .then(componentRef => {
        this.container.insert(componentRef.hostView);
      });
  }

  getModuleLoader() {
    return () =>
    import("./child1/child1.module").then(m => m.Child1Module);
  }

  addComponentInputs(componentRef: ComponentRef<unknown>, inputs: DynamicContentInputs) {
    if (componentRef && componentRef.instance && inputs) {
      Object.keys(inputs).forEach(p => (componentRef.instance[p] = inputs[p]));
    }
  }
}
