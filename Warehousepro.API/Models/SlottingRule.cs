using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations.Schema;

using WarehousePro.API.Models.Enums;

namespace WarehousePro.API.Models

{

	/// <summary>

	/// Defines rules that determine where items should be stored in the warehouse.

	/// e.g. "Fast-moving items go to Zone A", "Heavy items go to ground-floor bins".

	/// Standalone config table — no FK dependencies.

	/// </summary>

	[Table("SlottingRules")]

	public class SlottingRule

	{

		[Key]

		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]

		public int RuleID { get; set; }

		/// <summary>

		/// Velocity | Weight | Category

		/// </summary>

		public SlottingCriterion Criterion { get; set; }

		/// <summary>

		/// Lower number = higher priority when multiple rules apply.

		/// </summary>

		public int Priority { get; set; }

		/// <summary>

		/// Active | Inactive

		/// </summary>

		public SlottingRuleStatus Status { get; set; } = SlottingRuleStatus.Active;

		[MaxLength(500)]

		public string? Description { get; set; }

		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

	}

}
