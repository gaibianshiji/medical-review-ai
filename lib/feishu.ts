const FEISHU_BASE = "https://open.feishu.cn/open-apis";

async function getTenantAccessToken(): Promise<string> {
  const res = await fetch(`${FEISHU_BASE}/auth/v3/tenant_access_token/internal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      app_id: process.env.FEISHU_APP_ID,
      app_secret: process.env.FEISHU_APP_SECRET,
    }),
  });

  const data = await res.json();
  if (data.code !== 0) {
    throw new Error(`Failed to get Feishu token: ${data.msg}`);
  }
  return data.tenant_access_token;
}

export async function createFeishuDoc(title: string, content: string): Promise<string> {
  const token = await getTenantAccessToken();

  const createRes = await fetch(`${FEISHU_BASE}/docx/v1/documents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  const createData = await createRes.json();
  if (createData.code !== 0) {
    throw new Error(`Failed to create doc: ${createData.msg}`);
  }

  const documentId = createData.data.document.document_id;

  await fetch(`${FEISHU_BASE}/docx/v1/documents/${documentId}/blocks/${documentId}/children`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      children: [
        {
          block_type: 2,
          text: {
            elements: [{ text_run: { content } }],
          },
        },
      ],
    }),
  });

  return `https://feishu.cn/docx/${documentId}`;
}
