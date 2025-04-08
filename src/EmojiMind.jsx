import { useState } from "react";
import { motion } from "framer-motion";

const getSentimentEmoji = (text) => {
  const lowered = text.toLowerCase();
  if (lowered.includes("love") || lowered.includes("great") || lowered.includes("awesome") || lowered.includes("happy")) {
    return { emoji: "😊", sentiment: "Positive" };
  } else if (lowered.includes("hate") || lowered.includes("bad") || lowered.includes("terrible") || lowered.includes("sad")) {
    return { emoji: "😞", sentiment: "Negative" };
  } else {
    return { emoji: "😐", sentiment: "Neutral" };
  }
};

export default function EmojiMind() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const analyzeSentiment = () => {
    const sentiment = getSentimentEmoji(text);
    setResult(sentiment);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "linear-gradient(to bottom, #1e293b, #0f172a)", color: "white", padding: "1rem" }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem", textAlign: "center" }}
      >
        EmojiMind 🤖💬
      </motion.h1>

      <div style={{ width: "100%", maxWidth: "400px", background: "white", color: "black", padding: "1rem", borderRadius: "1rem" }}>
        <input
          style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #ccc" }}
          placeholder="Type your message here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={analyzeSentiment}
          style={{ marginTop: "1rem", width: "100%", padding: "0.5rem", borderRadius: "0.5rem", backgroundColor: "#1e40af", color: "white", border: "none" }}
        >
          Analyze Sentiment
        </button>
        {result && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{ textAlign: "center", fontSize: "1.5rem", marginTop: "1rem" }}
          >
            {result.emoji} <p style={{ fontSize: "1rem" }}>{result.sentiment}</p>
          </motion.div>
        )}
      </div>

      <footer style={{ marginTop: "1.5rem", fontSize: "0.875rem", color: "#94a3b8" }}>
        Built with ❤️ using React + AI logic
      </footer>
    </div>
  );
}