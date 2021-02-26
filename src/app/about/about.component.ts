import { createHttpObservable } from "./../common/util";
import { Component, OnInit } from "@angular/core";
import { concat, interval, merge, of } from "rxjs";
import { map, subscribeOn } from "rxjs/operators";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // const source1$ = of(1, 2, 3);
    // // const source1$ = interval(1000);
    // const source2$ = of("a", "b", "c");
    // const source3$ = of("d", "f", "g");

    // const result$ = concat(source1$, source2$, source3$);
    // const interval1$ = interval(1000);
    // const interval2$ = interval1$.pipe(map(val => 10 * val));
    // const result$ = merge(interval1$, interval2$);

    // const interval1$ = interval(1000);
    // const sub = interval1$.subscribe(console.log);
    // setTimeout(() => sub.unsubscribe(), 5000);

    // const http$ = createHttpObservable("/api/courses");
    // const sub = http$.subscribe(console.log);
    // setTimeout(() => sub.unsubscribe(), 0);

    // result$.subscribe(console.log);
  }
}
