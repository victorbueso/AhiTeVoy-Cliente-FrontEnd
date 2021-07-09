import { Component, OnInit } from '@angular/core';
import { faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  formularioRegistro = new FormGroup({
    rgCorreo: new FormControl('',[Validators.required,Validators.email]),
    rgPassword: new FormControl('',[Validators.required,Validators.minLength(6)]),
    rgConfPassword: new FormControl('',[Validators.required,Validators.minLength(6)])
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

}
