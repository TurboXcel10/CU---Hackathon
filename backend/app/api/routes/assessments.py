from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_assessments_placeholder():
    return {"message": "Not implemented yet"}
