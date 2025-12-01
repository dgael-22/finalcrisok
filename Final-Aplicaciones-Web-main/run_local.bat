@echo off
echo Starting Dress Shop Backend...

REM Set Environment Variables for Local Database (SQLite)
set DB_TYPE=sqlite
set FRONTEND_URL=*

REM Navigate to backend
cd backend

REM Install dependencies if missing
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)

REM Seed database if it doesn't exist
if not exist dress_shop.sqlite (
    echo Initializing SQLite database...
    node seed_sqlite.js
)

REM Start the server
echo Server starting on port 3001...
call npm start
pause
