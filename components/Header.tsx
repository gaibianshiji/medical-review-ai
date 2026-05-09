"use client";

import { Stethoscope, GraduationCap } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SUBJECTS = [
  "内科", "外科", "妇产科", "儿科", "基础医学",
  "神经科", "皮肤科", "眼科", "耳鼻喉科", "急诊医学",
];

interface HeaderProps {
  subject: string;
  onSubjectChange: (subject: string) => void;
}

function handleValueChange(value: string | null, onSubjectChange: (subject: string) => void) {
  if (value) {
    onSubjectChange(value);
  }
}

export default function Header({ subject, onSubjectChange }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Stethoscope className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">医学生 AI 复习助手</h1>
            <p className="text-blue-100 text-sm mt-1 flex items-center gap-1">
              <GraduationCap className="h-4 w-4" />
              AI 驱动的医学期末复习问答平台
            </p>
          </div>
        </div>
        <div className="mt-4">
          <Select value={subject} onValueChange={(value) => handleValueChange(value, onSubjectChange)}>
            <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white placeholder:text-white/50">
              <SelectValue placeholder="选择学科" />
            </SelectTrigger>
            <SelectContent>
              {SUBJECTS.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}
