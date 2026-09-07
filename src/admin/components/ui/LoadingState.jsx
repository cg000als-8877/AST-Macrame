import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState = ({ message = 'Loading operational data...', className = '' }) => {
  return (
    <div className={`p-12 text-center bg-white border border-slate-200/80 rounded-2xl flex flex-col items-center justify-center space-y-3 ${className}`}>
      <Loader2 className="w-8 h-8 animate-spin text-[#C25E3E]" />
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{message}</span>
    </div>
  );
};
