"use client";

interface HistoryItem {
  id: string;
  question: string;
  subject: string;
  timestamp: number;
}

interface HistorySidebarProps {
  history: HistoryItem[];
  onSelect: (id: string) => void;
  onClear: () => void;
}

export default function HistorySidebar({ history, onSelect, onClear }: HistorySidebarProps) {
  if (history.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mt-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">历史记录</h2>
        <button onClick={onClear} className="text-sm text-red-500 hover:text-red-700">清空</button>
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <p className="text-sm font-medium text-gray-800 truncate">{item.question}</p>
            <p className="text-xs text-gray-400 mt-1">
              {item.subject} · {new Date(item.timestamp).toLocaleString("zh-CN")}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
