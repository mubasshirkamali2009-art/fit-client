<div align="center">

# 🏋️ FitTrack AI

### Your body. Your goals. Your AI coach.

**A full‑stack fitness platform that fuses precise calorie tracking with an AI that actually builds your diet and workout plans for you.**

[![Live Demo](https://img.shields.io/badge/Live-fit--traker.vercel.app-0F9D77?style=for-the-badge&logo=vercel&logoColor=white)](https://fit-traker.vercel.app/)
[![Frontend Repo](https://img.shields.io/badge/Client-Repo-7C5CE0?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mubasshirkamali2009-art/fit-client)
[![Backend Repo](https://img.shields.io/badge/Server-Repo-151515?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mubasshirkamali2009-art/fit-server)

</div>

---

## ✨ Short Description

FitTrack AI is a Next.js + Express fitness web app where users track calories against a scientifically calculated daily budget, and let **Google Gemini AI** generate personalized full‑day diet plans and weekly workout routines — all saved per‑user in MongoDB and regenerable on demand.

---

## 📖 Long Description

Most fitness apps make you do all the thinking — pick your own meals, guess your own macros, design your own split. FitTrack AI flips that. You give it your body metrics and goals once, and it takes over from there.

**How it actually works:**

1. **Set your baseline.** Enter your height, weight, age, gender, activity level, and goal (bulk / cut / maintain). FitTrack AI runs the numbers through the **Mifflin‑St Jeor equation** to calculate your BMR, TDEE, and a precise daily calorie target — no guesswork, no round numbers pulled from nowhere.

2. **Track what you eat.** Search a 10,000+ item food database, log meals in seconds, and watch a live dashboard split your day into *healthy vs. unhealthy* calories and *consumed vs. remaining* budget, rendered with Recharts bar and donut charts.

3. **Let AI build your diet.** Hit "Generate My Diet Plan" and Gemini AI produces a structured breakfast → lunch → snacks → dinner plan, macro‑balanced against your exact target. Not a generic template — a plan computed against *your* numbers.

4. **Let AI build your workouts.** The AI Workout Routine engine asks a few short, adaptive questions (injuries, equipment, available days), then generates **3 distinct weekly training routines** — broken down day‑by‑day with sets and reps. Don't like what you got? Hit **Regenerate** and tell it what to change; the AI reads your previous routine and adjusts instead of starting blind.

5. **Everything persists, per user.** Every generated diet and workout plan is written to MongoDB, scoped to the authenticated user's ID via JWT‑protected routes. Reload the app days later and your last generated plan is exactly where you left it — no re‑generating from scratch, no data leaking between accounts.

The whole experience is wrapped in a clean, distraction‑free interface — no ads, no clutter, just the two loops that actually move the needle: **what you eat** and **how you train**.

---

## 🚀 Key Features

| | Feature | Details |
|---|---|---|
| 🔥 | **Smart Calorie Counter** | Search a 10,000+ food database, adjust portions, and log meals against your personal daily budget — usable even without an account. |
| 🧠 | **AI Full‑Day Diet Planner** | Gemini AI generates a complete breakfast/lunch/snack/dinner plan matched to your exact macros and goal. |
| 🏋️ | **AI Workout Routine Generator** | Asks clarifying questions, then builds 3 personalized weekly training routines with regenerate‑with‑feedback support. |
| 📊 | **Live Analytics Dashboard** | Real‑time Recharts visualizations for food quality breakdown and calorie goal completion. |
| ⚖️ | **Physiological Metrics Engine** | BMI and BMR/TDEE calculated with the Mifflin‑St Jeor equation — Bulking, Cutting, or Maintenance modes. |
| 🔐 | **Secure Per‑User Data** | JWT‑protected API routes ensure every profile, log, diet plan, and workout routine is isolated to its owner in MongoDB. |
| 🔁 | **Persistent + Regenerable Plans** | Generated plans are saved to the database and reloaded on return — with one‑click regeneration when your needs change. |
| 📱 | **Fully Responsive UI** | Built mobile‑first with Tailwind CSS v4 and Framer Motion micro‑interactions throughout. |

---

## 🤖 AI / LLM Integration

FitTrack AI's intelligence is powered by **Google's Gemini models** via the official [`@google/genai`](https://www.npmjs.com/package/@google/genai) SDK, called from the Express backend so API keys never touch the client.

**How the AI is used:**

- **Conversational elicitation, not a single prompt.** Before generating anything, the AI first asks the user a short set of targeted questions (e.g. injuries, dietary restrictions, available equipment, training days) — the plan is generated only after these answers are folded into the prompt, producing far more usable output than a one‑shot generation.
- **Two generation modes:**
  - `generate-routines` — produces **3 distinct weekly workout routines** as structured JSON (day, focus, exercises with sets/reps).
  - Diet generation — produces a structured full‑day meal plan matched against the user's computed calorie and macro targets.
- **Context‑aware regeneration.** On regenerate, the AI receives the user's *previous* plan plus their new feedback, so it revises intelligently instead of generating something unrelated from scratch.
- **Structured JSON output.** The backend prompts Gemini to return strict JSON matching the app's data model, which is parsed and persisted directly — no manual reformatting needed.
- **Server‑side only.** All AI calls happen through a dedicated `/api/ai` Express route, protected by JWT auth, keeping the Gemini API key secure server‑side.

---

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="50%">

### Frontend (`fit-client`)
- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Recharts** — analytics charts
- **Framer Motion** — animations
- **HeroUI** — UI primitives
- **Lucide React** / **React Icons**
- **better-auth** — authentication client
- **Mongoose / MongoDB driver**
- Deployed on **Vercel**

</td>
<td valign="top" width="50%">

### Backend (`fit-server`)
- **Node.js** + **Express**
- **MongoDB** (native driver)
- **JWT‑based authentication**
- **@google/genai** — Gemini AI SDK
- **CORS** + **dotenv**
- RESTful API (`/api/users`, `/api/profile`, `/api/nutrition`, `/api/ai`, `/api/routines`)
- Deployed on **Vercel** (serverless)

</td>
</tr>
</table>

---

## 🔗 Links

| | |
|---|---|
| 🌍 **Live App** | [fit-traker.vercel.app](https://fit-traker.vercel.app/) |
| 💻 **Frontend Repo** | [github.com/mubasshirkamali2009-art/fit-client](https://github.com/mubasshirkamali2009-art/fit-client) |
| ⚙️ **Backend Repo** | [github.com/mubasshirkamali2009-art/fit-server](https://github.com/mubasshirkamali2009-art/fit-server) |

---

<div align="center">

**Built with Next.js, Express, MongoDB, and Gemini AI**

</div>