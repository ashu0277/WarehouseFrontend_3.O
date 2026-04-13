# 🎯 Command Reference - WarehousePro

Quick reference for all common commands and operations.

---

## 📦 Installation & Setup

```bash
# Navigate to project
cd c:\Users\HP\Downloads\Warehouse-Management-System\warehousepro

# Install dependencies
npm install

# Install Angular CLI globally (if not installed)
npm install -g @angular/cli

# Verify Angular CLI installation
ng version
```

---

## 🚀 Development Commands

```bash
# Start development server
ng serve

# Start with specific port
ng serve --port 4300

# Start with proxy (for CORS)
ng serve --proxy-config proxy.conf.json

# Start and open browser automatically
ng serve --open

# Start with production configuration
ng serve --configuration production
```

---

## 🏗️ Build Commands

```bash
# Development build
ng build

# Production build (optimized)
ng build --configuration production

# Build with source maps
ng build --source-map

# Build and watch for changes
ng build --watch
```

---

## 🧪 Testing Commands

```bash
# Run unit tests
ng test

# Run tests once (no watch)
ng test --watch=false

# Run tests with code coverage
ng test --code-coverage

# Run tests in headless mode
ng test --browsers=ChromeHeadless

# View coverage report
# Open: coverage/warehousepro/index.html
```

---

## 🔍 Code Generation Commands

```bash
# Generate new component
ng generate component features/my-feature/my-component --standalone

# Generate new service
ng generate service core/services/my-service

# Generate new guard
ng generate guard core/guards/my-guard

# Generate new interceptor
ng generate interceptor core/interceptors/my-interceptor

# Generate new interface
ng generate interface core/models/my-model

# Shorthand (g = generate, c = component)
ng g c features/my-feature/my-component --standalone
ng g s core/services/my-service
```

---

## 📊 Analysis Commands

```bash
# Analyze bundle size
ng build --stats-json
# Then use: npx webpack-bundle-analyzer dist/warehousepro/stats.json

# Check for outdated packages
npm outdated

# Update packages
npm update

# Audit for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

---

## 🔧 Linting & Formatting

```bash
# Lint code (if ESLint configured)
ng lint

# Format code with Prettier
npx prettier --write "src/**/*.{ts,html,css}"

# Check formatting
npx prettier --check "src/**/*.{ts,html,css}"
```

---

## 📦 Package Management

```bash
# Install new package
npm install package-name

# Install as dev dependency
npm install --save-dev package-name

# Uninstall package
npm uninstall package-name

# Clean install (delete node_modules and reinstall)
rm -rf node_modules package-lock.json
npm install

# Update Angular
ng update @angular/core @angular/cli
```

---

## 🐛 Debugging Commands

```bash
# Clear Angular cache
ng cache clean

# Verbose output
ng serve --verbose

# Check Angular configuration
ng config

# List all available schematics
ng generate --help
```

---

## 📝 Git Commands (Common)

```bash
# Initialize git (if not done)
git init

# Check status
git status

# Add all files
git add .

# Commit changes
git commit -m "Your message"

# Push to remote
git push origin main

# Pull latest changes
git pull origin main

# Create new branch
git checkout -b feature/my-feature

# Switch branch
git checkout main
```

---

## 🌐 Environment Commands

```bash
# Use development environment
ng serve

# Use production environment
ng serve --configuration production

# Build for specific environment
ng build --configuration production
```

---

## 📱 Mobile/Responsive Testing

```bash
# Start server accessible from network
ng serve --host 0.0.0.0

# Then access from mobile: http://YOUR_IP:4200
```

---

## 🔐 Security Commands

```bash
# Check for security vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Force fix (may break things)
npm audit fix --force

# View detailed audit report
npm audit --json
```

---

## 📊 Performance Commands

```bash
# Build with source maps for debugging
ng build --source-map

# Build with optimization
ng build --optimization

# Analyze build performance
ng build --stats-json
```

---

## 🎨 Style Commands

```bash
# Add Bootstrap (already done)
npm install bootstrap

# Add Bootstrap Icons (already done)
npm install bootstrap-icons

# Add other CSS framework
npm install tailwindcss
```

---

## 🔄 Update Commands

```bash
# Update Angular to latest version
ng update @angular/core @angular/cli

# Update specific package
ng update package-name

# Check what can be updated
ng update

# Update all packages (careful!)
npm update
```

---

## 📚 Documentation Commands

```bash
# Generate documentation (if Compodoc installed)
npm install -g @compodoc/compodoc
compodoc -p tsconfig.json -s

# Open documentation
# Navigate to: http://localhost:8080
```

---

## 🚀 Deployment Commands

### Deploy to Firebase
```bash
npm install -g firebase-tools
firebase login
firebase init
ng build --configuration production
firebase deploy
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
ng build --configuration production
netlify deploy --prod --dir=dist/warehousepro
```

### Deploy to GitHub Pages
```bash
ng build --configuration production --base-href /your-repo-name/
npx angular-cli-ghpages --dir=dist/warehousepro
```

---

## 🔍 Useful NPM Scripts

Add these to `package.json` scripts section:

```json
{
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "serve:prod": "ng serve --configuration production",
    "build:prod": "ng build --configuration production",
    "test:coverage": "ng test --code-coverage",
    "analyze": "ng build --stats-json && webpack-bundle-analyzer dist/warehousepro/stats.json"
  }
}
```

Then run:
```bash
npm run start
npm run build:prod
npm run test:coverage
```

---

## 🎯 Quick Workflows

### Starting Fresh Development Session
```bash
cd warehousepro
git pull origin main
npm install
ng serve
```

### Before Committing Code
```bash
ng test --watch=false
ng build --configuration production
git add .
git commit -m "Your message"
git push origin main
```

### Deploying to Production
```bash
ng test --watch=false
ng build --configuration production
# Deploy dist/warehousepro/ to your server
```

### Adding New Feature
```bash
# 1. Create model
ng g interface core/models/my-entity

# 2. Create service
ng g service core/services/my-entity

# 3. Create component
ng g component features/my-entity/my-entity-list --standalone

# 4. Add route in app.routes.ts
# 5. Add menu item in sidebar
# 6. Test
ng serve
```

---

## 💡 Pro Tips

### Speed up npm install
```bash
npm install --prefer-offline
```

### Clear everything and start fresh
```bash
rm -rf node_modules package-lock.json dist .angular
npm install
```

### Run multiple commands
```bash
# Windows
npm install && ng serve

# Unix/Mac
npm install; ng serve
```

### Check what's using port 4200
```bash
# Windows
netstat -ano | findstr :4200

# Unix/Mac
lsof -i :4200
```

---

## 🆘 Emergency Commands

### App won't start
```bash
rm -rf node_modules package-lock.json .angular
npm install
ng serve
```

### Tests failing
```bash
ng test --watch=false --browsers=ChromeHeadless
```

### Build errors
```bash
ng cache clean
rm -rf dist
ng build
```

### Port already in use
```bash
ng serve --port 4300
```

---

## 📖 Help Commands

```bash
# General help
ng help

# Command-specific help
ng serve --help
ng build --help
ng test --help
ng generate --help

# List all available commands
ng --help
```

---

**Keep this file handy for quick reference! 🚀**
