// Vibe Check responses for mock API
export interface VibeResponse {
  score: number; // -1 = negative, 0 = neutral, 1 = positive
  phrase: string;
  emoji: string;
  color: string;
  bgGradient: string;
}

export const vibeResponses: VibeResponse[] = [
  {
    score: 1,
    phrase: "You're radiating cosmic energy! The tribal spirits approve! 🌟",
    emoji: "🎉",
    color: "#00ffff",
    bgGradient: "linear-gradient(135deg, rgba(0,255,255,0.2), rgba(255,0,255,0.1))"
  },
  {
    score: 1,
    phrase: "Maximum vibe detected! You're absolutely on fire! 🔥",
    emoji: "🚀",
    color: "#ff00ff",
    bgGradient: "linear-gradient(135deg, rgba(255,0,255,0.2), rgba(255,165,0,0.1))"
  },
  {
    score: 1,
    phrase: "The neon gods are pleased with your energy! Keep glowing!",
    emoji: "✨",
    color: "#d4af37",
    bgGradient: "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(0,255,255,0.1))"
  },
  {
    score: 0,
    phrase: "Chill vibes detected. The calm before the storm of awesomeness.",
    emoji: "😌",
    color: "#ffa500",
    bgGradient: "linear-gradient(135deg, rgba(255,165,0,0.15), rgba(0,255,255,0.05))"
  },
  {
    score: 0,
    phrase: "Neutral energy flow. Take a breath, the beat drops soon.",
    emoji: "🌊",
    color: "#00cccc",
    bgGradient: "linear-gradient(135deg, rgba(0,204,204,0.15), rgba(255,0,255,0.05))"
  },
  {
    score: -1,
    phrase: "Low vibes? Let the tribal beats heal your soul! 🎵",
    emoji: "💫",
    color: "#cc00cc",
    bgGradient: "linear-gradient(135deg, rgba(204,0,204,0.15), rgba(0,204,204,0.05))"
  },
  {
    score: -1,
    phrase: "The neon lights will guide you back. Stay strong, warrior!",
    emoji: "🌙",
    color: "#8800ff",
    bgGradient: "linear-gradient(135deg, rgba(136,0,255,0.15), rgba(255,0,255,0.05))"
  }
];

// Function to analyze simple sentiment
export function analyzeVibe(text: string): VibeResponse {
  const lowerText = text.toLowerCase();
  
  const positiveWords = ['excited', 'amazing', 'awesome', 'love', 'great', 'fantastic', 'happy', 'pumped', 'hyped', 'best', 'incredible', 'wonderful', 'thrilled', 'excellent', 'fire', 'lit', 'epic'];
  const negativeWords = ['sad', 'bad', 'boring', 'tired', 'hate', 'terrible', 'awful', 'meh', 'stressed', 'anxious', 'worried', 'disappointed', 'upset', 'annoyed'];
  
  let score = 0;
  
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) score += 1;
  });
  
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) score -= 1;
  });
  
  let sentiment: number;
  if (score > 0) sentiment = 1;
  else if (score < 0) sentiment = -1;
  else sentiment = 0;
  
  const matchingResponses = vibeResponses.filter(r => r.score === sentiment);
  return matchingResponses[Math.floor(Math.random() * matchingResponses.length)];
}
