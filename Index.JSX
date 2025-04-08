import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 text-white p-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-6 text-center"
      >
        EmojiMind 🤖💬
      </motion.h1>

      <Card className="w-full max-w-md p-4">
        <CardContent className="space-y-4">
          <Input
            placeholder="Type your message here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={analyzeSentiment} className="w-full">
            Analyze Sentiment
          </Button>
          {result && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center text-3xl mt-4"
            >
              {result.emoji} <p className="text-base">{result.sentiment}</p>
            </motion.div>
          )}
        </CardContent>
      </Card>

      <footer className="mt-6 text-sm text-gray-400">
        Built with ❤️ using React + AI logic
      </footer>
    </div>
  );
}
