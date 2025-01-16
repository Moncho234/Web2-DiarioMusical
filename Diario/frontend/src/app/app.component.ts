import { Component } from '@angular/core';  // Decorador para definir componentes.
import { CommonModule } from '@angular/common';  // Módulo común de Angular, incluye directivas como ngIf y ngFor.
import { HttpClientModule } from '@angular/common/http';  // Módulo para realizar solicitudes HTTP.
import { PracticasService } from './services/practicas.service';  // Servicio para interactuar con el backend.
import { SessionFormComponent } from './components/session-form/session-form.component';  // Componente para el formulario de sesiones.
import { SessionListComponent } from './components/session-list/session-list.component';  // Componente para la lista de sesiones.

@Component({
  selector: 'app-root',  // Nombre del selector para usar este componente en el HTML.
  standalone: true,  // Permite usar el componente sin declarar un módulo adicional.
  imports: [
    CommonModule,  // Importa funciones básicas de Angular.
    HttpClientModule,  // Permite hacer peticiones HTTP.
    SessionFormComponent,  // Importa el componente del formulario.
    SessionListComponent,  // Importa el componente de la lista.
  ],
  templateUrl: './app.component.html',  // Archivo HTML asociado al componente.
  styleUrls: ['./app.component.css'],  // Estilos CSS asociados al componente.
  providers: [PracticasService],  // Proveedor del servicio "PracticasService".
})
export class AppComponent {
  title = 'Mi Diario de Sesiones';  // Título de la aplicación.
  sesiones: any[] = [];  // Arreglo para almacenar las sesiones cargadas desde el backend.
  mostrarObjetivos = false;  // Control para alternar la vista entre objetivos y sesiones.
  objetivos: { name: string; completed: boolean }[] = [];  // Arreglo para gestionar objetivos.
  progreso = 0;  // Porcentaje de progreso en los objetivos.

  constructor(private practicasService: PracticasService) {  // Inyecta el servicio "PracticasService" para usarlo.
    this.cargarSesiones();  // Llama al método para cargar las sesiones al inicializar el componente.
  }

  // Método para cargar sesiones desde el backend.
  cargarSesiones() {
    this.practicasService.getSesiones().subscribe({
      next: (data) => {  // Si la solicitud es exitosa.
        this.sesiones = data;  // Asigna las sesiones al arreglo.
      },
      error: (error) => {  // Si ocurre un error.
        console.error('Error al cargar las sesiones:', error);
      },
    });
  }

  // Método para añadir una nueva sesión.
  addSesion(nuevaSesion: any) {
    this.practicasService.createSesion(nuevaSesion).subscribe({
      next: (sesionGuardada) => {  // Si la solicitud es exitosa.
        this.sesiones.push(sesionGuardada);  // Agrega la nueva sesión al arreglo de sesiones.
      },
      error: (error) => {  // Si ocurre un error.
        console.error('Error al guardar la sesión:', error);
      },
    });
  }

  // Método para alternar entre la vista de sesiones y objetivos.
  toggleObjetivos() {
    this.mostrarObjetivos = !this.mostrarObjetivos;
  }

  // Método para añadir un objetivo nuevo.
  addObjetivo(name: string) {
    if (name.trim()) {  // Verifica que el nombre no esté vacío.
      this.objetivos.push({ name, completed: false });  // Añade el objetivo como no completado.
      this.updateProgress();  // Actualiza el progreso.
    }
  }

  // Método para calcular y actualizar el progreso de objetivos.
  updateProgress() {
    const totalObjetivos = this.objetivos.length;  // Total de objetivos.
    const completados = this.objetivos.filter((obj) => obj.completed).length;  // Total de objetivos completados.

    // Calcula el porcentaje de progreso basado en objetivos completados.
    this.progreso = totalObjetivos ? Math.round((completados / totalObjetivos) * 100) : 0;
  }

  // Método para alternar el estado de completado de un objetivo.
  toggleCheck(objetivo: any) {
    objetivo.completed = !objetivo.completed;  // Cambia el estado de completado.
    this.updateProgress();  // Actualiza el progreso.
  }
}
