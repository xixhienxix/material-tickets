import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Areas } from 'app/models/areas';
import { Plantel } from 'app/models/plantel';
import { Usuario } from 'app/models/usuario';
import { AreasService } from 'services/areas.service';
import { PlantelesService } from 'services/planteles.service';
import { UsuarioService } from 'services/usuario.service';
import { AlertsComponent } from '../alerts/alerts.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  /**Models */
  areaList:Areas[]=[]
  plantelesList:Plantel[]=[]
  rolList=['Administrador','Usuario','Supervisor']
  max:number=0;
  usuarioExistente:boolean=false
  /**Forms */
  formGroup:FormGroup
  /**Display */
  actualizaUser:boolean=false
  isLoading:boolean=false

  constructor(
    public usuariosService:UsuarioService,
    public areasService:AreasService,
    public fb:FormBuilder,
    public plantelesService:PlantelesService,
    public modal:NgbModal
  ) { }

  ngOnInit() {
    this.initForm()
    this.getID()
    this.getAreas()
    this.getPlanteles();
  }

  initForm(){
    this.formGroup = this.fb.group({
      Nombre:['',Validators.required],
      Area:['',Validators.required],
      Rol:['',Validators.required],
      Password:['',Validators.required],
      Plantel:['',Validators.required],
      Puesto:['',Validators.required],
    })
  }

 get getFormValue () {
   return this.formGroup.controls
 }

  getID(){
    this.usuariosService.getUsuarios().subscribe(
      (value)=>{
        console.log(value)
        const ids = value.map(valor=>{return valor.ID})
        this.max =  Math.max(...ids)
      },
      (error)=>{}
      )
  }

  getAreas(){
    this.areasService.getAreas().subscribe(
      (value)=>{
        for(let i =0;i<value.length;i++){
          this.areaList.push(value[i])
        }
      },
      (error)=>{
        console.log(error)
      })
  }

  getPlanteles() {
    this.plantelesService.getPlanteles().subscribe(
      (value)=>{
        if(value){
          this.plantelesList=value
        }
      },
      ()=>{}
      )
  }

  buscarUsuario(email:string){
    this.isLoading=true
    // let usuario=this.formGroup.controls['Usuario'].value
    this.usuariosService.getUsuariosByEmail(email).subscribe(
      (value:Usuario[])=>{
        if(value.length!=0)
        {
          console.log(value)
          this.actualizaUser=true
          this.formGroup.controls['Nombre'].patchValue(value[0].Nombre)
          this.formGroup.controls['Area'].patchValue(value[0].Area)
          this.formGroup.controls['Rol'].patchValue(value[0].Rol)
          this.formGroup.controls['Password'].patchValue(value[0].Password)
          this.formGroup.controls['Plantel'].patchValue(value[0].plantel)
          this.formGroup.controls['Puesto'].patchValue(value[0].Puesto)
        }
        else {
          this.formGroup.reset()

        }
        this.isLoading=false
      },
      (error)=>{
        this.isLoading=false

        console.log(error)

      })
    }

    agregarUsuario(email:string){
      this.isLoading=true;

        if(this.formGroup.valid)
        {
          let usuario = {
          
          Nombre:      this.getFormValue.Nombre.value,
          Area:      this.getFormValue.Area.value,
          Rol:      this.getFormValue.Rol.value,
          Usuario:      email,
          Password:      this.getFormValue.Password.value,
          plantel:      this.getFormValue.Plantel.value,
          Puesto:      this.getFormValue.Puesto.value,
          
        }
        this.usuariosService.agregarUsuario(usuario).subscribe(
        (value)=>{
          if(value){
            console.log(value)
            this.isLoading=false
            const modalRef=this.modal.open(AlertsComponent,{size:'sm'})
            modalRef.componentInstance.alertHeader='Exito'
            modalRef.componentInstance.mensaje='Usuario actualizado con exito'
            this.formGroup.reset()
          }
        },
        (error)=>{
          if(error)
            {        
              console.log(error)
              const modalRef=this.modal.open(AlertsComponent,{size:'sm'})
              modalRef.componentInstance.alertHeader='Error'
              modalRef.componentInstance.mensaje='No se pudo actualizar al usuario intente de nuevo mas tarde'
            }
            this.isLoading=false

        })
      }
      else 
      {
        this.isLoading=false
        return
      }
    }  



}
