import { Component, Output, EventEmitter } from '@angular/core';  // Importa módulos necesarios para manejar eventos.
import { FormsModule } from '@angular/forms';  // Permite usar formularios reactivos.

@Component({
  selector: 'app-session-form',  // Nombre del selector para usar este componente en el HTML.
  standalone: true,  // Permite usar el componente sin declararlo en un módulo.
  imports: [FormsModule],  // Importa el módulo de formularios.
  templateUrl: './session-form.component.html',  // Archivo HTML asociado al componente.
  styleUrls: ['./session-form.component.css'],  // Archivo CSS asociado al componente.
})
export class SessionFormComponent {
  duracion: number = 0;  // Duración de la práctica inicializada en 0.
  piezas_tecnicas: string = '';  // Cadena para almacenar piezas técnicas.
  notas: string = '';  // Cadena para almacenar notas.

  @Output() addSesion = new EventEmitter<any>();  // Evento para enviar datos al componente padre.

  // Método para procesar el formulario.
  submitForm() {
    const nuevaSesion = {
      duracion: this.duracion,  // Captura la duración.
      piezas_tecnicas: this.piezas_tecnicas,  // Captura las piezas técnicas.
      notas: this.notas,  // Captura las notas.
    };
    this.addSesion.emit(nuevaSesion);  // Emite la nueva sesión al componente padre.
    this.limpiarFormulario();  // Limpia el formulario.
  }

  // Método para limpiar los campos del formulario.
  limpiarFormulario() {
    this.duracion = 0;
    this.piezas_tecnicas = '';
    this.notas = '';
  }
}
