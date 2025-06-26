from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
import smtplib
from email.message import EmailMessage
import os

router = APIRouter()

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

@router.post("/api/contact")
async def send_contact_email(form: ContactForm):
    # Load SMTP credentials from environment variables
    SMTP_HOST = os.environ.get("SMTP_HOST")
    SMTP_PORT = int(os.environ.get("SMTP_PORT", 587))
    SMTP_USER = os.environ.get("SMTP_USER")
    SMTP_PASS = os.environ.get("SMTP_PASS")
    RECEIVER_EMAIL = os.environ.get("RECEIVER_EMAIL", SMTP_USER)

    if not all([SMTP_HOST, SMTP_USER, SMTP_PASS, RECEIVER_EMAIL]):
        raise HTTPException(status_code=500, detail="SMTP configuration is incomplete.")

    # Ensure SMTP_HOST is str (not None) for type checkers
    assert SMTP_HOST is not None

    msg = EmailMessage()
    msg["Subject"] = "Portfolio Contact Form"
    msg["From"] = f"{form.name} <{form.email}>"
    msg["To"] = RECEIVER_EMAIL
    msg.set_content(f"Name: {form.name}\nEmail: {form.email}\n\n{form.message}")

    try:
        # Ensure SMTP_USER and SMTP_PASS are str (not None) for type checkers
        assert SMTP_USER is not None
        assert SMTP_PASS is not None
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.send_message(msg)
        return {"ok": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {e}")