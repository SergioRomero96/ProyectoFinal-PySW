import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactenos',
  templateUrl: './contactenos.component.html',
  styleUrls: ['./contactenos.component.css']
})
export class ContactenosComponent implements OnInit {
  lat: number = -24.188745;
  lon: number = -65.292987;
  constructor() { }

  ngOnInit() {
  }

}
