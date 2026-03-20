using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations.Schema;

using WarehousePro.API.Models.Enums;

namespace WarehousePro.API.Models

{

	/// <summary>

	/// Top-level physical warehouse location.

	/// One Warehouse contains many Zones.

	/// </summary>

	[Table("Warehouses")]

	public class Warehouse

	{

		[Key]

		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]

		public int WarehouseID { get; set; }

		[Required]

		[MaxLength(150)]

		public string Name { get; set; } = string.Empty;

		[Required]

		[MaxLength(250)]

		public string Location { get; set; } = string.Empty;

		public WarehouseStatus Status { get; set; } = WarehouseStatus.Active;

		public bool IsDeleted { get; set; } = false;

		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		// ── Navigation Property ────────────────────────────────────────────

		// One Warehouse → Many Zones

		public ICollection<Zone> Zones { get; set; }

			= new List<Zone>();

	}

}
