using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations.Schema;

using WarehousePro.API.Models.Enums;

namespace WarehousePro.API.Models

{

	/// <summary>

	/// Moves stock of an Item from one BinLocation (FromBin) to another (ToBin).

	/// Used to replenish pick-face bins from bulk storage bins.

	///

	/// Many ReplenishmentTasks belong to One Item.

	///

	/// ⚠ DUAL FK TO BinLocation:

	///   - FromBinID → BinLocation (source)

	///   - ToBinID   → BinLocation (destination)

	///

	/// These two FKs cannot both use [ForeignKey] attribute alone because

	/// EF Core gets confused resolving two FKs pointing to the same table.

	/// They are configured using Fluent API inside AppDbContext.

	/// </summary>

	[Table("ReplenishmentTasks")]

	public class ReplenishmentTask

	{

		[Key]

		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]

		public int ReplenishID { get; set; }

		// FK → Item

		[Required]

		public int ItemID { get; set; }

		// FK 1 → BinLocation (source bin — where stock is taken from)

		[Required]

		public int FromBinID { get; set; }

		// FK 2 → BinLocation (destination bin — where stock is moved to)

		[Required]

		public int ToBinID { get; set; }

		[Required]

		public int Quantity { get; set; }

		/// <summary>

		/// Planned | Completed

		/// </summary>

		public ReplenishmentStatus Status { get; set; } = ReplenishmentStatus.Planned;

		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		public DateTime? CompletedAt { get; set; }

		// ── Navigation Properties ──────────────────────────────────────────

		[ForeignKey("ItemID")]

		public Item Item { get; set; } = null!;

		// ⚠ NO [ForeignKey] attribute on these two —

		// EF Core Fluent API in AppDbContext handles both FKs.

		public BinLocation FromBin { get; set; } = null!;

		public BinLocation ToBin { get; set; } = null!;

	}

}
