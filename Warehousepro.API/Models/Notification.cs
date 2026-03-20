using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations.Schema;

using WarehousePro.API.Models.Enums;

namespace WarehousePro.API.Models

{

	/// <summary>

	/// In-app alert sent to a User for events like stock shortages,

	/// blocked bins, SLA breaches or shipment delays.

	/// Many Notifications belong to One User.

	/// </summary>

	[Table("Notifications")]

	public class Notification

	{

		[Key]

		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]

		public int NotificationID { get; set; }

		// FK → User (recipient)

		[Required]

		public int UserID { get; set; }

		[Required]

		[MaxLength(500)]

		public string Message { get; set; } = string.Empty;

		/// <summary>

		/// Inventory | Inbound | Picking | Dispatch

		/// </summary>

		public NotificationCategory Category { get; set; }

		/// <summary>

		/// Unread | Read | Dismissed

		/// </summary>

		public NotificationStatus Status { get; set; } = NotificationStatus.Unread;

		public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

		// ── Navigation Property ────────────────────────────────────────────

		[ForeignKey("UserID")]

		public User User { get; set; } = null!;

	}

}
