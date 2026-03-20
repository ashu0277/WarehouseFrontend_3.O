using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations.Schema;

using WarehousePro.API.Models.Enums;

namespace WarehousePro.API.Models

{

	/// <summary>

	/// A named area inside a Warehouse (e.g. Receiving Bay, Cold Storage).

	/// Many Zones belong to One Warehouse.

	/// One Zone contains many BinLocations.

	/// </summary>

	[Table("Zones")]

	public class Zone

	{

		[Key]

		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]

		public int ZoneID { get; set; }

		// FK → Warehouse

		[Required]

		public int WarehouseID { get; set; }

		[Required]

		[MaxLength(100)]

		public string Name { get; set; } = string.Empty;

		/// <summary>

		/// Receiving | Storage | Picking | Dispatch

		/// </summary>

		public ZoneType ZoneType { get; set; }

		public bool IsDeleted { get; set; } = false;

		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		// ── Navigation Properties ──────────────────────────────────────────

		// Many Zones → One Warehouse

		[ForeignKey("WarehouseID")]

		public Warehouse Warehouse { get; set; } = null!;

		// One Zone → Many BinLocations

		public ICollection<BinLocation> BinLocations { get; set; }

			= new List<BinLocation>();

	}

}
