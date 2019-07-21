import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from '../users.service';
import { Users } from '../users';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
    } else {
        matchingControl.setErrors(null);
    }
  }
}

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})

export class FormUserComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  usuario: Users = {
  	id: null,
	  name: null,
	  email: null,
	  //email_verified_at: null,
	  //avatar: null,
	  active: null,
	  //deleted_at: null,
	  //created_at: null,
	  //updated_at: null,
	  //avatar_url: null,
  };

  id:any ;
  edit:boolean = false;
  UsersList : Users[];
  accion :string = '';

  constructor(
  	private formBuilder: FormBuilder,
    private usersService: UsersService,
    private activatedRoute:ActivatedRoute,
    private router: Router,
  ){
  	this.id =this.activatedRoute.snapshot.params['id'];
      if(this.id){
        this.edit = true;
        this.usersService.get().subscribe((data:Users[])=>{
          this.UsersList = data;
          this.usuario = this.UsersList.find((codBusq)=>{
            return codBusq.id == this.id});
          /*console.log(this.cargo);*/
          this.accion = "Editar";
        },(error)=>{
        	console.log(error); 
        	alert( '¡Error al obtener los datos para la actualizacion intente de nuevo!'); 
        })
      }else{
        this.edit =false;
        this.accion = "Crear";
      }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password_confirmation: ['', Validators.required],
    },{
      validator: MustMatch('password', 'password_confirmation')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
