import React from 'react';

export const Badge = ({ children, variant = 'neutral', size = 'md', className = '' }) => {
  const variantStyles = {
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    primary: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
    terracotta: 'bg-orange-50 text-[#C25E3E] border-orange-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  // Auto-map common domain statuses to variants if matching
  const statusStr = String(children || '').toLowerCase();
  let resolvedVariant = variant;
  if (variant === 'neutral') {
    if (['delivered', 'paid', 'active', 'won', 'accepted', 'completed'].some(s => statusStr.includes(s))) {
      resolvedVariant = 'success';
    } else if (['pending', 'in production', 'negotiation', 'sample sent', 'quote sent', 'low stock'].some(s => statusStr.includes(s))) {
      resolvedVariant = 'warning';
    } else if (['cancelled', 'lost', 'rejected', 'expired', 'out of stock'].some(s => statusStr.includes(s))) {
      resolvedVariant = 'danger';
    } else if (['confirmed', 'shipped', 'qualified', 'available'].some(s => statusStr.includes(s))) {
      resolvedVariant = 'info';
    } else if (['wholesale', 'sample order', 'redeemed'].some(s => statusStr.includes(s))) {
      resolvedVariant = 'terracotta';
    }
  }

  const sizeStyles = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-[11px] px-2.5 py-1',
    lg: 'text-xs px-3 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-full border tracking-wide uppercase ${variantStyles[resolvedVariant] || variantStyles.neutral} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
