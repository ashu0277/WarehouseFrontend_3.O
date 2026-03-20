using Microsoft.EntityFrameworkCore;

using WarehousePro.API.Models;

namespace WarehousePro.API.Data

{

	/// <summary>

	/// Main EF Core DbContext for WarehousePro.

	/// - Contains all 17 DbSets (one per table).

	/// - All relationships, cascade behaviours, and unique indexes

	///   are configured here via Fluent API inside OnModelCreating.

	/// - ReplenishmentTask dual-FK to BinLocation is handled here

	///   (cannot be done with [ForeignKey] attribute alone).

	/// </summary>

	public class AppDbContext : DbContext

	{

		public AppDbContext(DbContextOptions<AppDbContext> options)

			: base(options) { }

		// ── Group 1 : Identity & Access ───────────────────────────────────

		public DbSet<User> Users { get; set; }

		public DbSet<AuditLog> AuditLogs { get; set; }

		// ── Group 2 : Warehouse Layout ────────────────────────────────────

		public DbSet<Warehouse> Warehouses { get; set; }

		public DbSet<Zone> Zones { get; set; }

		public DbSet<BinLocation> BinLocations { get; set; }

		// ── Group 3 : Inventory ───────────────────────────────────────────

		public DbSet<Item> Items { get; set; }

		public DbSet<InventoryBalance> InventoryBalances { get; set; }

		public DbSet<StockReservation> StockReservations { get; set; }

		// ── Group 4 : Inbound ─────────────────────────────────────────────

		public DbSet<InboundReceipt> InboundReceipts { get; set; }

		public DbSet<PutAwayTask> PutAwayTasks { get; set; }

		// ── Group 5 : Orders & Outbound ───────────────────────────────────

		public DbSet<Order> Orders { get; set; }

		public DbSet<PickTask> PickTasks { get; set; }

		public DbSet<PackingUnit> PackingUnits { get; set; }

		public DbSet<Shipment> Shipments { get; set; }

		// ── Group 6 : Replenishment & Slotting ────────────────────────────

		public DbSet<ReplenishmentTask> ReplenishmentTasks { get; set; }

		public DbSet<SlottingRule> SlottingRules { get; set; }

		// ── Group 7 : Analytics & Notifications ───────────────────────────

		public DbSet<WarehouseReport> WarehouseReports { get; set; }

		public DbSet<Notification> Notifications { get; set; }

		// ─────────────────────────────────────────────────────────────────

		protected override void OnModelCreating(ModelBuilder modelBuilder)

