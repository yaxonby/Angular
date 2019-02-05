"use strict";

import { Component, ViewChild, ElementRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { resolve } from "path";

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

    function add6() {
      let n = 1;
      return function() {
        return n++;
      };
    }

    let next = add6();
    let next1 = add6();
    console.log(next === next1);

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
      console.log(el);
    }
    map.forEach((elem, item, arr) => console.log(elem, "-", item));

    let set = new Set();
    set.add(1);
    set.add(1);
    set.add(2);
    set.add(2);
    console.log(set);

    let promise = new Promise((resolve, reject) =>
      setTimeout(() => resolve("ok1"), 1000)
    );

    let promise2 = new Promise((resolve, reject) =>
      setTimeout(() => reject("ok2"), 1000)
    );

    Promise.race([promise, promise2])
      .then(result => console.log(result))
      .catch(error => console.log(error))
      .finally(() => console.log("finally"));

    function* generator() {
      let result1 = yield "user1";
      console.log("result1=", result1);
      let result2 = yield "user2";
      console.log("result2=", result2);
      let result3 = yield "user3";
      console.log("result3=", result3);
    }

    let gen = generator();
    console.log(gen.next(1));
    console.log(gen.next(2));
    console.log(gen.next(3));
    console.log(gen.next(4));

    let p = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("good");
      }, 2000);
    });
    p.then(result => {
      console.log(result);
      return 7;
    }).then(arg => console.log(arg));
    p.catch(error => {
      console.log("error-", error);
      return 777;
    });

    let p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("good1");
      }, 1000);
    });
    p.then(result => {
      console.log(result);
      return 8;
    }).then(arg => console.log(arg));
    p.catch(error => {
      console.log("error-", error);
      return 888;
    });

    Promise.all([p, p1]).then(result => {
      console.log(result);
    });

    Promise.race([p, p1]).then(result => {
      console.log(result);
    });

    function* generator7() {
      yield 1;
      yield 2;
    }
    let gene1 = generator7();

    console.log(gene1.next());
    console.log(gene1.next());
    console.log(gene1.next());

    function* gener777() {
      let result = yield "4+4";
      console.log("result=", result);
    }

    let gen777 = gener777();

    console.log("value=", gen777.next().value);
    console.log("next(8)=", gen777.next(8));

    async function add(x) {
      let a = await plus(x);
      let b = await plus(x);
    }

    async function addAfter(x) {
      let a = await loadAs(x);
      let b = await loadAs(a);
      return b;
    }

    function loadAs(x) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(x);
          resolve(x);
          //  throw new Error("uppps...");
        }, 1000);
      });
    }

    addAfter(5)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });

    const url = "https://dog.ceo/api/breeds/image/random";

    let promLoad = new Promise((resolve, reject) => {
      let xml = new XMLHttpRequest();
      xml.open("GET", url, true);
      xml.send();
      xml.onreadystatechange = () => {
        console.log(xml.readyState);
        if (xml.readyState == 4) resolve(xml);
      };
    });
    let srcImg;
    const image = new Image();

    promLoad.then(xml => {
      console.log(xml.response);
      console.log(xml.getAllResponseHeaders());

      console.log((srcImg = JSON.parse(xml.response).message));
      image.src = srcImg;
      document.body.appendChild(image);
    });

    /*
    promise
      .then(resolve => {
        console.log(resolve);
        return "++";
      })
      .then(resolve => console.log(resolve))
      .catch(reject => console.log(reject));
*/
  }
}
