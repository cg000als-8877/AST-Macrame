import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-[#0F172A] hover:bg-slate-900 text-white shadow-xs focus:ring-slate-900/20',
    terracotta: 'bg-[#C25E3E] hover:bg-[#a84e32] text-white shadow-xs focus:ring-[#C25E3E]/20',
    secondary: 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-2xs focus:ring-slate-200',
    outline: 'bg-transparent hover:bg-slate-100 text-slate-700 border border-slate-300 focus:ring-slate-200',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 focus:ring-slate-100',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs focus:ring-rose-500/20',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs focus:ring-emerald-500/20',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 rounded-lg gap-1.5',
    md: 'text-xs font-bold uppercase tracking-wider px-3.5 py-2.5 rounded-xl gap-2',
    lg: 'text-sm font-bold uppercase tracking-wider px-5 py-3 rounded-xl gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none active:scale-[0.98] ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      <span>{children}</span>
    </button>
  );
};
