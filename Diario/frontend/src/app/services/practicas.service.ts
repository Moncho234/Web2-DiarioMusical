import { Injectable } from '@angular/core';  // Decorador para marcar una clase como un servicio.
import { HttpClient } from '@angular/common/http';  // Cliente HTTP para realizar solicitudes al backend.
import { Observable } from 'rxjs';  // Módulo para manejar respuestas asincrónicas.

@Injectable({
  providedIn: 'root',  // Define que este servicio estará disponible globalmente en la aplicación.
})
export class PracticasService {
  private baseUrl = 'http://127.0.0.1:8000/sesiones/';  // URL base del backend para las sesiones.

  constructor(private http: HttpClient) { }  // Inyecta el cliente HTTP para usarlo en las solicitudes.

  // Método para obtener todas las sesiones desde el backend.
  getSesiones(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);  // Realiza una solicitud GET al endpoint definido.
  }

  // Método para crear una nueva sesión en el backend.
  createSesion(sesion: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, sesion);  // Realiza una solicitud POST con los datos de la nueva sesión.
  }
}
