import React from 'react';
import { Clock } from 'lucide-react';

export const Timeline = ({ items = [], className = '' }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-xs text-slate-400 italic py-2">No activity recorded yet.</div>
    );
  }

  return (
    <div className={`space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200 ${className}`}>
      {items.map((item, idx) => (
        <div key={idx} className="relative flex items-start gap-3.5 pl-1 group">
          <div className="w-6 h-6 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center shrink-0 z-10 group-hover:border-[#C25E3E] transition-colors">
            <Clock className="w-3 h-3 text-slate-400 group-hover:text-[#C25E3E]" />
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-700 flex-1 space-y-1">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>{item.time || item.timestamp || 'Recent'}</span>
              {item.user && <span className="font-semibold text-slate-600">by {item.user}</span>}
            </div>
            <p className="font-normal text-slate-800 leading-relaxed">{item.text || item.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
