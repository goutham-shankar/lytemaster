# Python FastAPI Backend

This is a FastAPI-based backend for the Lytemaster project. It provides APIs for managing products, categories, and families, with support for filtering and searching.

---

## Table of Contents

1. [Clone the Repository]
2. [Setup Virtual Environment]
3. [Install Dependencies]
4. [Setup Database Connection]
5. [Run the API]
6. [Project Structure]



## Setup Instructions

Follow these steps to set up the project on your local machine.

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Setup Virtual Environment

Terminal (cd backend)

> > python -m venv myenv

Windows:

> > myenv\Scripts\activate
> > MacOS/Linux:
> > source myenv/bin/activate

### 3. Install Dependencies

> > pip install -r requirements.txt

### 4. Setup Database Connection

Ensure all requirements from `requirements.txt` have been installed
Ensure `.env` file has correct DatabaseURL connection sequence

Then RUN `TestConnection.py` to make sure the database is accessible

### 5. Run the API

> > uvicorn main:app --reload

Once the API is running it can be accessed from:

Swagger UI: Visit http://localhost:8000/docs in your browser.
ReDoc: Visit http://localhost:8000/redoc in your browser.

### 6. Project Structure

backend/
├── Models/ # SQLAlchemy models
├── database.py # Database connection and session management
├── main.py # FastAPI application and endpoints
├── requirements.txt # Project dependencies
├── .env # Environment variables
└── README.md # Project documentation

#### NOTE : If any new dependencies have been added ensure `requirements.txt` has been updated using:

> > pip freeze > requirements.txt
