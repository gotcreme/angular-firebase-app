import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courses$;
  courseList: AngularFireList<{}>;
  course$;
  author$;

  constructor(private db: AngularFireDatabase) {
    this.courses$ = db.list('/courses').snapshotChanges();
    this.courseList = db.list('/courses');
    this.author$ = db.object('/authors/1').valueChanges();
  }

  add(course: HTMLInputElement) {
    this.courseList.push({
      name: course.value,
      price: 150,
      isLive: true,
      sections: [
        { title: 'Components' },
        { title: 'Directives' },
        { title: 'Templates' },
      ]
    });

    course.value = '';
  }

  update(course) {
    this.db.object('/courses/' + course.key)
      .set(course.payload.val() + ' UPDATED');
    
    this.db.object('/courses/' + course.key)
      .set({
        title: 'course' + course.key + ' UPDATED',
        price: 150
      });
  }

  delete(course) {
    this.db.object('/courses/' + course.key)
      .remove()
      .then(() => {
        console.log("deleted");
      });
  }
}
