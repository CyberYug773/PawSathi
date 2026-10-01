function AgentResponse({ data }) {
  if (!data) {
    return null;
  }

  const research = data.research || [];

  const mapsResults = research.filter(
    (item) => item.success && item.tool === "maps_search",
  );

  const webResults = research.filter(
    (item) => item.success && item.tool === "web_search",
  );

  const newsResults = research.filter(
    (item) => item.success && item.tool === "news_search",
  );

  const youtubeResults = research.filter(
    (item) => item.success && item.tool === "youtube_search",
  );

  const imageResults = research.filter(
    (item) => item.success && item.tool === "image_search",
  );

  const places = mapsResults[0]?.data?.places || [];

  const websites = webResults[0]?.data?.organicResults || [];

  const news = newsResults[0]?.data?.newsResults || [];

  const videos = youtubeResults[0]?.data?.videos || [];

  const images = imageResults[0]?.data?.images || [];

  return (
    <div className="agent-response">
      {/* Header */}
      <div className="response-header">
        <div className="response-icon">🚨</div>

        <div>
          <div className="response-label">RESCUE ASSISTANCE</div>

          <h2>PawSathi Research Results</h2>

          <p>Live information gathered from PawSathi tools.</p>
        </div>
      </div>

      {/* Nearby Places */}
      {places.length > 0 && (
        <section className="response-section">
          <div className="section-heading">
            <span>🏥</span>
            <div>
              <h3>Nearby Veterinary Hospitals</h3>

              <p>
                Veterinary hospitals and animal care facilities found nearby.
              </p>
            </div>
          </div>

          <div className="card-grid">
            {places.map((place, index) => (
              <article
                className="rescue-card"
                key={place.placeId || `${place.title}-${index}`}
              >
                <div className="card-number">{index + 1}</div>

                <div className="card-content">
                  <h4>{place.title || "Veterinary Hospital"}</h4>

                  {place.type && (
                    <span className="place-type">{place.type}</span>
                  )}

                  {place.address && (
                    <div className="info-row">
                      <span>📍</span>
                      <span>{place.address}</span>
                    </div>
                  )}

                  {place.phone && (
                    <div className="info-row">
                      <span>📞</span>
                      <span>{place.phone}</span>
                    </div>
                  )}

                  {place.openState && (
                    <div className="info-row">
                      <span>🕐</span>
                      <span>{place.openState}</span>
                    </div>
                  )}

                  {place.rating && (
                    <div className="info-row">
                      <span>⭐</span>
                      <span>
                        {place.rating}

                        {place.reviews ? ` (${place.reviews} reviews)` : ""}
                      </span>
                    </div>
                  )}

                  <div className="card-actions">
                    {place.phone && (
                      <a
                        href={`tel:${place.phone}`}
                        className="action-button primary"
                      >
                        📞 Call
                      </a>
                    )}

                    {place.latitude && place.longitude && (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`}
                        target="_blank"
                        rel="noreferrer"
                        className="action-button"
                      >
                        📍 Directions
                      </a>
                    )}

                    {place.website && (
                      <a
                        href={place.website}
                        target="_blank"
                        rel="noreferrer"
                        className="action-button"
                      >
                        🌐 Website
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Rescue Organizations */}
      {places.length > 0 && (
        <section className="response-section">
          <div className="section-heading">
            <span>🐾</span>

            <div>
              <h3>Rescue Organizations & Animal Services</h3>

              <p>
                Local organizations and animal services returned by the search.
              </p>
            </div>
          </div>

          <div className="card-grid">
            {places
              .filter((place) => {
                const text = `${place.title} ${place.type}`.toLowerCase();

                return (
                  text.includes("ngo") ||
                  text.includes("rescue") ||
                  text.includes("shelter") ||
                  text.includes("animal")
                );
              })
              .slice(0, 5)
              .map((place, index) => (
                <article
                  className="rescue-card organization-card"
                  key={`org-${index}`}
                >
                  <div className="card-number">{index + 1}</div>

                  <div className="card-content">
                    <h4>{place.title}</h4>

                    {place.address && (
                      <div className="info-row">
                        <span>📍</span>
                        <span>{place.address}</span>
                      </div>
                    )}

                    {place.phone && (
                      <div className="info-row">
                        <span>📞</span>
                        <span>{place.phone}</span>
                      </div>
                    )}

                    <div className="card-actions">
                      {place.phone && (
                        <a
                          href={`tel:${place.phone}`}
                          className="action-button primary"
                        >
                          📞 Call
                        </a>
                      )}

                      {place.website && (
                        <a
                          href={place.website}
                          target="_blank"
                          rel="noreferrer"
                          className="action-button"
                        >
                          🌐 Website
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </section>
      )}

      {/* Immediate Steps */}
      <section className="response-section">
        <div className="section-heading">
          <span>⚠️</span>

          <div>
            <h3>Immediate Steps</h3>

            <p>
              General precautions while professional help is being arranged.
            </p>
          </div>
        </div>

        <div className="steps-card">
          <div className="step">
            <span>1</span>
            <p>
              Keep the animal away from traffic and other immediate dangers.
            </p>
          </div>

          <div className="step">
            <span>2</span>
            <p>
              Avoid unnecessary movement, especially if an injury is suspected.
            </p>
          </div>

          <div className="step">
            <span>3</span>
            <p>
              Keep the surrounding area calm and reduce unnecessary handling.
            </p>
          </div>

          <div className="step">
            <span>4</span>
            <p>Contact a veterinarian or animal rescue organization.</p>
          </div>

          <div className="step">
            <span>5</span>
            <p>
              Follow instructions from qualified veterinary or rescue
              professionals.
            </p>
          </div>
        </div>

        <div className="safety-note">
          ⚠️ PawSathi provides general information and research assistance. It
          is not a substitute for professional veterinary care.
        </div>
      </section>

      {/* Web Sources */}
      {websites.length > 0 && (
        <section className="response-section">
          <div className="section-heading">
            <span>🔗</span>

            <div>
              <h3>Sources</h3>

              <p>Web sources used during research.</p>
            </div>
          </div>

          <div className="source-list">
            {websites.slice(0, 5).map((source, index) => (
              <a
                key={index}
                href={source.link}
                target="_blank"
                rel="noreferrer"
                className="source-card"
              >
                <div>
                  <strong>{source.title}</strong>

                  {source.snippet && <p>{source.snippet}</p>}
                </div>

                <span>↗</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* News */}
      {news.length > 0 && (
        <section className="response-section">
          <div className="section-heading">
            <span>📰</span>

            <div>
              <h3>Latest News</h3>
            </div>
          </div>

          <div className="source-list">
            {news.slice(0, 5).map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="source-card"
              >
                <div>
                  <strong>{item.title}</strong>

                  {item.source && (
                    <p>
                      {item.source}
                      {item.date ? ` • ${item.date}` : ""}
                    </p>
                  )}
                </div>

                <span>↗</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* YouTube */}
      {videos.length > 0 && (
        <section className="response-section">
          <div className="section-heading">
            <span>▶️</span>

            <div>
              <h3>Helpful Videos</h3>
            </div>
          </div>

          <div className="card-grid">
            {videos.slice(0, 5).map((video, index) => (
              <a
                key={index}
                href={video.link}
                target="_blank"
                rel="noreferrer"
                className="video-card"
              >
                {video.thumbnail && (
                  <img src={video.thumbnail} alt={video.title} />
                )}

                <div>
                  <strong>{video.title}</strong>

                  {video.channel && <p>{video.channel}</p>}
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Images */}
      {images.length > 0 && (
        <section className="response-section">
          <div className="section-heading">
            <span>🖼️</span>

            <div>
              <h3>Visual References</h3>
            </div>
          </div>

          <div className="image-grid">
            {images.slice(0, 8).map((image, index) => (
              <a
                key={index}
                href={image.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="image-card"
              >
                <img
                  src={image.thumbnail || image.imageUrl}
                  alt={image.title}
                />

                <span>{image.title}</span>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default AgentResponse;
