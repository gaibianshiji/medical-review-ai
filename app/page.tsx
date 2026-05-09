"use client";

import { useState, useEffect, useCallback } from "react";
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
    <div className="min-h-screen bg-gray-50">
      <Header subject={subject} onSubjectChange={setSubject} />
      <div className="max-w-6xl mx-auto px-4 py-6 flex gap-6">
        <main className="flex-1">
          <QuestionInput onSubmit={handleAsk} isLoading={isLoading} />
          {currentQuestion && (
            <div className="bg-blue-50 rounded-lg p-3 mt-4">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">问题：</span>{currentQuestion}
              </p>
            </div>
          )}
          <AnswerDisplay answer={answer} isLoading={isLoading} />
        </main>
        <aside className="w-72 shrink-0">
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
