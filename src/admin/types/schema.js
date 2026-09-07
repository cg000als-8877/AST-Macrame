/**
 * AST Macramé — Enterprise Data Schema Definitions & Interfaces
 * Supports B2B Wholesale, Retail, Production, and Inventory Operations
 */

export const LeadStatus = {
  NEW: 'New',
  CONTACTED: 'Contacted',
  SAMPLE_REQUESTED: 'Sample Requested',
  SAMPLE_SENT: 'Sample Sent',
  QUALIFIED: 'Qualified',
  QUOTE_SENT: 'Quote Sent',
  NEGOTIATION: 'Negotiation',
  WON: 'Won',
  LOST: 'Lost',
};

export const OrderStatus = {
  NEW: 'New',
  CONFIRMED: 'Confirmed',
  PAYMENT_PENDING: 'Payment Pending',
  PRODUCTION: 'Production',
  QUALITY_CONTROL: 'Quality Control',
  PACKED: 'Packed',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  ON_HOLD: 'On Hold',
  CANCELLED: 'Cancelled',
  RETURNED: 'Returned',
};

export const QuoteStatus = {
  DRAFT: 'Draft',
  SENT: 'Sent',
  VIEWED: 'Viewed',
  NEGOTIATION: 'Negotiation',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
  EXPIRED: 'Expired',
};

export const SampleStatus = {
  REQUESTED: 'Requested',
  PAID: 'Paid',
  IN_PRODUCTION: 'In Production',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

export const SampleCreditStatus = {
  NOT_APPLICABLE: 'Not Applicable',
  ELIGIBLE: 'Eligible',
  AVAILABLE: 'Available',
  REDEEMED: 'Redeemed',
  EXPIRED: 'Expired',
};

export const InventoryMovementType = {
  INBOUND: 'Inbound',
  OUTBOUND: 'Outbound',
  RESERVATION: 'Reservation',
  RELEASE: 'Release',
  ADJUSTMENT: 'Adjustment',
  PRODUCTION_DEDUCTION: 'Production Deduction',
};

export const CustomerType = {
  RETAIL: 'Retail',
  WHOLESALE: 'Wholesale',
};

export const SalesChannel = {
  RETAIL: 'Retail',
  WHOLESALE: 'Wholesale',
  SAMPLE: 'Sample Order',
  CUSTOM: 'Custom OEM',
};

export const PaymentStatus = {
  PENDING: 'Pending',
  PARTIAL: 'Partially Paid',
  PAID: 'Paid',
  FAILED: 'Failed',
  REFUNDED: 'Refunded',
};

export const ProductionBatchStatus = {
  QUEUED: 'Queued',
  IN_PRODUCTION: 'In Production',
  COMPLETED: 'Completed',
  QUALITY_CONTROL: 'Quality Control',
  APPROVED: 'Approved',
};

export const QCStatus = {
  PENDING: 'Pending Inspection',
  IN_INSPECTION: 'In Inspection',
  PASSED: 'Passed',
  FAILED: 'Failed / Rework Required',
};

export const ShipmentStatus = {
  READY_TO_SHIP: 'Ready to Ship',
  PACKED: 'Packed',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
};

export const NotificationType = {
  ORDER_NEW: 'order_new',
  LEAD_NEW: 'lead_new',
  SAMPLE_REQUEST: 'sample_request',
  PAYMENT_RECEIVED: 'payment_received',
  PAYMENT_OVERDUE: 'payment_overdue',
  LOW_STOCK: 'low_stock',
  PRODUCTION_COMPLETED: 'production_completed',
  QC_FAILED: 'qc_failed',
  SHIPMENT_CREATED: 'shipment_created',
  ORDER_DELIVERED: 'order_delivered',
};

export const ActivityActionType = {
  ORDER_UPDATED: 'Order Updated',
  ORDER_STATUS_CHANGED: 'Order Status Changed',
  STOCK_ADJUSTED: 'Stock Adjusted',
  PAYMENT_RECORDED: 'Payment Recorded',
  BATCH_CREATED: 'Batch Created',
  BATCH_STATUS_CHANGED: 'Batch Status Changed',
  QC_INSPECTED: 'QC Inspected',
  SHIPMENT_DISPATCHED: 'Shipment Dispatched',
  QUOTE_CONVERTED: 'Quote Converted',
  LEAD_STATUS_CHANGED: 'Lead Status Changed',
};
