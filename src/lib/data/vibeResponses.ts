export interface VibeResponse {
  emoji: string;
  vibeTitle: string;
  response: string;
  suggestedEvents: string[];
  matchScore: number;
}

export function analyzeVibe(text: string): VibeResponse {
  const lowerText = text.toLowerCase();
  
  // Keyword analysis
  const techKeywords = ['code', 'tech', 'hack', 'robot', 'ai', 'software', 'dev', 'future', 'cyber', 'data'];
  const cultureKeywords = ['dance', 'music', 'art', 'song', 'sing', 'perform', 'stage', 'drama', 'fashion'];
  const funKeywords = ['fun', 'laugh', 'chill', 'game', 'play', 'quiz', 'party', 'enjoy'];
  const moneyKeywords = ['startup', 'business', 'money', 'finance', 'market', 'pitch', 'invest'];
  
  let scores = {
    tech: 0,
    culture: 0,
    fun: 0,
    money: 0
  };
  
  techKeywords.forEach(k => { if(lowerText.includes(k)) scores.tech++; });
  cultureKeywords.forEach(k => { if(lowerText.includes(k)) scores.culture++; });
  funKeywords.forEach(k => { if(lowerText.includes(k)) scores.fun++; });
  moneyKeywords.forEach(k => { if(lowerText.includes(k)) scores.money++; });
  
  // Determine dominant vibe
  const maxScore = Math.max(scores.tech, scores.culture, scores.fun, scores.money);
  let category = 'general';
  
  if (maxScore > 0) {
    if (scores.tech === maxScore) category = 'tech';
    else if (scores.culture === maxScore) category = 'culture';
    else if (scores.money === maxScore) category = 'money';
    else category = 'fun';
  }
  
  // Generate response
  switch(category) {
    case 'tech':
      return {
        emoji: "🤖",
        vibeTitle: "Future Visionary",
        response: "You speak binary and dream in code. The future is yours to build!",
        suggestedEvents: ["Code Pulse", "Robo Wars", "Drone Racing"],
        matchScore: 92 + Math.floor(Math.random() * 8)
      };
    case 'culture':
      return {
        emoji: "🎭",
        vibeTitle: "Creative Soul",
        response: "The stage calls to you. Your artistic energy is exactly what we need!",
        suggestedEvents: ["Neon Nritya", "Tribal Beats", "Fashion Fusion"],
        matchScore: 94 + Math.floor(Math.random() * 6)
      };
    case 'money':
      return {
        emoji: "💼",
        vibeTitle: "Business Mogul",
        response: "You see opportunities where others see chaos. Time to pitch your vision!",
        suggestedEvents: ["Startup Ignite", "Bull & Bear", "Crypto Quest"],
        matchScore: 88 + Math.floor(Math.random() * 10)
      };
    case 'fun':
      return {
        emoji: "🎉",
        vibeTitle: "Party Starter",
        response: "You're here for a good time and we love that energy!",
        suggestedEvents: ["Stand-Up Showdown", "Quiz Masters", "Esports Arena"],
        matchScore: 90 + Math.floor(Math.random() * 9)
      };
    default:
      return {
        emoji: "✨",
        vibeTitle: "Meraz Explorer",
        response: "You're open to everything! That's the best way to experience the fest.",
        suggestedEvents: ["Pro-Nights", "Informals", "Food Court"],
        matchScore: 85 + Math.floor(Math.random() * 10)
      };
  }
}
