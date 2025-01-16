from fastapi import FastAPI, Depends, HTTPException  # Importa la clase principal FastAPI, el sistema de dependencias y manejo de excepciones HTTP.
from fastapi.middleware.cors import CORSMiddleware  # Middleware para manejar políticas de origen cruzado (CORS).
from sqlalchemy.orm import Session  # Módulo para gestionar sesiones de base de datos.
from .database import engine, Base, SessionLocal  # Importa la configuración de la base de datos, la base declarativa y la clase para sesiones.
from .models import Sesion  # Modelo de datos para la tabla de sesiones.
from .schemas import SesionSchema, SesionCreate  # Esquemas para validar y manejar los datos de entrada y salida.

# Crear las tablas en la base de datos, basándose en los modelos definidos en "models.py".
Base.metadata.create_all(bind=engine)

# Inicializa la instancia principal de FastAPI.
app = FastAPI()

# Configuración del middleware CORS para permitir interacciones entre el frontend (Angular) y este backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Permitir solicitudes desde el frontend ejecutándose en localhost:4200.
    allow_credentials=True,  # Permitir envío de cookies y credenciales.
    allow_methods=["*"],  # Permitir todos los métodos HTTP (GET, POST, etc.).
    allow_headers=["*"],  # Permitir todos los encabezados HTTP.
)

# Dependencia que gestiona una sesión de base de datos, garantizando que se cierre al finalizar.
def get_db():
    db = SessionLocal()  # Crea una nueva sesión de base de datos.
    try:
        yield db  # Entrega la sesión al contexto donde se usa.
    finally:
        db.close()  # Cierra la sesión para liberar recursos.

# Ruta POST para crear una nueva sesión de práctica en la base de datos.
@app.post("/sesiones/", response_model=SesionSchema)  # Define que el cuerpo de la respuesta seguirá el esquema "SesionSchema".
def create_sesion(sesion: SesionCreate, db: Session = Depends(get_db)):  # Recibe datos del usuario y una sesión de base de datos.
    db_sesion = Sesion(**sesion.dict())  # Convierte los datos recibidos a una instancia del modelo "Sesion".
    db.add(db_sesion)  # Añade la nueva sesión a la base de datos.
    db.commit()  # Confirma los cambios en la base de datos.
    db.refresh(db_sesion)  # Actualiza la instancia con los datos almacenados en la base.
    return db_sesion  # Devuelve la sesión creada.

# Ruta GET para obtener todas las sesiones almacenadas en la base de datos.
@app.get("/sesiones/", response_model=list[SesionSchema])  # Define que la respuesta será una lista de "SesionSchema".
def read_sesiones(db: Session = Depends(get_db)):  # Usa la dependencia "get_db" para obtener una sesión de base de datos.
    try:
        sesiones = db.query(Sesion).all()  # Consulta todas las filas de la tabla "sesiones".
        return sesiones  # Retorna la lista de sesiones.
    except Exception as e:  # Maneja posibles errores durante la consulta.
        raise HTTPException(status_code=500, detail=f"Error al recuperar las sesiones: {str(e)}")  # Lanza un error HTTP 500.
