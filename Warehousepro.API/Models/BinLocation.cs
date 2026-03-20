using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations.Schema;

using WarehousePro.API.Models.Enums;

namespace WarehousePro.API.Models

{

	/// <summary>

	/// A specific physical bin/shelf/slot inside a Zone.

	/// Many BinLocations belong to One Zone.

	/// BinLocation is referenced by InventoryBalance, PutAwayTask,

	/// PickTask and ReplenishmentTask (FromBin + ToBin).

	/// </summary>

	[Table("BinLocations")]

	public class BinLocation

	{

		[Key]

		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]

		public int BinID { get; set; }

		// FK → Zone

		[Required]

		public int ZoneID { get; set; }

		/// <summary>

		/// Human-readable bin code e.g. "A-01-03"

		/// Unique across the warehouse.

		/// </summary>

		[Required]

		[MaxLength(50)]

		public string Code { get; set; } = string.Empty;

		public int Capacity { get; set; }

		/// <summary>

		/// Available | Full | Blocked

		/// </summary>

		public BinStatus Status { get; set; } = BinStatus.Available;

		public bool IsDeleted { get; set; } = false;

		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		// ── Navigation Properties ──────────────────────────────────────────

		// Many BinLocations → One Zone

		[ForeignKey("ZoneID")]

		public Zone Zone { get; set; } = null!;

		// One BinLocation → Many InventoryBalances

		public ICollection<InventoryBalance> InventoryBalances { get; set; }

			= new List<InventoryBalance>();

		// One BinLocation → Many PutAwayTasks (as TargetBin)

		public ICollection<PutAwayTask> PutAwayTasks { get; set; }

			= new List<PutAwayTask>();

		// One BinLocation → Many PickTasks

		public ICollection<PickTask> PickTasks { get; set; }

			= new List<PickTask>();

		// One BinLocation → Many ReplenishmentTasks as source bin

		// Configured via Fluent API in AppDbContext (dual FK scenario)

		public ICollection<ReplenishmentTask> ReplenishFromTasks { get; set; }

			= new List<ReplenishmentTask>();

		// One BinLocation → Many ReplenishmentTasks as destination bin

		// Configured via Fluent API in AppDbContext (dual FK scenario)

		public ICollection<ReplenishmentTask> ReplenishToTasks { get; set; }

			= new List<ReplenishmentTask>();

	}

}
