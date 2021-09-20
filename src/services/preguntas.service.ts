import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preguntas } from 'app/models/preguntas';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  constructor(private http: HttpClient) { }


  getPreguntas(){
    return this.http.get<Preguntas[]>(environment.apiUrl+"/preguntas")
  }
}
