import { Component, ngModel } from "@angular/core";

@Component({
  selector: "child",
  template: `
    <h1>HI! {{ name }}</h1>
    <ng-content> </ng-content>
    <input type="text" [(ngModel)]="word" />
    <p>{{ word }}</p>
  `
})
export class ChildComponent {
  name: string = "Yura";
  word: string;
}
