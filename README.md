# 🐾 PawSathi

### AI-Powered Animal Rescue Research Assistant for NGOs

PawSathi is an AI-agent-based research assistant designed for **animal rescue NGOs, volunteers, shelters, and animal welfare teams in India**.

It accepts natural-language rescue-related requests and intelligently selects the appropriate research tools to find useful information from the web, Google Maps, Google News, Google Images, and YouTube.

The goal is to reduce the time rescue teams spend searching for veterinary hospitals, animal shelters, rescue organizations, welfare information, news, and educational resources.

---

## 🚨 Problem

Animal rescue organizations often need to find information quickly:

* Where is the nearest veterinary hospital?
* Which animal rescue NGOs operate in a particular city?
* What shelters or rescue centers are nearby?
* Are there recent animal welfare incidents or announcements?
* Where can volunteers find rescue training material?
* What reliable resources are available for animal care?

Normally, this requires searching multiple platforms separately.

During an emergency, this can waste valuable time.

---

## 💡 Solution

PawSathi provides a single interface where users can ask questions in natural language.

For example:

> "Find animal hospitals near Jaipur"

or

> "Find recent animal rescue news in Rajasthan"

or

> "Find animal rescue training videos in India"

PawSathi analyzes the request, determines which tools are useful, retrieves information, and presents the results in an organized interface.

---

# 🤖 How PawSathi Works

```text
                    User Request
                         │
                         ▼
                  ┌──────────────┐
                  │    Planner   │
                  └──────┬───────┘
                         │
              Determines required tools
                         │
        ┌────────────────┼─────────────────┐
        ▼                ▼                 ▼
   Google Search    Google Maps       Google News
        │                │                 │
        └────────────────┼─────────────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
        Google Images           YouTube
              │                     │
              └──────────┬──────────┘
                         ▼
                 Research Results
                         │
                         ▼
                Response Generator
                         │
                         ▼
                  PawSathi UI
```

---

# ✨ Key Features

## 🧠 AI Agent Planning

PawSathi analyzes the user's request and determines which tools should be used.

For example:

```text
"Find animal hospitals near Jaipur"
        ↓
Google Maps
```

```text
"Find recent animal rescue news"
        ↓
Google News
```

```text
"Find animal rescue training videos"
        ↓
YouTube
```

Multiple tools can also be selected for a single request.

---

## 🇮🇳 India-Focused Research

PawSathi is designed specifically for animal rescue and welfare use cases in India.

Searches are enriched with India-related context so that results can be focused on:

* Indian veterinary services
* Indian animal welfare organizations
* Indian NGOs
* Indian shelters
* Indian rescue centers
* Indian animal welfare news
* Indian educational resources

The project is also designed to progressively strengthen source filtering so that irrelevant international results can be excluded.

---

## 🏥 Veterinary Hospital Search

Users can search for nearby animal hospitals and veterinary facilities.

Results can include:

* Hospital/clinic name
* Address
* Phone number
* Rating
* Reviews
* Website
* Opening status
* GPS coordinates
* Google Maps directions

Example:

```text
Find animal hospitals near Jaipur
```

---

## 🐾 Animal Rescue Organizations

PawSathi can search for:

* Animal rescue NGOs
* Animal shelters
* Rescue centers
* Animal welfare organizations
* Local animal-care services

Users can quickly access available contact information and websites.

---

## 📰 Animal Rescue News

PawSathi can search recent news related to:

* Animal rescue
* Animal welfare
* Veterinary issues
* Animal diseases
* Vaccination campaigns
* Government announcements
* Rescue incidents
* Local developments

---

## 🖼️ Image Search

The agent can search for visual resources related to:

* Animal rescue
* Animal welfare
* Adoption
* Veterinary care
* Rescue awareness
* Educational material
* Awareness posters

---

## ▶️ YouTube Search

PawSathi can find educational and training videos related to:

