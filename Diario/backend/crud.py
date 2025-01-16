from sqlalchemy.orm import Session  # Importa la clase para manejar sesiones de base de datos.
from . import models, schemas  # Importa los modelos y esquemas definidos en el proyecto.

# Función para obtener todos los usuarios (actualmente no se usa en este proyecto).
def get_users(db: Session):
    return db.query(models.User).all()  # Consulta todas las filas de la tabla "users".
