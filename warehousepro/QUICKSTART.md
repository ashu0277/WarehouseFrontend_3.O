# 🚀 Quick Start Guide - WarehousePro

## For Complete Beginners

This guide will help you understand and run the WarehousePro Angular application step by step.

---

## 📋 What You Need Before Starting

1. **Node.js** - Download from [nodejs.org](https://nodejs.org) (version 18 or higher)
2. **Code Editor** - VS Code recommended ([code.visualstudio.com](https://code.visualstudio.com))
3. **Your .NET API** - Should be running on `https://localhost:7000`

---

## 🎯 Step-by-Step Setup

### Step 1: Install Angular CLI
Open your terminal/command prompt and run:
```bash
npm install -g @angular/cli
```

### Step 2: Navigate to Project
```bash
cd c:\Users\HP\Downloads\Warehouse-Management-System\warehousepro
```

### Step 3: Install Dependencies
```bash
npm install
```
This will download all required packages (Bootstrap, Angular, etc.)

### Step 4: Configure API URL
Open `src/environments/environment.ts` and verify the API URL matches your backend:
```typescript
apiUrl: 'https://localhost:7000/api'
```

### Step 5: Run the Application
```bash
ng serve
```

### Step 6: Open in Browser
Go to: `http://localhost:4200`

---

## 🔐 First Login

Since this is a new system, you'll need to either:

**Option A: Register a new account**
1. Click "Register here" on login page
2. Fill in your details
3. Click "Register"
4. Login with your credentials

**Option B: Use test credentials (if your API has seed data)**
- Username: `admin`
- Password: `password123`

---

## 🗺️ Understanding the Application Flow

### 1. **Login Process**
```
User enters credentials → AuthService.login() → API validates → 
Token saved to localStorage → Redirect to Dashboard
```

### 2. **Protected Routes**
```
User tries to access /dashboard → authGuard checks token → 
If valid: Allow access → If invalid: Redirect to /login
```

### 3. **Data Loading**
```
Component loads → Service.getAll() → HTTP request to API → 
Data returned → Display in table
```

### 4. **CRUD Operations**
```
CREATE: Form → Service.create() → POST /api/endpoint → Reload list
READ:   Load → Service.getAll() → GET /api/endpoint → Display
UPDATE: Edit → Service.update() → PUT /api/endpoint/{id} → Reload
DELETE: Confirm → Service.delete() → DELETE /api/endpoint/{id} → Reload
```

---

## 📁 Key Files to Understand

### **Models** (Data Structures)
Location: `src/app/core/models/`

Example: `warehouse.model.ts`
```typescript
export interface Warehouse {
  id: number;
  name: string;
  code: string;
  address: string;
  // ... more fields
}
```
**What it does:** Defines the shape of data coming from API

---

### **Services** (API Communication)
Location: `src/app/core/services/`

Example: `warehouse.service.ts`
```typescript
export class WarehouseService extends BaseApiService<Warehouse> {
  protected override endpoint = 'warehouses';
}
```
**What it does:** Handles all HTTP requests for warehouses

**Available methods:**
- `getAll()` - Get all warehouses
- `getById(id)` - Get one warehouse
- `create(data)` - Create new warehouse
- `update(id, data)` - Update warehouse
- `delete(id)` - Delete warehouse

---

### **Components** (UI Pages)
Location: `src/app/features/`

Example: `warehouse/warehouse-list.component.ts`
```typescript
export class WarehouseListComponent implements OnInit {
  warehouses: Warehouse[] = [];
  
  ngOnInit() {
    this.loadWarehouses();
  }
  
  loadWarehouses() {
    this.warehouseService.getAll().subscribe({
      next: (data) => this.warehouses = data,
      error: (err) => console.error(err)
    });
  }
}
```
**What it does:** Displays warehouses in a table with CRUD operations

---

### **Routes** (Navigation)
Location: `src/app/app.routes.ts`

```typescript
{
  path: 'warehouses',
  loadComponent: () => import('./features/warehouse/warehouse-list.component')
    .then(m => m.WarehouseListComponent),
  canActivate: [authGuard]
}
```
**What it does:** Maps URL `/warehouses` to WarehouseListComponent

---

## 🎨 Understanding the UI Structure

```
┌─────────────────────────────────────────┐
│  Navbar (Top)                           │
│  - Notifications                        │
│  - User Menu                            │
└─────────────────────────────────────────┘
┌──────────┬──────────────────────────────┐
│          │                              │
│ Sidebar  │  Main Content Area           │
│          │                              │
│ - Menu   │  <router-outlet>             │
│ - Links  │  (Your page loads here)      │
│          │                              │
│          │                              │
└──────────┴──────────────────────────────┘
```

---

## 🔧 Common Modifications

### Change Page Title
Edit the component's HTML file:
```html
<h2 class="fw-bold mb-4">Your New Title</h2>
```

### Add a New Table Column
1. Update the model interface
2. Add `<th>` in table header
3. Add `<td>` in table body

### Change Button Color
```html
<!-- Primary (blue) -->
<button class="btn btn-primary">Button</button>

<!-- Success (green) -->
<button class="btn btn-success">Button</button>

<!-- Danger (red) -->
<button class="btn btn-danger">Button</button>

<!-- Warning (yellow) -->
<button class="btn btn-warning">Button</button>
```

### Add a New Menu Item
Edit `src/app/shared/components/sidebar/sidebar.component.html`:
```html
<li class="nav-item">
  <a class="nav-link" routerLink="/your-route" routerLinkActive="active">
    <i class="bi bi-your-icon"></i>
    <span *ngIf="!isCollapsed">Your Label</span>
  </a>
</li>
```

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot GET /"
**Solution:** Make sure you ran `ng serve` and the server is running

### Issue: "CORS Error"
**Solution:** 
1. Check your .NET API has CORS enabled
2. Or use proxy: `ng serve --proxy-config proxy.conf.json`

### Issue: "401 Unauthorized"
**Solution:** 
1. Check if you're logged in
2. Check if token is in localStorage (F12 → Application → Local Storage)
3. Verify API is accepting the token

### Issue: "Module not found"
**Solution:** Run `npm install` again

### Issue: "Port 4200 is already in use"
**Solution:** 
1. Close other Angular apps
2. Or use different port: `ng serve --port 4300`

---

## 📚 Learning Path

### Week 1: Understand the Basics
- [ ] Run the application
- [ ] Login and explore all pages
- [ ] Look at one model file
- [ ] Look at one service file
- [ ] Look at one component file

### Week 2: Make Small Changes
- [ ] Change a page title
- [ ] Change a button color
- [ ] Add a new table column
- [ ] Modify a form field

### Week 3: Add New Features
- [ ] Create a new model
- [ ] Create a new service
- [ ] Create a new component
- [ ] Add a new route

---

## 🎓 Key Concepts Explained Simply

### **Component**
Think of it as a "page" or "section" of your app
- Has TypeScript code (.ts file)
- Has HTML template (.html file)
- Has CSS styles (.css file)

### **Service**
Think of it as a "helper" that talks to the API
- Fetches data from backend
- Sends data to backend
- Shared across multiple components

### **Model/Interface**
Think of it as a "blueprint" for your data
- Defines what fields an object has
- Provides type safety
- Makes code easier to understand

### **Observable**
Think of it as a "promise" that can return multiple values
- Used for async operations (API calls)
- Subscribe to get the data
- Automatically handles loading states

### **Dependency Injection**
Think of it as "asking for what you need"
```typescript
private authService = inject(AuthService);
// "Hey Angular, I need the AuthService, please give it to me"
```

---

## 💡 Pro Tips

1. **Use Browser DevTools (F12)**
   - Console: See errors and logs
   - Network: See API calls
   - Application: See localStorage (tokens)

2. **Read Error Messages**
   - Angular errors are usually helpful
   - Check the line number mentioned
   - Google the error if stuck

3. **Use Console.log()**
   ```typescript
   console.log('My data:', this.warehouses);
   ```

4. **Start Small**
   - Don't try to understand everything at once
   - Focus on one feature at a time
   - Copy existing patterns

5. **Use Comments**
   - All code is already commented
   - Read them to understand what code does

---

## 🆘 Getting Help

1. **Check the README.md** - Comprehensive documentation
2. **Read code comments** - Every file is documented
3. **Check console errors** - Usually tells you what's wrong
4. **Google the error** - Someone probably had the same issue
5. **Check Angular docs** - [angular.dev](https://angular.dev)

---

## ✅ Checklist Before You Start Coding

- [ ] Node.js installed
- [ ] Angular CLI installed (`ng version` works)
- [ ] Project dependencies installed (`npm install` completed)
- [ ] .NET API is running
- [ ] Can login to the application
- [ ] Can see data in at least one page
- [ ] Browser DevTools open (F12)
- [ ] Code editor open (VS Code)

---

**You're ready to go! Start with small changes and gradually build your understanding. Good luck! 🚀**
