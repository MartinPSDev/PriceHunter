from sqlalchemy import Column, Integer, String
from app.database.database import Base

class Store(Base):
    __tablename__ = "stores"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    url = Column(String)