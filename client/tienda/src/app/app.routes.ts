import { NgModule } 					from '@angular/core';
import { RouterModule, Routes } 		from '@angular/router';

import { HeaderComponent } 				from './componentes/header/header.component';
import { FooterComponent } 				from './componentes/footer/footer.component';
import { LoginComponent }              	from './componentes/login/login.component';
import { ProductosComponent }          	from './componentes/productos/productos.component';
import { ProductosDetalleComponent }   	from './componentes/productos-detalle/productos-detalle.component';
import { CarritoComponent }            	from './componentes/carrito/carrito.component';


const misRutas: Routes = [
	{ path: 'header', component: HeaderComponent },
	{ path: 'footer', component: FooterComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'productos', component: ProductosComponent},
	{ path: 'productos/productos-detalle/:id', component: ProductosDetalleComponent},
  	{ path: 'carrito', component: CarritoComponent},
	{ path: '**', pathMatch: 'full', redirectTo: 'login' }
];


@NgModule({
	imports: [
		RouterModule.forRoot(misRutas)
	],
	exports: [
		RouterModule
	],
  providers: []
})


export class Ruteador {}
