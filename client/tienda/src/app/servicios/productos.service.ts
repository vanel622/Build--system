import { Injectable }				from '@angular/core';
import { Http, Response }			from '@angular/http';
import { Headers, RequestOptions }	from '@angular/http';

import { Productos }     			from '../modelos/productos';
import { Observable }     			from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()

export class ProductosService {
	
  	public catalogo: Productos[];
  	public catalogoFiltrado: Productos[];
	private url = 'http://localhost:3000/productos';

	constructor (private http: Http) { }

  	public getProductos(): Observable<Productos[]> {
		let url = `${this.url}`;
		return this.http.get(url)
			.map((response: Response) => {
				this.catalogo = response.json();
				this.catalogoFiltrado = this.catalogo;
			})
			.catch(this.manejadorDeErrores);
	}

  	public putProductos(producto: Productos) {
		let url = `${this.url}`;
		return this.http.put(url, producto)
			.map((response: Response) => {
        		return this.catalogo = response.json();
        	})
			.catch(this.manejadorDeErrores);
	}

  	public getDetalleProducto(idProducto: number) {
	    for(let item of this.catalogoFiltrado) {
	      	if(item.id == idProducto) return item;
	    }
	    return null;
	}

	public filterProductos(filtro: string) {
		this.catalogoFiltrado = this.catalogo;
		filtro.toLowerCase();
		let itemCoincidido : Productos[] = [];
		for(let item of this.catalogoFiltrado){
			let nombre = item.nombre.toLowerCase();
			if(nombre.includes(filtro)){
		    	itemCoincidido.push(item)} 
    	}
		return itemCoincidido;
	}

  	verificarCatalogo(){
    	return this.catalogoFiltrado;
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