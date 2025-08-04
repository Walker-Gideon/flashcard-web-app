export const inspireMockData = {
  quotes: [
    {
      id: 1,
      text: "Learning is a treasure that follows its owner everywhere.",
      author: "Chinese Proverb",
    },
    {
      id: 2,
      text: "The beautiful thing about learning is that no one can take it away from you.",
      author: "B.B. King",
    },
    {
      id: 3,
      text: "Education is the most powerful weapon which you can use to change the world.",
      author: "Nelson Mandela",
    },
    {
      id: 4,
      text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
      author: "Mahatma Gandhi",
    },
    {
      id: 5,
      text: "The mind is not a vessel to be filled, but a fire to be kindled.",
      author: "Plutarch",
    },
  ],
  achievements: [
    {
      id: 1,
      name: "7-Day Streak",
      description: "Maintained a study streak for 7 consecutive days.",
      unlocked: true,
      icon: "FlameIcon",
    },
    {
      id: 2,
      name: "First 100 Cards",
      description: "Mastered 100 flashcards.",
      unlocked: true,
      icon: "BookOpen",
    },
    {
      id: 3,
      name: "Early Bird",
      description: "Completed a study session before 8 AM.",
      unlocked: false,
      icon: "Sun",
    },
    {
      id: 4,
      name: "Night Owl",
      description: "Completed a study session after 10 PM.",
      unlocked: false,
      icon: "Moon",
    },
    {
      id: 5,
      name: "Subject Master",
      description: "Achieved 90% mastery in a subject.",
      unlocked: false,
      icon: "Target",
    },
  ],
  progress: {
    weeklyStudyData: [
      { day: "Mon", minutes: 60 },
      { day: "Tue", minutes: 45 },
      { day: "Wed", minutes: 90 },
      { day: "Thu", minutes: 30 },
      { day: "Fri", minutes: 0 },
      { day: "Sat", minutes: 75 },
      { day: "Sun", minutes: 0 },
    ],
    consistencyScore: 70, // out of 100
  },
  personalizedPraise: [
    "You've improved 20% in Biology this week! Keep up the amazing work!",
    "Just 3 more reviews to beat your record! You're so close!",
    "Fantastic consistency this week! Your dedication is paying off.",
    "Great job tackling those challenging topics. Your effort is commendable!",
    "You're making incredible progress. Every session counts!",
  ],
};
