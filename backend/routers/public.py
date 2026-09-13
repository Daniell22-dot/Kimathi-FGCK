from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base, Announcement, Magazine, LibraryItem, Advertisement, GalleryImage, Video
from schemas import AnnouncementCreate, MagazineCreate, LibraryItemCreate, AdvertisementCreate, GalleryImageCreate, VideoCreate
import os
import shutil
import requests
from datetime import datetime
from fastapi.responses import JSONResponse

Base.metadata.create_all(bind=engine)

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

UPLOAD_DIR = "backend/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Announcements
@router.get("/announcements")
def get_announcements(db: Session = Depends(get_db)):
    return db.query(Announcement).filter(Announcement.is_active == True).order_by(Announcement.created_at.desc()).all()

@router.post("/announcements")
def create_announcement(item: AnnouncementCreate, db: Session = Depends(get_db)):
    db_item = Announcement(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/announcements/{item_id}")
def update_announcement(item_id: int, item: AnnouncementCreate, db: Session = Depends(get_db)):
    db_item = db.query(Announcement).filter(Announcement.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Not found")
    for key, value in item.dict().items():
        setattr(db_item, key, value)
    db.commit()
    return db_item

@router.delete("/announcements/{item_id}")
def delete_announcement(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(Announcement).filter(Announcement.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(db_item)
    db.commit()
    return {"ok": True}

# Magazines
@router.get("/magazines")
def get_magazines(db: Session = Depends(get_db)):
    return db.query(Magazine).filter(Magazine.is_published == True).order_by(Magazine.published_at.desc()).all()

@router.post("/magazines")
def create_magazine(item: MagazineCreate, db: Session = Depends(get_db)):
    db_item = Magazine(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/magazines/{item_id}")
def update_magazine(item_id: int, item: MagazineCreate, db: Session = Depends(get_db)):
    db_item = db.query(Magazine).filter(Magazine.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Not found")
    for key, value in item.dict().items():
        setattr(db_item, key, value)
    db.commit()
    return db_item

@router.delete("/magazines/{item_id}")
def delete_magazine(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(Magazine).filter(Magazine.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(db_item)
    db.commit()
    return {"ok": True}

# Library
@router.get("/library")
def get_library(db: Session = Depends(get_db)):
    return db.query(LibraryItem).order_by(LibraryItem.created_at.desc()).all()

@router.post("/library")
def create_library_item(item: LibraryItemCreate, db: Session = Depends(get_db)):
    db_item = LibraryItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/library/{item_id}")
def update_library_item(item_id: int, item: LibraryItemCreate, db: Session = Depends(get_db)):
    db_item = db.query(LibraryItem).filter(LibraryItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Not found")
    for key, value in item.dict().items():
        setattr(db_item, key, value)
    db.commit()
    return db_item

@router.delete("/library/{item_id}")
def delete_library_item(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(LibraryItem).filter(LibraryItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(db_item)
    db.commit()
    return {"ok": True}

# Advertisements
@router.get("/advertisements")
def get_advertisements(db: Session = Depends(get_db)):
    return db.query(Advertisement).filter(Advertisement.is_active == True).all()

@router.post("/advertisements")
def create_advertisement(item: AdvertisementCreate, db: Session = Depends(get_db)):
    db_item = Advertisement(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/advertisements/{item_id}")
def update_advertisement(item_id: int, item: AdvertisementCreate, db: Session = Depends(get_db)):
    db_item = db.query(Advertisement).filter(Advertisement.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Not found")
    for key, value in item.dict().items():
        setattr(db_item, key, value)
    db.commit()
    return db_item

@router.delete("/advertisements/{item_id}")
def delete_advertisement(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(Advertisement).filter(Advertisement.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(db_item)
    db.commit()
    return {"ok": True}

# Gallery
@router.get("/gallery")
def get_gallery(db: Session = Depends(get_db)):
    return db.query(GalleryImage).order_by(GalleryImage.created_at.desc()).all()

@router.post("/gallery")
def create_gallery_image(item: GalleryImageCreate, db: Session = Depends(get_db)):
    db_item = GalleryImage(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/gallery/{item_id}")
def update_gallery_image(item_id: int, item: GalleryImageCreate, db: Session = Depends(get_db)):
    db_item = db.query(GalleryImage).filter(GalleryImage.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Not found")
    for key, value in item.dict().items():
        setattr(db_item, key, value)
    db.commit()
    return db_item

@router.delete("/gallery/{item_id}")
def delete_gallery_image(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(GalleryImage).filter(GalleryImage.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(db_item)
    db.commit()
    return {"ok": True}

# Videos
@router.get("/videos")
def get_videos(db: Session = Depends(get_db)):
    return db.query(Video).filter(Video.is_active == True).order_by(Video.created_at.desc()).all()

@router.post("/videos")
def create_video(item: VideoCreate, db: Session = Depends(get_db)):
    db_item = Video(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/videos/{item_id}")
def update_video(item_id: int, item: VideoCreate, db: Session = Depends(get_db)):
    db_item = db.query(Video).filter(Video.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Not found")
    for key, value in item.dict().items():
        setattr(db_item, key, value)
    db.commit()
    return db_item

@router.delete("/videos/{item_id}")
def delete_video(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(Video).filter(Video.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(db_item)
    db.commit()
    return {"ok": True}

# Upload endpoint
@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_location = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"file_url": f"/uploads/{file.filename}"}

# Directions endpoint (proxies OpenRouteService)
@router.get("/directions")
def get_directions(start: str, end: str):
    ors_key = os.getenv("ORS_KEY")
    if not ors_key:
        raise HTTPException(status_code=500, detail="ORS_KEY not configured")

    url = "https://api.openrouteservice.org/v2/directions/driving-car"
    headers = {"Authorization": ors_key, "Content-Type": "application/json"}
    body = {
        "coordinates": [
            [float(coord) for coord in start.split(",")],
            [float(coord) for coord in end.split(",")]
        ],
        "format": "geojson"
    }

    try:
        ors_res = requests.post(url, json=body, headers=headers, timeout=15)
        ors_res.raise_for_status()
        data = ors_res.json()
        feature = data["features"][0]
        props = feature["properties"]
        coords = feature["geometry"]["coordinates"]
        return {
            "distance": props["summary"]["distance"],
            "duration": props["summary"]["duration"],
            "coordinates": coords,
            "steps": props["segments"][0]["steps"]
        }
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Directions service error: {str(e)}")
