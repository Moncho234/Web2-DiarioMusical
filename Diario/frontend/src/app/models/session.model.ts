export interface Sesion {
  id: number;
  fecha: string;
  duracion: number;
  piezas_tecnicas?: string;
  notas?: string;
}

export interface SesionCreate {
  duracion: number;
  piezas_tecnicas?: string;
  notas?: string;
}
