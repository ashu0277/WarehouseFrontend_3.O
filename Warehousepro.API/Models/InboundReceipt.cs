using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations.Schema;

using WarehousePro.API.Models.Enums;

namespace WarehousePro.API.Models

{

	/// <summary>

	/// Records the arrival of goods from a supplier (ASN / GRN).

	/// One InboundReceipt generates many PutAwayTasks.

	/// </summary>

	[Table("InboundReceipts")]

	public class InboundReceipt

	{

		[Key]

		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]

		public int ReceiptID { get; set; }

		/// <summary>

		/// Purchase Order number or ASN reference.

		/// </summary>

		[Required]

		[MaxLength(100)]

		public string ReferenceNo { get; set; } = string.Empty;

		[Required]

		[MaxLength(150)]

		public string Supplier { get; set; } = string.Empty;

		public DateTime ReceiptDate { get; set; } = DateTime.UtcNow;

		/// <summary>

		/// Received | PartiallyReceived | Closed

		/// </summary>

		public ReceiptStatus Status { get; set; } = ReceiptStatus.Received;

		public bool IsDeleted { get; set; } = false;

		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		// ── Navigation Property ────────────────────────────────────────────

		// One InboundReceipt → Many PutAwayTasks

		public ICollection<PutAwayTask> PutAwayTasks { get; set; }

			= new List<PutAwayTask>();

	}

}
