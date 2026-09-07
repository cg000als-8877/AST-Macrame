import {
  INITIAL_PRODUCTS,
  INITIAL_COMPANIES,
  INITIAL_CUSTOMERS,
  INITIAL_LEADS,
  INITIAL_SAMPLES,
  INITIAL_QUOTES,
  INITIAL_ORDERS,
  INITIAL_BATCHES,
  INITIAL_PAYMENTS,
  INITIAL_SHIPMENTS,
  INITIAL_EXPENSES,
  INITIAL_NOTIFICATIONS,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_INVENTORY_MOVEMENTS,
} from './mockData';
import {
  OrderStatus,
  LeadStatus,
  QuoteStatus,
  SampleStatus,
  SampleCreditStatus,
  InventoryMovementType,
  PaymentStatus,
  ProductionBatchStatus,
  QCStatus,
  ShipmentStatus,
  NotificationType,
  ActivityActionType,
} from '../types/schema';

const STORAGE_KEYS = {
  PRODUCTS: 'ast_admin_products_v2',
  COMPANIES: 'ast_admin_companies_v2',
  CUSTOMERS: 'ast_admin_customers_v2',
  LEADS: 'ast_admin_leads_v2',
  SAMPLES: 'ast_admin_samples_v2',
  QUOTES: 'ast_admin_quotes_v2',
  ORDERS: 'ast_admin_orders_v2',
  BATCHES: 'ast_admin_batches_v2',
  PAYMENTS: 'ast_admin_payments_v2',
  SHIPMENTS: 'ast_admin_shipments_v2',
  EXPENSES: 'ast_admin_expenses_v2',
  NOTIFICATIONS: 'ast_admin_notifications_v2',
  ACTIVITY_LOGS: 'ast_admin_activity_logs_v2',
  INVENTORY_MOVEMENTS: 'ast_admin_inventory_movements_v2',
};

const loadData = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const saveData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`Failed to persist ${key}`, e);
  }
};

