import { Component } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({

  selector  : 'app-header',
  templateUrl  : './header.component.html'

})
export class HeaderComponent{

  company : string = 'Telimay';

  constructor ( public authService : AuthService,
                private router : Router){

  }

  logout():void{

    let username = this.authService.usuario.username;

    this.authService.logout();

    swal.fire('Logout',`${username} ha cerrado su sesión`,'success');

    this.router.navigate(['/login']);

  }


}
