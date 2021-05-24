import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppComponent } from '../app.component';
import * as flights from './../../assets/data/flight_data.json';
import * as users from './../../assets/data/user_data.json';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BookingDialogComponent } from './booking-dialog';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  username: any;

  codes: string[] = [
    //hardcoded list of airport codes
    'DEL',
    'AOI',
    'LAS',
    'DAL',
    'SVO',
    'SDU',
    'TXK',
    'YEK',
    'YXX',
  ];

  endcodes: string[] = []; //object to store codes for destination after processing source
  start: string = ''; //source
  end: string = ''; //destination
  minDate = new Date();
  serializedDate0 = new FormControl(new Date()); //date
  serializedDate1 = new FormControl(new Date()); //date

  searchResult: any; //object to store results
  flightList: any = (flights as any).default; //loading json data
  userdata: any = (users as any).default; //loading user data to see bookings
  bookings: any;
  seatNo: number = 0;
  noresults: boolean = false; //flag for no results
  triptype: number = 1;
  constructor(public dialog: MatDialog) {
    this.username = localStorage.getItem('username');
  }

  ngOnInit(): void {
    //processing userinfo for bookings
    const user = this.userdata.filter(
      (customer: { user: string }) =>
        customer.user == localStorage.getItem('username')
    );
    for (const item of user) {
      this.bookings = item[Object.keys(item)[2]];
    }
    console.log(this.bookings);
  }

  //function to update/create destination list   //use async and await for fetching from localstorgae
  updateend() {
    this.endcodes = this.codes.filter((code) => code !== this.start);
    console.log(this.endcodes, this.start);
    console.log(this.start);
  }

  //searching through data to see if requested source and destination pair exists
  search() {
    console.log(this.start, this.end, this.serializedDate0);
    if (this.start == 'ALL' && this.end == 'ALL') {
      this.searchResult = this.flightList;
    } else if (this.end == 'ALL') {
      this.searchResult = this.flightList.filter(
        (flight: { from: string; to: string; time: string; seats: number }) =>
          flight.from == this.start
      );
      console.log(this.searchResult);
    } else if (this.start == 'ALL') {
      this.searchResult = this.flightList.filter(
        (flight: { from: string; to: string; time: string; seats: number }) =>
          flight.to == this.end
      );
      console.log(this.searchResult);
    } else if (this.start !== 'ALL' && this.end !== 'ALL') {
      this.searchResult = this.flightList.filter(
        (flight: { from: string; to: string; time: string; seats: number }) =>
          flight.from == this.start && flight.to == this.end
      );
      console.log(this.searchResult);
    }

    if (this.searchResult.length == 0) {
      this.noresults = true;
    }
  }

  //function to open dialog box to confirm booking
  book(from: any, to: any, seats: any, time: any) {
    if (this.triptype == 1) {
      this.openDialog(seats, from, to, time, '');
    }
    if (this.triptype == 2) {
      const flightR = this.flightList.filter(
        (flight: { from: string; to: string; time: string; seats: number }) =>
          flight.from==to && flight.to==from
      );
      const returntime = flightR[0].time;
      console.log(
        flightR,
        'here',
        returntime,
        typeof(returntime),
        this.end,
        this.start
      );
      this.openDialog(seats, from, to, time, returntime);
    }
  }

  //opening dialog to ask for number of seats, and pushing the results in bookings array
  openDialog(
    total: number,
    from: any,
    to: any,
    time: any,
    returntime: any
  ): void {
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      width: '250px',
      data: { seats: this.seatNo, totalseats: total },
    });
    console.log('booking will be executed', returntime);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      console.log(this.bookings, this.serializedDate0.value.toISOString());
      if (result) {
        //resulting data for pushing into bookings array

        const data = {
          path: from + '-' + to,
          date: this.serializedDate0.value.toISOString().slice(0, 10),
          time: time,
          seats: result,
        };
        this.bookings.push(data);
        if (this.triptype == 2) {
          console.log('saving second booking', returntime);
          const data2 = {
            path: to + '-' + from,
            date: this.serializedDate1.value.toISOString().slice(0, 10),
            time: returntime,
            seats: result,
          };
          this.bookings.push(data2);
        }
      }
    });
  }
  acceptData(data: any) {
    console.log(data);
    this.start = data.from;
    this.end = data.to;
    this.triptype = data.trip;
    this.serializedDate0 = data.startDate;
    this.serializedDate1 = data.returnDate;
    this.search();
  }
}
