import { NextRequest, NextResponse } from "next/server";
import { createFeishuDoc } from "@/lib/feishu";

export async function POST(request: NextRequest) {
  try {
    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ error: "标题和内容不能为空" }, { status: 400 });
    }

    const url = await createFeishuDoc(title, content);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Feishu API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "飞书文档创建失败" },
      { status: 500 }
    );
  }
}