// ================= ADMIN ENTERPRISE BUSINESS ENGINE =================
class AdminBusinessService {
  constructor() {
    this.products = loadData(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    this.companies = loadData(STORAGE_KEYS.COMPANIES, INITIAL_COMPANIES);
    this.customers = loadData(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
    this.leads = loadData(STORAGE_KEYS.LEADS, INITIAL_LEADS);
    this.samples = loadData(STORAGE_KEYS.SAMPLES, INITIAL_SAMPLES);
    this.quotes = loadData(STORAGE_KEYS.QUOTES, INITIAL_QUOTES);
    this.orders = loadData(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    this.batches = loadData(STORAGE_KEYS.BATCHES, INITIAL_BATCHES);
    this.payments = loadData(STORAGE_KEYS.PAYMENTS, INITIAL_PAYMENTS);
    this.shipments = loadData(STORAGE_KEYS.SHIPMENTS, INITIAL_SHIPMENTS);
    this.expenses = loadData(STORAGE_KEYS.EXPENSES, INITIAL_EXPENSES);
    this.notifications = loadData(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    this.activityLogs = loadData(STORAGE_KEYS.ACTIVITY_LOGS, INITIAL_ACTIVITY_LOGS);
    this.movements = loadData(STORAGE_KEYS.INVENTORY_MOVEMENTS, INITIAL_INVENTORY_MOVEMENTS);
    this.listeners = new Set();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback(this.getState());
    return () => this.listeners.delete(callback);
  }

  notify() {
    const state = this.getState();
    this.listeners.forEach((cb) => cb(state));
  }

  getState() {
    return {
      products: [...this.products],
      companies: [...this.companies],
      customers: [...this.customers],
      leads: [...this.leads],
      samples: [...this.samples],
      quotes: [...this.quotes],
      orders: [...this.orders],
      batches: [...this.batches],
      payments: [...this.payments],
      shipments: [...this.shipments],
      expenses: [...this.expenses],
      notifications: [...this.notifications],
      activityLogs: [...this.activityLogs],
      movements: [...this.movements],
    };
  }

  // ================= 1. ACTIVITY LOGGING & NOTIFICATIONS =================
  logActivity(action, entityType, entityId, details, actor = 'Admin Operations') {
    const log = {
      id: `act-${Date.now()}`,
      actor,
      action,
      entityType,
      entityId,
      details,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    this.activityLogs = [log, ...this.activityLogs].slice(0, 200); // Keep latest 200 logs
    saveData(STORAGE_KEYS.ACTIVITY_LOGS, this.activityLogs);
  }

  addNotification(type, title, message, targetModule = 'dashboard', targetId = null) {
    const notif = {
      id: `notif-${Date.now()}`,
      type,
      title,
      message,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      isRead: false,
      targetModule,
      targetId,
    };
    this.notifications = [notif, ...this.notifications].slice(0, 100);
    saveData(STORAGE_KEYS.NOTIFICATIONS, this.notifications);
  }

  markNotificationRead(notifId) {
    this.notifications = this.notifications.map((n) =>
      n.id === notifId ? { ...n, isRead: true } : n
    );
    saveData(STORAGE_KEYS.NOTIFICATIONS, this.notifications);
    this.notify();
  }

  markAllNotificationsRead() {
    this.notifications = this.notifications.map((n) => ({ ...n, isRead: true }));
    saveData(STORAGE_KEYS.NOTIFICATIONS, this.notifications);
    this.notify();
  }

  // ================= 2. PRODUCTS & VARIANTS =================
  updateProduct(productId, updatedFields) {
    this.products = this.products.map((p) => (p.id === productId ? { ...p, ...updatedFields } : p));
    saveData(STORAGE_KEYS.PRODUCTS, this.products);
    this.logActivity(ActivityActionType.ORDER_UPDATED, 'Product', productId, 'Updated product specifications & pricing');
    this.notify();
  }

  addVariant(productId, newVariant) {
    this.products = this.products.map((p) => {
      if (p.id === productId) {
        return {
          ...p,
          variants: [
            ...p.variants,
            {
              id: `var-${Date.now()}`,
              stock: { onHand: 0, reserved: 0, available: 0, lowStockThreshold: 10 },
              unitCost: 400,
              ...newVariant,
            },
          ],
        };
      }
      return p;
    });
    saveData(STORAGE_KEYS.PRODUCTS, this.products);
    this.logActivity(ActivityActionType.ORDER_UPDATED, 'Product', productId, `Added new variant ${newVariant.color} [${newVariant.size}]`);
    this.notify();
  }

  // ================= 3. INVENTORY TRANSACTIONS =================
  recordInventoryAdjustment(variantId, changeQuantity, reason, performedBy = 'Admin Operations') {
    let affectedSku = '';
    let updatedOnHand = 0;
    let updatedAvailable = 0;
    let colorName = '';

    this.products = this.products.map((p) => ({
      ...p,
      variants: p.variants.map((v) => {
        if (v.id === variantId || v.sku === variantId) {
          affectedSku = v.sku;
          colorName = v.color;
          const currentOnHand = v.stock.onHand || 0;
          const currentReserved = v.stock.reserved || 0;
          const nextOnHand = Math.max(0, currentOnHand + changeQuantity);
          const nextAvailable = Math.max(0, nextOnHand - currentReserved);
          updatedOnHand = nextOnHand;
          updatedAvailable = nextAvailable;

          // Check if triggered low stock threshold
          if (nextAvailable <= (v.stock.lowStockThreshold || 15)) {
            this.addNotification(
              NotificationType.LOW_STOCK,
              `Low Stock Warning: ${v.color} Belt (${v.size})`,
              `Available stock has fallen to ${nextAvailable} units.`,
              'inventory',
              v.id
            );
          }

          return {
            ...v,
            stock: {
              ...v.stock,
              onHand: nextOnHand,
              available: nextAvailable,
            },
          };
        }
        return v;
      }),
    }));

    // Log immutable movement record
    const movementRecord = {
      id: `mov-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      variantId,
      sku: affectedSku,
      type: changeQuantity >= 0 ? InventoryMovementType.INBOUND : InventoryMovementType.ADJUSTMENT,
      quantity: changeQuantity,
      referenceId: `ADJ-${Date.now().toString().slice(-4)}`,
      reason: reason || 'Manual stock adjustment',
      balanceOnHand: updatedOnHand,
      balanceAvailable: updatedAvailable,
      performedBy,
    };

    this.movements = [movementRecord, ...this.movements];
    this.logActivity(
      ActivityActionType.STOCK_ADJUSTED,
      'Inventory',
      affectedSku || variantId,
      `Adjusted stock by ${changeQuantity > 0 ? `+${changeQuantity}` : changeQuantity} units. Reason: ${reason}`,
      performedBy
    );

    saveData(STORAGE_KEYS.PRODUCTS, this.products);
    saveData(STORAGE_KEYS.INVENTORY_MOVEMENTS, this.movements);
    this.notify();
  }

  reserveInventoryForOrder(order) {
    if (!order.items || !Array.isArray(order.items)) return;

    this.products = this.products.map((p) => ({
      ...p,
      variants: p.variants.map((v) => {
        const item = order.items.find((it) => it.variantId === v.id || it.sku === v.sku);
        if (item) {
          const qty = Number(item.quantity) || 1;
          const newReserved = (v.stock.reserved || 0) + qty;
          const newAvailable = Math.max(0, (v.stock.onHand || 0) - newReserved);

          this.movements.unshift({
            id: `mov-${Date.now()}-${v.id}`,
            timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
            variantId: v.id,
            sku: v.sku,
            type: InventoryMovementType.RESERVATION,
            quantity: -qty,
            referenceId: order.orderNumber || order.id,
            reason: `Reserved for ${order.channel || 'Retail'} order ${order.orderNumber || order.id}`,
            balanceOnHand: v.stock.onHand,
            balanceAvailable: newAvailable,
            performedBy: 'Engine',
          });

          return {
            ...v,
            stock: {
              ...v.stock,
              reserved: newReserved,
              available: newAvailable,
            },
          };
        }
        return v;
      }),
    }));

    saveData(STORAGE_KEYS.PRODUCTS, this.products);
    saveData(STORAGE_KEYS.INVENTORY_MOVEMENTS, this.movements);
  }

  releaseInventoryReservation(order) {
    if (!order.items || !Array.isArray(order.items)) return;

    this.products = this.products.map((p) => ({
      ...p,
      variants: p.variants.map((v) => {
        const item = order.items.find((it) => it.variantId === v.id || it.sku === v.sku);
        if (item) {
          const qty = Number(item.quantity) || 1;
          const newReserved = Math.max(0, (v.stock.reserved || 0) - qty);
          const newAvailable = Math.max(0, (v.stock.onHand || 0) - newReserved);

          this.movements.unshift({
            id: `mov-${Date.now()}-${v.id}`,
            timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
            variantId: v.id,
            sku: v.sku,
            type: InventoryMovementType.RELEASE,
            quantity: qty,
            referenceId: order.orderNumber || order.id,
            reason: `Reservation released on order cancel: ${order.orderNumber || order.id}`,
            balanceOnHand: v.stock.onHand,
            balanceAvailable: newAvailable,
            performedBy: 'Engine',
          });

          return {
            ...v,
            stock: {
              ...v.stock,
              reserved: newReserved,
              available: newAvailable,
            },
          };
        }
        return v;
      }),
    }));

    saveData(STORAGE_KEYS.PRODUCTS, this.products);
    saveData(STORAGE_KEYS.INVENTORY_MOVEMENTS, this.movements);
  }

  deductStockOnFulfillment(order) {
    if (!order.items || !Array.isArray(order.items)) return;

    this.products = this.products.map((p) => ({
      ...p,
      variants: p.variants.map((v) => {
        const item = order.items.find((it) => it.variantId === v.id || it.sku === v.sku);
        if (item) {
          const qty = Number(item.quantity) || 1;
          const newOnHand = Math.max(0, (v.stock.onHand || 0) - qty);
          const newReserved = Math.max(0, (v.stock.reserved || 0) - qty);
          const newAvailable = Math.max(0, newOnHand - newReserved);

          this.movements.unshift({
            id: `mov-${Date.now()}-${v.id}`,
            timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
            variantId: v.id,
            sku: v.sku,
            type: InventoryMovementType.OUTBOUND,
            quantity: -qty,
            referenceId: order.orderNumber || order.id,
            reason: `Fulfillment dispatch: ${order.orderNumber || order.id}`,
            balanceOnHand: newOnHand,
            balanceAvailable: newAvailable,
            performedBy: 'Shipping Lead',
          });

          return {
            ...v,
            stock: {
              ...v.stock,
              onHand: newOnHand,
              reserved: newReserved,
              available: newAvailable,
            },
          };
        }
        return v;
      }),
    }));

    saveData(STORAGE_KEYS.PRODUCTS, this.products);
    saveData(STORAGE_KEYS.INVENTORY_MOVEMENTS, this.movements);
  }

  // ================= 4. UNIFIED ORDERS & PIPELINE =================
  updateOrderStatus(orderId, newStatus, note = '', actor = 'Admin Operations') {
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    let targetOrder = null;

    this.orders = this.orders.map((o) => {
      if (o.id === orderId) {
        targetOrder = o;
        const prevStatus = o.status;
        const updated = {
          ...o,
          status: newStatus,
          timeline: [
            ...(o.timeline || []),
            {
              time: now,
              text: `Status changed from ${prevStatus} to ${newStatus}${note ? `: ${note}` : ''}`,
            },
          ],
        };

        // Inventory business triggers
        if (newStatus === OrderStatus.CONFIRMED && !o.inventoryReserved) {
          updated.inventoryReserved = true;
          this.reserveInventoryForOrder(updated);
        } else if (newStatus === OrderStatus.CANCELLED && o.inventoryReserved) {
          updated.inventoryReserved = false;
          this.releaseInventoryReservation(updated);
        } else if (newStatus === OrderStatus.SHIPPED || newStatus === OrderStatus.DELIVERED) {
          if (o.inventoryReserved) {
            updated.inventoryReserved = false;
            this.deductStockOnFulfillment(updated);
          }
        }

        return updated;
      }
      return o;
    });

    if (targetOrder) {
      this.logActivity(
        ActivityActionType.ORDER_STATUS_CHANGED,
        'Order',
        targetOrder.orderNumber || targetOrder.id,
        `Status changed from ${targetOrder.status} → ${newStatus}`,
        actor
      );
    }

    saveData(STORAGE_KEYS.ORDERS, this.orders);
    this.notify();
  }

  updateOrderShipping(orderId, shippingData) {
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    let orderNum = '';

    this.orders = this.orders.map((o) => {
      if (o.id === orderId) {
        orderNum = o.orderNumber || o.id;
        const updated = {
          ...o,
          carrier: shippingData.carrier,
          trackingNumber: shippingData.trackingNumber,
          status: shippingData.status || o.status,
          timeline: [
            ...(o.timeline || []),
            {
              time: now,
              text: `Consignment updated: Carrier ${shippingData.carrier}, Tracking #${shippingData.trackingNumber}`,
            },
          ],
        };

        // Create or update shipment in shipments list
        const existingShp = this.shipments.find((s) => s.orderId === orderId);
        if (existingShp) {
          this.shipments = this.shipments.map((s) =>
            s.orderId === orderId
              ? {
                  ...s,
                  carrier: shippingData.carrier,
                  trackingNumber: shippingData.trackingNumber,
                  status: shippingData.status === OrderStatus.DELIVERED ? ShipmentStatus.DELIVERED : ShipmentStatus.SHIPPED,
                  deliveryDate: shippingData.status === OrderStatus.DELIVERED ? now.split(' ')[0] : s.deliveryDate,
                }
              : s
          );
        } else {
          this.shipments.unshift({
            id: `shp-${Date.now()}`,
            orderId: o.id,
            orderNumber: o.orderNumber || o.id,
            customerName: o.contactName || o.name || 'Valued Customer',
            companyName: o.companyName || null,
            destination: `${o.shippingAddress?.street || o.address || ''}, ${o.shippingAddress?.city || o.city || 'Dhaka'}`,
            city: o.shippingAddress?.city || o.city || 'Dhaka',
            carrier: shippingData.carrier,
            trackingNumber: shippingData.trackingNumber,
            shippingCost: o.shippingCost || 100,
            shippingDate: now.split(' ')[0],
            deliveryDate: null,
            status: ShipmentStatus.SHIPPED,
            itemsSummary: o.items?.map((it) => `${it.quantity}x ${it.color}`).join(', ') || 'Belts',
            notes: 'Dispatched from AST Fulfillment Hub',
          });
        }
        saveData(STORAGE_KEYS.SHIPMENTS, this.shipments);

        // If newly marked as shipped, deduct stock if not yet deducted
        if (shippingData.status === OrderStatus.SHIPPED || shippingData.status === OrderStatus.DELIVERED) {
          if (o.inventoryReserved) {
            updated.inventoryReserved = false;
            this.deductStockOnFulfillment(updated);
          }
        }

        return updated;
      }
      return o;
    });

    this.logActivity(
      ActivityActionType.SHIPMENT_DISPATCHED,
      'Shipment',
      shippingData.trackingNumber || orderNum,
      `Consignment dispatched via ${shippingData.carrier} (${shippingData.trackingNumber})`
    );

    saveData(STORAGE_KEYS.ORDERS, this.orders);
    this.notify();
  }

