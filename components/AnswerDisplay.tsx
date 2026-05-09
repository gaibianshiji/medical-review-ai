"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="mt-6 shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Bot className="h-5 w-5" />
              AI 回答
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div ref={ref} className="prose prose-blue max-w-none">
              {isLoading && !answer ? (
                <div className="flex items-center gap-3 text-muted-foreground py-8">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>正在生成回答...</span>
                </div>
              ) : (
                <div className="whitespace-pre-wrap text-base leading-relaxed">
                  {answer}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