* Animal rescue
* Animal handling
* Animal welfare
* Veterinary education
* Rescue training
* Awareness campaigns

---

# 🛡️ PawSathi Safety Principles

PawSathi is designed as a **research and assistance tool**, not a replacement for professional veterinary care.

The system is designed to avoid:

* Inventing phone numbers
* Inventing addresses
* Inventing websites
* Inventing opening hours
* Inventing medical information
* Presenting unsupported information as fact

For emergencies, users should contact qualified veterinary professionals or appropriate rescue organizations directly.

---

# 🧰 Technology Stack

## Frontend

* React
* JavaScript
* HTML
* CSS
* Vite

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Search & Research

* SerpApi
* Google Search
* Google Maps
* Google News
* Google Images
* YouTube

## Architecture

* MERN
* Agent-based tool selection
* REST API
* Modular search tools

---

# 📁 Project Structure

```text
rescue-ai/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   └── AgentResponse.jsx
│   │   │
│   │   ├── pages/
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── App.css
│   │
│   └── package.json
│
├── backend/
│   │
│   ├── agents/
│   │   ├── rescueAgent.js
│   │   └── planner.js
│   │
│   ├── tools/
│   │   ├── webSearch.js
│   │   ├── mapsSearch.js
│   │   ├── newsSearch.js
│   │   ├── imageSearch.js
│   │   └── youtubeSearch.js
│   │
│   ├── services/
│   │   ├── serpapi.js
│   │   └── llm.js
│   │
│   ├── models/
│   │   └── conversation.js
│   │
│   ├── routes/
│   │   └── agent.js
│   │
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone <your-repository-url>
cd rescue-ai
```

---

# 🔧 Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGODB_URI=mongodb://127.0.0.1:27017/rescue-ai

SERPAPI_KEY=your_serpapi_api_key_here

OPENAI_API_KEY=your_openai_api_key_here

CLIENT_URL=http://localhost:5173
```

### Environment Variables

| Variable         | Description                     |
| ---------------- | ------------------------------- |
| `PORT`           | Backend server port             |
| `MONGODB_URI`    | MongoDB connection string       |
| `SERPAPI_KEY`    | SerpApi API key                 |
| `OPENAI_API_KEY` | Optional future LLM integration |
| `CLIENT_URL`     | Frontend URL                    |

> Never commit your `.env` file or API keys to GitHub.

Start the backend:

```bash
npm run dev
```

or:

```bash
npm start
```

The API will run at:

```text
http://localhost:5000
```

---

# 💻 Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

# 🔌 API

## Agent Endpoint

```http
POST /api/agent
```

### Request

```json
{
  "message": "Find animal hospitals near Jaipur",
  "location": null,
  "conversationHistory": []
}
```

### Response

```json
{
  "success": true,
  "message": "Here are the results I found...",
  "plan": {
    "toolsUsed": [
      "maps_search"
    ],
    "allowed": true
  },
  "research": []
}
```

The `research` field contains the structured results returned by the selected tools.

---

# 🧩 Agent Architecture

The backend is divided into several layers.

## Planner

```text
backend/agents/planner.js
```

The planner analyzes the request and determines:

* Whether the request is within RescueAI's scope
* Which tools should be used
* The India-focused search query
* The research scope

---

## Rescue Agent

```text
backend/agents/rescueAgent.js
```

The rescue agent:

1. Receives the user's request
2. Creates a plan
3. Validates the request scope
4. Selects tools
5. Executes tools
6. Collects research results
7. Generates the final response

---

# 🔎 Search Tools

Each external search capability is implemented as a separate tool.

### Web Search

```text
backend/tools/webSearch.js
```

Uses Google Search through SerpApi.

### Maps Search

```text
backend/tools/mapsSearch.js
```

Uses Google Maps through SerpApi.

### News Search

```text
backend/tools/newsSearch.js
```

Uses Google News through SerpApi.

### Image Search

```text
backend/tools/imageSearch.js
```

Uses Google Images through SerpApi.

### YouTube Search

```text
backend/tools/youtubeSearch.js
```

Uses YouTube search through SerpApi.

---

# 🧠 Response Generation

The current project can operate without consuming OpenAI API credits.

The local response generator:

```text
backend/services/llm.js
```

processes the structured research results and converts them into a readable response.

An external LLM can be integrated later for more advanced reasoning and natural-language synthesis.

---

# 🗄️ MongoDB

MongoDB is included for conversation memory.

The conversation model is located at:

```text
backend/models/conversation.js
```

Current model:

```text
Conversation
 ├── sessionId
 └── messages
      ├── role
      ├── content
      └── timestamps
