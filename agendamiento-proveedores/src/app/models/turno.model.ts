export interface DetalleTurno {
  idProducto: number;
  cantidad: number;
}

export interface Turno {
  idTurno: number;
  fecha: string;
  horaInicioAgendamiento: string;
  horaFinAgendamiento: string;
  idProveedor: number;
  idJaula: number;  // Puede ser opcional hasta que se asigne
  estado: 'pendiente' | 'en recepcion' | 'completado';  // Nuevo campo
  horaInicioRecepcion?: string;  // Nuevo campo, opcional hasta que se inicie la recepción
  horaFinRecepcion?: string;     // Nuevo campo, opcional hasta que se finalice la recepción
  detalles: Array<{ idProducto: number, cantidad: number }>;
}
