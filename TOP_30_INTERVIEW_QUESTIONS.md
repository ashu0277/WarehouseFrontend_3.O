# Top 30 Interview Questions - Warehouse Management System

## 🎯 Full Stack Interview Questions

---

## Angular Frontend Questions (15 Questions)

### 1. **Explain the architecture of your Angular application**
**Answer**: 
- Used Angular 19 with standalone components (no NgModules)
- Organized into core, features, and shared folders
- Core contains services, guards, models, and interceptors
- Features contain business logic components (orders, inventory, etc.)
- Shared contains reusable components (sidebar, navbar, modals)
- Implemented lazy loading for better performance
- Used dependency injection for service management

---

### 2. **What are standalone components and why did you use them?**
**Answer**:
- Standalone components don't require NgModules
- Simpler architecture, less boilerplate code
- Better tree-shaking and smaller bundle sizes
- Easier to understand and maintain
- Modern Angular approach (Angular 14+)
- Each component declares its own dependencies in imports array
- Example: `imports: [CommonModule, ReactiveFormsModule]`

---

### 3. **Explain the new control flow syntax (@if, @for) you used**
**Answer**:
- Angular 17+ introduced built-in control flow
- Replaced structural directives (*ngIf, *ngFor)
- Better performance (no directive overhead)
- Improved type safety
- Cleaner syntax
- Example: `@if (condition) { <div>Content</div> }`
- Example: `@for (item of items; track item.id) { <tr>...</tr> }`
- Track function required for better change detection

---

### 4. **How did you implement authentication in your application?**
**Answer**:
- JWT token-based authentication
- Login component sends email/password to backend
- Backend returns JWT token with user info
- Token stored in localStorage
- AuthService manages authentication state
- AuthGuard protects routes from unauthorized access
- HTTP interceptor adds token to all API requests
- Token includes user role for authorization
- Logout clears token and redirects to login

---

### 5. **Explain your routing strategy and lazy loading**
**Answer**:
- Used functional routing with loadComponent()
- Lazy loading for all feature components
- Reduces initial bundle size
- Components loaded on-demand when route accessed
- AuthGuard protects authenticated routes
- Role-based guards for admin/manager routes
- Redirect to login if not authenticated
- Redirect to dashboard after login
- Example: `loadComponent: () => import('./features/orders/order-list.component').then(m => m.OrderListComponent)`

---

### 6. **How did you handle forms in your application?**
**Answer**:
- Used Reactive Forms (FormBuilder, FormGroup)
- Template-driven forms for simple search filters
- FormArray for dynamic order lines
- Built-in validators (required, min, max, email)
- Custom validation logic in components
- Form state management (valid, invalid, touched)
- Error messages displayed conditionally
- PascalCase field names for backend compatibility
- Example: `this.fb.group({ Name: ['', Validators.required] })`

---

### 7. **Explain your HTTP communication strategy**
**Answer**:
- Created BaseApiService<T> generic service
- All feature services extend BaseApiService
- Centralized API endpoint configuration
- Used HttpClient with Observables
- Error handling with catchError operator
- Loading states during API calls
- Subscribe in components, unsubscribe in ngOnDestroy
- Proxy configuration for CORS in development
- Example: `this.http.get<Order[]>(\`\${this.apiUrl}/order\`)`

---

### 8. **How did you implement role-based access control?**
**Answer**:
- 5 roles: Operator, Supervisor, Inventory Planner, Logistics Coordinator, Admin
- Role stored in JWT token and localStorage
- AuthService has hasRole() method
- Sidebar component has canAccessXXX() methods for each feature
- Route guards check role before navigation
- UI elements hidden/shown based on role
- Backend also validates role on API endpoints
- Example: `canAccessReports() { return ['Admin', 'Supervisor'].includes(this.userRole); }`

---

### 9. **What is dependency injection and how did you use it?**
**Answer**:
- Design pattern for loose coupling
- Angular's built-in DI system
- Services marked with @Injectable
- Injected using inject() function in components
- Singleton services (providedIn: 'root')
- Services shared across components
- Easy to test and mock
- Example: `private orderService = inject(OrderService);`

---

### 10. **Explain your component communication strategy**
**Answer**:
- Parent to child: @Input() decorator
- Child to parent: @Output() with EventEmitter
- Service-based communication for unrelated components
- Shared services with BehaviorSubject for state
- Route parameters for navigation data
- Query parameters for filters
- LocalStorage for persistent data
- Example: `@Output() confirmed = new EventEmitter<void>();`

---

### 11. **How did you handle state management?**
**Answer**:
- Component-level state for UI state
- Service-level state for shared data
- LocalStorage for authentication state
- No external state management library (NgRx not needed)
- Services act as state containers
- Observables for reactive state updates
- Simple and maintainable approach
- Example: `currentUser$ = new BehaviorSubject<User | null>(null);`

---

