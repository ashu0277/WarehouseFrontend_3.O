# Warehouse Management System - Technology Stack & Learning Guide

## 📚 Complete Technology Stack

---

## Frontend Technologies

### 1. **Angular 19** (Latest Version)
**What it is**: TypeScript-based web application framework by Google

**Key Concepts Used**:
- **Standalone Components**: Modern Angular approach without NgModules
- **Signals**: Reactive state management (Angular 16+)
- **Control Flow Syntax**: New `@if`, `@for`, `@else` syntax (Angular 17+)
- **Dependency Injection**: Service injection using `inject()` function
- **Reactive Forms**: FormBuilder, FormGroup, FormArray, Validators
- **Template-driven Forms**: Two-way binding with `[(ngModel)]`
- **Routing**: Lazy loading with `loadComponent()`
- **Guards**: Functional guards using `CanActivateFn`
- **HTTP Client**: Observable-based HTTP requests
- **RxJS**: Observables, Operators (map, filter, subscribe)

**Learning Resources**:
- Official Docs: https://angular.dev
- Standalone Components: https://angular.dev/guide/components
- Signals: https://angular.dev/guide/signals
- Control Flow: https://angular.dev/guide/templates/control-flow

---

### 2. **TypeScript 5.x**
**What it is**: Strongly-typed superset of JavaScript

**Key Concepts Used**:
- **Interfaces**: Type definitions for models (e.g., `interface User {}`)
- **Type Safety**: Compile-time type checking
- **Generics**: Reusable type-safe code (e.g., `BaseApiService<T>`)
- **Access Modifiers**: private, public, protected
- **Optional Properties**: Using `?` operator
- **Type Inference**: Automatic type detection
- **Decorators**: `@Component`, `@Injectable`

**Learning Resources**:
- Official Docs: https://www.typescriptlang.org/docs/
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/intro.html

---

### 3. **Bootstrap 5.3**
**What it is**: CSS framework for responsive design

**Key Concepts Used**:
- **Grid System**: Responsive layout with rows and columns
- **Components**: Cards, Modals, Buttons, Forms, Tables
- **Utilities**: Spacing (m-, p-), Colors (bg-, text-), Display (d-flex)
- **Responsive Classes**: col-md-6, col-lg-4, d-none d-md-block
- **Form Controls**: form-control, form-select, form-check
- **Modals**: Bootstrap modal component for dialogs

**Learning Resources**:
- Official Docs: https://getbootstrap.com/docs/5.3/
- Grid System: https://getbootstrap.com/docs/5.3/layout/grid/

---

### 4. **Bootstrap Icons**
**What it is**: Icon library by Bootstrap team

**Usage**: `<i class="bi bi-icon-name"></i>`

**Learning Resources**:
- Icons: https://icons.getbootstrap.com/

---

### 5. **RxJS (Reactive Extensions for JavaScript)**
**What it is**: Library for reactive programming using Observables

**Key Concepts Used**:
- **Observable**: Stream of data over time
- **Operators**: map, filter, catchError, tap
- **Subscription**: Listening to Observable streams
- **Subject**: Special type of Observable
- **Error Handling**: catchError, retry

**Learning Resources**:
- Official Docs: https://rxjs.dev/
- Learn RxJS: https://www.learnrxjs.io/

---

## Backend Technologies

### 6. **ASP.NET Core 8.0**
**What it is**: Cross-platform framework for building web APIs

**Key Concepts Used**:
- **Web API**: RESTful API endpoints
- **Controllers**: Handle HTTP requests
- **Dependency Injection**: Built-in DI container
- **Middleware**: Request/response pipeline
- **CORS**: Cross-Origin Resource Sharing
- **Authentication**: JWT Bearer tokens
- **Entity Framework Core**: ORM for database

**Learning Resources**:
- Official Docs: https://learn.microsoft.com/en-us/aspnet/core/
- Web API Tutorial: https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api

---

### 7. **C# 12**
**What it is**: Modern object-oriented programming language

**Key Concepts Used**:
- **Classes & Objects**: OOP fundamentals
- **Properties**: Auto-properties, get/set
- **LINQ**: Language Integrated Query
- **Async/Await**: Asynchronous programming
- **Nullable Types**: `string?`, `int?`
- **Records**: Immutable data types
- **Pattern Matching**: Switch expressions

**Learning Resources**:
- Official Docs: https://learn.microsoft.com/en-us/dotnet/csharp/
- C# Guide: https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/

---

### 8. **Entity Framework Core 8.0**
**What it is**: Object-Relational Mapper (ORM)

