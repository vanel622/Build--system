import { Component, OnInit } 		from '@angular/core';
import { AuthService } 				from '../../servicios/auth.service';
import { CarritoService }			from '../../servicios/carrito.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
	
	constructor(
		private authService: AuthService,
		private carritoService: CarritoService,
	) { }

	ngOnInit() {
	}

	cerrarSesion(){
		this.authService.logout();
	}
}
