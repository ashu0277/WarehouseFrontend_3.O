using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WarehousePro.API.Models;
using WarehousePro.API.Models.Enums;

namespace WarehousePro.API.Models
{
	/// <summary>
	/// Represents a system user.
	/// One User can have many AuditLogs, Notifications, PutAwayTasks,
	/// PickTasks and WarehouseReports.
	/// </summary>
	[Table("Users")]
	public class User
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int UserID { get; set; }

		[Required]
		[MaxLength(100)]
		public string Name { get; set; } = string.Empty;

		[Required]
		public UserRole Role { get; set; }

		[Required]
		[MaxLength(150)]
		[EmailAddress]
		public string Email { get; set; } = string.Empty;

		[MaxLength(20)]
		public string? Phone { get; set; }

		[Required]
		public string PasswordHash { get; set; } = string.Empty;

		public bool IsDeleted { get; set; } = false;

		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		// ── Navigation Properties ──────────────────────────────────────────
		// One User → Many AuditLogs
		public ICollection<AuditLog> AuditLogs { get; set; }
			= new List<AuditLog>();

		// One User → Many Notifications
		public ICollection<Notification> Notifications { get; set; }
			= new List<Notification>();

		// One User → Many PutAwayTasks (as assigned operator)
		public ICollection<PutAwayTask> PutAwayTasks { get; set; }
			= new List<PutAwayTask>();

		// One User → Many PickTasks (as assigned operator)
		public ICollection<PickTask> PickTasks { get; set; }
			= new List<PickTask>();

		// One User → Many WarehouseReports (as report generator)
		public ICollection<WarehouseReport> WarehouseReports { get; set; }
			= new List<WarehouseReport>();
	}
}