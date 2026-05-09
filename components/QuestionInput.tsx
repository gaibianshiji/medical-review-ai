"use client";

import { useState } from "react";

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
}

export default function QuestionInput({ onSubmit, isLoading }: QuestionInputProps) {
  const [question, setQuestion] = useState("");

  const handleSubmit = () => {
    if (question.trim() && !isLoading) {
      onSubmit(question.trim());
      setQuestion("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="输入你的医学问题，例如：什么是高血压的诊断标准？"
        className="w-full h-24 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading || !question.trim()}
        className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? "AI 思考中..." : "提问"}
      </button>
    </div>
  );
}
