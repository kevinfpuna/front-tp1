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
  idJaula?: number;
  estado: 'pendiente' | 'en recepcion' | 'completado';
  horaInicioRecepcion?: string;
  horaFinRecepcion?: string;
  detalles: Array<DetalleTurno>;
}
