import {
  ComponentFactory,
  Injectable,
  Injector,
  NgModuleFactory,
  Compiler,
  ComponentRef
} from "@angular/core";
import { BaseModule } from "./base-module";

@Injectable({
  providedIn: "root"
})
export class DynamicComponentServiceService {
  constructor(private injector: Injector) {}

  getComponentBySelector(
    componentSelector: string,
    moduleLoaderFunction: () => Promise<any>
  ): Promise<ComponentRef<unknown>> {
    return this.getModuleFactory(moduleLoaderFunction).then(moduleFactory => {
      const module = moduleFactory.create(this.injector);
      if (module.instance instanceof BaseModule) {
        const compFactory: ComponentFactory<
          any
        > = module.instance.getComponentFactory(componentSelector);
        return compFactory.create(module.injector, [], null, module);
      }
    });
  }

  async getModuleFactory(
    moduleLoaderFunction: () => Promise<NgModuleFactory<any>>
  ) {
    const ngModuleOrNgModuleFactory = await moduleLoaderFunction();
    let moduleFactory;
    if (ngModuleOrNgModuleFactory instanceof NgModuleFactory) {
      // AOT at runtime
      moduleFactory = ngModuleOrNgModuleFactory;
    } else {
      moduleFactory = await this.injector
        .get(Compiler)
        .compileModuleAsync(ngModuleOrNgModuleFactory);
    }
    return moduleFactory;
  }
}
