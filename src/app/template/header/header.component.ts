import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private formBuilder: FormBuilder) {}

  searchForm = this.formBuilder.group({
    city: '',
  });

  ngOnInit(): void {}

  onSubmit(): void {
    let cityString = this.searchForm.value.city;

    if (cityString === null) {
      this.router.navigateByUrl('rooms');
    } else {
      this.router.navigate(['rooms', cityString]);
    }
  }
}
