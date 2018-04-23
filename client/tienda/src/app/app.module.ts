import { BrowserModule }               from '@angular/platform-browser';
import { NgModule }                    from '@angular/core';
import { FormsModule }                 from '@angular/forms';
import { ReactiveFormsModule }         from '@angular/forms';
import { HttpModule }                  from '@angular/http';

import { AuthService}                  from "./servicios/auth.service";
import { ProductosService }            from './servicios/productos.service';
import { CarritoService }              from './servicios/carrito.service'

import { Ruteador }                    from './app.routes'; //Mis Rutas

import { AppComponent }                from './app.component';
import { FooterComponent }             from './componentes/footer/footer.component';
import { HeaderComponent }             from './componentes/header/header.component';
import { LoginComponent }              from './componentes/login/login.component';
import { ProductosComponent }          from './componentes/productos/productos.component';
import { ProductosDetalleComponent }   from './componentes/productos-detalle/productos-detalle.component';
import { CarritoComponent }            from './componentes/carrito/carrito.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ProductosComponent,
    ProductosDetalleComponent,
    CarritoComponent,
    LoginComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    Ruteador
  ],
  providers: [AuthService, ProductosService, CarritoService],
  bootstrap: [AppComponent]
})


export class AppModule { }