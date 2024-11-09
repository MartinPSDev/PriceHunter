from fastapi import APIRouter, HTTPException
from app.models.user import User
from app.schemas.user import UserCreate
from app.database.database import SessionLocal
from sqlalchemy.orm import Session

router = APIRouter()

@router.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = User(email=user.email, password=user.password) 
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.get("/stores")
def get_stores():
    return [
        {"name": "Mercado Libre", "url": "https://www.mercadolibre.com.ar"},
        {"name": "Amazon", "url": "https://www.amazon.com"},
        
    ]