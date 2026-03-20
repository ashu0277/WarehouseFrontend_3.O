using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations.Schema;

namespace WarehousePro.API.Models

{

	/// <summary>

	/// Tracks every action performed by a user in the system.

	/// Many AuditLogs belong to One User.

	/// </summary>

	[Table("AuditLogs")]

	public class AuditLog

	{

		[Key]

		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]

		public int AuditID { get; set; }

		// FK → User

		[Required]

		public int UserID { get; set; }

		/// <summary>

		/// e.g. "CREATE", "UPDATE", "DELETE", "LOGIN"

		/// </summary>

		[Required]

		[MaxLength(100)]

		public string Action { get; set; } = string.Empty;

		/// <summary>

		/// e.g. "Order", "BinLocation", "User"

		/// </summary>

		[Required]

		[MaxLength(150)]

		public string Resource { get; set; } = string.Empty;

		public DateTime Timestamp { get; set; } = DateTime.UtcNow;

		/// <summary>

		/// Optional JSON string with extra details (old value, new value, IP etc.)

		/// </summary>

		public string? Metadata { get; set; }

		// ── Navigation Property ────────────────────────────────────────────

		[ForeignKey("UserID")]

		public User User { get; set; } = null!;

	}

}
