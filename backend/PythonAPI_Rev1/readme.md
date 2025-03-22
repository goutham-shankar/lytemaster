# Python FastAPI Backend

This is a FastAPI-based backend for the Lytemaster project. It provides APIs for managing products, categories, and families, with support for filtering and searching.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setup Instructions](#setup-instructions)
3. [Running the Backend](#running-the-backend)
4. [API Documentation](#api-documentation)
5. [Project Structure](#project-structure)
6. [Contributing](#contributing)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8 or higher**: [Download Python](https://www.python.org/downloads/)
- **Git**: [Download Git](https://git-scm.com/downloads)
- **MySQL**: [Download MySQL](https://dev.mysql.com/downloads/) (or another database if configured)

---

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

### 4. Setup Database

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
