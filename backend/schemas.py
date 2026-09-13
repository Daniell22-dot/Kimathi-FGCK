from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class AnnouncementBase(BaseModel):
    title: str
    message: str
    is_active: bool = True

class AnnouncementCreate(AnnouncementBase):
    pass

class Announcement(AnnouncementBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class MagazineBase(BaseModel):
    title: str
    description: Optional[str] = None
    file_url: str
    cover_image_url: Optional[str] = None
    is_published: bool = True

class MagazineCreate(MagazineBase):
    pass

class Magazine(MagazineBase):
    id: int
    published_at: datetime

    class Config:
        from_attributes = True

class LibraryItemBase(BaseModel):
    title: str
    author: Optional[str] = None
    description: Optional[str] = None
    file_url: Optional[str] = None
    category: str = "books"

class LibraryItemCreate(LibraryItemBase):
    pass

class LibraryItem(LibraryItemBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class AdvertisementBase(BaseModel):
    title: str
    description: Optional[str] = None
    image_url: str
    link_url: Optional[str] = None
    is_active: bool = True
    position: str = "sidebar"

class AdvertisementCreate(AdvertisementBase):
    pass

class Advertisement(AdvertisementBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class GalleryImageBase(BaseModel):
    src: str
    category: str
    caption: Optional[str] = None
    title: Optional[str] = None

class GalleryImageCreate(GalleryImageBase):
    pass

class GalleryImage(GalleryImageBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class VideoBase(BaseModel):
    title: str
    youtube_url: str
    description: Optional[str] = None
    is_active: bool = True

class VideoCreate(VideoBase):
    pass

class Video(VideoBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
