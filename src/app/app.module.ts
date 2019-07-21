import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const appRoutes :  Routes = [
  { path: 'Usuarios', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
  { path: 'Usuarios/Crear', loadChildren: () => import('./users/form-user/form-user.module').then(m => m.FormUserModule) },
  { path: 'Usuarios/Editar/:id', loadChildren: () => import('./users/form-user/form-user.module').then(m => m.FormUserModule) },
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {
      //enableTracing: true, // <-- debugging purposes only
      preloadingStrategy: PreloadAllModules
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
