import { Acudiente } from "./Acudiente";
import { Grupo } from "./grupo";

export class Estudiante {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  createAt: string;
  documento: string;
  estado:string;
  grupo:Grupo;
  acudiente:Acudiente;
  edad:number;
  nacimiento:any;

  constructor(){
  }
}
