import { useState } from "react";
import { sendAgentMessage } from "./services/api";
import AgentResponse from "./components/AgentResponse";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [agentData, setAgentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    setLoading(true);
    setError("");
    setAgentData(null);

    try {
      const data = await sendAgentMessage({
        message: message.trim(),
      });

      setAgentData(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setMessage("");
    setAgentData(null);
    setError("");
    setLoading(false);
  }

  function handleExampleClick(example) {
    setMessage(example);
    setError("");
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="brand">
          <div className="brand-icon">🐾</div>

          <div>
            <h1>PawSathi</h1>

            <p>AI-powered rescue assistant</p>
          </div>
        </div>

        <div className="status">
          <span className="status-dot"></span>
          Animal Rescue
        </div>
      </header>

      {/* Main */}
      <main className="app-main">
        {/* Hero */}
        <section className="hero">
          <div className="hero-badge">🚨 AI FOR ANIMAL RESCUE</div>

          <h2>How may PawSathi help you?</h2>

          <p>
            Search nearby veterinary hospitals, rescue organizations, animal
            welfare information, news and resources.
          </p>
        </section>

        {/* Search */}
        <section className="search-section">
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Example: Find animal hospitals near Jaipur..."
                rows="4"
                disabled={loading}
              />

              <div className="input-footer">
                <span className="input-hint">
                  • Animal rescue • Veterinary • Latest News
                </span>

                <div className="search-actions">
                  <button
                    type="button"
                    className="reset-button"
                    onClick={handleReset}
                    disabled={loading || (!message && !agentData && !error)}
                  >
                    ↻ Reset
                  </button>

                  <button
                    type="submit"
                    className="ask-button"
                    disabled={loading || !message.trim()}
                  >
                    {loading ? "Researching..." : "Ask PawSathi →"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </section>

        {/* Examples */}
        {!agentData && !loading && (
          <section className="examples">
            <p>Try an example</p>

            <div className="example-buttons">
              <button
                onClick={() =>
                  handleExampleClick("Find animal hospitals near Jaipur")
                }
              >
                🏥 Veterinary hospitals
              </button>

              <button
                onClick={() =>
                  handleExampleClick("Find animal rescue NGOs near Jaipur")
                }
              >
                🐾 Rescue NGOs
              </button>

              <button
                onClick={() =>
                  handleExampleClick("Find recent animal rescue news in Jaipur")
                }
              >
                📰 Rescue news
              </button>

              <button
                onClick={() =>
                  handleExampleClick(
                    "Find animal rescue training videos",
                  )
                }
              >
                ▶️ Training videos
              </button>
            </div>
          </section>
        )}

        {/* Loading */}
        {loading && (
          <div className="loading-card">
            <div className="loading-icon">🔎</div>

            <div>
              <strong>PawSathi is researching...</strong>

              <p>
                Searching Indian animal-rescue sources and preparing results.
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="error-card">
            <div className="error-icon">⚠️</div>

            <div>
              <strong>Something went wrong</strong>

              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Agent Response */}
        {!loading && agentData && <AgentResponse data={agentData} />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <span>🐾 PawSathi</span>

        <span>India-focused animal rescue research</span>
      </footer>
    </div>
  );
}

export default App;
