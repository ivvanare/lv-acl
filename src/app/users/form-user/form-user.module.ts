import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';

import { FormUserComponent } from './form-user.component';

export const routes :  Routes = [
  
  { path: '', component: FormUserComponent },

];

@NgModule({
  declarations: [
  	//BrowserModule,
  	FormUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class FormUserModule { }
