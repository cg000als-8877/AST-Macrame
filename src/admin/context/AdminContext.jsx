import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminService } from '../services/adminService';

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [data, setData] = useState(adminService.getState());
  const [activeModule, setActiveModule] = useState('dashboard');
  const [activeSubView, setActiveSubView] = useState('overview');
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const unsub = adminService.subscribe((updatedState) => {
      setData(updatedState);
    });
    return () => unsub();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const navigateTo = (module, subView = 'overview') => {
    setActiveModule(module);
    setActiveSubView(subView);
    setIsMobileNavOpen(false);
    setIsNotifDrawerOpen(false);
  };

  // Keyboard shortcut for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const value = {
    ...data,
    activeModule,
    activeSubView,
    setActiveModule,
    setActiveSubView,
    navigateTo,
    isCommandOpen,
    setIsCommandOpen,
    isMobileNavOpen,
    setIsMobileNavOpen,
    isNotifDrawerOpen,
    setIsNotifDrawerOpen,
    toast,
    showToast,
    // ================= ACTION DELEGATES =================
    updateProduct: (id, fields) => {
      adminService.updateProduct(id, fields);
      showToast('Product specifications updated successfully');
    },
    addVariant: (productId, variant) => {
      adminService.addVariant(productId, variant);
      showToast('New SKU variant created');
    },
    recordInventoryAdjustment: (varId, qty, reason) => {
      adminService.recordInventoryAdjustment(varId, qty, reason);
      showToast('Inventory movement logged and stock adjusted');
    },
    updateLeadStatus: (id, status) => {
      adminService.updateLeadStatus(id, status);
      showToast(`Wholesale Lead moved to stage: ${status}`);
    },
    createLead: (lead) => {
      const created = adminService.createLead(lead);
      showToast(`Lead created for ${lead.companyName || lead.title}`);
      return created;
    },
    createSampleOrder: (sample) => {
      const created = adminService.createSampleOrder(sample);
      showToast(`Paid Sample Order ${created.sampleNumber} generated (Credit: ৳${created.sampleCreditAmountBDT})`);
      return created;
    },
    updateSampleStatus: (id, status) => {
      adminService.updateSampleStatus(id, status);
      showToast(`Sample Order status updated to: ${status}`);
    },
    createQuotation: (quote) => {
      const created = adminService.createQuotation(quote);
      showToast(`Quotation ${created.quoteNumber} issued`);
      return created;
    },
    updateQuoteStatus: (id, status) => {
      adminService.updateQuoteStatus(id, status);
      showToast(`Quotation status changed to: ${status}`);
    },
    convertQuoteToWholesaleOrder: (quoteId) => {
      const order = adminService.convertQuoteToWholesaleOrder(quoteId);
      if (order) {
        showToast(`Quotation converted to Wholesale Order ${order.orderNumber} with sample credit applied!`);
      }
      return order;
    },
    updateOrderStatus: (id, status, note) => {
      adminService.updateOrderStatus(id, status, note);
      showToast(`Order status updated to: ${status}`);
    },
    updateOrderShipping: (id, shippingData) => {
      adminService.updateOrderShipping(id, shippingData);
      showToast(`Consignment updated: ${shippingData.carrier} (${shippingData.trackingNumber || 'In Transit'})`);
    },
    createProductionBatch: (batchData) => {
      const created = adminService.createProductionBatch(batchData);
      showToast(`Production Batch ${created.batchNumber} created (${created.quantity} pcs)`);
      return created;
    },
    updateBatchStatus: (batchId, status, note) => {
      adminService.updateBatchStatus(batchId, status, note);
      showToast(`Batch stage updated to: ${status}`);
    },
    recordQCInspection: (batchId, inspectionData) => {
      const insp = adminService.recordQCInspection(batchId, inspectionData);
      if (insp.passed) {
        showToast(`QC Passed! Batch approved and finished stock added to inventory.`);
      } else {
        showToast(`QC Flagged Defective pieces. Batch routed back to workshop for rework.`, 'warning');
      }
      return insp;
    },
    recordPayment: (paymentData) => {
      const pay = adminService.recordPayment(paymentData);
      showToast(`Payment of ৳${paymentData.amount?.toLocaleString()} recorded (Ref: ${pay.transactionRef})`);
      return pay;
    },
    markPaymentPaid: (orderId, note) => {
      adminService.markPaymentPaid(orderId, note);
      showToast('Full balance settlement recorded & order marked Paid.');
    },
    markNotificationRead: (id) => {
      adminService.markNotificationRead(id);
    },
    markAllNotificationsRead: () => {
      adminService.markAllNotificationsRead();
      showToast('All notifications marked as read');
    },
    addCompany: (company) => {
      const created = adminService.addCompany(company);
      showToast(`Company profile created: ${company.name}`);
      return created;
    },
    addContactToCompany: (companyId, contact) => {
      adminService.addContactToCompany(companyId, contact);
      showToast(`Contact ${contact.name} added to company`);
    },
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
