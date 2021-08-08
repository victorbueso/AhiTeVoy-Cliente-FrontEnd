import { Component, OnInit, ElementRef, ViewChild, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { faBars, faCaretLeft, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
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

  active: boolean = true;

  faBars = faBars;
  faShoppingCart = faShoppingCart;
  faMinus = faMinus;
  faPlus = faPlus;
  faCaretLeft = faCaretLeft;
  closeResult = '';

  detalleProductoActual!: any;
  contador: number = 1;
  actualizarCarrito: Array<any> = [];
  botonPago: boolean = false;

  //public showHamburger: boolean = true;

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
    private modal: NgbModal,
    private categoriasService: CategoriasService,
    private empresasService: EmpresasService,
    private productosService: ProductosService,
  ) { }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.actualizarCarrito = JSON.parse(localStorage.getItem('carrito')!);
  }

  open(content: any) {
    this.contador = 1;
    /*this.detalleProductoActual = producto;
    console.log(this.detalleProductoActual);
    console.log(typeof(this.detalleProductoActual));*/
    this.modal.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'md', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  controlarCategoria(categoria: boolean) {
    this.active = categoria;
  }

  show() {
    //this.mostrarCategorias = !this.mostrarCategorias;
    //this.mostrarEmpresas = !this.mostrarEmpresas;
    //this.mostrarProductos = !this.mostrarProductos;
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

  detalleP(producto: any) {
    this.detalleProductoActual = producto;
    //console.log(this.detalleProductoActual);
    //console.log(typeof(this.detalleProductoActual));
  }

  acumularCantidad() {
    if (this.contador < 100)
      return this.contador += 1;
    return this.contador;
  }

  decrementarCantidad() {
    if (this.contador > 1)
      return this.contador -= 1;
    return this.contador;
  }

  agregarCarrito(producto: any) {
    let nuevoProducto = {
      _id: producto._id,
      nombreProducto: producto.nombreProducto,
      imagenProducto: producto.imagen,
      precio: producto.precio,
      cantidad: this.contador,
    };
    let carrito = [nuevoProducto];
    let exist = carrito.some(producto => producto._id === nuevoProducto._id);
    console.log(exist);
    
    if (exist) {
      let cart = carrito.map(producto => {
        if (producto._id === nuevoProducto._id) {
          producto.cantidad = nuevoProducto.cantidad;
          return producto;
        } else {
          return producto;
        }
      })
      carrito = [...cart];
    } else {
      carrito = [...carrito, nuevoProducto]
    }

    if (localStorage.getItem('carrito') == null)
        localStorage.setItem('carrito', JSON.stringify(carrito));
    
    else {
      carrito = JSON.parse(localStorage.getItem('carrito')!);
      carrito.push(nuevoProducto);
      this.actualizarCarrito = carrito;
      this.botonPago = true;
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  }

  verificarCarrito(boton: boolean) {
    this.botonPago = boton
    if (this.actualizarCarrito == null)
      this.botonPago = false;
    else
      this.botonPago = true;
  }

  realizarPago() {
    console.log(':v');
  }

}
