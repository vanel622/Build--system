import { Component, Inject, OnInit } 			from '@angular/core';
import { Http, Response }						from '@angular/http';
import { FormGroup, FormControl, Validators } 	from '@angular/forms';
import { Router } 								from '@angular/router';

import { Usuarios }     						from '../../modelos/usuarios';
import { AuthService } 							from '../../servicios/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
	public mensaje: string;
	private email: string;
	private clave: string;
  	private usuarioDB: Usuarios[];
  	public formularioDeSesion: FormGroup;
	private url = 'http://localhost:3000/login';

	constructor(
		private authService: AuthService,
		private http: Http,
		private router: Router
	) { 
		if(sessionStorage.getItem("session")) this.router.navigate(['productos']);
	}

	ngOnInit() {
		this.mensaje = '';
		this.email = '';
		this.clave = '';
		this.formularioDeSesion = new FormGroup({
        	'email': new FormControl('', Validators.required),
        	'clave': new FormControl('', Validators.required)
    	});
		if(sessionStorage.getItem("session")) this.router.navigate(['productos']);
	}

	validarSesion(){
		this.mensaje = 'Email o clave incorrecta';
		this.email = this.formularioDeSesion.value.email.toLowerCase();
		this.clave = this.formularioDeSesion.value.clave.toLowerCase();
		this.authService.getUsuarios().subscribe(()=>{
			this.usuarioDB = this.authService.usuarios;
			for (let itemUsuario of this.usuarioDB){
				if (itemUsuario.email.toLowerCase() == this.email) {
					if (itemUsuario.clave.toLowerCase() == this.clave) {
						sessionStorage.setItem("session", this.email);
						this.mensaje ='';
						this.router.navigate(['productos']);
					}
				}
   			}
		})
	}  
}