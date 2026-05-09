"use client";

import { useEffect, useRef } from "react";

interface AnswerDisplayProps {
  answer: string;
  isLoading: boolean;
}

export default function AnswerDisplay({ answer, isLoading }: AnswerDisplayProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [answer]);

  if (!answer && !isLoading) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mt-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">AI 回答</h2>
      <div ref={ref} className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
        {isLoading && !answer ? (
          <div className="flex items-center gap-2 text-gray-400">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />
            正在生成回答...
          </div>
        ) : (
          answer
        )}
      </div>
    </div>
  );
}
