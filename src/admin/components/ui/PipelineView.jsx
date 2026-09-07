import React from 'react';
import { Check } from 'lucide-react';

export const PipelineView = ({
  stages = [],
  currentStage,
  onStageClick,
  className = '',
}) => {
  const currentIndex = stages.findIndex(
    (s) => String(s).toLowerCase() === String(currentStage).toLowerCase()
  );

  return (
    <div className={`w-full overflow-x-auto py-2 scrollbar-none ${className}`}>
      <div className="flex items-center min-w-max gap-1">
        {stages.map((stage, idx) => {
          const isPassed = currentIndex > idx;
          const isCurrent = currentIndex === idx;
          const isUpcoming = currentIndex < idx;

          return (
            <button
              key={stage}
              type="button"
              onClick={() => onStageClick && onStageClick(stage)}
              disabled={!onStageClick}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all select-none ${
                onStageClick ? 'cursor-pointer' : 'cursor-default'
              } ${
                isCurrent
                  ? 'bg-[#0F172A] text-white shadow-xs ring-2 ring-[#C25E3E]/40'
                  : isPassed
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-slate-100 text-slate-400 border border-slate-200/60'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                  isCurrent
                    ? 'bg-[#C25E3E] text-white'
                    : isPassed
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-300 text-slate-600'
                }`}
              >
                {isPassed ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : idx + 1}
              </div>
              <span>{stage}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
