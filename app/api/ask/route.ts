import { NextRequest, NextResponse } from "next/server";
import { askLLM } from "@/lib/llm";

export async function POST(request: NextRequest) {
  try {
    const { question, subject } = await request.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "问题不能为空" }, { status: 400 });
    }

    const answer = await askLLM(question, subject || "通用");
    return NextResponse.json({ answer });
  } catch (error) {
    console.error("LLM API error:", error);
    return NextResponse.json({ error: "服务暂时不可用，请稍后重试" }, { status: 500 });
  }
}
