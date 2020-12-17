import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic1',
  templateUrl: './dynamic1.component.html',
  styleUrls: ['./dynamic1.component.css']
})
export class Dynamic1Component implements OnInit {

  @Input() inputValue = "default-value";

  constructor() { }

  ngOnInit() {
  }

}