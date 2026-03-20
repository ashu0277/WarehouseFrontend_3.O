using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations.Schema;

using WarehousePro.API.Models.Enums;

namespace WarehousePro.API.Models

{

	/// <summary>

	/// Represents a physical package (box, pallet, bag) created

	/// while packing items for an Order.

	/// Many PackingUnits belong to One Order.

	/// </summary>

	[Table("PackingUnits")]

	public class PackingUnit

	{

		[Key]

		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]

		public int PackID { get; set; }

		// FK → Order

		[Required]

		public int OrderID { get; set; }

		/// <summary>

		/// e.g. "Box", "Pallet", "Envelope"

		/// </summary>

		[Required]

		[MaxLength(100)]

		public string PackageType { get; set; } = string.Empty;

		/// <summary>

		/// Weight in kilograms.

		/// </summary>

		[Column(TypeName = "decimal(10,2)")]

		public decimal Weight { get; set; }

		/// <summary>

		/// Packed | Shipped

		/// </summary>

		public PackingStatus Status { get; set; } = PackingStatus.Packed;

		public DateTime PackedAt { get; set; } = DateTime.UtcNow;

		// ── Navigation Property ────────────────────────────────────────────

		[ForeignKey("OrderID")]

		public Order Order { get; set; } = null!;

	}

}
