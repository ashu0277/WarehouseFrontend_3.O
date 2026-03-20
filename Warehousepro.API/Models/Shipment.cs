using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations.Schema;

using WarehousePro.API.Models.Enums;

namespace WarehousePro.API.Models

{

	/// <summary>

	/// Tracks the outbound shipment of an Order to the customer via a carrier.

	/// Many Shipments belong to One Order.

	/// </summary>

	[Table("Shipments")]

	public class Shipment

	{

		[Key]

		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]

		public int ShipmentID { get; set; }

		// FK → Order

		[Required]

		public int OrderID { get; set; }

		/// <summary>

		/// e.g. "FedEx", "DHL", "BlueDart"

		/// </summary>

		[Required]

		[MaxLength(100)]

		public string Carrier { get; set; } = string.Empty;

		public DateTime? DispatchDate { get; set; }

		public DateTime? DeliveryDate { get; set; }

		/// <summary>

		/// Dispatched | InTransit | Delivered

		/// </summary>

		public ShipmentStatus Status { get; set; } = ShipmentStatus.Dispatched;

		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		// ── Navigation Property ────────────────────────────────────────────

		[ForeignKey("OrderID")]

		public Order Order { get; set; } = null!;

	}

}
