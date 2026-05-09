"use client";

const SUBJECTS = [
  "内科", "外科", "妇产科", "儿科", "基础医学",
  "神经科", "皮肤科", "眼科", "耳鼻喉科", "急诊医学",
];

interface HeaderProps {
  subject: string;
  onSubjectChange: (subject: string) => void;
}

export default function Header({ subject, onSubjectChange }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold text-blue-600">医学生 AI 复习助手</h1>
        <p className="text-gray-500 text-sm mt-1">输入问题，AI 帮你梳理知识点</p>
        <div className="mt-3">
          <select
            value={subject}
            onChange={(e) => onSubjectChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}
