import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.LLM_API_KEY,
  baseURL: process.env.LLM_BASE_URL,
});

export async function askLLM(question: string, subject: string): Promise<string> {
  const systemPrompt = `你是一个专业的医学复习助手，专门帮助医学生进行期末复习。
当前学科：${subject}
请用清晰、准确的中文回答医学问题。如果涉及疾病，请包含：定义、病因、临床表现、诊断要点、治疗原则。
回答要详细但有条理，适合期末复习使用。`;

  const completion = await client.chat.completions.create({
    model: process.env.LLM_MODEL || "qwen-turbo",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: question },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });

  return completion.choices[0]?.message?.content || "抱歉，无法生成回答。";
}
