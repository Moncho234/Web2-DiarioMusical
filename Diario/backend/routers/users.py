from fastapi import APIRouter

router = APIRouter()

@router.get("/users/")
def get_users():
    return {"users": ["Usuario 1", "Usuario 2"]}