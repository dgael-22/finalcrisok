@echo off
echo Starting Dress Shop Backend...

REM Set Environment Variables for Aiven Database
set DB_HOST=mysql-45752aa-dgaeltfp005-efcf.g.aivencloud.com
set DB_USER=avnadmin
set DB_PASSWORD=AVNS_WJPH6ZtEiIiPcuhQMyF
set DB_NAME=defaultdb
set DB_PORT=26768
set FRONTEND_URL=*

REM Navigate to backend
cd backend

REM Install dependencies if missing
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)

REM Start the server
echo Server starting on port 3001...
call npm start
pause
