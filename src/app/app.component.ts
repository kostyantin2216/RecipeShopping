import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyA7pQ6SDIeorTb7c-v5nT66StXri6Thglw',
      authDomain: 'recipeshopping-1a75e.firebaseapp.com',
    });
  }
}