```

Future versions can use this to remember:

* NGO information
* Previous searches
* Rescue cases
* Preferred locations
* Conversation history
* Frequently used services

---

# 🧪 Example Requests

### Veterinary Search

```text
Find animal hospitals near Jaipur
```

### Rescue NGO Search

```text
Find animal rescue NGOs near Jaipur
```

### News

```text
Find recent animal rescue news in Rajasthan
```

### Training

```text
Find animal rescue training videos in India
```

### Animal Welfare Research

```text
Find information about animal welfare organizations in India
```

---

# 🚫 Out-of-Scope Requests

PawSathi is intentionally focused on animal rescue and welfare.

For example:

```text
Find me a laptop under ₹50,000
```

will not be processed as a normal search request.

Instead, PawSathi informs the user that the system is focused on animal rescue and welfare.

This prevents the agent from becoming an unrestricted general-purpose search engine.

---

# 🎯 Hackathon Value Proposition

PawSathi combines multiple research capabilities into a single agent designed around a specific real-world problem.

Instead of manually searching:

```text
Google
   +
Google Maps
   +
Google News
   +
YouTube
   +
Google Images
```

the user interacts with:

```text
             RescueAI
                 │
        Understands the request
                 │
          Selects the tools
                 │
          Performs research
                 │
       Organizes the results
                 │
        Presents useful sources
```

This makes the system particularly useful for time-sensitive animal rescue research.

---

# 🚀 Future Roadmap

## Phase 1 — Current

* [x] React frontend
* [x] Node.js/Express backend
* [x] SerpApi integration
* [x] Google Search
* [x] Google Maps
* [x] Google News
* [x] Google Images
* [x] YouTube
* [x] Agent planner
* [x] Tool selection
* [x] India-focused request handling
* [x] Animal-rescue scope restriction
* [x] Rescue result cards
* [x] Reset functionality
* [x] MongoDB model

## Phase 2

* [ ] Stronger India-only source filtering
* [ ] Better source verification
* [ ] NGO profiles
* [ ] Conversation persistence
* [ ] Rescue case history
* [ ] Better location handling
* [ ] Emergency mode
* [ ] Tool activity panel

## Phase 3

* [ ] Advanced LLM reasoning
* [ ] Multi-step autonomous research
* [ ] NGO-specific memory
* [ ] Rescue case management
* [ ] Automated source cross-checking
* [ ] Structured emergency workflows
* [ ] Multi-agent collaboration

---

# 🔐 Security

Do not expose API keys in frontend code.

Keep secrets inside:

```text
backend/.env
```

The `.gitignore` should include:

```gitignore
node_modules/
.env
```

Before publishing the project, make sure no API keys are present in Git history.

---

# 👥 Intended Users

PawSathi is designed for:

* Animal rescue NGOs
* Animal shelters
* Rescue volunteers
* Animal welfare organizations
* Veterinary support teams
* Animal welfare researchers
* Community rescue groups

---

# 🐕 Mission

PawSathi aims to make animal rescue research faster, more organized, and easier to access by bringing multiple information sources together through an AI-agent workflow.

> **Search less. Respond faster. Help more animals.**

---

## 📄 License

This project is currently intended as a hackathon/prototype project.

Add an appropriate open-source license before public distribution.
