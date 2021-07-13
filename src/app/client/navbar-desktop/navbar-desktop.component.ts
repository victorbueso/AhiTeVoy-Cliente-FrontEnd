import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar-desktop',
  templateUrl: './navbar-desktop.component.html',
  styleUrls: ['./navbar-desktop.component.css']
})
export class NavbarDesktopComponent implements OnInit {
  faBars = faBars;
  faShoppingCart = faShoppingCart;
  faSearch = faSearch;

  constructor() { }

  ngOnInit(): void {
  }

}
