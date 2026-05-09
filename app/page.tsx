"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import QuestionInput from "@/components/QuestionInput";
import AnswerDisplay from "@/components/AnswerDisplay";
import HistorySidebar from "@/components/HistorySidebar";

interface HistoryItem {
  id: string;
  question: string;
  answer: string;
  subject: string;
  timestamp: number;
}

const HISTORY_KEY = "medical-review-history";
const MAX_HISTORY = 20;

export default function Home() {
  const [subject, setSubject] = useState("内科");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
  }, []);

  const saveHistory = useCallback((newHistory: HistoryItem[]) => {
    setHistory(newHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  }, []);

  const handleAsk = async (question: string) => {
    setIsLoading(true);
    setAnswer("");
    setCurrentQuestion(question);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, subject }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "请求失败");
      }

      setAnswer(data.answer);

      const newItem: HistoryItem = {
        id: Date.now().toString(),
        question,
        answer: data.answer,
        subject,
        timestamp: Date.now(),
      };
      const updatedHistory = [newItem, ...history].slice(0, MAX_HISTORY);
      saveHistory(updatedHistory);
    } catch (error) {
      setAnswer(`错误：${error instanceof Error ? error.message : "未知错误"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistory = (id: string) => {
    const item = history.find((h) => h.id === id);
    if (item) {
      setAnswer(item.answer);
      setCurrentQuestion(item.question);
      setSubject(item.subject);
    }
  };

  const handleClearHistory = () => {
    saveHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header subject={subject} onSubjectChange={setSubject} />
      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-6">
        <main className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <QuestionInput onSubmit={handleAsk} isLoading={isLoading} />
          </motion.div>

          {currentQuestion && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6 flex items-start gap-3"
            >
              <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-700">你的问题</p>
                <p className="text-sm text-blue-600 mt-1">{currentQuestion}</p>
              </div>
            </motion.div>
          )}

          <AnswerDisplay answer={answer} isLoading={isLoading} />

          {!currentQuestion && !answer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm">
                <Sparkles className="h-4 w-4" />
                选择学科，输入问题，开始复习
              </div>
            </motion.div>
          )}
        </main>

        <aside className="w-80 shrink-0">
          <HistorySidebar
            history={history.map(({ id, question, subject, timestamp }) => ({
              id, question, subject, timestamp,
            }))}
            onSelect={handleSelectHistory}
            onClear={handleClearHistory}
          />
        </aside>
      </div>
    </div>
  );
}