  // ================= 5. PRODUCTION BATCHES & QC ENGINE =================
  createProductionBatch(batchData) {
    const batchNumber = `BAT-${new Date().getFullYear()}-${String(this.batches.length + 85).padStart(3, '0')}`;
    const newBatch = {
      id: batchNumber,
      batchNumber,
      orderId: batchData.orderId || null,
      orderNumber: batchData.orderNumber || null,
      productId: batchData.productId || 'prod-001',
      productTitle: batchData.productTitle || 'AST Handmade Macramé Belt',
      variantId: batchData.variantId || 'var-blk-m',
      sku: batchData.sku || `AST-BLT-${(batchData.color || 'BLK').substring(0, 3).toUpperCase()}-M`,
      color: batchData.color || 'Black',
      size: batchData.size || 'M (32–35")',
      quantity: Number(batchData.quantity) || 50,
      completedQty: 0,
      status: ProductionBatchStatus.QUEUED,
      assignedWorkshop: batchData.workshop || 'Artisan Workshop 1 (Savar)',
      assignedTeam: batchData.assignedTeam || 'Master Weaver Rafiq',
      startDate: new Date().toISOString().split('T')[0],
      expectedCompletion: batchData.expectedCompletion || batchData.targetDate || '2026-09-25',
      actualCompletion: null,
      notes: batchData.notes || 'Handmade artisanal weaving batch.',
      qcStatus: QCStatus.PENDING,
      qcInspections: [],
    };

    this.batches = [newBatch, ...this.batches];
    saveData(STORAGE_KEYS.BATCHES, this.batches);

    this.logActivity(
      ActivityActionType.BATCH_CREATED,
      'Production Batch',
      batchNumber,
      `Created ${newBatch.quantity}x ${newBatch.color} [${newBatch.size}] batch allocated to ${newBatch.assignedWorkshop}`
    );

    this.notify();
    return newBatch;
  }

