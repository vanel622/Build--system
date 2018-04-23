import { Component, OnInit } 					from '@angular/core';
import { Router, ActivatedRoute }			from '@angular/router';

import { Productos }							    from '../../modelos/productos';
import { ProductosService }						from '../../servicios/productos.service';


@Component({
  selector: 'app-productos-detalle',
  templateUrl: './productos-detalle.component.html',
  styleUrls: ['./productos-detalle.component.css']
})

export class ProductosDetalleComponent implements OnInit {

	public informacionProducto: Productos;

   	constructor(
		  private router: Router,
    	private activatedRoute: ActivatedRoute,
		  private productosService: ProductosService
   	) { }

  ngOnInit() {
    if (!sessionStorage.getItem('session')) {
      alert('Debe iniciar sesión para ver este contenido.');
      this.router.navigate(['login']);
    }
    this.detallarProducto();
  }

    detallarProducto(){
    	this.activatedRoute.params.subscribe(params => {
      		if(this.productosService.verificarCatalogo()){
        		this.informacionProducto = this.productosService.getDetalleProducto(params['id']);
      		}
        });
    }

}
