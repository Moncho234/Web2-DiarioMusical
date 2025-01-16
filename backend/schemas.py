from pydantic import BaseModel  # Clase base para validar datos.
from datetime import datetime  # Módulo para manejar fechas.
from typing import Optional  # Permite definir campos opcionales.

# Esquema para la respuesta de sesiones (lectura de datos).
class SesionSchema(BaseModel):
    id: int  # ID de la sesión.
    fecha: datetime  # Fecha de la sesión.
    duracion: float  # Duración de la práctica.
    piezas_tecnicas: Optional[str] = None  # Piezas/técnicas (opcional).
    notas: Optional[str] = None  # Notas adicionales (opcional).

    class Config:
        orm_mode = True  # Permite usar este esquema con modelos ORM.

# Esquema para crear una nueva sesión (entrada de datos).
class SesionCreate(BaseModel):
    duracion: float  # Duración de la práctica.
    piezas_tecnicas: Optional[str] = None  # Piezas/técnicas (opcional).
    notas: Optional[str] = None  # Notas adicionales (opcional).
