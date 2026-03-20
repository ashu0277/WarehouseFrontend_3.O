namespace WarehousePro.API.Models.Enums

{

	// ─────────────────────────────────────────

	// Group 1 : Identity & Access

	// ─────────────────────────────────────────

	public enum UserRole

	{

		Operator,

		Supervisor,

		Planner,

		Logistics,

		Admin

	}

	// ─────────────────────────────────────────

	// Group 2 : Warehouse Layout

	// ─────────────────────────────────────────

	public enum WarehouseStatus

	{

		Active,

		Inactive

	}

	public enum ZoneType

	{

		Receiving,

		Storage,

		Picking,

		Dispatch

	}

	public enum BinStatus

	{

		Available,

		Full,

		Blocked

	}

	// ─────────────────────────────────────────

	// Group 3 : Inventory

	// ─────────────────────────────────────────

	public enum ItemStatus

	{

		Active,

		Inactive

	}

	public enum ReservationReferenceType

	{

		Order,

		Replenishment

	}

	// ─────────────────────────────────────────

	// Group 4 : Inbound

	// ─────────────────────────────────────────

	public enum ReceiptStatus

	{

		Received,

		PartiallyReceived,

		Closed

	}

	public enum PutAwayStatus

	{

		Pending,

		InProgress,

		Completed

	}

	// ─────────────────────────────────────────

	// Group 5 : Orders & Outbound

	// ─────────────────────────────────────────

	public enum OrderStatus

	{

		Pending,

		Processing,

		Completed,

		Cancelled

	}

	public enum PickTaskStatus

	{

		Assigned,

		Picked,

		Short

	}

	public enum PackingStatus

	{

		Packed,

		Shipped

	}

	public enum ShipmentStatus

	{

		Dispatched,

		InTransit,

		Delivered

	}

	// ─────────────────────────────────────────

	// Group 6 : Replenishment & Slotting

	// ─────────────────────────────────────────

	public enum ReplenishmentStatus

	{

		Planned,

		Completed

	}

	public enum SlottingCriterion

	{

		Velocity,

		Weight,

		Category

	}

	public enum SlottingRuleStatus

	{

		Active,

		Inactive

	}

	// ─────────────────────────────────────────

	// Group 7 : Analytics & Notifications

	// ─────────────────────────────────────────

	public enum ReportScope

	{

		Warehouse,

		Zone,

		Period

	}

	public enum NotificationCategory

	{

		Inventory,

		Inbound,

		Picking,

		Dispatch

	}

	public enum NotificationStatus

	{

		Unread,

		Read,

		Dismissed

	}

}