### 12. **Explain your modal implementation**
**Answer**:
- Bootstrap modal component
- Controlled by boolean flags (showModal)
- Reactive forms inside modals
- Create and Edit modes in same modal
- Form reset on close
- Backdrop click handling
- Validation before submit
- Success callback reloads data
- Example: `<div class="modal" [class.show]="showModal">`

---

### 13. **How did you optimize your Angular application?**
**Answer**:
- Lazy loading for all routes
- OnPush change detection (where applicable)
- TrackBy functions in @for loops
- Unsubscribe from observables
- Standalone components for better tree-shaking
- Minimal bundle size
- Code splitting by feature
- Production build optimization
- Example: `@for (item of items; track item.id)`

---

### 14. **Explain your error handling strategy**
**Answer**:
- Try-catch in service methods
- RxJS catchError operator
- Console.error for debugging
- User-friendly error messages
- HTTP status code handling
- Validation errors displayed in forms
- Network error handling
- Retry logic for failed requests
- Example: `catchError(err => { console.error('Error', err); return of([]); })`

---

### 15. **How did you make the layout responsive?**
**Answer**:
- Bootstrap grid system (col-md-6, col-lg-4)
- Responsive utilities (d-none d-md-block)
- Flexbox for layouts
- Fixed sidebar with scrollable content
- Mobile-first approach
- Breakpoints for different screen sizes
- Collapsible sidebar for mobile
- Responsive tables with table-responsive
- Example: `<div class="col-md-6 col-lg-4">`

---

## .NET Backend Questions (10 Questions)

### 16. **Explain your API architecture**
**Answer**:
- ASP.NET Core 8.0 Web API
- RESTful API design principles
- Controller-Service-Repository pattern
- Controllers handle HTTP requests
- Services contain business logic
- Repository pattern for data access
- DTOs for data transfer
- Entity Framework Core for ORM
- Dependency injection throughout
- CORS enabled for frontend communication

---

### 17. **How did you implement authentication and authorization?**
**Answer**:
- JWT Bearer token authentication
- User login with email/password
- Password hashing with BCrypt
- Token generation with claims (userId, role, email)
- Token expiration (24 hours)
- [Authorize] attribute on controllers
- Role-based authorization with [Authorize(Roles = "Admin")]
- Token validation middleware
- Claims-based identity
- Secure token signing with secret key

---

### 18. **Explain your database design and Entity Framework usage**
**Answer**:
- SQL Server database
- Code-first approach with EF Core
- DbContext for database operations
- DbSet for each entity
- Migrations for schema changes
- Relationships: One-to-Many, Many-to-Many
- Navigation properties for related data
- Fluent API for complex configurations
- Indexes for performance
- Computed properties for aggregated data
- Example: `public DbSet<Order> Orders { get; set; }`

---

### 19. **What are DTOs and why did you use them?**
**Answer**:
- Data Transfer Objects
- Separate from entity models
- Control what data is exposed to client
- Prevent over-posting attacks
- Different DTOs for Create, Update, Response
- Validation attributes on DTOs
- Mapping between DTOs and entities
- Cleaner API contracts
- Example: CreateDto has only required fields, ResponseDto includes computed fields

---

