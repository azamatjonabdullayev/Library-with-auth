# Kitoblar boshqaruv tizimi

## Loyiha ta'rifi

Ushbu loyiha kitoblarni saqlash, ro'yxatdan o'tgan foydalanuvchilar orqali ularni boshqarish va ruxsat berilgan foydalanuvchilar tomonidan yangi kitoblar qo'shish imkoniyatini beradi.

## Ma'lumotlar bazasi sxemasi (PostgreSQL)

### Users jadvali

| Maydon     | Turi         | Qo'shimcha                            |
| ---------- | ------------ | ------------------------------------- |
| id         | serial       | primary key                           |
| username   | varchar(50)  | not null, unique                      |
| email      | varchar(100) | not null, unique                      |
| password   | varchar(255) | not null (hash qilingan)              |
| role       | varchar(10)  | not null, default 'user' (admin/user) |
| created_at | timestamp    | default current_timestamp             |

### Books jadvali

| Maydon      | Turi         | Qo'shimcha                 |
| ----------- | ------------ | -------------------------- |
| id          | serial       | primary key                |
| title       | varchar(100) | not null                   |
| author      | varchar(100) | not null                   |
| description | text         |                            |
| year        | integer      |                            |
| user_id     | integer      | foreign key to users table |
| created_at  | timestamp    | default current_timestamp  |

## API Endpointlar

### 1. Authentication

#### POST /api/auth/register

**Request body:**

```json
{
  "username": "test_user",
  "email": "test@example.com",
  "password": "password123"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi",
  "user": {
    "id": 1,
    "username": "test_user",
    "email": "test@example.com",
    "role": "user",
    "created_at": "2025-03-26T12:00:00Z"
  }
}
```

#### POST /api/auth/login

**Request body:**

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Login muvaffaqiyatli",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Books API

#### GET /api/books

Barcha kitoblarni olish (token talab qilinadi)

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**

```json
{
  "success": true,
  "count": 2,
  "books": [
    {
      "id": 1,
      "title": "O'tkan kunlar",
      "author": "Abdulla Qodiriy",
      "description": "Romanda tarixiy voqealar tasvirlangan",
      "year": 1925,
      "user_id": 1,
      "created_at": "2025-03-26T12:10:00Z"
    },
    {
      "id": 2,
      "title": "Ufq",
      "author": "Said Ahmad",
      "description": "Urush davri haqida hikoya",
      "year": 1964,
      "user_id": 1,
      "created_at": "2025-03-26T12:15:00Z"
    }
  ]
}
```

#### POST /api/books

Yangi kitob qo'shish (faqat autorizatsiyadan o'tgan foydalanuvchilar uchun)

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request body:**

```json
{
  "title": "Sariq devni minib",
  "author": "Xudoyberdi To'xtaboyev",
  "description": "Bolalar uchun sarguzasht asar",
  "year": 1975
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Kitob muvaffaqiyatli qo'shildi",
  "book": {
    "id": 3,
    "title": "Sariq devni minib",
    "author": "Xudoyberdi To'xtaboyev",
    "description": "Bolalar uchun sarguzasht asar",
    "year": 1975,
    "user_id": 1,
    "created_at": "2025-03-26T12:20:00Z"
  }
}
```

#### GET /api/books/:id

Bitta kitob ma'lumotlarini olish

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**

```json
{
  "success": true,
  "book": {
    "id": 1,
    "title": "O'tkan kunlar",
    "author": "Abdulla Qodiriy",
    "description": "Romanda tarixiy voqealar tasvirlangan",
    "year": 1925,
    "user_id": 1,
    "created_at": "2025-03-26T12:10:00Z"
  }
}
```

#### PUT /api/books/:id

Kitobni yangilash (faqat kitobni yaratgan foydalanuvchi yoki admin uchun)

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request body:**

```json
{
  "title": "O'tkan kunlar (yangilangan)",
  "description": "O'zbek adabiyotining eng mashhur asarlaridan biri"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Kitob muvaffaqiyatli yangilandi",
  "book": {
    "id": 1,
    "title": "O'tkan kunlar (yangilangan)",
    "author": "Abdulla Qodiriy",
    "description": "O'zbek adabiyotining eng mashhur asarlaridan biri",
    "year": 1925,
    "user_id": 1,
    "created_at": "2025-03-26T12:10:00Z",
    "updated_at": "2025-03-26T13:15:00Z"
  }
}
```

#### DELETE /api/books/:id

Kitobni o'chirish (faqat kitobni yaratgan foydalanuvchi yoki admin uchun)

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Kitob muvaffaqiyatli o'chirildi"
}
```

## Texnologiyalar

1. **Node.js va Express.js** - backend uchun
2. **PostgreSQL** - ma'lumotlar bazasi uchun
3. **JWT (jsonwebtoken)** - autentifikatsiya uchun
4. **bcrypt** - parollarni hash qilish uchun

## Loyihada qo'llanilishi kerak bo'lgan middleware'lar

1. **Authentication middleware** - JWT token tekshirish
2. **Foydalanuvchi huquqlarini tekshirish middleware'i** - permission checking
3. **Error handling middleware** - xatolarni qayta ishlash
4. **Request validation middleware** - so'rovlarni validatsiya qilish
