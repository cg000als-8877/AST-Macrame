import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  subtext,
  change,
  isPositive = true,
  icon: Icon,
  variant = 'default',
  onClick,
  className = '',
}) => {
  const variantStyles = {
    default: 'bg-white border-slate-200/80 hover:border-slate-300',
    terracotta: 'bg-orange-50/50 border-orange-200/80 hover:border-orange-300',
    navy: 'bg-slate-900 text-white border-slate-800',
  };

  const isDark = variant === 'navy';

  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-2xl border transition-all duration-200 shadow-2xs ${variantStyles[variant] || variantStyles.default} ${onClick ? 'cursor-pointer hover:shadow-xs active:scale-[0.99]' : ''} ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-xl ${isDark ? 'bg-slate-800 text-orange-400' : 'bg-slate-100 text-slate-700'}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {value}
      </div>

      <div className="flex items-center justify-between text-xs">
        {subtext && (
          <span className={`${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium`}>
            {subtext}
          </span>
        )}
        {change && (
          <span
            className={`inline-flex items-center gap-0.5 font-semibold text-[11px] ${
              isPositive ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {change}
          </span>
        )}
      </div>
    </div>
  );
};
