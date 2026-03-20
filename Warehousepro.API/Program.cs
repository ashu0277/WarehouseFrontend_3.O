using Microsoft.EntityFrameworkCore;

using WarehousePro.API.Data;

var builder = WebApplication.CreateBuilder(args);

// ══════════════════════════════════════════════════════════════════════════

// 1. CONTROLLERS

// ══════════════════════════════════════════════════════════════════════════

builder.Services.AddControllers();

// ══════════════════════════════════════════════════════════════════════════

// 2. SWAGGER / OPENAPI

// ══════════════════════════════════════════════════════════════════════════

builder.Services.AddEndpointsApiExplorer();

//builder.Services.AddSwaggerGen();

// ══════════════════════════════════════════════════════════════════════════

// 3. DATABASE — EF CORE + SQL SERVER

// ══════════════════════════════════════════════════════════════════════════

builder.Services.AddDbContext<AppDbContext>(options =>

	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ══════════════════════════════════════════════════════════════════════════

// 4. JWT AUTHENTICATION          → will be added here in the next step

// ══════════════════════════════════════════════════════════════════════════


// ══════════════════════════════════════════════════════════════════════════

// 5. SERVICES (Dependency Injection) → will be added here in the next step

// ══════════════════════════════════════════════════════════════════════════


// ══════════════════════════════════════════════════════════════════════════

// BUILD

// ══════════════════════════════════════════════════════════════════════════

var app = builder.Build();

// ══════════════════════════════════════════════════════════════════════════

// MIDDLEWARE PIPELINE

// ══════════════════════════════════════════════════════════════════════════

//if (app.Environment.IsDevelopment())

//{

//	app.UseSwagger();

//	app.UseSwaggerUI();

//}

app.UseHttpsRedirection();

// Authentication must come BEFORE Authorization

app.UseAuthentication();    // ← JWT middleware (active once JWT is added)

app.UseAuthorization();

app.MapControllers();

app.Run();
