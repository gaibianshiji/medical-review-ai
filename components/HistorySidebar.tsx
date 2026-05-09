"use client";

import { motion, AnimatePresence } from "framer-motion";
import { History, Trash2, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="shadow-md">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-slate-700 text-lg">
            <History className="h-5 w-5" />
            历史记录
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            清空
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[500px] overflow-y-auto">
          <AnimatePresence>
            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => onSelect(item.id)}
                  className="w-full text-left p-4 hover:bg-blue-50 transition-colors border-b last:border-b-0 group"
                >
                  <p className="text-sm font-medium text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                    {item.question}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                    <BookOpen className="h-3 w-3" />
                    <span>{item.subject}</span>
                    <span>·</span>
                    <Clock className="h-3 w-3" />
                    <span>{new Date(item.timestamp).toLocaleString("zh-CN")}</span>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
