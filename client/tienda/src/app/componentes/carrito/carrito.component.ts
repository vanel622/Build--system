import { Component, OnInit } 					from '@angular/core';
import { Http, Response } 						from '@angular/http';
import { Router }            					from '@angular/router';

import { Productos }							    from '../../modelos/productos';
import { ProductosService }           from '../../servicios/productos.service';
import { Carrito }                    from '../../modelos/carrito';
import { CarritoService }             from '../../servicios/carrito.service';
import { Observable }                 from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent implements OnInit {

  public catalogo: Productos[];
  public listaCarrito: Carrito[] = [];
  private url = 'http://localhost:3000/productos';

  constructor(
    private productosService: ProductosService,
    private carritoService: CarritoService,
    private http: Http,
    private router : Router
  ) { }
   	
  ngOnInit() {
    if (!sessionStorage.getItem('session')) {
      alert('Debe iniciar sesión para ver este contenido.');
      this.router.navigate(['login']);
    }
    this.listaCarrito = this.carritoService.itemsCarrito();
  }

	calcularTotal(){
		let total: number = 0;
		let items = this.carritoService.listaCarrito;
		for(let subtotal of items){
			total += subtotal.cantidad * subtotal.precio;
		}
		return total;
	}

  pagarCarrito(){
    let url = `${this.url}`;
    return this.http.get(url)
      .map((response: Response) => {
        this.catalogo = response.json();
      })
      .catch(this.manejadorDeErrores)
      .subscribe(()=>{
        for (let itemCatalogo of this.catalogo){
          for (let itemCarrito of this.listaCarrito){
            if ( itemCatalogo.id == itemCarrito.id ){
              let cantidad = Number(itemCarrito.cantidad);
              itemCatalogo.disponibilidad = itemCatalogo.disponibilidad-cantidad;
              this.productosService.putProductos(itemCatalogo)
                .subscribe((response) => {
                  this.vaciarCarrito();
                })
            }
          }
        }
        this.router.navigate(['/productos']);
      })
  }

  vaciarCarrito(){
    sessionStorage.setItem('carrito', '[]')
    this.catalogo = [];
    this.listaCarrito = [];
    this.productosService.getProductos();
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