  updateBatchStatus(batchId, newStatus, note = '') {
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    let updatedBatch = null;

    this.batches = this.batches.map((b) => {
      if (b.id === batchId) {
        const prevStatus = b.status;
        updatedBatch = {
          ...b,
          status: newStatus,
          actualCompletion: newStatus === ProductionBatchStatus.COMPLETED || newStatus === ProductionBatchStatus.APPROVED ? now.split(' ')[0] : b.actualCompletion,
        };

        if (newStatus === ProductionBatchStatus.IN_PRODUCTION && b.completedQty === 0) {
          updatedBatch.completedQty = Math.round(b.quantity * 0.35);
        } else if (newStatus === ProductionBatchStatus.QUALITY_CONTROL || newStatus === ProductionBatchStatus.COMPLETED) {
          updatedBatch.completedQty = b.quantity;
          // Notify QC team
          this.addNotification(
            NotificationType.PRODUCTION_COMPLETED,
            `Batch Ready for QC Inspection: ${b.batchNumber}`,
            `${b.quantity}x ${b.color} belts arrived from ${b.assignedWorkshop}.`,
            'production',
            b.id
          );
        }

        return updatedBatch;
      }
      return b;
    });

    if (updatedBatch) {
      this.logActivity(
        ActivityActionType.BATCH_STATUS_CHANGED,
        'Production Batch',
        batchId,
        `Status advanced to ${newStatus}${note ? `: ${note}` : ''}`
      );
    }

    saveData(STORAGE_KEYS.BATCHES, this.batches);
    this.notify();
  }

