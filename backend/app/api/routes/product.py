from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_product_placeholder():
    return {"message": "Not implemented yet"}
