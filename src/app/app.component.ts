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

  printMainContent() {
    const printAnchor = this.document.querySelector(
      "#print-anchor"
    ) as HTMLDivElement;
    const iframe = this._createIframe(printAnchor);
    this.portalHost = new DomPortalOutlet(
      iframe.contentDocument.body,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );

    this.portal = new TemplatePortal(this.listHerosRef, this.viewContainerRef, {
      heros: this.heros
    });

    // Attach portal to host
    this.portalHost.attach(this.portal);
    iframe.contentWindow.onafterprint = () => {
      iframe.remove();
    };

    setTimeout(() => {
      iframe.contentWindow.print();
    });
  }

  _createIframe(printAnchor: HTMLDivElement): HTMLIFrameElement {
    const iframe = this.document.createElement("iframe");
    console.log(printAnchor);
    printAnchor.appendChild(iframe);
    return iframe;
  }

  private getFakeData(length: number): IHero[] {
    return Array.from({ length }).map(
      (_, idx) =>
        ({
          name: faker.name.firstName(),
          breed: faker.name.lastName(),
          description: faker.lorem.paragraph(),
          avatar: faker.image.imageUrl() + `?idx=${idx}`,
          color: tinycolor.random().toHexString(),
          power: Math.random() * 10
        } as IHero)
    );
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h =>
    h.test(window.location.host)
  );
}
