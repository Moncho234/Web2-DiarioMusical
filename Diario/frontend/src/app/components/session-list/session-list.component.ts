import { Component, Input } from '@angular/core';  // Importa decoradores y módulos necesarios para un componente.
import { CommonModule } from '@angular/common';  // Módulo común para directivas como ngFor y ngIf.
import { Sesion } from '../../models/session.model';  // Modelo que define una sesión.

@Component({
  selector: 'app-session-list',  // Nombre del selector para usar este componente en el HTML.
  standalone: true,  // Permite usar el componente sin declararlo en un módulo.
  templateUrl: './session-list.component.html',  // Archivo HTML asociado al componente.
  styleUrls: ['./session-list.component.css'],  // Archivo CSS asociado al componente.
  imports: [CommonModule],  // Importa el módulo común de Angular.
})
export class SessionListComponent {
  @Input() sesiones: Sesion[] = [];  // Define un arreglo de sesiones como entrada al componente.
}
