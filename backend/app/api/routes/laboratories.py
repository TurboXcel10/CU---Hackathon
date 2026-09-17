from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_laboratories_placeholder():
    return {"message": "Not implemented yet"}
