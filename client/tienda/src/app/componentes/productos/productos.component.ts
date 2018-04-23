import { Component, OnInit, HostBinding}		from '@angular/core';
import { FormGroup, FormControl, Validators } 	from '@angular/forms';
import { Router }            					from '@angular/router';

import { Productos }							from '../../modelos/productos';
import { ProductosService }						from '../../servicios/productos.service';
import { Carrito }                    			from '../../modelos/carrito';
import { CarritoService }            			from '../../servicios/carrito.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {
   
	private catalogo: Productos[];
	public itemCarrito: Carrito;
  	private formFiltrar: FormGroup;

   	constructor(
    	private productosService: ProductosService,
    	private carritoService: CarritoService,
		private router: Router
   	) { }

	ngOnInit() {
		if (!sessionStorage.getItem('session')) {
			alert('Debe iniciar sesión para ver este contenido.');
			this.router.navigate(['login']);
		}
		this.formFiltrar = new FormGroup({
			'busqueda' : new FormControl()
	    })
		this.mostrarProductos();
	}

	mostrarProductos(){
		if(!this.productosService.catalogoFiltrado){
			this.productosService.getProductos()
				.subscribe(()=>{
					this.catalogo = this.productosService.catalogo;
        	})
    	}else{
			this.catalogo = this.productosService.catalogoFiltrado;
		}
	}

    filtrarCatalogo(filtro: string){
      	this.catalogo = this.productosService.filterProductos(filtro);
    }
	
	aniadirProducto(id: number, cantidad: number){
    	for (let item of this.productosService.catalogoFiltrado){
      		if(item.id == id){
        		if(item.disponibilidad < cantidad){
          			window.alert('La disponibilidad máxima es: '+item.disponibilidad);
        		}else{
	          		let cantidadActual = item.disponibilidad;
					this.itemCarrito = {
	            		"id": item.id,
	           			"nombre": item.nombre,
	            		"imagen": item.imagen,
	            		"precio": item.precio,
	            		"cantidad": cantidad
	          		};
	          		this.carritoService.verificarCarrito(this.itemCarrito);
	          		item.disponibilidad = cantidadActual-cantidad;
        		}
      		}
    	}
	}

   	verMas(item: Productos) {
		let link = ['productos/productos-detalle/', item.id];
		this.router.navigate(link);
   	}
}
