"use strict";

import { Component, ViewChild, ElementRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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
  user: void;
  error: void;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get("https://dog.ceo/api/breeds/image/random")
      .subscribe(data => (this.users = data));
    //    error => {this.error = error.message; console.log(error);}
  }

  @ViewChild("elementP")
  elementParagraph: ElementRef;

  singup(login, password) {
    console.log("login=", this.login, "password=", this.password);
    console.log(this);
    console.log(this.elementParagraph.nativeElement.textContent);
  }

  load() {
    let name = "Sergey";
    let age = 23;

    let user = {
      name,
      age,
      giveName() {
        return this.name;
      }
    };
    console.log(user);
    console.log(user.hasOwnProperty("age"));
    let user2;
    console.log((user2 = JSON.stringify(user)));
    console.log(JSON.parse(user2));
    let fugure = "tall";
    let user3 = {
      [fugure]: "short"
    };
    console.log(user3);
    let user4;
    console.log((user4 = Object.assign(Object.create({}), user, user3)));
    console.log(user4.giveName());

    class User {
      constructor(name, lastname) {
        this.name = name;
        this.lastname = lastname;
      }
      static sayHi() {
        return this.name;
      }
      get fullname() {
        return `${this.name},  ${this.lastname}`;
      }
      set fullname(name) {
        this.name = name;
      }
    }

    let user7 = new User("Yura", "Borodach");

    console.log(User.sayHi());

    function add() {
      let n = 1;
      return function() {
        return n++;
      };
    }

    let next = add();
    let next1 = add();
    console.log(next == next1);

    console.dir(next());
    console.dir(next1());
    function sum(a) {
      return function(b) {
        return a + b;
      };
    }

    console.log(sum(1)(2));

    let map = new Map([
      ["user1", "Yura"],
      ["user2", "Sergei"],
      ["user3", "Lelik"]
    ]);
    map.set(1, 2);
    map.set(true, "sing");
    console.log(map.get(1));
    console.log(map.keys());
    for (let el of map.values()) {
      console.log();
    }
  }
}
