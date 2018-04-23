import { Injectable } 			from '@angular/core';
import { Http, Response } 		from '@angular/http';
import { Router } 				from '@angular/router';

import { Usuarios }     		from '../modelos/usuarios';
import { Observable }			from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class AuthService {

  	public usuarios: Usuarios[];
	private url = 'http://localhost:3000/usuarios';

	constructor(
		private router: Router,
		private http: Http
	) { }

  	public getUsuarios(): Observable<Usuarios[]> {
		let url = `${this.url}`;
		return this.http.get(url)
			.map((response: Response) => {
				this.usuarios = response.json();
			})
			.catch(this.manejadorDeErrores);
	}

	logout(){
		sessionStorage.removeItem('session');
    	sessionStorage.removeItem('carrito');
		window.location.reload();
		this.router.navigate(['login'])
	}

	private manejadorDeErrores (error: Response | any) {
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}
}
