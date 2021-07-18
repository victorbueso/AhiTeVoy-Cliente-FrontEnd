import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faBars = faBars;
  faShoppingCart = faShoppingCart;

  public categorias: Array<any> = [];

  constructor(
    private categoriasService: CategoriasService,
  ) { }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.categoriasService.getCategories()
      .subscribe( resp => {
        this.categorias = resp;
      }, error => console.log(error))
  }

}
