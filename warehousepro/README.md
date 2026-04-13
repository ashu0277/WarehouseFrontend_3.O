# WarehousePro - Full Stack Warehouse Management System

A modern warehouse management system built with **Angular 19** and **ASP.NET Core 8.0**.

## 🎯 Project Overview

**Frontend**: Angular 19 (Standalone Components) + Bootstrap 5  
**Backend**: ASP.NET Core 8.0 Web API + Entity Framework Core  
**Database**: SQL Server  
**Authentication**: JWT Bearer Tokens

### Key Features
- ✅ **Full CRUD Operations** - All 19 entities with Create, Read, Update, Delete
- ✅ **Role-Based Access Control** - 5 roles with specific permissions
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Responsive UI** - Bootstrap 5 with fixed sidebar layout
- ✅ **Lazy Loading** - Optimized performance
- ✅ **Modern Angular** - Standalone components, new control flow (@if, @for)
- ✅ **RESTful API** - Clean API design with DTOs
- ✅ **Entity Framework** - Code-first approach with migrations

## 📁 Project Structure

```
warehousepro/
├── src/
│   ├── app/
│   │   ├── core/                    # Core services, guards, interceptors
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   └── jwt.interceptor.ts
│   │   │   ├── models/              # 19 TypeScript interfaces
│   │   │   │   ├── warehouse.model.ts
│   │   │   │   ├── zone.model.ts
│   │   │   │   ├── bin-location.model.ts
│   │   │   │   └── ... (16 more)
│   │   │   └── services/            # 19 entity services + base
│   │   │       ├── base-api.service.ts
│   │   │       ├── warehouse.service.ts
│   │   │       └── ... (18 more)
│   │   ├── shared/                  # Shared components
│   │   │   ├── components/
│   │   │   │   ├── sidebar/
│   │   │   │   ├── navbar/
│   │   │   │   ├── status-badge/
│   │   │   │   └── confirm-dialog/
│   │   │   └── layouts/
│   │   │       ├── main-layout.component.ts
│   │   │       └── auth-layout.component.ts
│   │   ├── features/                # Feature modules
│   │   │   ├── auth/                # Login & Register
│   │   │   ├── dashboard/           # Main dashboard
│   │   │   ├── warehouse/           # Warehouse management
│   │   │   ├── zones/               # Zone management
│   │   │   ├── bins/                # Bin location management
│   │   │   ├── items/               # Item/Product management
│   │   │   ├── inbound/             # Inbound receipts
│   │   │   ├── inventory/           # Inventory tracking
│   │   │   ├── orders/              # Order management
│   │   │   ├── picking/             # Picking tasks
│   │   │   ├── packing/             # Packing operations
│   │   │   ├── shipments/           # Shipment tracking
│   │   │   ├── replenishment/       # Replenishment tasks
│   │   │   ├── slotting/            # Slotting rules
│   │   │   ├── reports/             # Report generation
│   │   │   ├── notifications/       # User notifications
│   │   │   ├── users/               # User management (Admin)
│   │   │   └── audit-log/           # Audit log (Admin)
│   │   ├── app.routes.ts            # Application routes
│   │   ├── app.config.ts            # App configuration
│   │   └── app.ts                   # Root component
│   ├── environments/
│   │   ├── environment.ts           # Development config
│   │   └── environment.prod.ts      # Production config
│   └── styles.css                   # Global styles with Bootstrap
├── proxy.conf.json                  # API proxy configuration
└── package.json
```

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** - https://nodejs.org/
- **Angular CLI** - `npm install -g @angular/cli`
- **.NET SDK 8.0** - https://dotnet.microsoft.com/download
- **SQL Server** or **SQLite**

### Backend Setup

1. **Navigate to API folder:**
   ```bash
   cd Warehousepro.API
   ```

2. **Update connection string:**
   Edit `appsettings.json`:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=.;Database=WarehouseDB;Trusted_Connection=true;"
   }
   ```

3. **Run migrations:**
   ```bash
   dotnet ef database update
   ```

4. **Run API:**
   ```bash
   dotnet run
   ```
   API will run on `https://localhost:7021`

### Frontend Setup

### Frontend Setup

1. **Navigate to frontend folder:**
   ```bash
   cd warehousepro
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm start
   ```
   Frontend will run on `http://localhost:4200`

4. **Login with default admin:**
   - Email: `admin@warehouse.com`
   - Password: `Admin@123`

## 👥 User Roles & Access

| Role | Access |
|------|--------|
| **Operator** | Dashboard, Inbound, Put-Away, Picking, Packing, Shipments, Notifications |
| **Supervisor** | Operator access + Inventory, Reports |
| **Inventory Planner** | Dashboard, Items, Inventory, Replenishment, Slotting, Notifications, Reports |
| **Logistics Coordinator** | Dashboard, Orders, Picking, Packing, Shipments, Notifications, Reports |
| **Admin** | Full access to all features including Users and Audit Log |

## 📚 Key Concepts for Beginners

### 1. **Standalone Components**
No NgModules! Each component imports what it needs:
```typescript
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent { }
```

### 2. **Dependency Injection with inject()**
Modern way to inject services:
```typescript
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
}
```

### 3. **BaseApiService Pattern**
All services extend BaseApiService for DRY code:
```typescript
export class WarehouseService extends BaseApiService<Warehouse> {
  protected override endpoint = 'warehouses';
}
// Automatically gets: getAll(), getById(), create(), update(), delete()
```

### 4. **Reactive Forms**
Type-safe forms with validation:
```typescript
loginForm = this.fb.group({
  username: ['', [Validators.required, Validators.minLength(3)]],
  password: ['', [Validators.required, Validators.minLength(6)]]
});
```

