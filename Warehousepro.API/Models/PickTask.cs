using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations.Schema;

using WarehousePro.API.Models.Enums;

namespace WarehousePro.API.Models

{

	/// <summary>

	/// Instructs an operator to pick a quantity of an Item

	/// from a specific BinLocation to fulfill an Order.

	///

	/// Many PickTasks belong to One Order.

	/// Many PickTasks belong to One Item.

	/// Many PickTasks belong to One BinLocation.

	/// Many PickTasks are assigned to One User (nullable).

	/// </summary>

	[Table("PickTasks")]

	public class PickTask

	{

		[Key]

		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]

		public int PickTaskID { get; set; }

		// FK → Order

		[Required]

		public int OrderID { get; set; }

		// FK → Item

		[Required]

		public int ItemID { get; set; }

		// FK → BinLocation (where to pick from)

		[Required]

		public int BinID { get; set; }

		[Required]

		public int PickQuantity { get; set; }

		// FK → User (nullable — may be unassigned initially)

		public int? AssignedToUserID { get; set; }

		/// <summary>

		/// Assigned | Picked | Short

		/// </summary>

		public PickTaskStatus Status { get; set; } = PickTaskStatus.Assigned;

		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		public DateTime? CompletedAt { get; set; }

		// ── Navigation Properties ──────────────────────────────────────────

		[ForeignKey("OrderID")]

		public Order Order { get; set; } = null!;

		[ForeignKey("ItemID")]

		public Item Item { get; set; } = null!;

		[ForeignKey("BinID")]

		public BinLocation BinLocation { get; set; } = null!;

		[ForeignKey("AssignedToUserID")]

		public User? AssignedTo { get; set; }

	}

}
