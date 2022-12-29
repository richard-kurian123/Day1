import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.scss']
})
export class Comp1Component implements OnInit {


  public studentForm!:FormGroup;

  public years:any=[];
  public selectCountry:any=['India','USA','UK','China','Russia','Other']


  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    // for generating year drop down
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
      this.years.push(i);
    }

this.getStudentForm();

  }


  public getStudentForm(){

    this.studentForm =  this.formBuilder.group({
      firstName:['',[Validators.required,
        Validators.pattern("^([A-Za-z0-9.'+-_{}()@!#$%^&*+=:;<>?/]+([ A-Za-z0-9.'+-_{}()@!#$%^&*+=:;<>?/]+)*)$")]],
        lastName:['',[Validators.required,  Validators.pattern("^([A-Za-z0-9.'+-_{}()@!#$%^&*+=:;<>?/]+([ A-Za-z0-9.'+-_{}()@!#$%^&*+=:;<>?/]+)*)$")]],
  
        phone:this.formBuilder.array([
          new FormControl(null,[Validators.required])
        ]),

        // mail:this.formBuilder.group({
        //    email:['',[Validators.required,Validators.email]]
        // }),

        mail:this.formBuilder.array([
          new FormControl(null,[Validators.required])
        ]),


        school:this.formBuilder.group({
           
          schoolName:['',[Validators.required]],
          address:['',[Validators.required]],
          nationality:['',[Validators.required]],
          state:['',[Validators.required]],
          from:['',[Validators.required]],
          to:['',[Validators.required]],
          
        })
    
      })
  }


  onSubmit(){
    console.log('student form', this.studentForm.value);
  }


addPhoneNumber(){

  const control = new FormControl(null,[Validators.required]);
  (<FormArray>this.studentForm.get('phone')).push(control);
}

get  phoneControls(){
  return (<FormArray>this.studentForm.get('phone')).controls;
}

get emailControls(){
  return (<FormArray>this.studentForm.get('mail')).controls;
}

addMail(){
  const emailControl = new FormControl(null,[Validators.required]);
  (<FormArray>this.studentForm.get('mail')).push( emailControl);
}

}
