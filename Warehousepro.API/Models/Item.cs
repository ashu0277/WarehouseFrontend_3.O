using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations.Schema;

using WarehousePro.API.Models.Enums;

namespace WarehousePro.API.Models

{

	/// <summary>

	/// Represents a product/SKU stored in the warehouse.

	/// One Item can have many InventoryBalances (across different bins),

	/// StockReservations, PutAwayTasks, PickTasks, and ReplenishmentTasks.

	/// </summary>

	[Table("Items")]

	public class Item

	{

		[Key]

		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]

		public int ItemID { get; set; }

		/// <summary>

		/// Stock Keeping Unit — unique product code.

		/// </summary>

		[Required]

		[MaxLength(100)]

		public string SKU { get; set; } = string.Empty;

		[MaxLength(250)]

		public string? Description { get; set; }

		/// <summary>

		/// e.g. "KG", "PCS", "BOX", "LITRE"

		/// </summary>

		[Required]

		[MaxLength(50)]

		public string UnitOfMeasure { get; set; } = string.Empty;

		public ItemStatus Status { get; set; } = ItemStatus.Active;

		public bool IsDeleted { get; set; } = false;

		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		// ── Navigation Properties ──────────────────────────────────────────

		// One Item → Many InventoryBalances (one per bin it sits in)

		public ICollection<InventoryBalance> InventoryBalances { get; set; }

			= new List<InventoryBalance>();

		// One Item → Many StockReservations

		public ICollection<StockReservation> StockReservations { get; set; }

			= new List<StockReservation>();

		// One Item → Many PutAwayTasks

		public ICollection<PutAwayTask> PutAwayTasks { get; set; }

			= new List<PutAwayTask>();

		// One Item → Many PickTasks

		public ICollection<PickTask> PickTasks { get; set; }

			= new List<PickTask>();

		// One Item → Many ReplenishmentTasks

		public ICollection<ReplenishmentTask> ReplenishmentTasks { get; set; }

			= new List<ReplenishmentTask>();

	}

}