		{

			base.OnModelCreating(modelBuilder);

			// ══════════════════════════════════════════════════════════════

			// GROUP 1 — IDENTITY & ACCESS

			// ══════════════════════════════════════════════════════════════

			modelBuilder.Entity<User>(entity =>

			{

				// Email must be unique across all users

				entity.HasIndex(u => u.Email)

					  .IsUnique();

				// User (1) → AuditLog (M)

				entity.HasMany(u => u.AuditLogs)

					  .WithOne(a => a.User)

					  .HasForeignKey(a => a.UserID)

					  .OnDelete(DeleteBehavior.Restrict);

				// User (1) → Notification (M)

				entity.HasMany(u => u.Notifications)

					  .WithOne(n => n.User)

					  .HasForeignKey(n => n.UserID)

					  .OnDelete(DeleteBehavior.Restrict);

				// User (1) → PutAwayTask (M)  [AssignedTo — nullable]

				entity.HasMany(u => u.PutAwayTasks)

					  .WithOne(p => p.AssignedTo)

					  .HasForeignKey(p => p.AssignedToUserID)

					  .OnDelete(DeleteBehavior.SetNull);

				// User (1) → PickTask (M)  [AssignedTo — nullable]

				entity.HasMany(u => u.PickTasks)

					  .WithOne(p => p.AssignedTo)

					  .HasForeignKey(p => p.AssignedToUserID)

					  .OnDelete(DeleteBehavior.SetNull);

				// User (1) → WarehouseReport (M)  [GeneratedBy]

				entity.HasMany(u => u.WarehouseReports)

					  .WithOne(r => r.GeneratedBy)

					  .HasForeignKey(r => r.GeneratedByUserID)

					  .OnDelete(DeleteBehavior.Restrict);

			});

			// ══════════════════════════════════════════════════════════════

			// GROUP 2 — WAREHOUSE LAYOUT

			// ══════════════════════════════════════════════════════════════

			// Warehouse (1) → Zone (M)

			modelBuilder.Entity<Zone>(entity =>

			{

				entity.HasOne(z => z.Warehouse)

					  .WithMany(w => w.Zones)

					  .HasForeignKey(z => z.WarehouseID)

					  .OnDelete(DeleteBehavior.Restrict);

			});

			// Zone (1) → BinLocation (M)

			modelBuilder.Entity<BinLocation>(entity =>

			{

				// Bin code must be unique (e.g. "A-01-03")

				entity.HasIndex(b => b.Code)

					  .IsUnique();

				entity.HasOne(b => b.Zone)

					  .WithMany(z => z.BinLocations)

					  .HasForeignKey(b => b.ZoneID)

					  .OnDelete(DeleteBehavior.Restrict);

			});

			// ══════════════════════════════════════════════════════════════

			// GROUP 3 — INVENTORY

			// ══════════════════════════════════════════════════════════════

			modelBuilder.Entity<Item>(entity =>

			{

				// SKU must be unique

				entity.HasIndex(i => i.SKU)

					  .IsUnique();

			});

			modelBuilder.Entity<InventoryBalance>(entity =>

			{

				// One item can only have ONE balance record per bin

				entity.HasIndex(ib => new { ib.ItemID, ib.BinID })

					  .IsUnique();

				// Item (1) → InventoryBalance (M)

				entity.HasOne(ib => ib.Item)

					  .WithMany(i => i.InventoryBalances)

					  .HasForeignKey(ib => ib.ItemID)

					  .OnDelete(DeleteBehavior.Restrict);

				// BinLocation (1) → InventoryBalance (M)

				entity.HasOne(ib => ib.BinLocation)

					  .WithMany(b => b.InventoryBalances)

					  .HasForeignKey(ib => ib.BinID)

					  .OnDelete(DeleteBehavior.Restrict);

			});

			// Item (1) → StockReservation (M)

			modelBuilder.Entity<StockReservation>(entity =>

			{

				entity.HasOne(sr => sr.Item)

					  .WithMany(i => i.StockReservations)

					  .HasForeignKey(sr => sr.ItemID)

					  .OnDelete(DeleteBehavior.Restrict);

			});

			// ══════════════════════════════════════════════════════════════

			// GROUP 4 — INBOUND

			// ══════════════════════════════════════════════════════════════

			modelBuilder.Entity<PutAwayTask>(entity =>

			{

				// InboundReceipt (1) → PutAwayTask (M)

				entity.HasOne(p => p.InboundReceipt)

					  .WithMany(r => r.PutAwayTasks)

					  .HasForeignKey(p => p.ReceiptID)

					  .OnDelete(DeleteBehavior.Restrict);

				// Item (1) → PutAwayTask (M)

				entity.HasOne(p => p.Item)

					  .WithMany(i => i.PutAwayTasks)

					  .HasForeignKey(p => p.ItemID)

					  .OnDelete(DeleteBehavior.Restrict);

				// BinLocation (1) → PutAwayTask (M) [TargetBin]

				entity.HasOne(p => p.TargetBin)

					  .WithMany(b => b.PutAwayTasks)

					  .HasForeignKey(p => p.TargetBinID)

					  .OnDelete(DeleteBehavior.Restrict);

			});

			// ══════════════════════════════════════════════════════════════

			// GROUP 5 — ORDERS & OUTBOUND

			// ══════════════════════════════════════════════════════════════

			modelBuilder.Entity<Order>(entity =>

			{

				entity.HasIndex(o => o.OrderNumber)

					  .IsUnique();

			});

			// Order (1) → PickTask (M)

			modelBuilder.Entity<PickTask>(entity =>

			{

				entity.HasOne(pt => pt.Order)

					  .WithMany(o => o.PickTasks)

					  .HasForeignKey(pt => pt.OrderID)

					  .OnDelete(DeleteBehavior.Restrict);

				// Item (1) → PickTask (M)

				entity.HasOne(pt => pt.Item)

					  .WithMany(i => i.PickTasks)

					  .HasForeignKey(pt => pt.ItemID)

					  .OnDelete(DeleteBehavior.Restrict);

				// BinLocation (1) → PickTask (M)

				entity.HasOne(pt => pt.BinLocation)

					  .WithMany(b => b.PickTasks)

					  .HasForeignKey(pt => pt.BinID)

					  .OnDelete(DeleteBehavior.Restrict);

			});

			// Order (1) → PackingUnit (M)

			modelBuilder.Entity<PackingUnit>(entity =>

			{

				entity.HasOne(pu => pu.Order)

					  .WithMany(o => o.PackingUnits)

					  .HasForeignKey(pu => pu.OrderID)

					  .OnDelete(DeleteBehavior.Restrict);

			});

			// Order (1) → Shipment (M)

			modelBuilder.Entity<Shipment>(entity =>

			{

				entity.HasOne(s => s.Order)

					  .WithMany(o => o.Shipments)

					  .HasForeignKey(s => s.OrderID)

					  .OnDelete(DeleteBehavior.Restrict);

			});

			// ══════════════════════════════════════════════════════════════

			// GROUP 6 — REPLENISHMENT & SLOTTING

			// ══════════════════════════════════════════════════════════════

			// ⚠ DUAL FK — ReplenishmentTask has TWO FKs → BinLocation

			// This CANNOT be resolved with [ForeignKey] attribute alone.

			// Fluent API is the only correct way to configure this.

			modelBuilder.Entity<ReplenishmentTask>(entity =>

			{

				// Item (1) → ReplenishmentTask (M)

				entity.HasOne(rt => rt.Item)

					  .WithMany(i => i.ReplenishmentTasks)

					  .HasForeignKey(rt => rt.ItemID)

					  .OnDelete(DeleteBehavior.Restrict);

				// BinLocation (1) → ReplenishmentTask (M) [FromBin — source]

				entity.HasOne(rt => rt.FromBin)

					  .WithMany(b => b.ReplenishFromTasks)

					  .HasForeignKey(rt => rt.FromBinID)

					  .OnDelete(DeleteBehavior.Restrict);

				// BinLocation (1) → ReplenishmentTask (M) [ToBin — destination]

				entity.HasOne(rt => rt.ToBin)

					  .WithMany(b => b.ReplenishToTasks)

					  .HasForeignKey(rt => rt.ToBinID)

					  .OnDelete(DeleteBehavior.Restrict);

			});

			// ══════════════════════════════════════════════════════════════

			// GROUP 7 — ANALYTICS & NOTIFICATIONS

			// (relationships already handled inside User entity config above)

			// ══════════════════════════════════════════════════════════════

		}

	}

}
