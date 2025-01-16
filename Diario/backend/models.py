from sqlalchemy import Column, Integer, String, Float, DateTime  # Importa los tipos de datos usados en las tablas.
from sqlalchemy.sql import func  # Función para manejar operaciones SQL como fechas.
from .database import Base  # Base declarativa para definir el modelo.

# Modelo de datos para la tabla "sesiones".
class Sesion(Base):
    __tablename__ = 'sesiones'  # Nombre de la tabla en la base de datos.

    id = Column(Integer, primary_key=True, index=True)  # Columna de clave primaria.
    fecha = Column(DateTime, default=func.now())  # Columna de fecha, con valor predeterminado "ahora".
    duracion = Column(Float)  # Columna para la duración de la práctica.
    piezas_tecnicas = Column(String, nullable=True)  # Columna opcional para piezas/técnicas practicadas.
    notas = Column(String, nullable=True)  # Columna opcional para notas adicionales.
