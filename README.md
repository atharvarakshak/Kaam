# Project Setup Instructions

This project consists of a React frontend and a Flask backend. Follow the steps below to set up and run the application locally.

---

## Prerequisites

Ensure the following software is installed on your system:
- *Node.js* (latest LTS version recommended)
- *npm* (comes with Node.js)
- *Python 3.7 or higher*
- *pip* (Python package manager)
- A virtual environment manager such as venv (optional but recommended)

---

## Frontend Setup

1. Navigate to the frontend directory:
   bash
   cd frontend
   

2. Install dependencies:
   bash
   npm install
   

3. Start the development server:
   bash
   npm run dev
   

The React application should now be running at http://localhost:3000 (or the port specified in your configuration).

---

## Backend Setup

1. Navigate to the backend directory:
   bash
   cd backend
   

2. (Optional) Create and activate a virtual environment:
   - On macOS/Linux:
     bash
     python3 -m venv venv
     source venv/bin/activate
     
   - On Windows:
     bash
     python -m venv venv
     venv\Scripts\activate
     

3. Install dependencies:
   bash
   pip install -r requirements.txt
   

4. Start the Flask application:
   bash
   python3 app1.py
   

The Flask backend should now be running at http://localhost:5000 (or the port specified in your configuration).

---

## Notes

- Ensure the backend and frontend are running concurrently for full functionality.
- Update the configuration files (e.g., .env, settings.py, or similar) as needed to suit your environment.
- For additional details, refer to the individual documentation in the frontend and backend directories.



![image](https://github.com/user-attachments/assets/9b21621d-f2c7-4958-a528-287185e03635)


![image](https://github.com/user-attachments/assets/22717c7e-ccc0-445f-a0ee-17dbccdb66ab)

