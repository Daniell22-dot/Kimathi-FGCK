from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from database import SessionLocal, engine
from models import Base, Announcement, Magazine, LibraryItem, Advertisement, GalleryImage
from schemas import AnnouncementCreate, MagazineCreate, LibraryItemCreate, AdvertisementCreate, GalleryImageCreate
import os
import shutil

Base.metadata.create_all(bind=engine)

router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="admin/token")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_admin(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return username

@router.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    admin_username = os.getenv("ADMIN_USERNAME", "admin")
    admin_password = os.getenv("ADMIN_PASSWORD", "admin123")
    
    if form_data.username != admin_username or form_data.password != admin_password:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = jwt.encode(
        {"sub": form_data.username, "exp": datetime.utcnow() + access_token_expires},
        SECRET_KEY,
        algorithm=ALGORITHM,
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Announcements
@router.get("/announcements")
def get_all_announcements(db: Session = Depends(get_db), current_user: str = Depends(get_current_admin)):
    return db.query(Announcement).order_by(Announcement.created_at.desc()).all()

@router.post("/announcements")
def create_announcement(item: AnnouncementCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_admin)):
    db_item = Announcement(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/announcements/{item_id}")
def update_announcement(item_id: int, item: AnnouncementCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_admin)):
    db_item = db.query(Announcement).filter(Announcement.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Not found")
    for key, value in item.dict().items():
        setattr(db_item, key, value)
    db.commit()
    return db_item

@router.delete("/announcements/{item_id}")
def delete_announcement(item_id: int, db: Session = Depends(get_db), current_user: str = Depends(get_current_admin)):
    db_item = db.query(Announcement).filter(Announcement.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(db_item)
    db.commit()
    return {"ok": True}

# Magazines
@router.get("/magazines")
def get_all_magazines(db: Session = Depends(get_db), current_user: str = Depends(get_current_admin)):
    return db.query(Magazine).order_by(Magazine.published_at.desc()).all()

@router.post("/magazines")
def create_magazine(item: MagazineCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_admin)):
    db_item = Magazine(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/magazines/{item_id}")
def update_magazine(item_id: int, item: MagazineCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_admin)):
    db_item = db.query(Magazine).filter(Magazine.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Not found")
    for key, value in item.dict().items():
        setattr(db_item, key, value)
    db.commit()
    return db_item

@router.delete("/magazines/{item_id}")
def delete_magazine(item_id: int, db: Session = Depends(get_db), current_user: str = Depends(get_current_admin)):
    db_item = db.query(Magazine).filter(Magazine.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(db_item)
    db.commit()
    return {"ok": True}

# Library
@router.get("/library")
def get_all_library(db: Session = Depends(get_db), current_user: str = Depends(get_current_admin)):
    return db.query(LibraryItem).order_by(LibraryItem.created_at.desc()).all()

@router.post("/library")
def create_library_item(item: LibraryItemCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_admin)):
    db_item = LibraryItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/library/{item_id}")
def update_library_item(item_id: int, item: LibraryItemCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_admin)):
    db_item = db.query(LibraryItem).filter(LibraryItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Not found")
    for key, value in item.dict().items():
        setattr(db_item, key, value)
    db.commit()
    return db_item

@router.delete("/library/{item_id}")
def delete_library_item(item_id: int, db: Session = Depends(get_db), current_user: str = Depends(get_current_admin)):
    db_item = db.query(LibraryItem).filter(LibraryItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(db_item)
    db.commit()
    return {"ok": True}

# Advertisements
@router.get("/advertisements")
def get_all_advertisements(db: Session = Depends(get_db), current_user: str = Depends(get_current_admin)):
    return db.query(Advertisement).order_by(Advertisement.created_at.desc()).all()

@router.post("/advertisements")
def create_advertisement(item: AdvertisementCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_admin)):
    db_item = Advertisement(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/advertisements/{item_id}")
def update_advertisement(item_id: int, item: AdvertisementCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_admin)):
    db_item = db.query(Advertisement).filter(Advertisement.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Not found")
    for key, value in item.dict().items():
        setattr(db_item, key, value)
    db.commit()
    return db_item

@router.delete("/advertisements/{item_id}")
def delete_advertisement(item_id: int, db: Session = Depends(get_db), current_user: str = Depends(get_current_admin)):
    db_item = db.query(Advertisement).filter(Advertisement.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(db_item)
    db.commit()
    return {"ok": True}

# Gallery
@router.get("/gallery")
def get_all_gallery(db: Session = Depends(get_db), current_user: str = Depends(get_current_admin)):
    return db.query(GalleryImage).order_by(GalleryImage.created_at.desc()).all()

@router.post("/gallery")
def create_gallery_image(item: GalleryImageCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_admin)):
    db_item = GalleryImage(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/gallery/{item_id}")
def update_gallery_image(item_id: int, item: GalleryImageCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_admin)):
    db_item = db.query(GalleryImage).filter(GalleryImage.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Not found")
    for key, value in item.dict().items():
        setattr(db_item, key, value)
    db.commit()
    return db_item

@router.delete("/gallery/{item_id}")
def delete_gallery_image(item_id: int, db: Session = Depends(get_db), current_user: str = Depends(get_current_admin)):
    db_item = db.query(GalleryImage).filter(GalleryImage.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(db_item)
    db.commit()
    return {"ok": True}

# Upload
@router.post("/upload")
async def upload_file(file: UploadFile = File(...), current_user: str = Depends(get_current_admin)):
    file_location = os.path.join("backend/uploads", file.filename)
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"file_url": f"/uploads/{file.filename}"}
