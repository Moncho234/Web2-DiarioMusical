from sqlalchemy import create_engine  # Módulo para manejar la conexión con la base de datos.
from sqlalchemy.ext.declarative import declarative_base  # Clase base para definir los modelos.
from sqlalchemy.orm import sessionmaker  # Clase para manejar la creación de sesiones.

# URL de conexión a la base de datos SQLite.
SQLALCHEMY_DATABASE_URL = "sqlite:///./diario_practica.db"

# Motor de conexión con SQLite, permite múltiples conexiones (sin "check_same_thread").
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# Clase para manejar sesiones con la base de datos.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base declarativa para definir los modelos de datos.
Base = declarative_base()

# Función para inicializar las tablas en la base de datos.
def init_db():
    Base.metadata.create_all(bind=engine)  # Crea las tablas basándose en los modelos.

# Llama a la función para garantizar que las tablas estén creadas al iniciar la aplicación.
init_db()
