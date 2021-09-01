import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'services/auth.service';
import { AreasService } from 'services/areas.service';
import { Areas } from 'app/models/areas';
import { CampanasService } from 'services/campanas.service';
import { Campanas } from 'app/models/campana';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation:ViewEncapsulation.None

})
export class SignupComponent implements OnInit {

  
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  areaList:Areas[]=[]
  listaCampanas:Campanas[]=[]
  constructor(
    public areaService : AreasService,
    public campanaService:CampanasService,
    public authService:AuthService,
    private fb:FormBuilder,
    ) { 
    // this.loginForm=this.fb.group({
    //   email:['',Validators.required],
    //   password:['',Validators.required],
    //   confirm:['',Validators.required],
    //   area:['',Validators.required]
    // })
  }

  // get email() {
  //   return this.loginForm.get('email');
  // }  get password() {
  //   return this.loginForm.get('password');
  // }  get confirm() {
  //   return this.loginForm.get('confirm');
  // }  get area() {
  //   return this.loginForm.get('area');
  // }

  ngOnInit(): void {
    this.getAreas();
    this.getCampanas();
  }

  getCampanas()
  {

    this.campanaService.getCampanas()
    .subscribe((response)=>{
      this.listaCampanas=response
      console.log("listaCampanas : ",this.areaList)

    })

  }


  getAreas(){
    this.areaService.getAreas().subscribe((response)=>{
      for(let i=0;i<response.length;i++)
      {
        this.areaList.push(response[i])
      }
      console.log("Lista Areas : ",this.areaList)
    })
  }

  signUp(area:string,email:string,password:string){
    // const val = this.loginForm.value;

    // if(val.email && val.password ===val.confirm){

      this.authService.signUp(email,password)
      .subscribe(
        ()=>console.log("USER CREATED SUCCESFULLY"),
        console.error
        );
      
      
    // }
  }
  close(){
    
  }
  submit(){
    
  }
}
