#!/bin/bash

# Docker Management Script untuk Gudang Sparepart
# Pastikan chmod +x docker.sh sebelum digunakan

set -e

PROJECT_NAME="gudang-sparepart"
CONTAINER_NAME="gudang-sparepart-app"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

echo_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

echo_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Function: First time setup
first_time_setup() {
    echo_info "Setting up for the first time..."
    
    # Build image
    docker-compose build --no-cache
    
    # Start containers
    docker-compose up -d
    
    # Wait for container to be ready
    sleep 5
    
    # Set permissions
    docker exec $CONTAINER_NAME chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
    
    echo_success "Setup completed! Application is running."
}

# Function: Start aplikasi (jika sudah pernah setup)
start() {
    echo_info "Starting containers..."
    docker-compose up -d
    echo_success "Containers started!"
}

# Function: Stop aplikasi
stop() {
    echo_info "Stopping containers..."
    docker-compose down
    echo_success "Containers stopped!"
}

# Function: Restart aplikasi
restart() {
    echo_info "Restarting containers..."
    docker-compose restart
    echo_success "Containers restarted!"
}

# Function: Update kode tanpa rebuild
update_code() {
    echo_info "Updating code without rebuild..."
    
    # Clear caches
    docker exec $CONTAINER_NAME php artisan config:clear
    docker exec $CONTAINER_NAME php artisan route:clear
    docker exec $CONTAINER_NAME php artisan view:clear
    docker exec $CONTAINER_NAME php artisan cache:clear
    
    # Run migrations
    docker exec $CONTAINER_NAME php artisan migrate --force
    
    # Rebuild caches
    docker exec $CONTAINER_NAME php artisan config:cache
    docker exec $CONTAINER_NAME php artisan route:cache
    docker exec $CONTAINER_NAME php artisan view:cache
    
    # Restart PHP-FPM
    docker-compose restart
    
    echo_success "Code updated successfully!"
}

# Function: Rebuild image (jika ada perubahan Dockerfile/dependencies)
rebuild() {
    echo_warning "Rebuilding image (this will take a while)..."
    
    # Stop containers
    docker-compose down
    
    # Remove old image
    docker rmi ${PROJECT_NAME}_app 2>/dev/null || true
    
    # Build new image
    docker-compose build --no-cache
    
    # Start containers
    docker-compose up -d
    
    echo_success "Rebuild completed!"
}

# Function: Clean up (hapus container lama)
cleanup() {
    echo_warning "Cleaning up old containers and images..."
    
    # Stop and remove containers
    docker-compose down
    
    # Remove unused images
    docker image prune -f
    
    # Remove unused volumes (HATI-HATI: ini hapus volume yang tidak dipakai)
    docker volume prune -f
    
    echo_success "Cleanup completed!"
}

# Function: Logs
logs() {
    docker-compose logs -f --tail=100
}

# Function: Laravel logs
laravel_logs() {
    docker exec $CONTAINER_NAME tail -f /var/www/storage/logs/laravel.log
}

# Function: Status
status() {
    echo_info "Container Status:"
    docker-compose ps
}

# Function: Shell access
shell() {
    echo_info "Opening shell in container..."
    docker exec -it $CONTAINER_NAME bash
}

# Function: Run artisan command
artisan() {
    docker exec $CONTAINER_NAME php artisan "$@"
}

# Function: Run composer
composer() {
    docker exec $CONTAINER_NAME composer "$@"
}

# Show help
show_help() {
    echo "Usage: ./docker.sh [command]"
    echo ""
    echo "Available commands:"
    echo "  setup          - First time setup (build & start)"
    echo "  start          - Start containers"
    echo "  stop           - Stop containers"
    echo "  restart        - Restart containers"
    echo "  update         - Update code without rebuild"
    echo "  rebuild        - Rebuild image (for Dockerfile/dependency changes)"
    echo "  cleanup        - Remove old containers and images"
    echo "  logs           - Show container logs"
    echo "  laravel-logs   - Show Laravel application logs"
    echo "  status         - Show container status"
    echo "  shell          - Access container shell"
    echo "  artisan [cmd]  - Run artisan command"
    echo "  composer [cmd] - Run composer command"
    echo ""
}

# Main script
case "$1" in
    setup)
        first_time_setup
        ;;
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        ;;
    update)
        update_code
        ;;
    rebuild)
        rebuild
        ;;
    cleanup)
        cleanup
        ;;
    logs)
        logs
        ;;
    laravel-logs)
        laravel_logs
        ;;
    status)
        status
        ;;
    shell)
        shell
        ;;
    artisan)
        shift
        artisan "$@"
        ;;
    composer)
        shift
        composer "$@"
        ;;
    *)
        show_help
        ;;
esac