### 20. **How did you handle CORS?**
**Answer**:
- Cross-Origin Resource Sharing
- Enabled in Program.cs
- Allowed specific origin (http://localhost:4200)
- Allowed all methods (GET, POST, PUT, DELETE)
- Allowed all headers
- Credentials allowed for cookies/auth
- Security consideration for production
- Example: `builder.Services.AddCors(options => { ... });`

---

### 21. **Explain your repository pattern implementation**
**Answer**:
- Generic repository for common CRUD operations
- Interface-based design (IRepository<T>)
- Specific repositories for complex queries
- Async methods for better performance
- Unit of Work pattern for transactions
- Dependency injection of repositories
- Testable and maintainable
- Example: `Task<IEnumerable<T>> GetAllAsync()`

---

### 22. **How did you handle relationships in Entity Framework?**
**Answer**:
- One-to-Many: Order has many OrderLines
- Many-to-One: Multiple Orders for one Customer
- Navigation properties for related entities
- Foreign key properties
- Include() for eager loading
- Lazy loading disabled for performance
- Cascade delete configured
- Example: `public ICollection<OrderLine> OrderLines { get; set; }`

---

### 23. **Explain your API endpoint design**
**Answer**:
- RESTful conventions
- Resource-based URLs (/api/order, /api/item)
- HTTP methods: GET (read), POST (create), PUT (update), DELETE (delete)
- Singular resource names
- Status codes: 200 (OK), 201 (Created), 400 (Bad Request), 404 (Not Found)
- Route attributes on controllers
- Action methods for each operation
- Example: `[HttpGet("{id}")]`

---

### 24. **How did you implement validation?**
**Answer**:
- Data annotations on DTOs ([Required], [StringLength])
- ModelState validation in controllers
- Custom validation logic in services
- Return BadRequest for validation errors
- Client-side validation in Angular
- Server-side validation for security
- Example: `if (!ModelState.IsValid) return BadRequest(ModelState);`

---

### 25. **Explain your dependency injection setup**
**Answer**:
- Built-in DI container in ASP.NET Core
- Service registration in Program.cs
- Scoped lifetime for DbContext
- Transient for lightweight services
- Singleton for shared services
- Constructor injection in controllers
- Interface-based injection
- Example: `builder.Services.AddScoped<IOrderService, OrderService>();`

---

## Database & General Questions (5 Questions)

### 26. **Explain your database schema**
**Answer**:
- 15+ tables for warehouse operations
- Warehouses → Zones → BinLocations (hierarchy)
- Items with inventory tracking
- Orders with OrderLines (one-to-many)
- InboundReceipts with PutAwayTasks
- PickTasks, PackingUnits, Shipments for outbound
- Users with role-based access
- AuditLogs for tracking changes
- Foreign keys for relationships
- Indexes on frequently queried columns

---

### 27. **How would you scale this application?**
**Answer**:
- Database: Read replicas, sharding, indexing
- Backend: Load balancing, caching (Redis), microservices
- Frontend: CDN, lazy loading, code splitting
- API: Rate limiting, pagination, compression
- Monitoring: Application Insights, logging
- Deployment: Docker containers, Kubernetes
- Database connection pooling
- Async operations throughout

---

### 28. **What security measures did you implement?**
**Answer**:
- JWT authentication
- Password hashing (BCrypt)
- HTTPS only in production
- CORS configuration
- SQL injection prevention (parameterized queries)
- XSS prevention (Angular sanitization)
- CSRF protection
- Role-based authorization
- Input validation
- Secure token storage

---

### 29. **How would you test this application?**
**Answer**:
- **Frontend**: 
  - Unit tests with Jasmine/Karma
  - Component testing
  - Service testing with mocks
  - E2E tests with Cypress/Playwright
- **Backend**:
  - Unit tests with xUnit
  - Integration tests with TestServer
  - Repository tests with InMemory database
  - API endpoint tests
- **Manual Testing**: Postman for API testing

---

### 30. **What challenges did you face and how did you solve them?**
**Answer**:
- **Challenge 1**: Field name mismatch (camelCase vs PascalCase)
  - Solution: Mapped frontend camelCase to backend PascalCase in save methods
  
- **Challenge 2**: CORS errors during development
  - Solution: Configured proxy in Angular and CORS in backend
  
- **Challenge 3**: Complex form with dynamic order lines
  - Solution: Used FormArray for dynamic form controls
  
- **Challenge 4**: Role-based UI rendering
  - Solution: Created helper methods in components to check user role
  
- **Challenge 5**: Sidebar scrolling with content
  - Solution: Made sidebar sticky with fixed height and content scrollable

---

## Bonus Questions (Behavioral)

### 31. **Walk me through the complete flow of creating an order**
1. User clicks "Add Order" button
2. Modal opens with order form
3. User fills order details and adds order lines
4. Form validation checks required fields
5. On submit, Angular sends POST request with PascalCase fields
6. Backend controller receives OrderCreateDto
7. Service validates business rules
8. Repository saves to database
9. Backend returns OrderResponseDto
10. Frontend receives response and closes modal
11. Order list refreshes with new order

---

### 32. **How does authentication work end-to-end?**
1. User enters email/password in login form
2. Angular sends POST to /api/auth/login
3. Backend validates credentials
4. Backend generates JWT token with claims
5. Token returned to frontend
6. Frontend stores token in localStorage
7. AuthService updates current user state
8. HTTP interceptor adds token to all requests
9. Backend validates token on protected endpoints
10. User navigated to dashboard

---

### 33. **Explain the inventory update flow**
1. Inbound receipt created
2. Put-away tasks generated
3. Operator completes put-away task
4. Backend updates InventoryBalance table
5. Quantity on hand increased
6. Pick task created for order
7. Operator completes pick task
8. Reserved quantity increased
9. Packing unit created
10. Shipment dispatched
11. Quantity on hand decreased
12. Frontend displays updated quantities

---

## Tips for Interview Success

1. **Be Specific**: Use examples from your project
2. **Explain Why**: Don't just say what you did, explain why
3. **Show Problem-Solving**: Discuss challenges and solutions
4. **Know Your Code**: Be ready to explain any part of the project
5. **Understand Trade-offs**: Discuss alternative approaches
6. **Be Honest**: If you don't know something, say so
7. **Ask Questions**: Show interest in the role and company
8. **Practice**: Rehearse answers out loud
9. **Prepare Examples**: Have 2-3 detailed examples ready
10. **Stay Calm**: Take your time to think before answering

---

**Good luck with your interview! 🚀**