**Key Concepts Used**:
- **DbContext**: Database connection and operations
- **DbSet**: Collection of entities
- **Migrations**: Database schema versioning
- **LINQ Queries**: Query database using C#
- **Relationships**: One-to-Many, Many-to-Many
- **Navigation Properties**: Related entity access
- **Fluent API**: Configure entity mappings

**Learning Resources**:
- Official Docs: https://learn.microsoft.com/en-us/ef/core/
- Getting Started: https://learn.microsoft.com/en-us/ef/core/get-started/overview/first-app

---

### 9. **SQL Server / SQLite**
**What it is**: Relational database management system

**Key Concepts Used**:
- **Tables**: Data storage structure
- **Primary Keys**: Unique identifiers
- **Foreign Keys**: Relationships between tables
- **Indexes**: Query performance optimization
- **Constraints**: Data integrity rules
- **Joins**: Combining data from multiple tables
- **Transactions**: ACID properties

**Learning Resources**:
- SQL Tutorial: https://www.w3schools.com/sql/
- SQL Server Docs: https://learn.microsoft.com/en-us/sql/

---

### 10. **JWT (JSON Web Tokens)**
**What it is**: Secure token-based authentication

**Key Concepts Used**:
- **Token Generation**: Creating signed tokens
- **Token Validation**: Verifying token authenticity
- **Claims**: User information in token
- **Bearer Authentication**: HTTP Authorization header
- **Token Expiration**: Time-based validity

**Learning Resources**:
- JWT.io: https://jwt.io/introduction
- ASP.NET JWT: https://learn.microsoft.com/en-us/aspnet/core/security/authentication/

---

## Architecture & Design Patterns

### 11. **RESTful API Design**
**Principles**:
- Resource-based URLs
- HTTP Methods (GET, POST, PUT, DELETE)
- Status Codes (200, 201, 400, 401, 404, 500)
- Stateless communication
- JSON data format

---

### 12. **Repository Pattern**
**What it is**: Abstraction layer between data access and business logic

**Implementation**:
- Generic repository for common operations
- Specific repositories for complex queries
- Unit of Work pattern for transactions

---

### 13. **DTO (Data Transfer Objects)**
**What it is**: Objects for transferring data between layers

**Types Used**:
- **CreateDto**: Data for creating entities
- **UpdateDto**: Data for updating entities
- **ResponseDto**: Data returned to client

---

### 14. **Service Layer Pattern**
**What it is**: Business logic separation from controllers

**Implementation**:
- Services handle business rules
- Controllers handle HTTP concerns
- Dependency injection for loose coupling

---

### 15. **Component-Based Architecture**
**What it is**: UI broken into reusable components

**Structure**:
- **Feature Components**: Business features (orders, items)
- **Shared Components**: Reusable UI (sidebar, navbar)
- **Layout Components**: Page structure (main-layout, auth-layout)

---

## Development Tools & Practices

### 16. **Git Version Control**
**Commands Used**:
```bash
git add .
git commit -m "message"
git push origin main
git pull origin main
git clone <url>
```

---

### 17. **NPM (Node Package Manager)**
**Commands Used**:
```bash
npm install          # Install dependencies
npm start            # Run development server
npm run build        # Build for production
npm test             # Run tests
```

---

### 18. **Angular CLI**
**Commands Used**:
```bash
ng serve             # Start dev server
ng build             # Build project
ng generate component # Create component
ng test              # Run unit tests
```

---

### 19. **.NET CLI**
**Commands Used**:
```bash
dotnet run           # Run application
dotnet build         # Build project
dotnet ef migrations add # Create migration
dotnet ef database update # Apply migrations
```

---

## Key Concepts to Master

### Frontend Concepts

1. **Component Lifecycle**
   - ngOnInit, ngOnDestroy
   - Constructor vs ngOnInit

2. **Data Binding**
   - Interpolation: `{{ value }}`
   - Property Binding: `[property]="value"`
   - Event Binding: `(event)="handler()"`
   - Two-way Binding: `[(ngModel)]="value"`

3. **Directives**
   - Structural: `@if`, `@for`
   - Attribute: `[class]`, `[style]`

4. **Services & DI**
   - Injectable services
   - Singleton pattern
   - inject() function

5. **Routing**
   - Route configuration
   - Lazy loading
   - Route guards
   - Navigation

6. **Forms**
   - Reactive Forms (FormBuilder)
   - Template-driven Forms
   - Validation
   - Custom validators

7. **HTTP Communication**
   - HttpClient
   - Observables
   - Error handling
   - Interceptors

---

### Backend Concepts

1. **API Controllers**
   - Route attributes
   - Action methods
   - Model binding
   - Response types

2. **Entity Framework**
   - DbContext
   - Migrations
   - LINQ queries
   - Relationships

