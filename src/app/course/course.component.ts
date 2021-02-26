import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { fromEvent, Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap
} from "rxjs/operators";
import { debug, RxJsLoggingLevel } from "../common/debug";
import { Course } from "../model/course";
import { Lesson } from "../model/lesson";
import { createHttpObservable } from "./../common/util";

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
})
export class CourseComponent implements OnInit, AfterViewInit {
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  courseId: number;

  @ViewChild("searchInput", { static: true }) input: ElementRef;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.params["id"];

    this.course$ = createHttpObservable(`/api/courses/${this.courseId}`).pipe(
      debug(RxJsLoggingLevel.INFO, "course value"),
    );

    this.lessons$ = this.loadLessons();
  }

  ngAfterViewInit() {
    this.lessons$ = fromEvent(this.input.nativeElement, "keyup").pipe(
      map((event) => event["target"].value),
      startWith(""),
      debug(RxJsLoggingLevel.INFO, "search"),
      // throttleTime(500),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((search) => this.loadLessons(search)),
      debug(RxJsLoggingLevel.INFO, "leasson value"),
    );

  }

  loadLessons(search = ""): Observable<Lesson[]> {
    return createHttpObservable(
      `/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`
    ).pipe(map((res) => res.payload));
  }
}
