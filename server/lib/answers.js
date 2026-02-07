const defaultAnswers = [
  "That's a great question. Let me think about that.",
  "I'd be happy to help with that.",
  "Here's what I know about that topic.",
  "Let me look into that for you.",
  "That's an interesting point. Here are my thoughts.",
  "I'm not sure about that, but I can help you find out.",
  "Thanks for asking! Here's what I think.",
  "Good question. Let me explain.",
  "I'd suggest looking at it from a different angle.",
  "It depends on the context, but generally speaking...",
  "I'm here to help. What would you like to explore further?",
  "That reminds me of something worth considering.",
  "Here's a simple way to think about it.",
  "Let me break that down for you.",
  "I'd recommend starting with the basics.",
  "There are a few ways to approach this.",
  "Based on what you've shared, I'd say...",
  "That's worth exploring in more detail.",
  "I can help you work through that.",
  "Here's one way to look at it."
]

export const getDefaultAnswer = () => {
  return defaultAnswers[Math.floor(Math.random() * defaultAnswers.length)]
}
