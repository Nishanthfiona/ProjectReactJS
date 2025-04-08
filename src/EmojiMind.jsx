import { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

// Training data
const trainingData = [
  { text: "I love this!", label: 1 },
  { text: "This is bad", label: 0 },
  { text: "Amazing experience", label: 1 },
  { text: "Terrible service", label: 0 },
  { text: "Not bad, okayish", label: 2 },
  { text: "I’m neutral on this", label: 2 },
];

const labels = ["Negative", "Positive", "Neutral"];
const emojis = ["😞", "😊", "😐"];

const preprocess = (text) => {
  const lowered = text.toLowerCase();
  return lowered.replace(/[^a-zA-Z ]/g, "").split(" ").filter(Boolean);
};

const buildVocab = (data) => {
  const vocabSet = new Set();
  data.forEach(({ text }) => {
    preprocess(text).forEach((word) => vocabSet.add(word));
  });
  return Array.from(vocabSet);
};

const textToTensor = (text, vocab) => {
  const tokens = preprocess(text);
  const vec = vocab.map((word) => (tokens.includes(word) ? 1 : 0));
  return tf.tensor([vec]);
};

export default function EmojiMind() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [model, setModel] = useState(null);
  const [vocab, setVocab] = useState([]);

  const trainModel = async () => {
    const vocab = buildVocab(trainingData);
    const xs = tf.stack(
      trainingData.map(({ text }) => textToTensor(text, vocab).squeeze())
    );
    const ys = tf.tensor(trainingData.map(({ label }) => label));

    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [vocab.length], units: 10, activation: "relu" }));
    model.add(tf.layers.dense({ units: 3, activation: "softmax" }));

    model.compile({ optimizer: "adam", loss: "sparseCategoricalCrossentropy", metrics: ["accuracy"] });
    await model.fit(xs, ys, { epochs: 30 });

    setModel(model);
    setVocab(vocab);
  };

  const analyzeSentiment = async () => {
    if (!model || !vocab.length) return;
    const inputTensor = textToTensor(text, vocab);
    const prediction = model.predict(inputTensor);
    const predIndex = prediction.argMax(1).dataSync()[0];
    setResult({ sentiment: labels[predIndex], emoji: emojis[predIndex] });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 text-white p-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-6 text-center"
      >
        Sentiment AI 🚀🧠
      </motion.h1>

      <Card className="w-full max-w-md p-4">
        <CardContent className="space-y-4">
          <Input
            placeholder="Type your message here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={trainModel} className="w-full bg-green-600 hover:bg-green-700">
            Train AI Model
          </Button>
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
        Built with ❤️ using React + TensorFlow.js
      </footer>
    </div>
  );
}
