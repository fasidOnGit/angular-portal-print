import { Component } from "@angular/core";
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
  options: FormGroup;
  heros: IHero[];

  constructor(fb: FormBuilder) {
    this.heros = this.getFakeData(10);
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
    window.print();
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
