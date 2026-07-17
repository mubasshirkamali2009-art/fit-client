"use client";

export default function BlogPage() {
    return (
        <div className="page-container">
            <header className="header">
                <div className="logo">
                    <div className="mark">⚡</div>
                    FitTrack <span className="ai">AI</span>
                </div>
            </header>

            <section className="hero">
                <span className="badge">✦ FITTRACK KNOWLEDGE HUB</span>
                <h1>
                    Fuel smarter. <span className="grad">Train harder.</span>
                </h1>
                <p>
                    Evidence-based nutrition, calorie science, and gym-floor advice —
                    written to help you hit your numbers without the guesswork.
                </p>
            </section>

            <section className="section">
                <div className="section-head">
                    <span className="eyebrow">📌 Featured Read</span>
                    <h2>This week&apos;s top pick</h2>
                    <p>Hand-picked by the FitTrack AI editorial team.</p>
                </div>

                <div className="featured">
                    <div className="img">🔥</div>
                    <div className="body">
                        <span className="tag">Calorie Science</span>
                        <h3>Why Your Calorie Counter Might Be Lying to You</h3>
                        <p>
                            Food labels, tracking apps, and even your smart scale can be
                            off by up to 20%. Here&apos;s how FitTrack AI corrects for it —
                            and how you can too.
                        </p>
                        <div className="meta">
                            <span>🕐 7 min read</span>
                            <span>•</span>
                            <span>Nutrition Team</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="section-head">
                    <span className="eyebrow">📚 Latest Articles</span>
                    <h2>From the blog</h2>
                    <p>Straight talk on macros, meal timing, and training smarter.</p>
                </div>

                <div className="grid">
                    {articles.map((a) => (
                        <div className="card" key={a.title}>
                            <div className={`thumb ${a.thumbClass}`}>{a.emoji}</div>
                            <div className="body">
                                <span className="cat">{a.category}</span>
                                <h4>{a.title}</h4>
                                <p>{a.excerpt}</p>
                                <div className="meta">
                                    {a.readTime} min read · {a.author}
                                </div>
                                <span className="read-more">Read article →</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="newsletter">
                <h2>Get the next article first</h2>
                <p>One useful email a week. No spam, just science-backed nutrition tips.</p>
                <div className="sub-form">
                    <input type="email" placeholder="you@example.com" />
                    <button>Subscribe</button>
                </div>
            </div>

            <footer className="footer">
                © 2026 FitTrack AI · Simplify your nutrition, achieve your target.
            </footer>

            <style jsx>{`
        :global(:root) {
          --bg-dark: #0b0f14;
          --teal: #12b981;
          --teal-light: #34e0a1;
          --purple: #8b6bf2;
          --text-dim: #9aa4b2;
          --card-border: #eef1f4;
          --page-bg: #fafbfc;
        }
        :global(body) {
          font-family: "Manrope", sans-serif;
          background: var(--page-bg);
          color: #1a1f27;
          margin: 0;
        }
        :global(h1, h2, h3, h4) {
          font-family: "Sora", sans-serif;
        }

        .page-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 0;
          background: transparent;
          border-bottom: 1px solid #eef1f4;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
          font-size: 20px;
          color: #111;
          font-family: "Sora", sans-serif;
        }
        .mark {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: linear-gradient(135deg, var(--teal), var(--purple));
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 16px;
        }
        .ai {
          background: linear-gradient(135deg, var(--teal), var(--purple));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero {
          margin-top: 32px;
          border-radius: 22px;
          background: radial-gradient(
              circle at 30% 20%,
              #16202b 0%,
              var(--bg-dark) 55%,
              #05070a 100%
            );
          padding: 80px 40px;
          text-align: center;
          color: #fff;
          position: relative;
          overflow: hidden;
        }
        .badge {
          display: inline-block;
          padding: 8px 18px;
          border-radius: 30px;
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.5px;
          background: linear-gradient(90deg, var(--teal), var(--purple));
          color: #fff;
          margin-bottom: 26px;
        }
        .hero h1 {
          font-size: 48px;
          font-weight: 800;
          line-height: 1.15;
        }
        .grad {
          background: linear-gradient(90deg, var(--teal-light), var(--purple));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .hero p {
          max-width: 620px;
          margin: 22px auto 0;
          color: var(--text-dim);
          font-size: 16px;
          line-height: 1.7;
        }

        .section {
          padding: 60px 0;
        }
        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f1eefd;
          color: var(--purple);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12.5px;
          font-weight: 700;
          margin-bottom: 18px;
        }
        .section-head h2 {
          font-size: 32px;
          font-weight: 800;
          color: #101418;
        }
        .section-head p {
          color: #68707c;
          margin-top: 8px;
          font-size: 15px;
        }

        .featured {
          margin-top: 32px;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--card-border);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          cursor: pointer;
          background: #fff;
        }
        .featured:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 50px -20px rgba(18, 185, 129, 0.35);
        }
        .featured .img {
          background: linear-gradient(135deg, #0e2a22, #1c1240);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 60px;
          min-height: 250px;
        }
        .featured .body {
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .tag {
          align-self: flex-start;
          background: #e8fbf3;
          color: var(--teal);
          font-size: 11.5px;
          font-weight: 800;
          letter-spacing: 0.4px;
          padding: 5px 12px;
          border-radius: 6px;
          margin-bottom: 16px;
          text-transform: uppercase;
        }
        .featured h3 {
          font-size: 24px;
          font-weight: 800;
          color: #111;
          margin-bottom: 12px;
        }
        .featured p {
          color: #6b7280;
          font-size: 14.5px;
          line-height: 1.7;
          margin-bottom: 20px;
        }
        .meta {
          display: flex;
          gap: 16px;
          font-size: 13px;
          color: #9aa4b2;
          font-weight: 600;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 32px;
        }
        .card {
          background: #fff;
          border: 1px solid var(--card-border);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease,
            border-color 0.3s ease;
          cursor: pointer;
        }
        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -18px rgba(20, 20, 30, 0.18);
          border-color: transparent;
        }
        .thumb {
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 38px;
          color: #fff;
        }
        .c1 {
          background: linear-gradient(135deg, #0f3d2e, #12b981);
        }
        .c2 {
          background: linear-gradient(135deg, #2b1f52, #8b6bf2);
        }
        .c3 {
          background: linear-gradient(135deg, #123a3a, #1fb8a3);
        }
        .c4 {
          background: linear-gradient(135deg, #3a1f4d, #a86bf2);
        }
        .c5 {
          background: linear-gradient(135deg, #0f3d2e, #34e0a1);
        }
        .c6 {
          background: linear-gradient(135deg, #241b45, #6b5ff2);
        }
        .card .body {
          padding: 24px;
        }
        .cat {
          font-size: 11px;
          font-weight: 800;
          color: var(--teal);
          text-transform: uppercase;
          letter-spacing: 0.4px;
          margin-bottom: 10px;
          display: block;
        }
        .card h4 {
          font-size: 17px;
          font-weight: 700;
          color: #141824;
          line-height: 1.4;
          margin-bottom: 10px;
          transition: color 0.25s ease;
        }
        .card:hover h4 {
          color: var(--teal);
        }
        .card p {
          color: #767e89;
          font-size: 13.5px;
          line-height: 1.6;
          margin-bottom: 16px;
        }
        .card .meta {
          font-size: 12px;
          color: #a2a9b3;
        }
        .read-more {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: var(--purple);
          margin-top: 14px;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .card:hover .read-more {
          opacity: 1;
          transform: translateX(0);
        }

        .newsletter {
          margin: 40px 0 60px;
          padding: 60px 40px;
          border-radius: 22px;
          background: linear-gradient(120deg, #0b0f14, #161029);
          text-align: center;
          color: #fff;
        }
        .newsletter h2 {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 10px;
        }
        .newsletter p {
          color: var(--text-dim);
          font-size: 14.5px;
          margin-bottom: 28px;
        }
        .sub-form {
          display: flex;
          justify-content: center;
          gap: 10px;
          max-width: 420px;
          margin: 0 auto;
        }
        .sub-form input {
          flex: 1;
          padding: 13px 16px;
          border-radius: 10px;
          border: 1px solid #2a3140;
          background: #12161d;
          color: #fff;
          font-size: 14px;
          outline: none;
        }
        .sub-form button {
          padding: 13px 22px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(90deg, var(--teal), var(--purple));
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: filter 0.25s ease, transform 0.25s ease;
        }
        .sub-form button:hover {
          filter: brightness(1.1);
          transform: translateY(-2px);
        }

        .footer {
          text-align: center;
          padding: 30px 0;
          color: #9aa4b2;
          font-size: 13px;
          border-top: 1px solid #eef1f4;
        }

        @media (max-width: 900px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .featured {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .hero h1 {
            font-size: 32px;
          }
          .hero {
            padding: 50px 20px;
          }
          .grid {
            grid-template-columns: 1fr;
          }
          .newsletter {
            padding: 40px 20px;
          }
          .sub-form {
            flex-direction: column;
          }
        }
      `}</style>
        </div>
    );
}

const articles = [
    {
        title: "Macros 101: Protein, Carbs & Fat Made Simple",
        excerpt:
            "A no-fluff breakdown of what macros actually do in your body and how to split them for your goal.",
        category: "Nutrition",
        emoji: "🥗",
        thumbClass: "c1",
        readTime: 5,
        author: "Coach Aisha",
    },
    {
        title: "Bulking Without the Bloat: A Calorie Surplus Guide",
        excerpt:
            "How to gain muscle, not just weight, by pairing your surplus with the right training split.",
        category: "Training",
        emoji: "💪",
        thumbClass: "c2",
        readTime: 6,
        author: "Coach Rafi",
    },
    {
        title: "The Truth About Calorie Deficits and Muscle Loss",
        excerpt:
            "Cutting weight doesn't have to cost you muscle. Here's the deficit range that keeps gains intact.",
        category: "Weight Loss",
        emoji: "⚖️",
        thumbClass: "c3",
        readTime: 8,
        author: "Nutrition Team",
    },
    {
        title: "5 High-Protein Meals You Can Prep in 30 Minutes",
        excerpt:
            "Batch-cook these gym-friendly meals once and stay on track for the whole week.",
        category: "Meal Prep",
        emoji: "🍽️",
        thumbClass: "c4",
        readTime: 4,
        author: "Chef Imran",
    },
    {
        title: "How FitTrack AI Builds Your Daily Eating Plan",
        excerpt:
            "A behind-the-scenes look at how Gemini AI turns your goals into a full-day meal plan.",
        category: "AI & Tech",
        emoji: "🧠",
        thumbClass: "c5",
        readTime: 6,
        author: "Product Team",
    },
    {
        title: "Late-Night Cravings: What They Really Mean",
        excerpt:
            "Fatigue, stress, or genuine hunger — how to tell the difference and what to eat instead.",
        category: "Recovery",
        emoji: "🌙",
        thumbClass: "c6",
        readTime: 5,
        author: "Coach Aisha",
    },
];