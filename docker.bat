@echo off
REM Docker Management Script untuk Gudang Sparepart (Windows)

SET PROJECT_NAME=gudang-sparepart
SET CONTAINER_NAME=gudang-sparepart-app

IF "%1"=="setup" GOTO setup
IF "%1"=="start" GOTO start
IF "%1"=="stop" GOTO stop
IF "%1"=="restart" GOTO restart
IF "%1"=="update" GOTO update
IF "%1"=="rebuild" GOTO rebuild
IF "%1"=="cleanup" GOTO cleanup
IF "%1"=="logs" GOTO logs
IF "%1"=="status" GOTO status
IF "%1"=="shell" GOTO shell
IF "%1"=="artisan" GOTO artisan
GOTO help

:setup
echo [INFO] Setting up for the first time...
docker-compose build --no-cache
docker-compose up -d
timeout /t 5 /nobreak
docker exec %CONTAINER_NAME% chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
echo [SUCCESS] Setup completed!
GOTO end

:start
echo [INFO] Starting containers...
docker-compose up -d
echo [SUCCESS] Containers started!
GOTO end

:stop
echo [INFO] Stopping containers...
docker-compose down
echo [SUCCESS] Containers stopped!
GOTO end

:restart
echo [INFO] Restarting containers...
docker-compose restart
echo [SUCCESS] Containers restarted!
GOTO end

:update
echo [INFO] Updating code without rebuild...
docker exec %CONTAINER_NAME% php artisan config:clear
docker exec %CONTAINER_NAME% php artisan route:clear
docker exec %CONTAINER_NAME% php artisan view:clear
docker exec %CONTAINER_NAME% php artisan cache:clear
docker exec %CONTAINER_NAME% php artisan migrate --force
docker exec %CONTAINER_NAME% php artisan config:cache
docker exec %CONTAINER_NAME% php artisan route:cache
docker exec %CONTAINER_NAME% php artisan view:cache
docker-compose restart
echo [SUCCESS] Code updated!
GOTO end

:rebuild
echo [WARNING] Rebuilding image...
docker-compose down
docker rmi %PROJECT_NAME%_app 2>nul
docker-compose build --no-cache
docker-compose up -d
echo [SUCCESS] Rebuild completed!
GOTO end

:cleanup
echo [WARNING] Cleaning up...
docker-compose down
docker image prune -f
docker volume prune -f
echo [SUCCESS] Cleanup completed!
GOTO end

:logs
docker-compose logs -f --tail=100
GOTO end

:status
docker-compose ps
GOTO end

:shell
docker exec -it %CONTAINER_NAME% bash
GOTO end

:artisan
docker exec %CONTAINER_NAME% php artisan %2 %3 %4 %5 %6
GOTO end

:help
echo Usage: docker.bat [command]
echo.
echo Available commands:
echo   setup          - First time setup (build ^& start)
echo   start          - Start containers
echo   stop           - Stop containers
echo   restart        - Restart containers
echo   update         - Update code without rebuild
echo   rebuild        - Rebuild image (for Dockerfile/dependency changes)
echo   cleanup        - Remove old containers and images
echo   logs           - Show container logs
echo   status         - Show container status
echo   shell          - Access container shell
echo   artisan [cmd]  - Run artisan command
echo.

:end