### 5. **Route Guards**
Protect routes from unauthorized access:
```typescript
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard]  // Requires authentication
}
```

### 6. **HTTP Interceptors**
Automatically add JWT token to requests:
```typescript
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = authService.getToken();
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return next(req);
};
```

## 🎨 Bootstrap Integration

### Using Bootstrap Classes
```html
<!-- Cards -->
<div class="card shadow-sm">
  <div class="card-body">Content</div>
</div>

<!-- Buttons -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-outline-secondary">Secondary</button>

<!-- Tables -->
<table class="table table-hover">
  <thead class="table-light">...</thead>
</table>

<!-- Forms -->
<input type="text" class="form-control">
<select class="form-select">...</select>

<!-- Badges -->
<span class="badge bg-success">Active</span>
```

### Bootstrap Icons
```html
<i class="bi bi-house"></i>
<i class="bi bi-person"></i>
<i class="bi bi-gear"></i>
```

## 🧪 Testing

Run unit tests:
```bash
ng test
```

Run tests with coverage:
```bash
ng test --code-coverage
```

## 🏗️ Building for Production

```bash
ng build --configuration production
```

Output will be in `dist/warehousepro/`

## 📖 API Integration

### Connecting to Your .NET API

1. **Update environment.ts:**
   ```typescript
   apiUrl: 'https://your-api-url.com/api'
   ```

2. **API Endpoints Expected:**
   - `POST /api/auth/login` - Authentication
   - `GET /api/warehouses` - Get all warehouses
   - `GET /api/warehouses/{id}` - Get warehouse by ID
   - `POST /api/warehouses` - Create warehouse
   - `PUT /api/warehouses/{id}` - Update warehouse
   - `DELETE /api/warehouses/{id}` - Delete warehouse
   - (Same pattern for all 19 entities)

3. **JWT Token Format:**
   API should return:
   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIs...",
     "user": {
       "id": 1,
       "username": "admin",
       "email": "admin@example.com",
       "role": "Admin"
     }
   }
   ```

## 🔧 Customization

### Adding a New Feature

1. **Create model:**
   ```typescript
   // src/app/core/models/my-entity.model.ts
   export interface MyEntity {
     id: number;
     name: string;
   }
   ```

2. **Create service:**
   ```typescript
   // src/app/core/services/my-entity.service.ts
   @Injectable({ providedIn: 'root' })
   export class MyEntityService extends BaseApiService<MyEntity> {
     protected override endpoint = 'myentities';
   }
   ```

3. **Create component:**
   ```bash
   ng generate component features/my-entity/my-entity-list --standalone
   ```

4. **Add route:**
   ```typescript
   // app.routes.ts
   {
     path: 'my-entity',
     loadComponent: () => import('./features/my-entity/my-entity-list.component')
       .then(m => m.MyEntityListComponent)
   }
   ```

## 📝 Common Tasks

### Change API URL
Edit `src/environments/environment.ts`

### Add New User Role
Update `auth.guard.ts` and sidebar role checks

### Customize Theme Colors
Edit `src/styles.css` and component CSS files

### Add New Status Badge Color
Update `status-badge.component.ts` getBadgeClass() method

## 🐛 Troubleshooting

### CORS Errors
Use `proxy.conf.json` for development:
```bash
ng serve --proxy-config proxy.conf.json
```

### Authentication Issues
Check:
1. API is running
2. Token is being saved to localStorage
3. JWT interceptor is registered in app.config.ts

### Routing Not Working
Ensure all lazy-loaded components are exported correctly

## 📞 Support

For questions or issues:
1. Check the code comments - every file is documented
2. Review the TypeScript interfaces for data structures
3. Examine the BaseApiService for HTTP patterns

## 🎓 Learning Resources

- [Angular Documentation](https://angular.dev)
- [Bootstrap Documentation](https://getbootstrap.com)
- [RxJS Documentation](https://rxjs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## ✨ Features Implemented

### Warehouse Layout
- ✅ Warehouses (Full CRUD)
- ✅ Zones (Full CRUD)
- ✅ Bin Locations (Full CRUD)

### Inventory Management
- ✅ Items (Full CRUD with auto-calculated quantities)
- ✅ Inventory Balance (View with auto-updates)

### Inbound Operations
- ✅ Inbound Receipts (Full CRUD)
- ✅ Put-Away Tasks (Full CRUD + Complete)

### Outbound Operations
- ✅ Orders (Full CRUD with OrderLines)
- ✅ Picking Tasks (Full CRUD + Complete)
- ✅ Packing Units (Full CRUD)
- ✅ Shipments (Full CRUD)

### Optimization
- ✅ Replenishment Tasks (Full CRUD)
- ✅ Slotting Rules (Full CRUD)

### Analytics & System
- ✅ Reports (Generate & Delete)
- ✅ Notifications (View)
- ✅ Users (Full CRUD - Admin only)
- ✅ Audit Log (View - Admin only)

## 📚 Documentation

- **ARCHITECTURE.md** - System architecture and design patterns
- **TECHNOLOGY_STACK_LEARNING_GUIDE.md** - Complete tech stack with learning resources
- **TOP_30_INTERVIEW_QUESTIONS.md** - Interview preparation guide
- **PROJECT_SUMMARY.md** - Project overview and features
- **QUICKSTART.md** - Quick start guide
- **COMMANDS.md** - Useful commands reference

## 📄 License

This project is for educational purposes.

---

**Built with ❤️ using Angular 19 Standalone + Bootstrap 5**
