import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { StatCard } from '../../components/ui/StatCard';
import { DataTable } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  FileText,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  PieChart,
  Calculator
} from 'lucide-react';
import { PaymentStatus, SalesChannel } from '../../types/schema';

export const FinanceModule = () => {
  const { 
    orders, 
    payments, 
    expenses, 
    samples, 
    activeSubView, 
    recordPayment, 
    markPaymentPaid 
  } = useAdmin();

  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    amount: 50000,
    paymentType: 'Deposit (50%)',
    paymentMethod: 'Bank Wire Transfer',
    transactionRef: '',
    notes: 'Payment verified via bank wire transfer',
  });

  // Financial Computations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.grandTotal || o.totalCost || 0), 0);
  const totalPaymentsCollected = payments.filter(p => p.status === PaymentStatus.PAID).reduce((sum, p) => sum + (p.amount || 0), 0);
  
  // Outstanding receivables
  const pendingOrders = orders.filter(o => o.paymentStatus !== PaymentStatus.PAID);
  const totalOutstanding = pendingOrders.reduce((sum, o) => {
    if (o.balanceDue !== undefined) return sum + o.balanceDue;
    const deposit = o.depositPaid || 0;
    return sum + Math.max(0, (o.grandTotal || o.totalCost || 0) - deposit);
  }, 0);

  // Total Expenses
  const totalExpensesAmount = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  // Exact COGS Profit Calculation based on known Unit Cost = ৳400/unit
  let totalUnitsSold = 0;
  let totalCostOfGoodsSold = 0;
  orders.forEach(o => {
    o.items?.forEach(it => {
      const qty = Number(it.quantity) || 1;
      const unitCogs = it.unitCost || 400;
      totalUnitsSold += qty;
      totalCostOfGoodsSold += (qty * unitCogs);
    });
  });

  const estimatedGrossProfit = Math.max(0, totalRevenue - totalCostOfGoodsSold);
  const grossMarginPercent = totalRevenue > 0 ? Math.round((estimatedGrossProfit / totalRevenue) * 100) : 0;

  const handleOpenRecord = (order) => {
    setSelectedOrder(order);
    const balance = order.balanceDue !== undefined ? order.balanceDue : (order.grandTotal || order.totalCost || 0);
    setPaymentForm({
      amount: order.depositPaid > 0 ? balance : Math.round(balance * 0.5),
      paymentType: order.depositPaid > 0 ? 'Remaining Balance Settlement (50%)' : 'Deposit (50%)',
      paymentMethod: order.channel === 'Wholesale' ? 'Bank Wire Transfer' : 'Cash On Delivery',
      transactionRef: `WIRE-${Date.now().toString().slice(-6)}`,
      notes: `Payment for ${order.orderNumber || order.id}`,
    });
    setIsRecordModalOpen(true);
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    if (!selectedOrder) return;
    recordPayment({
      orderId: selectedOrder.id,
      orderNumber: selectedOrder.orderNumber || selectedOrder.id,
      companyName: selectedOrder.companyName || null,
      customerName: selectedOrder.contactName || selectedOrder.name,
      amount: Number(paymentForm.amount),
      paymentType: paymentForm.paymentType,
      paymentMethod: paymentForm.paymentMethod,
      transactionRef: paymentForm.transactionRef,
      notes: paymentForm.notes,
    });
    setIsRecordModalOpen(false);
    setSelectedOrder(null);
  };

  const getFilteredTransactions = () => {
    switch (activeSubView) {
      case 'payments':
        return payments;
      case 'outstanding':
        return orders.filter(o => o.paymentStatus !== PaymentStatus.PAID);
      case 'expenses':
        return [];
      default:
        return payments;
    }
  };

  const columns = [
    {
      header: 'Transaction Ref & Account',
      accessor: 'transactionRef',
      sortable: true,
      cell: (pay) => (
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-slate-900 text-xs">{pay.transactionRef}</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">
              {pay.paymentType}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {pay.companyName ? `${pay.companyName} (${pay.customerName})` : pay.customerName}
          </p>
        </div>
      ),
    },
    {
      header: 'Order Reference',
      accessor: 'orderNumber',
      cell: (pay) => (
        <span className="font-mono font-medium text-xs text-slate-800">
          {pay.orderNumber || pay.orderId || 'N/A'}
        </span>
      ),
    },
    {
      header: 'Settled Amount',
      accessor: 'amount',
      sortable: true,
      cell: (pay) => (
        <span className="font-bold text-slate-900 text-xs font-mono">
          ৳{pay.amount?.toLocaleString()} BDT
        </span>
      ),
    },
    {
      header: 'Payment Method',
      accessor: 'paymentMethod',
      cell: (pay) => (
        <span className="text-xs text-slate-600 font-medium">
          {pay.paymentMethod}
        </span>
      ),
    },
    {
      header: 'Settlement Date',
      accessor: 'date',
      sortable: true,
      cell: (pay) => (
        <span className="text-xs text-slate-500 font-mono">
          {pay.date}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (pay) => <Badge status={pay.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">Commercial Finance & Cashflow</h1>
          <p className="text-sm text-slate-500 mt-1">Accounts receivable, B2B wholesale deposit settlements, expenses, and gross margin analytics</p>
        </div>
      </div>

      {/* Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Invoiced Value"
          value={`৳${totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="blue"
          subtitle="Gross pipeline + sales orders"
        />
        <StatCard
          title="Payments Collected"
          value={`৳${totalPaymentsCollected.toLocaleString()}`}
          icon={CheckCircle2}
          color="emerald"
          subtitle={`${payments.length} verified transactions`}
        />
        <StatCard
          title="Accounts Receivable (Pending)"
          value={`৳${totalOutstanding.toLocaleString()}`}
          icon={Clock}
          color="amber"
          subtitle={`${pendingOrders.length} orders with balance due`}
        />
        <StatCard
          title="COGS Gross Margin"
          value={`${grossMarginPercent}%`}
          icon={TrendingUp}
          color="purple"
          subtitle={`৳${estimatedGrossProfit.toLocaleString()} gross profit`}
        />
      </div>

      {/* COGS Profit Overview Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta">Artisan Cost Accounting Engine</span>
            <h2 className="font-serif font-bold text-xl text-white mt-0.5">Commercial Gross Profit Breakdown</h2>
          </div>
          <div className="text-right">
            <span className="text-xs text-white/60 block">Unit Cost of Goods Sold (COGS)</span>
            <span className="font-mono font-bold text-base text-cream">৳400 / macramé belt</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5">
          <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
            <span className="text-xs text-white/60 block mb-1">Total Belts Sold / Contracted</span>
            <span className="text-xl font-serif font-bold text-white">{totalUnitsSold} units</span>
          </div>

          <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
            <span className="text-xs text-white/60 block mb-1">Manufacturing COGS</span>
            <span className="text-xl font-serif font-bold text-rose-300">৳{totalCostOfGoodsSold.toLocaleString()}</span>
          </div>

          <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
            <span className="text-xs text-white/60 block mb-1">Operating Gross Profit</span>
            <span className="text-xl font-serif font-bold text-emerald-300">৳{estimatedGrossProfit.toLocaleString()}</span>
          </div>

          <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
            <span className="text-xs text-white/60 block mb-1">Gross Margin Rate</span>
            <span className="text-xl font-serif font-bold text-terracotta">{grossMarginPercent}%</span>
          </div>
        </div>
      </div>

      {/* Pending Accounts Receivable Action Table */}
      {pendingOrders.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="font-serif font-bold text-slate-900 text-base">Pending Orders & Deposits Due</h2>
              <p className="text-xs text-slate-500">Record B2B 50% deposits or final balance clearances</p>
            </div>
            <Badge status={`${pendingOrders.length} Pending`} size="sm" />
          </div>

          <div className="divide-y divide-slate-100 pt-2">
            {pendingOrders.map((order) => {
              const total = order.grandTotal || order.totalCost || 0;
              const deposit = order.depositPaid || 0;
              const due = order.balanceDue !== undefined ? order.balanceDue : (total - deposit);

              return (
                <div key={order.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-slate-900">{order.orderNumber || order.id}</span>
                      <Badge status={order.channel === 'Wholesale' ? 'B2B Wholesale' : 'Retail COD'} size="sm" />
                      <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {order.paymentStatus || 'Pending'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Account: <strong>{order.companyName ? `${order.companyName} (${order.contactName})` : (order.contactName || order.name)}</strong>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
                      Grand Total: ৳{total.toLocaleString()} • Deposit Paid: ৳{deposit.toLocaleString()} • <strong>Balance Due: ৳{due.toLocaleString()}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenRecord(order)}
                    >
                      Record Deposit / Settlement
                    </Button>
                    <Button
                      size="sm"
                      variant="terracotta"
                      onClick={() => markPaymentPaid(order.id, 'Full clearance')}
                    >
                      Clear Full Balance
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Payment Transactions Ledger */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/50">
          <div>
            <h2 className="font-serif font-bold text-slate-900 text-base">Verified Payment Ledger</h2>
            <p className="text-xs text-slate-500">Historical log of all bank wires, stripe charges, and sample development fee payments</p>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={payments}
          searchPlaceholder="Search transactions by reference, order ID, customer..."
          searchableKeys={['transactionRef', 'orderNumber', 'orderId', 'customerName', 'companyName', 'paymentMethod']}
          emptyMessage="No payment records found"
        />
      </div>

      {/* Record Payment Modal */}
      {isRecordModalOpen && selectedOrder && (
        <Modal
          isOpen={isRecordModalOpen}
          onClose={() => setIsRecordModalOpen(false)}
          title={`Record Payment • ${selectedOrder.orderNumber || selectedOrder.id}`}
        >
          <form onSubmit={handleSubmitPayment} className="space-y-4">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <p>Account: <strong>{selectedOrder.companyName || selectedOrder.contactName || selectedOrder.name}</strong></p>
              <p>Order Total: <strong>৳{(selectedOrder.grandTotal || selectedOrder.totalCost)?.toLocaleString()} BDT</strong></p>
              <p>Already Settled: ৳{(selectedOrder.depositPaid || 0).toLocaleString()} BDT</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Payment Type
              </label>
              <select
                value={paymentForm.paymentType}
                onChange={(e) => setPaymentForm({ ...paymentForm, paymentType: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta"
              >
                <option value="Deposit (50%)">Deposit (50%) — To Start Production</option>
                <option value="Remaining Balance Settlement (50%)">Remaining Balance Settlement (50%) — Before Dispatch</option>
                <option value="Full Payment (100%)">Full Payment (100%)</option>
                <option value="Custom Installment">Custom Installment</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Amount to Record (BDT)
              </label>
              <input
                type="number"
                min="1"
                value={paymentForm.amount}
                onChange={(e) => setPaymentForm({ ...paymentForm, amount: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Payment Channel / Method
              </label>
              <select
                value={paymentForm.paymentMethod}
                onChange={(e) => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta"
              >
                <option value="Bank Wire Transfer">Bank Wire Transfer (City Bank PLC SWIFT)</option>
                <option value="bKash Merchant">bKash Merchant Account</option>
                <option value="Credit Card / Stripe">Credit Card / Stripe Global</option>
                <option value="Cash On Delivery (COD)">Cash On Delivery (COD)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Transaction Reference / SWIFT Ref
              </label>
              <input
                type="text"
                value={paymentForm.transactionRef}
                onChange={(e) => setPaymentForm({ ...paymentForm, transactionRef: e.target.value })}
                placeholder="e.g. CIBL-WIRE-8849102"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta font-mono"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsRecordModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="terracotta">
                Confirm & Record Payment
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
