export const mockData = {
  stats: {
    todaysMastery: 75,
    flashcardsReviewed: 24,
    timeSpent: 45, // minutes
    streakDays: 7,
  },
  flashcardsDue: [
    {
      id: 1,
      term: "Photosynthesis",
      subject: "Biology",
      due: "Today",
      difficulty: "medium",
    },
    {
      id: 2,
      term: "Mitochondria",
      subject: "Biology",
      due: "Today",
      difficulty: "hard",
    },
    {
      id: 3,
      term: "French Verbs",
      subject: "Language",
      due: "Tomorrow",
      difficulty: "easy",
    },
    {
      id: 4,
      term: "Calculus Derivatives",
      subject: "Math",
      due: "Tomorrow",
      difficulty: "hard",
    },
    {
      id: 5,
      term: "World War II",
      subject: "History",
      due: "In 2 days",
      difficulty: "medium",
    },
  ],
  recentActivity: [
    {
      id: 1,
      action: "Edited 'French Verbs' note",
      time: "2h ago",
      type: "edit",
    },
    {
      id: 2,
      action: "Completed Biology review session",
      time: "4h ago",
      type: "review",
    },
    {
      id: 3,
      action: "Added 5 new flashcards to Math deck",
      time: "6h ago",
      type: "create",
    },
    {
      id: 4,
      action: "Achieved 7-day streak!",
      time: "1d ago",
      type: "achievement",
    },
    {
      id: 5,
      action: "Updated study schedule",
      time: "2d ago",
      type: "schedule",
    },
  ],
  weakAreas: [
    { topic: "Biology", count: 5, color: "bg-red-100 text-red-800" },
    { topic: "Calculus", count: 3, color: "bg-orange-100 text-orange-800" },
    {
      topic: "French Grammar",
      count: 8,
      color: "bg-yellow-100 text-yellow-800",
    },
    { topic: "Chemistry", count: 2, color: "bg-pink-100 text-pink-800" },
  ],
  quote: "Learning is a treasure that follows its owner everywhere.",
  studyDates: [15, 16, 17, 20, 22, 23, 24], // Days of the month with study sessions
};
