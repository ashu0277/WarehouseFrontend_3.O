using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations.Schema;

using WarehousePro.API.Models.Enums;

namespace WarehousePro.API.Models

{

	/// <summary>

	/// Stores generated KPI / analytics reports for the warehouse.

	/// Many WarehouseReports belong to One User (the person who generated it).

	/// </summary>

	[Table("WarehouseReports")]

	public class WarehouseReport

	{

		[Key]

		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]

		public int ReportID { get; set; }

		/// <summary>

		/// Warehouse | Zone | Period

		/// </summary>

		public ReportScope Scope { get; set; }

		/// <summary>

		/// JSON string storing KPIs:

		/// { "PickRate": 95.2, "AccuracyPct": 99.1, "OrderCycleTime": 3.4 }

		/// </summary>

		public string? Metrics { get; set; }

		public DateTime GeneratedDate { get; set; } = DateTime.UtcNow;

		// FK → User (who generated this report)

		[Required]

		public int GeneratedByUserID { get; set; }

		// ── Navigation Property ────────────────────────────────────────────

		[ForeignKey("GeneratedByUserID")]

		public User GeneratedBy { get; set; } = null!;

	}

}
