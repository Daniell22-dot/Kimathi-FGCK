import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from database import SessionLocal
from models import Video, Announcement, GalleryImage

db = SessionLocal()

videos = [
    {
        "title": "Today's Sermon",
        "youtube_url": "https://www.youtube.com/live/Up0s_vfDFvM?si=jAdoC15BPeo8s0ET",
        "description": "Sermon for today",
        "is_active": True
    },
    {
        "title": "Today's Bible Study",
        "youtube_url": "https://www.youtube.com/live/UMzDeEy56ww?si=alqq3VsGcPGU_Pn9",
        "description": "Bible study for today",
        "is_active": True
    },
    {
        "title": "Power Thursday - 2 Days Ago",
        "youtube_url": "https://www.youtube.com/live/ipgSEH_5M4w?si=zMOkB_docjlxYx1r",
        "description": "Power Thursday service from 2 days ago",
        "is_active": True
    },
    {
        "title": "Praise and Worship - Today",
        "youtube_url": "https://www.youtube.com/live/Cx9b95WWYIc?si=8x3lJUdcr4VS3bL7",
        "description": "Praise and worship session for today",
        "is_active": True
    },
    {
        "title": "Power Thursday - 30 July 2026",
        "youtube_url": "https://www.youtube.com/live/17zR2E91iEo?si=dTOgQ63RumKK-oZ3",
        "description": "Power Thursday service from 30 July 2026",
        "is_active": True
    }
]

announcements = [
    {
        "title": "Welcome to our new website!",
        "message": "We are excited to announce our new website. Stay tuned for updates and events.",
        "is_active": True
    },
    {
        "title": "Youth Bible Study",
        "message": "Youth Bible study every Friday at 6 PM.",
        "is_active": True
    },
    {
        "title": "Youth Fun Day - 10/10/2026",
        "message": "Join us for the Youth Fun Day on October 10, 2026!",
        "is_active": True
    }
]

gallery_images = [
    {
        "src": "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800",
        "category": "worship",
        "caption": "Sunday Worship Service",
        "title": "Sunday Service"
    },
    {
        "src": "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800",
        "category": "events",
        "caption": "Church Event",
        "title": "Annual Conference"
    },
    {
        "src": "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800",
        "category": "youth",
        "caption": "Youth Fellowship",
        "title": "Youth Meeting"
    }
]

# Seed videos
for v in videos:
    existing = db.query(Video).filter(Video.youtube_url == v["youtube_url"]).first()
    if not existing:
        db.add(Video(**v))

# Seed announcements
for a in announcements:
    existing = db.query(Announcement).filter(Announcement.title == a["title"]).first()
    if not existing:
        db.add(Announcement(**a))

# Seed gallery
for g in gallery_images:
    existing = db.query(GalleryImage).filter(GalleryImage.src == g["src"]).first()
    if not existing:
        db.add(GalleryImage(**g))

db.commit()
db.close()
print("Seed completed successfully!")
