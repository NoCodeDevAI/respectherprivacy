# Anonymous Reporting Website: Protecting Girls from Online Exploitation

## 📅 Date
2025-04-29

---

## 🎯 Purpose

This website aims to **raise awareness** and provide a **safe, anonymous space** for girls and young women to report the unauthorized sharing of their private videos or images across platforms like Telegram, Discord, Reddit, and others. 

It addresses the growing issue of **digital exploitation** by offering an easy, non-intrusive way to take the first step toward justice and support.

---

## 🔐 Key Features

### ✅ Anonymous Reporting Form
- No sign-up or login required.
- Fields:
  - **Reported Link** (Telegram/Discord/Reddit, etc.)
  - **Optional Description**
  - **Optional Screenshot Upload**
- Prevents **duplicate submissions** using normalized link checking.
- Stores reports in a secure **Supabase database**.

### 🎨 Emotionally Impactful Design
- Dark, haunting visual theme to reflect seriousness of the issue.
- Hero section text: _“Your Pain Is Not Invisible — Report Anonymously”_
- Visuals and illustrations represent fear, sadness, and helplessness due to online harassment.

### 🧰 Resource & Support Section
- Legal aid links
- Mental health support contacts
- Helpline numbers
- Guides on how to stay safe online and report cybercrime officially

---

## 🧱 Tech Stack

- **Frontend**: Next.js (App Router) with Tailwind CSS
- **Backend**: Supabase
  - Public insert policy enabled
  - Unique constraint on `reported_link` column
  - Optional file storage in `screenshots` bucket
- **Deployment**: Vercel

---

## 🔐 Supabase Setup

### `reports` Table
| Column          | Type     | Notes                              |
|-----------------|----------|------------------------------------|
| id              | UUID     | Primary key                        |
| reported_link   | TEXT     | Unique, required                   |
| description     | TEXT     | Optional                           |
| screenshot_url  | TEXT     | Optional (stored from uploads)     |
| created_at      | TIMESTAMP| Auto-generated                     |

### Row Level Security Policy
```sql
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert"
ON reports FOR INSERT
USING (true);
```

---

## 🚀 Future Improvements

- Admin dashboard for reviewing submitted reports
- Email alert system for new submissions
- AI moderation to detect harmful links
- Multilingual support (starting with Hindi & English)

---

## 💬 Twitter Bio (Emotionally Driven)
> _She trusted the screen. The world betrayed her. We're here to listen, to fight, to protect. Anonymous reporting. Real voices. #HerPainMatters_

---

## 📌 Notes
- This project is built with empathy and urgency.
- It does not collect personal data.
- It is built to empower victims, not exploit trauma.

---

