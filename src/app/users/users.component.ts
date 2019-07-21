import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"

import { UsersService } from './users.service';
import { Users } from './users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

 	usuarios: Users[];

 	Loading: boolean;
 	status: boolean;

  constructor(
  	private usersService:UsersService, 
  	private router: Router  
	){
		this.isLoading(false);
    this.getUsuarios();
  }

  isLoading(status){
  	this.Loading=status;
    console.log('loading: '+this.Loading);
  }

  getUsuarios(){
		this.isLoading(true);
  	
    this.usersService.get().subscribe((data:Users[])=>{
    	this.usuarios =data; 
			this.isLoading(false);
    },(error)=>{
				this.isLoading(false);
    		console.log(error);
    		alert('error al obtener usuarios');
    	}
  	);
  }

  ngOnInit() {
    //this.reload();
  }

  reload(){
		this.isLoading(true);
    this.getUsuarios();
		this.isLoading(false);
  }

  activate(id){
		this.isLoading(true);

    this.usersService.activate(id).subscribe((data)=>{
    	alert('Usuario activado !'); 
  	 	this.getUsuarios();
    },(error)=>{
    	
		this.isLoading(false);
    	console.log(error); 
    	alert( 'Usuario no fue activado intente de nuevo!  ');
  	}); 
  }

  desactivate(id){
		this.isLoading(true);
		
    this.usersService.desactivate(id).subscribe((data)=>{
    	alert('Usuario desactivado !'); 
  	 	this.getUsuarios();
    }, (error)=>{
		this.isLoading(false);
		
    	console.log(error); 
    	alert( 'Usuario no fue desactivado intente de nuevo!  ');
  	}); 
  }

  delete(id){
		this.isLoading(true);
		
    this.usersService.delete(id).subscribe((data)=>{
    	alert('Usuario eliminado !'); 
  	 	this.getUsuarios();
    }, (error)=>{
		this.isLoading(false);
		
    	console.log(error); 
    	alert( 'Usuario no fue desactivado intente de nuevo!  ');
  	}); 
  }

}
