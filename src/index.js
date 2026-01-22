import { DurableObject } from "cloudflare:workers";

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);

      if (url.pathname === "/api/chat" && request.method === "POST") {
        
        if (!env.CHAT_HISTORY) {
          throw new Error("env.CHAT_HISTORY is undefined. Check wrangler.jsonc bindings.");
        }

        const id = env.CHAT_HISTORY.idFromName("global-session");
        const stub = env.CHAT_HISTORY.get(id);
        return await stub.fetch(request);
      }

      return new Response("Not Found", { status: 404 });

    } catch (err) {
      return new Response(JSON.stringify({ response: `SYSTEM ERROR: ${err.message}` }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  },
};

export class ChatSession extends DurableObject {
  constructor(state, env) {
    super(state, env);
    this.state = state;
    this.env = env;
  }

  async fetch(request) {
    try {
      const { message } = await request.json();

      if (!this.env.AI) {
        throw new Error("env.AI is undefined. Check wrangler.jsonc bindings.");
      }

      let history = (await this.state.storage.get("history")) || [];

      history.push({ role: "user", content: message });

      const response = await this.env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          ...history,
        ],
      });

      history.push({ role: "assistant", content: response.response });
      await this.state.storage.put("history", history);

      return new Response(JSON.stringify({ response: response.response }), {
        headers: { "Content-Type": "application/json" },
      });

    } catch (err) {
      return new Response(JSON.stringify({ response: `DO ERROR: ${err.message}` }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
}