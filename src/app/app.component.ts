import {
  DomPortalOutlet,
  PortalOutlet,
  TemplatePortal
} from "@angular/cdk/portal";
import { DOCUMENT } from "@angular/common";
import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  Inject,
  Injector,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import * as faker from "faker";
import tinycolor from "tinycolor2";
import { heros } from "./heros";

interface IHero {
  name: string;
  color: string;
  breed: string;
  description: string;
  avatar: string;
  power: number;
}
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @ViewChild("listHeros") listHerosRef;
  options: FormGroup;
  heros: IHero[];

  private portalHost: PortalOutlet;
  private portal;

  constructor(
    fb: FormBuilder,
    @Inject(DOCUMENT) private document: Document,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private viewContainerRef: ViewContainerRef
  ) {
    this.heros = this.getFakeData(5);
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }

  printPage() {
    window.print();
  }

  private getFakeData(length: number): IHero[] {
    length = length > 15 ? 15 : length;
    return Array.from({ length }).map(
      (_, idx) =>
        ({
          name: heros[idx].name,
          breed: heros[idx].work.base,
          description: faker.lorem.paragraph(),
          avatar: heros[idx].image.url,
          color: tinycolor.random().toHexString(),
          power: Math.random() * 10
        } as IHero)
    );
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h =>
    h.test(window.location.host)
  );
}
