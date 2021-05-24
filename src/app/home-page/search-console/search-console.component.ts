import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-console',
  templateUrl: './search-console.component.html',
  styleUrls: ['./search-console.component.scss']
})
export class SearchConsoleComponent implements OnInit {
  @Output() searchData= new EventEmitter<any>();

  username: string = '';

  codes: string[] = [   //hardcoded list of airport codes
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
  triptype: number =1;
  endcodes: string[] = [];  //object to store codes for destination after processing source
  start: string = '';       //source
  end: string = '';         //destination
  minDate = new Date();
  serializedDate0 = new FormControl(new Date());   //date
  serializedDate1 = new FormControl(new Date());   //date

  constructor() { }

  ngOnInit(): void {
  }
  updateend() {
    this.endcodes = this.codes.filter((code) => code !== this.start);
    console.log(this.endcodes, this.start);
    console.log(this.start);
  }
  search(){
    this.searchData.emit({
      from: this.start,
      to: this.end,
      trip: this.triptype,
      startDate: this.serializedDate0,
      returnDate: this.serializedDate1
    })
  }
}
