import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faChevronCircleUp, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { ClientesService } from '../../services/clientes.service';
import { Usuario } from '../../components/interfaces/interfaces';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements Usuario {

  uid = '';
  correo = ''; 

  faChevronCircleUp = faChevronCircleUp;
  faCaretLeft = faCaretLeft;
  dateToday = new Date();

  imgURL: string = '';
  img!: File;
  urlImg: string = "";

  uploadProfile:FormGroup=new FormGroup({    //imagen
    avatarImage: new FormControl(''),
    nameProd: new FormControl('')
  });

  formProfile: FormGroup = this.fb.group({
    nombre: [null, [Validators.required, Validators.minLength(4), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]],
    apellido: [null, [Validators.required, Validators.minLength(2), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]],
    telefono: [null, [Validators.required, Validators.minLength(4), Validators.pattern("[0-9]+")]],
    direccion: [null, [Validators.required, Validators.minLength(4), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]],
    ciudad: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(6), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]],
    departamento: [null, [Validators.required, Validators.minLength(4), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]],
    tarjetaCredito: [null, [Validators.required, Validators.minLength(1), Validators.pattern("[0-5]")]],
    vencimientoTarjeta: [null, [Validators.required]],
    cvv: [null, [Validators.required, Validators.minLength(8), Validators.pattern("([a-záéíóúñ][A-ZÁÉÍÓÚÑ])|([a-záéíóúñ])|([A-ZÁÉÍÓÚÑ])|([A-ZÁÉÍÓÚÑ][a-záéíóúñ])+\\s[\w!@#$%^&'\"*\(\)\[\]\{\};\?¿¡:=\-\~,./\.<>?\|¨`´´°\¬\\_+]")]],
  });

  constructor(
    private fb: FormBuilder,
    private clientesService: ClientesService,

  ) { }

  ngOnInit(): void {
  }

  limpiar(): any {
    this.formProfile.reset(this.formProfile);
  }

  get nombre(){
    return this.formProfile.get('nombre')?.invalid && this.formProfile.get('nombre')?.touched;
  }

  get apellido(){
    return this.formProfile.get('apellido')?.invalid && this.formProfile.get('apellido')?.touched;
  }

  get telefono(){
    return this.formProfile.get('telefono')?.invalid && this.formProfile.get('telefono')?.touched;
  }

  get direccion(){
    return this.formProfile.get('direccion')?.invalid && this.formProfile.get('direccion')?.touched;
  }

  get ciudad(){
    return this.formProfile.get('ciudad')?.invalid && this.formProfile.get('ciudad')?.touched;
  }

  get departamento(){
    return this.formProfile.get('departamento')?.invalid && this.formProfile.get('departamento')?.touched;
  }

  get tarjetaCredito(){
    return this.formProfile.get('tarjetaCredito')?.invalid && this.formProfile.get('tarjetaCredito')?.touched;
  }

  get vencimientoTarjeta(){
    return this.formProfile.get('vencimientoTarjeta')?.invalid && this.formProfile.get('vencimientoTarjeta')?.touched;
  }

  get cvv(){
    return this.formProfile.get('cvv')?.invalid && this.formProfile.get('cvv')?.touched;
  }

  profilePreview(event: any) {
    if(event.target.files && event.target.files[0]){
      this.img = <File>event.target.files[0];
      this.uploadProfile.patchValue({
        avatarImage: this.img
      });
      this.uploadProfile.get('avatarImage')!.updateValueAndValidity()
      const reader = new FileReader();
      reader.onload = () => {
        this.imgURL = reader.result as string;
      }
      reader.readAsDataURL(this.img)
    }
  }

  subirImagen() {
    let id = this.clientesService.usuario;

    let data = {
      nombre: this.formProfile.value.nombre,
      apellido: this.formProfile.value.apellido,
      telefono: this.formProfile.value.telefono,
      direccion: this.formProfile.value.direccion,
      ciudad: this.formProfile.value.ciudad,
      departamento: this.formProfile.value.departamento,
      tarjetaCredito: parseInt(this.formProfile.value.tarjetaCredito),
      vencimientoTarjeta: this.formProfile.value.vencimientoTarjeta,
      cvv: parseInt(this.formProfile.value.cvv),
      imagen: this.img,
    };
    this.clientesService.actualizarCliente(id, data)
    .subscribe((result: any) => {
      //this.urlImg = result.urlImagen;
      console.log(result);
    }, (error: any) => console.log(error))
  }

}
