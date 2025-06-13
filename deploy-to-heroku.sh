#!/bin/bash

# Estonian Anagram Finder Frontend - Heroku Deployment Script
# Author: Estonian Language Community
# Description: Automated deployment script for the React frontend

set -e  # Exit on error

echo "🇪🇪 Estonian Anagram Finder Frontend - Heroku Deployment"
echo "========================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="estonian-anagram-frontend"
HEROKU_REMOTE="heroku"
API_URL="https://anagram-finder-api-9dc5f9cdb303.herokuapp.com/api/v1"

# Functions
print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Heroku CLI is installed
check_heroku_cli() {
    print_step "Checking Heroku CLI installation..."
    if ! command -v heroku &> /dev/null; then
        print_error "Heroku CLI is not installed. Please install it first:"
        echo "Visit: https://devcenter.heroku.com/articles/heroku-cli"
        exit 1
    fi
    print_success "Heroku CLI is installed"
}

# Check if user is logged in to Heroku
check_heroku_login() {
    print_step "Checking Heroku authentication..."
    if ! heroku whoami &> /dev/null; then
        print_error "You are not logged in to Heroku. Please run:"
        echo "heroku login"
        exit 1
    fi
    print_success "Logged in to Heroku as $(heroku whoami)"
}

# Check if Git repo is initialized
check_git_repo() {
    print_step "Checking Git repository..."
    if [ ! -d ".git" ]; then
        print_warning "Git repository not found. Initializing..."
        git init
        git add .
        git commit -m "Initial commit - Estonian Anagram Finder Frontend"
    fi
    print_success "Git repository ready"
}

# Create Heroku app
create_heroku_app() {
    print_step "Creating Heroku app..."
    
    # Check if app already exists
    if heroku apps:info $APP_NAME &> /dev/null; then
        print_warning "App '$APP_NAME' already exists"
        read -p "Do you want to use the existing app? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_step "Please choose a different app name:"
            read -p "Enter new app name: " APP_NAME
            heroku create $APP_NAME
        fi
    else
        heroku create $APP_NAME
        print_success "Created Heroku app: $APP_NAME"
    fi
}

# Configure environment variables
configure_env_vars() {
    print_step "Configuring environment variables..."
    
    heroku config:set VITE_API_BASE_URL="$API_URL" -a $APP_NAME
    heroku config:set NODE_ENV=production -a $APP_NAME
    
    print_success "Environment variables configured"
}

# Deploy to Heroku
deploy_to_heroku() {
    print_step "Deploying to Heroku..."
    
    # Add Heroku remote if it doesn't exist
    if ! git remote | grep -q heroku; then
        heroku git:remote -a $APP_NAME
    fi
    
    # Deploy
    git add .
    git commit -m "Deploy Estonian Anagram Finder Frontend $(date)" || true
    git push heroku main
    
    print_success "Deployment completed!"
}

# Open the deployed app
open_app() {
    print_step "Opening deployed application..."
    heroku open -a $APP_NAME
}

# Main deployment process
main() {
    echo "🚀 Starting deployment process..."
    echo
    
    check_heroku_cli
    check_heroku_login
    check_git_repo
    create_heroku_app
    configure_env_vars
    deploy_to_heroku
    
    echo
    echo "🎉 Deployment completed successfully!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🌍 Your Estonian Anagram Finder Frontend is now live!"
    echo "📱 App URL: https://$APP_NAME.herokuapp.com"
    echo "🔗 API URL: $API_URL"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo
    
    read -p "Do you want to open the app in your browser? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        open_app
    fi
}

# Help function
show_help() {
    echo "Estonian Anagram Finder Frontend - Heroku Deployment Script"
    echo
    echo "Usage: $0 [OPTIONS]"
    echo
    echo "Options:"
    echo "  -h, --help     Show this help message"
    echo "  -n, --name     Specify custom app name"
    echo
    echo "Examples:"
    echo "  $0                           Deploy with default settings"
    echo "  $0 --name my-anagram-app     Deploy with custom app name"
    echo
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            exit 0
            ;;
        -n|--name)
            APP_NAME="$2"
            shift 2
            ;;
        *)
            print_error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Run main function
main
