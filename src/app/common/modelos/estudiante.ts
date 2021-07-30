import { Acudiente } from "./Acudiente";
import { Grupo } from "./grupo";

export class Estudiante {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  createAt: string;
  documento: string;
  estado: string;
  grupo: Grupo;
  acudiente: Acudiente;
  edad: number;
  nacimiento: any;
  parentesco: string;
  desplazado: string;
  foto;
  eps: string;
  ayudas: any[];
  actividades: any[];
  actividadesInac: any[];
  ultimaInasistencia:ultimaInasistencia;
  constructor() {
  }

}
export class ultimaInasistencia{
  fecha:any;
  excusa:any;
  constructor() {
  }

}
