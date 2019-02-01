import { Component, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-root",
  // templateUrl: './app.component.html',
  template: `
    <div style="text-align:center">
      <article>
        <p>Singup</p>
        <p>Login:</p>
        <input type="text" [(ngModel)]="login" />
        <p>Password:</p>
        <input type="text" [(ngModel)]="password" />
        <button (click)="singup(login, password)">Singup</button>
      </article>
      <section>
        <p #elementP>load data</p>
        <button (click)="load()">load</button>
      </section>
      <h1>{{ title }}!</h1>
    </div>
  `,
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "my";
  login: string;
  password: string;

  @ViewChild("elementP")
  elementParagraph: ElementRef;

  singup(login, password) {
    console.log("login=", this.login, "password=", this.password);
    console.log(this);
    console.log(this.elementParagraph.nativeElement.textContent);
  }

  load() {}
}