  recordQCInspection(batchId, inspectionData) {
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const inspectedQty = Number(inspectionData.quantityInspected) || 0;
    const passedQty = Number(inspectionData.quantityPassed) || 0;
    const failedQty = Number(inspectionData.quantityFailed) || 0;
    const isPassed = failedQty === 0 && passedQty >= inspectedQty;

    const newInspection = {
      id: `qc-${Date.now()}`,
      inspectionDate: now.split(' ')[0],
      inspector: inspectionData.inspector || 'Senior QC Lead Tareq',
      quantityInspected: inspectedQty,
      quantityPassed: passedQty,
      quantityFailed: failedQty,
      defects: inspectionData.defects || [],
      notes: inspectionData.notes || (isPassed ? 'Inspection passed with zero defects.' : `Found ${failedQty} defective pieces.`),
      passed: isPassed,
    };

    let targetBatch = null;

    this.batches = this.batches.map((b) => {
      if (b.id === batchId) {
        targetBatch = b;
        const inspections = [...(b.qcInspections || []), newInspection];

        if (isPassed) {
          // Passed QC -> Approve batch & add finished goods to stock
          this.recordInventoryAdjustment(
            b.variantId,
            passedQty,
            `Finished production stock passed QC from Batch ${b.batchNumber}`,
            'QC Department'
          );

          return {
            ...b,
            status: ProductionBatchStatus.APPROVED,
            qcStatus: QCStatus.PASSED,
            qcInspections: inspections,
          };
        } else {
          // Failed QC -> If rework assigned, send back to In Production with rework instructions
          this.addNotification(
            NotificationType.QC_FAILED,
            `QC Failed: Batch ${b.batchNumber}`,
            `${failedQty} defective pieces found by ${newInspection.inspector}. Batch routed back for workshop correction.`,
            'production',
            b.id
          );

          return {
            ...b,
            status: ProductionBatchStatus.IN_PRODUCTION, // Send back for correction
            qcStatus: QCStatus.FAILED,
            notes: `${b.notes || ''} | REWORK REQ: ${inspectionData.notes || 'Fix knots and defects.'}`,
            qcInspections: inspections,
          };
        }
      }
      return b;
    });

    this.logActivity(
      ActivityActionType.QC_INSPECTED,
      'Quality Control',
      batchId,
      `QC Audit: ${passedQty}/${inspectedQty} Passed. Result: ${isPassed ? 'APPROVED' : 'FAILED - SENT FOR CORRECTION'}`
    );

    saveData(STORAGE_KEYS.BATCHES, this.batches);
    this.notify();
    return newInspection;
  }

