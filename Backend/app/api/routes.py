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
    stores = {
        "Argentina": [
            {"name": "Mercado Libre", "url": "https://www.mercadolibre.com.ar"},
            {"name": "Frávega", "url": "https://www.fravega.com"},
            {"name": "Garbarino", "url": "https://www.garbarino.com"},
            {"name": "Coto", "url": "https://www.coto.com.ar"},
            {"name": "Carrefour", "url": "https://www.carrefour.com.ar"},
            {"name": "Chango Mas", "url": "https://www.changomas.com.ar"},
            {"name": "Disco", "url": "https://www.disco.com.ar"},
            {"name": "Día", "url": "https://www.diaonline.com.ar/"},
            {"name": "Jumbo", "url": "https://www.jumbo.com.ar"},
            {"name": "Musimundo", "url": "https://www.musimundo.com"},
            {"name": "Vea", "url": "https://www.vea.com.ar"},
            {"name": "Walmart", "url": "https://www.walmart.com/browse/argentina"},
        ],
        "Chile": [
            {"name": "Jumbo", "url": "https://www.jumbo.cl"},
            {"name": "Líder", "url": "https://www.lider.cl"},
            {"name": "Falabella", "url": "https://www.falabella.cl"},
            
        ],
        "México": [
            {"name": "Walmart", "url": "https://www.walmart.com.mx"},
            {"name": "Soriana", "url": "https://www.soriana.com"},
            {"name": "Elektra", "url": "https://www.elektra.com.mx"},
            
        ],
        
    }
    return stores