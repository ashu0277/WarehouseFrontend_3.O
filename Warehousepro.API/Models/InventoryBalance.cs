using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations.Schema;

namespace WarehousePro.API.Models

{

	/// <summary>

	/// Tracks how much stock of an Item exists in a specific BinLocation.

	/// The combination of ItemID + BinID is unique (composite index).

	/// Many InventoryBalances belong to One Item.

	/// Many InventoryBalances belong to One BinLocation.

	/// </summary>

	[Table("InventoryBalances")]

	public class InventoryBalance

	{

		[Key]

		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]

		public int BalanceID { get; set; }

		// FK → Item

		[Required]

		public int ItemID { get; set; }

		// FK → BinLocation

		[Required]

		public int BinID { get; set; }

		/// <summary>

		/// Physical stock currently in this bin.

		/// </summary>

		public int QuantityOnHand { get; set; } = 0;

		/// <summary>

		/// Stock reserved for open orders (not yet picked).

		/// </summary>

		public int ReservedQuantity { get; set; } = 0;

		/// <summary>

		/// Computed: stock available to reserve or pick.

		/// Not stored in DB — calculated on the fly.

		/// </summary>

		[NotMapped]

		public int AvailableQuantity => QuantityOnHand - ReservedQuantity;

		public DateTime LastUpdated { get; set; } = DateTime.UtcNow;

		// ── Navigation Properties ──────────────────────────────────────────

		// Many InventoryBalances → One Item

		[ForeignKey("ItemID")]

		public Item Item { get; set; } = null!;

		// Many InventoryBalances → One BinLocation

		[ForeignKey("BinID")]

		public BinLocation BinLocation { get; set; } = null!;

	}

}