  // ================= 6. PAYMENTS & WHOLESALE DEPOSIT FLOW =================
  recordPayment(paymentData) {
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const amount = Number(paymentData.amount) || 0;

    const newPayment = {
      id: `pay-${Date.now()}`,
      orderId: paymentData.orderId,
      orderNumber: paymentData.orderNumber,
      companyName: paymentData.companyName || null,
      customerName: paymentData.customerName || 'Customer',
      amount,
      paymentType: paymentData.paymentType || 'Full Payment',
      paymentMethod: paymentData.paymentMethod || 'Bank Wire Transfer',
      transactionRef: paymentData.transactionRef || `TR-${Date.now().toString().slice(-6)}`,
      status: PaymentStatus.PAID,
      date: now.split(' ')[0],
      notes: paymentData.notes || 'Payment verified by Finance.',
    };

    this.payments = [newPayment, ...this.payments];
    saveData(STORAGE_KEYS.PAYMENTS, this.payments);

    // Update associated order's payment state
    if (paymentData.orderId) {
      this.orders = this.orders.map((o) => {
        if (o.id === paymentData.orderId) {
          const grandTotal = o.grandTotal || o.totalCost || 0;
          const prevDeposit = o.depositPaid || 0;
          const nextDeposit = prevDeposit + amount;
          const balanceRemaining = Math.max(0, grandTotal - nextDeposit);
          const isFullyPaid = balanceRemaining === 0;

          const updated = {
            ...o,
            depositPaid: nextDeposit,
            balanceDue: balanceRemaining,
            paymentStatus: isFullyPaid ? PaymentStatus.PAID : PaymentStatus.PARTIAL,
            timeline: [
              ...(o.timeline || []),
              {
                time: now,
                text: `Payment of ৳${amount.toLocaleString()} received via ${paymentData.paymentMethod} (Ref: ${newPayment.transactionRef}). Remaining balance: ৳${balanceRemaining.toLocaleString()}`,
              },
            ],
          };

          return updated;
        }
        return o;
      });
      saveData(STORAGE_KEYS.ORDERS, this.orders);
    }

    this.logActivity(
      ActivityActionType.PAYMENT_RECORDED,
      'Payment',
      newPayment.transactionRef,
      `Received ৳${amount.toLocaleString()} for ${paymentData.orderNumber || paymentData.companyName || 'Order'}`
    );

    this.addNotification(
      NotificationType.PAYMENT_RECEIVED,
      `Payment Received: ৳${amount.toLocaleString()}`,
      `Settlement recorded for ${paymentData.orderNumber || paymentData.companyName || 'Account'}.`,
      'finance',
      newPayment.id
    );

    this.notify();
    return newPayment;
  }

  markPaymentPaid(orderId, paymentNote = '') {
    const order = this.orders.find((o) => o.id === orderId);
    if (!order) return;

    const amount = order.balanceDue !== undefined ? order.balanceDue : (order.grandTotal || order.totalCost || 0);
    this.recordPayment({
      orderId: order.id,
      orderNumber: order.orderNumber || order.id,
      companyName: order.companyName || null,
      customerName: order.contactName || order.name || 'Valued Customer',
      amount,
      paymentType: 'Remaining Balance Settlement',
      paymentMethod: order.paymentMethod || 'Bank Wire Transfer',
      transactionRef: `SETTLE-${Date.now().toString().slice(-6)}`,
      notes: paymentNote || 'Full balance clearance.',
    });
  }

