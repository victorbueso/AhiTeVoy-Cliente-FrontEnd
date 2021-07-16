import { Component, OnInit } from '@angular/core';
import { faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  faShipingFast = faShippingFast;
  faMapMarkedAlt = faMapMarkedAlt;
  faClipboardList = faClipboardList;
  faMoneyCheckAlt = faMoneyCheckAlt;
  faHandshake = faHandshake;
  faShoppingCart = faShoppingCart;
  closeResult = '';

  public successRegistro: Boolean = false;
  public errorRegistro: Boolean = false;
  public errorLogin: Boolean = false;
  public message : String = "";

  public pruebaUsuarioLogueado = null;

  public registroSuccess: Boolean = false;

  formularioRegistro = new FormGroup({
    rgCorreo: new FormControl('',[Validators.required,Validators.email]),
    rgPassword: new FormControl('',[Validators.required,Validators.minLength(8)]),
    rgConfPassword: new FormControl('',[Validators.required,Validators.minLength(8)])
  });

  formularioLogin = new FormGroup({
    lgCorreo: new FormControl('',[Validators.required,Validators.email]),
    lgPassword: new FormControl('',[Validators.required,Validators.minLength(8)])
  });

  get lgCorreo(){
    return this.formularioLogin.get('lgCorreo');
  }

  get lgPassword(){
    return this.formularioLogin.get('lgPassword');
  }

  get rgCorreo(){
    return this.formularioRegistro.get('rgCorreo');
  }
  get rgPassword(){
    return this.formularioRegistro.get('rgPassword');
  }

  constructor(
    private modal: NgbModal,
    public clienteService: ClientesService,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  open(content: any) {
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

  registrarUsuario() {
    if(this.formularioRegistro.value.rgPassword != this.formularioRegistro.value.rgConfPassword) {
      this.formularioRegistro.setValue({
        rgCorreo: this.formularioRegistro.value.rgCorreo,
        rgConfPassword: null,
        rgPassword: null
      });
      this.errorRegistro = true;
        this.message = 'Contraseñas no coinciden';
        setTimeout(() => {
          this.errorRegistro = false;
          this.message = "";
        }, 3000);
    } else {
      var data = {
        correo: this.formularioRegistro.value.rgCorreo,
        password: this.formularioRegistro.value.rgPassword,
      }

      this.clienteService.registrarUsuarioCliente(data).subscribe(
        result => {
          console.log(result);
          this.registroSuccess = true;
          this.successRegistro =true;
          setTimeout(() => {
            this.formularioRegistro.reset();
            this.successRegistro = false;
            this.router.navigate(['/home'])         //Deberá navegar a la página de actualizar datos del perfil
            //this.cookieService.set('token', result.token);
            //this.cookieService.set('idClient', result.idClient);
            this.modal.dismissAll();
          }, 3000);
        }, error => {
          this.errorRegistro=true;
          this.message=error.error.message;
          setTimeout( () => {
            this.message="";
            this.errorRegistro = false;

            this.formularioRegistro.reset();
        }, 3000);
      });
    }
  }

  buttonLogin() {
    this.message = "";
    this.errorLogin = false;
    var data = {
      correo:this.formularioLogin.value.lgCorreo,
      password:this.formularioLogin.value.lgPassword
    }
    this.clienteService.loginUsuarioCliente(data).subscribe(
      result => {
        this.formularioLogin.reset();
        this.pruebaUsuarioLogueado = result.idClient;
        this.router.navigate(['home']);
        //this.ngOnInit();
        this.formularioLogin.reset();
        this.modal.dismissAll();
      }, error => {
        this.errorLogin = true;
        this.message = error.error.message;
      }
    );
  }

}
