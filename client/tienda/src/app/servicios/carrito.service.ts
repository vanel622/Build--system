import { Injectable } 			from '@angular/core';

import { Carrito }				from '../modelos/carrito';
import { Observable }     		from 'rxjs/Observable';

import 'rxjs/Rx';


@Injectable()
export class CarritoService {

  	public listaCarrito: Carrito[] = [];
  	private totales: number[];

	constructor() { 
		this.totales = [];
		this.contadorItems();
	}

	itemsCarrito(){
		if(sessionStorage.getItem("carrito")){
			this.listaCarrito = JSON.parse(sessionStorage.getItem("carrito"));
			return JSON.parse(sessionStorage.getItem("carrito"));
		}
		return 0;
	}

	contadorItems(){
		return this.itemsCarrito().length;
	}	
  
	agregarItem(item){
		if(this.listaCarrito.length > 0){
      		for(let itemAgregado of this.listaCarrito){
        		if(itemAgregado.id == item.id){
          			itemAgregado.cantidad = Number(itemAgregado.cantidad) + Number(item.cantidad);
          			return true;
        		}
      		}
      		return false;
    	}
		return false;
	}

  	verificarCarrito(item){
    	if(this.agregarItem(item) == false){
      		this.listaCarrito.push(item)
    	}
    	sessionStorage.setItem("carrito", JSON.stringify(this.listaCarrito));
	}

	calcularSubtotal(precio, cantidad){
		let subtotal = Number(cantidad) * Number(precio);
    	this.totales.push(subtotal);
    	return subtotal;
	}
}