  // ================= 7. WHOLESALE CRM & SAMPLE CREDITS =================
  createLead(leadData) {
    const newLead = {
      id: `lead-${Date.now()}`,
      status: LeadStatus.NEW,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      ...leadData,
    };
    this.leads = [newLead, ...this.leads];
    saveData(STORAGE_KEYS.LEADS, this.leads);

    this.logActivity(
      ActivityActionType.LEAD_STATUS_CHANGED,
      'CRM Lead',
      newLead.companyName || newLead.title,
      `New wholesale lead created (${newLead.estimatedPieces || 0} pcs estimated)`
    );

    this.addNotification(
      NotificationType.LEAD_NEW,
      `New Wholesale Lead: ${newLead.companyName || newLead.title}`,
      `Contact: ${newLead.contactName || 'Lead'} • Est: ${newLead.estimatedPieces || 0} pcs`,
      'wholesale',
      newLead.id
    );

    this.notify();
    return newLead;
  }

  updateLeadStatus(leadId, newStatus) {
    this.leads = this.leads.map((l) => {
      if (l.id === leadId) {
        return {
          ...l,
          status: newStatus,
          updatedAt: new Date().toISOString().split('T')[0],
        };
      }
      return l;
    });
    saveData(STORAGE_KEYS.LEADS, this.leads);
    this.notify();
  }

  createSampleOrder(sampleData) {
    const sampleNumber = `SAM-${new Date().getFullYear()}-${String(this.samples.length + 1).padStart(3, '0')}`;
    const newSample = {
      id: `sam-${Date.now()}`,
      sampleNumber,
      status: SampleStatus.PAID,
      paymentStatus: PaymentStatus.PAID,
      paidAt: new Date().toISOString().split('T')[0],
      sampleCreditEligible: true,
      sampleCreditAmountBDT: sampleData.sampleTotalBDT || 2400,
      creditStatus: SampleCreditStatus.AVAILABLE,
      appliedToOrderId: null,
      ...sampleData,
    };

    this.samples = [newSample, ...this.samples];
    saveData(STORAGE_KEYS.SAMPLES, this.samples);

    // Record sample fee payment
    this.recordPayment({
      orderId: newSample.id,
      orderNumber: sampleNumber,
      companyName: newSample.companyName,
      customerName: newSample.contactName,
      amount: newSample.totalPaidBDT || 4900,
      paymentType: 'Sample Fee',
      paymentMethod: 'Credit Card / Stripe',
      transactionRef: `SAM-FEE-${Date.now().toString().slice(-4)}`,
      notes: `Sample order fee for ${newSample.companyName}`,
    });

    this.notify();
    return newSample;
  }

  updateSampleStatus(sampleId, newStatus) {
    this.samples = this.samples.map((s) => {
      if (s.id === sampleId) {
        const updated = { ...s, status: newStatus };
        if (newStatus === SampleStatus.DELIVERED && !s.deliveredAt) {
          updated.deliveredAt = new Date().toISOString().split('T')[0];
          if (updated.sampleCreditEligible && updated.creditStatus !== SampleCreditStatus.REDEEMED) {
            updated.creditStatus = SampleCreditStatus.AVAILABLE;
          }
        }
        return updated;
      }
      return s;
    });
    saveData(STORAGE_KEYS.SAMPLES, this.samples);
    this.notify();
  }

  createQuotation(quoteData) {
    const quoteNumber = `QTE-${new Date().getFullYear()}-${String(this.quotes.length + 1).padStart(3, '0')}`;
    const newQuote = {
      id: `quote-${Date.now()}`,
      quoteNumber,
      status: QuoteStatus.SENT,
      createdAt: new Date().toISOString().split('T')[0],
      ...quoteData,
    };

    this.quotes = [newQuote, ...this.quotes];
    saveData(STORAGE_KEYS.QUOTES, this.quotes);
    this.notify();
    return newQuote;
  }

  updateQuoteStatus(quoteId, newStatus) {
    this.quotes = this.quotes.map((q) => (q.id === quoteId ? { ...q, status: newStatus } : q));
    saveData(STORAGE_KEYS.QUOTES, this.quotes);
    this.notify();
  }

