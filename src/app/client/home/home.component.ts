import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CategoriasService } from '../../services/categorias.service';
import { EmpresasService } from '../../services/empresas.service';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faBars = faBars;
  faShoppingCart = faShoppingCart;

  public categorias: Array<any> = [];
  public empresas: Array<any> = [];
  public productos: Array<any> = [];

  public mostrarCategorias: boolean = false;
  public mostrarEmpresas: boolean = false;
  public mostrarProductos: boolean = false;

  public categoriaActual: string = '';
  public noHayEmpresas = `No hay empresas disponibles en esta categoria`;
  public empresaActual: string = '';
  public noHayProductos = `No hay productos disponibles en esta empresa`;

  constructor(
    private categoriasService: CategoriasService,
    private empresasService: EmpresasService,
    private productosService: ProductosService,
  ) { }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.showCategorias();
    this.categoriasService.getCategories()
      .subscribe( resp => {
        this.categorias = resp;
      }, error => console.log(error))
  }

  showCategorias() {
    this.mostrarProductos = false;
    this.mostrarEmpresas = false;
    this.mostrarCategorias = true;
  }

  showEmpresas(codigoCategoria: string, nombreCategoria: string) {
    this.mostrarCategorias = false;
    this.mostrarProductos = false;
    this.mostrarEmpresas = true;
    this.empresasService.obtenerEmpresasPorCategoria(codigoCategoria)
      .subscribe( result => {
        this.empresas = result;
        this.categoriaActual = nombreCategoria;
      }, error => {
        console.log(error);
      })
  }

  showProductos(codigoEmpresa: string, nombreEmpresa: string) {
    console.log(codigoEmpresa);
    this.mostrarCategorias = false;
    this.mostrarEmpresas = false;
    this.mostrarProductos = true;
    this.productosService.obtenerProductosPorEmpresa(codigoEmpresa)
      .subscribe( result => {
        console.log(result);
        this.productos = result;
        this.empresaActual = nombreEmpresa;
      }, error => {
        console.log(error);
      })
  }

}
