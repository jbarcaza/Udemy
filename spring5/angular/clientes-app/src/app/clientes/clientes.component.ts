import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ModalService } from './detalle/modal.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';

import swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit  {

  clientes : Cliente [] = [];
  paginador : any;
  clienteSeleccionado : Cliente = null;

  constructor(private clienteService: ClienteService,
              private activatedRoute: ActivatedRoute,
              public  modalService : ModalService,
              public authService : AuthService) {}

  ngOnInit(){

    this.activatedRoute.paramMap.subscribe ( params => {

      let page : number = +params.get('page'); // simbolo + transfoorma trin a number

      if (!page) { page = 0;}

      this.clienteService.getClientes(page).subscribe(response =>
        { this.clientes  = response.content as Cliente[];
          this.paginador = response }  );

      });

      this.modalService.notificarUpload.subscribe(cliente => {
        this.clientes = this.clientes.map(clienteOriginal => {
          if (cliente.id == clienteOriginal.id){
            clienteOriginal.foto = cliente.foto;

          }
          return clienteOriginal;
        })
      });

  }

  delete(cliente : Cliente) : void {

    swal.fire({
      title: 'Esta seguro?',
      text: "No puede revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.clienteService.deleteCliente(cliente.id).subscribe(

          response => {

            this.clientes = this.clientes.filter(cli => cli !== cliente),
            swal.fire(
              'Eliminado!',
              `El cliente ${cliente.nombre} ha sido eliminado`,
              'success'
            )

          }
        )

      }
    })
  }

  abrirModal(cliente : Cliente){

    this.clienteSeleccionado = cliente ;
    this.modalService.abrirModal();

  }


}