  convertQuoteToWholesaleOrder(quoteId) {
    const quote = this.quotes.find((q) => q.id === quoteId);
    if (!quote) return null;

    const availableSample = this.samples.find(
      (s) => s.companyId === quote.companyId && s.creditStatus === SampleCreditStatus.AVAILABLE
    );

    const sampleCreditAmount = availableSample ? availableSample.sampleCreditAmountBDT : (quote.sampleCreditDeductionBDT || 0);
    const orderNumber = `ORD-WHL-${new Date().getFullYear()}-${String(this.orders.length + 1).padStart(3, '0')}`;
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const grandTotal = quote.subtotalBDT - sampleCreditAmount + (quote.shippingBDT || 15000);
    const depositReq = Math.round(grandTotal * 0.5);

    const wholesaleOrder = {
      id: `ord-whl-${Date.now()}`,
      orderNumber,
      channel: 'Wholesale',
      companyId: quote.companyId,
      companyName: quote.companyName,
      contactName: quote.contactName,
      name: quote.contactName,
      email: quote.contactEmail,
      phone: quote.contactPhone || '+33 6 42 90 11 22',
      address: quote.shippingAddress || 'Wholesale Client Facility',
      city: quote.city || 'Paris',
      country: quote.country || 'France',
      status: OrderStatus.CONFIRMED,
      paymentStatus: PaymentStatus.PENDING,
      paymentTerms: `50% Deposit (৳${depositReq.toLocaleString()}) Required to Start Production`,
      depositPaid: 0,
      balanceDue: grandTotal,
      fulfillmentStatus: 'Queued for Production',
      items: quote.items.map((it) => ({
        variantId: it.variantId,
        name: it.title || 'AST Handmade Macramé Belt',
        color: it.color,
        size: it.size,
        quantity: it.quantity,
        unitPrice: it.unitPrice,
        unitCost: 400,
        total: it.total,
      })),
      subtotal: quote.subtotalBDT,
      sampleCreditApplied: sampleCreditAmount,
      shippingCost: quote.shippingBDT || 15000,
      grandTotal,
      totalCost: grandTotal,
      currency: quote.currency || 'BDT',
      inventoryReserved: true,
      timeline: [
        { time: now, text: `Converted from Quotation ${quote.quoteNumber}. Order confirmed.` },
      ],
      note: quote.notes || 'Wholesale bulk order with sample credit redemption.',
      createdAt: now.split(' ')[0],
    };

    if (availableSample) {
      this.samples = this.samples.map((s) =>
        s.id === availableSample.id
          ? {
              ...s,
              creditStatus: SampleCreditStatus.REDEEMED,
              appliedToOrderId: wholesaleOrder.id,
              redeemedAt: now.split(' ')[0],
            }
          : s
      );
      saveData(STORAGE_KEYS.SAMPLES, this.samples);
      wholesaleOrder.timeline.push({
        time: now,
        text: `Sample Credit of ৳${sampleCreditAmount.toLocaleString()} (${availableSample.sampleNumber}) redeemed & deducted from invoice.`,
      });
    }

    this.updateQuoteStatus(quoteId, QuoteStatus.ACCEPTED);
    this.reserveInventoryForOrder(wholesaleOrder);

    this.orders = [wholesaleOrder, ...this.orders];
    saveData(STORAGE_KEYS.ORDERS, this.orders);

    this.leads = this.leads.map((l) =>
      l.companyId === quote.companyId && l.status !== LeadStatus.WON
        ? { ...l, status: LeadStatus.WON, updatedAt: now.split(' ')[0] }
        : l
    );
    saveData(STORAGE_KEYS.LEADS, this.leads);

    this.logActivity(
      ActivityActionType.QUOTE_CONVERTED,
      'Order',
      wholesaleOrder.orderNumber,
      `Converted Quote ${quote.quoteNumber} into Wholesale Order ${wholesaleOrder.orderNumber}`
    );

    this.notify();
    return wholesaleOrder;
  }

  // ================= 8. COMPANIES & CUSTOMERS =================
  addCompany(companyData) {
    const newCompany = {
      id: `comp-${Date.now()}`,
      status: 'Active',
      totalSpent: 0,
      contacts: [],
      ...companyData,
    };
    this.companies = [newCompany, ...this.companies];
    saveData(STORAGE_KEYS.COMPANIES, this.companies);
    this.notify();
    return newCompany;
  }

  addContactToCompany(companyId, contactData) {
    this.companies = this.companies.map((c) => {
      if (c.id === companyId) {
        return {
          ...c,
          contacts: [
            ...c.contacts,
            { id: `cont-${Date.now()}`, isPrimary: c.contacts.length === 0, ...contactData },
          ],
        };
      }
      return c;
    });
    saveData(STORAGE_KEYS.COMPANIES, this.companies);
    this.notify();
  }
}

export const adminService = new AdminBusinessService();
