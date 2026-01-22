# Cloudflare AI Chat Assistant

A full-stack AI chat application built on the Cloudflare Developer Platform. This project demonstrates the use of **Workers AI** (Llama 3.3), **Durable Objects** for state management, and **Cloudflare Workers** for orchestration.

##  Features

* **AI Model:** Uses `@cf/meta/llama-3.3-70b-instruct-fp8-fast` for high-quality, low-latency responses.
* **Persistent Memory:** Utilizes **Cloudflare Durable Objects** to maintain conversation history within a session.
* **Serverless Architecture:** Entirely hosted on Cloudflare Workers (Backend) and Cloudflare Assets (Frontend).
* **Real-time Interaction:** Fast, responsive chat interface.

##  Tech Stack

* **Runtime:** Cloudflare Workers
* **AI Inference:** Workers AI (Llama 3.3)
* **State Management:** Durable Objects (SQLite backend)
* **Frontend:** HTML/CSS/JavaScript (served via Worker Assets)

##  Project Structure

* `src/index.js`: Contains the Worker logic (API Gateway) and the Durable Object class (State & AI logic).
* `public/index.html`: The client-side chat interface.
* `wrangler.jsonc`: Configuration for bindings and assets.

##  How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/GabrielAnokye/AI-APP.git
    cd AI-APP
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Deploy to Cloudflare:**
    ```bash
    npx wrangler deploy
    ```
