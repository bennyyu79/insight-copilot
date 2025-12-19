import { NextRequest } from "next/server";
import {
  CopilotRuntime,
  OpenAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import OpenAI from "openai";

// Use OPENAILIKED configuration if available, otherwise fall back to standard OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAILIKED_API_KEY || process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAILIKED_BASE_URL || undefined,
});

const serviceAdapter = new OpenAIAdapter({
  openai,
  model: process.env.OPENAILIKED_MODEL || undefined,
});

const runtime = new CopilotRuntime({
  remoteEndpoints: [
    {
      url: `${process.env.SERVER_API_URL}/copilotkit`,
    },
  ],
});

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};
