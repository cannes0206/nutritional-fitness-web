import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../core/services';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    public spinnerService: SpinnerService) { }

  ngOnInit(): void {
  }
}
