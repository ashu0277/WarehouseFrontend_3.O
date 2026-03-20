using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations.Schema;

using WarehousePro.API.Models.Enums;

namespace WarehousePro.API.Models

{

	/// <summary>

	/// Instructs an operator to move a received Item to a target BinLocation.

	/// Many PutAwayTasks belong to One InboundReceipt.

	/// Many PutAwayTasks belong to One Item.

	/// Many PutAwayTasks belong to One BinLocation (TargetBin).

	/// Many PutAwayTasks are assigned to One User (nullable — can be unassigned).

	/// </summary>

	[Table("PutAwayTasks")]

	public class PutAwayTask

	{

		[Key]

		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]

		public int TaskID { get; set; }

		// FK → InboundReceipt

		[Required]

		public int ReceiptID { get; set; }

		// FK → Item

		[Required]

		public int ItemID { get; set; }

		[Required]

		public int Quantity { get; set; }

		// FK → BinLocation (destination bin)

		[Required]

		public int TargetBinID { get; set; }

		// FK → User (nullable: task may not yet be assigned)

		public int? AssignedToUserID { get; set; }

		/// <summary>

		/// Pending | InProgress | Completed

		/// </summary>

		public PutAwayStatus Status { get; set; } = PutAwayStatus.Pending;

		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		public DateTime? CompletedAt { get; set; }

		// ── Navigation Properties ──────────────────────────────────────────

		[ForeignKey("ReceiptID")]

		public InboundReceipt InboundReceipt { get; set; } = null!;

		[ForeignKey("ItemID")]

		public Item Item { get; set; } = null!;

		[ForeignKey("TargetBinID")]

		public BinLocation TargetBin { get; set; } = null!;

		// Nullable user — task may be unassigned initially

		[ForeignKey("AssignedToUserID")]

		public User? AssignedTo { get; set; }

	}

}
