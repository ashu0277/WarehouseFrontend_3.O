using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations.Schema;

using WarehousePro.API.Models.Enums;

namespace WarehousePro.API.Models

{

	/// <summary>

	/// Represents a customer order that drives the outbound workflow.

	///

	/// NOTE: This table was NOT in the original PDF document but is

	/// required because PickTask, PackingUnit and Shipment all reference

	/// an OrderID — without this table those FKs have no parent.

	///

	/// One Order → Many PickTasks

	/// One Order → Many PackingUnits

	/// One Order → Many Shipments

	/// </summary>

	[Table("Orders")]

	public class Order

	{

		[Key]

		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]

		public int OrderID { get; set; }

		/// <summary>

		/// Unique business-level order number e.g. "ORD-2024-00123"

		/// </summary>

		[Required]

		[MaxLength(100)]

		public string OrderNumber { get; set; } = string.Empty;

		[Required]

		[MaxLength(150)]

		public string CustomerName { get; set; } = string.Empty;

		[MaxLength(300)]

		public string? DeliveryAddress { get; set; }

		public DateTime OrderDate { get; set; } = DateTime.UtcNow;

		public DateTime? RequiredDate { get; set; }

		/// <summary>

		/// Pending | Processing | Completed | Cancelled

		/// </summary>

		public OrderStatus Status { get; set; } = OrderStatus.Pending;

		public bool IsDeleted { get; set; } = false;

		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		// ── Navigation Properties ──────────────────────────────────────────

		// One Order → Many PickTasks

		public ICollection<PickTask> PickTasks { get; set; }

			= new List<PickTask>();

		// One Order → Many PackingUnits

		public ICollection<PackingUnit> PackingUnits { get; set; }

			= new List<PackingUnit>();

		// One Order → Many Shipments

		public ICollection<Shipment> Shipments { get; set; }

			= new List<Shipment>();

	}

}
