import { Component, OnInit } from '@angular/core';
import flight_data from './../assets/data/flight_data.json'
import user_data from './../assets/data/user_data.json'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'flight-booking';
  //public userList:{}
  ngOnInit() {

  }
}
