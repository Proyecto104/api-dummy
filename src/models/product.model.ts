export interface Product {
  id?: number;
  idComercio:number;
  nombre: string;
  detalle: string;
  porciones: number;
  disponibles?: number;
  expiracion: string;
  imagen?: string;
}
