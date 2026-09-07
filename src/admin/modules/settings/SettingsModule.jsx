import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { StatCard } from '../../components/ui/StatCard';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { 
  Settings, 
  Users, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Bell, 
  FileText, 
  RefreshCw,
  Database,
  CheckCircle2,
  Key,
  Activity,
  Search
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export const SettingsModule = () => {
  const { currentUser } = useAuth();
  const { activityLogs, activeSubView } = useAdmin();
  const [resetSuccess, setResetSuccess] = useState(false);
  const [searchLog, setSearchLog] = useState('');
  const [activeTab, setActiveTab] = useState(activeSubView === 'logs' ? 'logs' : 'users');

  const staffMembers = [
    { name: 'Admin Operations', email: currentUser?.email || 'admin@astmacrame.com', role: 'Super Administrator', status: 'Active' },
    { name: 'Master Weaver Rafiq', email: 'rafiq@astmacrame.com', role: 'Head of Artisan Production', status: 'Active' },
    { name: 'Camille Laurent', email: 'camille@atelierartisan.fr', role: 'B2B Sourcing Partner', status: 'Active' },
    { name: 'Senior QC Lead Tareq', email: 'tareq@astmacrame.com', role: 'Quality Control Lead', status: 'Active' },
    { name: 'Dispatch & Logistics Officer', email: 'dispatch@astmacrame.com', role: 'Fulfillment Lead', status: 'Active' },
  ];

  const handleResetData = () => {
    if (window.confirm('Reset all mock inventory, orders, batches, and CRM data to default state?')) {
      localStorage.clear();
      setResetSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
  };

  const filteredLogs = activityLogs.filter(l => 
    (l.actor || '').toLowerCase().includes(searchLog.toLowerCase()) ||
    (l.action || '').toLowerCase().includes(searchLog.toLowerCase()) ||
    (l.entityId || '').toLowerCase().includes(searchLog.toLowerCase()) ||
    (l.details || '').toLowerCase().includes(searchLog.toLowerCase())
  );

  const tabs = [
    { id: 'users', label: 'Users & Staff' },
    { id: 'banking', label: 'Banking & Invoicing' },
    { id: 'logs', label: 'Activity Logs & Audit Trail' },
    { id: 'system', label: 'System & Cache' },
  ];

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">System Settings & Security</h1>
          <p className="text-sm text-slate-500 mt-1">Manage staff roles, operational banking credentials, and immutable audit logs</p>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {resetSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs text-emerald-800 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          Database cache refreshed! Reloading system...
        </div>
      )}

      {/* Tab 1: Staff & Roles */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-terracotta" />
              <h2 className="font-serif font-bold text-slate-900 text-base">Authorized Staff & Access Control</h2>
            </div>
            <Badge status={`${staffMembers.length} Active Accounts`} size="sm" />
          </div>

          <div className="divide-y divide-slate-100 pt-2">
            {staffMembers.map((staff, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-900">{staff.name}</p>
                  <p className="text-[11px] text-slate-500 font-mono">{staff.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2.5 py-1 rounded bg-slate-100 font-medium text-slate-700">
                    {staff.role}
                  </span>
                  <Badge status={staff.status} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Banking Coordinates */}
      {activeTab === 'banking' && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <CreditCard className="w-4 h-4 text-terracotta" />
            <h2 className="font-serif font-bold text-slate-900 text-base">Commercial Banking & SWIFT Wire Coordinates</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-5 text-xs text-slate-700">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px] block mb-1">Beneficiary Entity</span>
              <p className="font-bold text-slate-900 text-sm">AST Macramé Bangladesh Ltd.</p>
              <p className="text-[11px] text-slate-500 mt-1">Tax ID / BIN: 004928172-0101</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px] block mb-1">Commercial Bank</span>
              <p className="font-bold text-slate-900 text-sm">City Bank PLC (Principal Branch)</p>
              <p className="text-[11px] text-slate-500 mt-1">Dhaka, Bangladesh</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px] block mb-1">Account & SWIFT Code</span>
              <p className="font-mono font-bold text-slate-900 text-sm">AC: 110294819001</p>
              <p className="font-mono text-terracotta font-semibold mt-1">SWIFT: CIBLBDDH</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Activity Logs Audit Trail */}
      {activeTab === 'logs' && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-terracotta" />
              <h2 className="font-serif font-bold text-slate-900 text-base">Immutable Activity Audit Trail</h2>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchLog}
                onChange={(e) => setSearchLog(e.target.value)}
                placeholder="Search audit trail..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-terracotta"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100 pt-2">
            {filteredLogs.length === 0 ? (
              <p className="py-8 text-center text-xs text-slate-400">No activity matching your search</p>
            ) : (
              filteredLogs.map((log) => (
                <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{log.action}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {log.entityType}: {log.entityId}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">{log.details}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-medium text-slate-700">{log.actor}</span>
                    <p className="text-[10px] text-slate-400 font-mono">{log.timestamp}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 4: System & Cache */}
      {activeTab === 'system' && (
        <div className="bg-white rounded-xl border border-rose-200/60 p-5 shadow-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-rose-100 text-rose-800">
            <Database className="w-4 h-4 text-rose-600" />
            <h2 className="font-serif font-bold text-base">Database Cache & State Reset</h2>
          </div>
          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-slate-600 max-w-xl">
              Reset cached local state across all products, orders, batches, shipments, and CRM records to fresh pristine demo defaults.
            </p>
            <Button variant="danger" size="sm" icon={RefreshCw} onClick={handleResetData}>
              Reset Database Cache
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