3. **Authentication & Authorization**
   - JWT tokens
   - Claims-based auth
   - Role-based access
   - [Authorize] attribute

4. **Dependency Injection**
   - Service registration
   - Scoped, Transient, Singleton
   - Constructor injection

5. **Middleware**
   - Request pipeline
   - CORS
   - Authentication
   - Error handling

6. **DTOs & Mapping**
   - AutoMapper (if used)
   - Manual mapping
   - Validation attributes

---

## Project-Specific Features

### 1. **Role-Based Access Control (RBAC)**
- 5 Roles: Operator, Supervisor, Inventory Planner, Logistics Coordinator, Admin
- Route guards for protection
- UI elements based on roles

### 2. **CRUD Operations**
- Create, Read, Update, Delete for all entities
- Modal-based forms
- Confirmation dialogs
- Real-time updates

### 3. **Warehouse Operations**
- Inbound receiving
- Put-away tasks
- Inventory tracking
- Order fulfillment
- Picking operations
- Packing units
- Shipment management

### 4. **Optimization Features**
- Replenishment tasks
- Slotting rules
- Warehouse reports

### 5. **Audit & Monitoring**
- Audit logs
- Notifications
- User management

---

## Learning Path Recommendation

### Beginner (Weeks 1-4)
1. HTML, CSS, JavaScript basics
2. TypeScript fundamentals
3. Angular basics (components, templates, data binding)
4. C# basics
5. SQL fundamentals

### Intermediate (Weeks 5-8)
1. Angular services and HTTP
2. Reactive Forms
3. Routing and navigation
4. ASP.NET Core Web API
5. Entity Framework Core
6. RESTful API design

### Advanced (Weeks 9-12)
1. RxJS and Observables
2. State management
3. Authentication & Authorization
4. Advanced EF Core (relationships, migrations)
5. Design patterns
6. Testing (unit, integration)

---

## Recommended Learning Resources

### Free Resources
1. **Angular**: https://angular.dev/tutorials
2. **TypeScript**: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
3. **ASP.NET Core**: https://learn.microsoft.com/en-us/aspnet/core/tutorials/
4. **Entity Framework**: https://learn.microsoft.com/en-us/ef/core/get-started/
5. **Bootstrap**: https://getbootstrap.com/docs/5.3/getting-started/introduction/

### Video Courses
1. **Angular**: Maximilian Schwarzmüller (Udemy)
2. **ASP.NET Core**: Mosh Hamedani (Udemy)
3. **Full Stack**: Traversy Media (YouTube)

### Practice Projects
1. Build a Todo App (CRUD basics)
2. Build a Blog (Authentication)
3. Build an E-commerce site (Complex relationships)
4. Contribute to open source

---

## Development Environment Setup

### Required Software
1. **Node.js** (v18+): https://nodejs.org/
2. **Angular CLI**: `npm install -g @angular/cli`
3. **.NET SDK** (8.0): https://dotnet.microsoft.com/download
4. **Visual Studio Code**: https://code.visualstudio.com/
5. **SQL Server** or **SQLite**: Database
6. **Git**: https://git-scm.com/

### VS Code Extensions
1. Angular Language Service
2. C# Dev Kit
3. ESLint
4. Prettier
5. GitLens
6. Thunder Client (API testing)

---

## Project Structure Understanding

### Frontend Structure
```
src/app/
├── core/              # Core functionality
│   ├── guards/        # Route guards
│   ├── interceptors/  # HTTP interceptors
│   ├── models/        # TypeScript interfaces
│   └── services/      # API services
├── features/          # Feature modules
│   ├── auth/          # Authentication
│   ├── dashboard/     # Dashboard
│   ├── orders/        # Orders management
│   └── ...
├── shared/            # Shared components
│   ├── components/    # Reusable components
│   └── layouts/       # Layout components
└── app.routes.ts      # Route configuration
```

### Backend Structure
```
Warehousepro.API/
├── Controllers/       # API endpoints
├── Data/             # DbContext
├── DTOs/             # Data transfer objects
├── Models/           # Entity models
├── Services/         # Business logic
└── Program.cs        # App configuration
```

---

## Next Steps After Learning

1. **Add Features**: Implement additional warehouse features
2. **Testing**: Write unit and integration tests
3. **Performance**: Optimize queries and loading
4. **Security**: Implement advanced security features
5. **Deployment**: Deploy to Azure/AWS
6. **CI/CD**: Set up automated deployment
7. **Monitoring**: Add logging and monitoring
8. **Documentation**: API documentation with Swagger

---

**This project covers 90% of real-world full-stack development concepts!**
