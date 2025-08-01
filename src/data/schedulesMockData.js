export const schedulesMockData = {
  todayStats: {
    dueCards: 24,
    completedCards: 18,
    studyTime: 45, // minutes
    streak: 7,
    completionRate: 75,
  },
  upcomingSchedules: [
    {
      id: "schedule_1",
      subject: "Biology",
      cardCount: 12,
      estimatedTime: 25,
      scheduledTime: "14:00",
      difficulty: "mixed",
      status: "pending",
      color: "emerald",
    },
    {
      id: "schedule_2",
      subject: "French Verbs",
      cardCount: 8,
      estimatedTime: 15,
      scheduledTime: "16:30",
      difficulty: "hard",
      status: "pending",
      color: "blue",
    },
    {
      id: "schedule_3",
      subject: "Math Formulas",
      cardCount: 15,
      estimatedTime: 30,
      scheduledTime: "19:00",
      difficulty: "medium",
      status: "pending",
      color: "purple",
    },
  ],
  weeklySchedule: [
    {
      date: "2024-01-15",
      dayName: "Mon",
      sessions: [
        {
          subject: "Biology",
          time: "14:00",
          status: "completed",
          cardCount: 10,
        },
        { subject: "French", time: "16:00", status: "completed", cardCount: 8 },
      ],
      totalCards: 18,
      completionRate: 100,
    },
    {
      date: "2024-01-16",
      dayName: "Tue",
      sessions: [
        { subject: "Math", time: "15:00", status: "completed", cardCount: 12 },
        { subject: "Biology", time: "17:00", status: "skipped", cardCount: 6 },
      ],
      totalCards: 18,
      completionRate: 67,
    },
    {
      date: "2024-01-17",
      dayName: "Wed",
      sessions: [
        { subject: "French", time: "14:00", status: "pending", cardCount: 8 },
        { subject: "Math", time: "16:30", status: "pending", cardCount: 15 },
        { subject: "Biology", time: "19:00", status: "pending", cardCount: 12 },
      ],
      totalCards: 35,
      completionRate: 0,
    },
    {
      date: "2024-01-18",
      dayName: "Thu",
      sessions: [
        {
          subject: "Biology",
          time: "13:30",
          status: "scheduled",
          cardCount: 10,
        },
      ],
      totalCards: 10,
      completionRate: 0,
    },
    {
      date: "2024-01-19",
      dayName: "Fri",
      sessions: [
        {
          subject: "French",
          time: "15:00",
          status: "scheduled",
          cardCount: 12,
        },
        { subject: "Math", time: "18:00", status: "scheduled", cardCount: 8 },
      ],
      totalCards: 20,
      completionRate: 0,
    },
  ],
  monthlyCalendar: {
    currentMonth: "January 2024",
    studyDays: [15, 16, 17, 18, 19, 22, 23, 24, 25, 26, 29, 30, 31],
    intenseDays: [17, 24, 31], // Days with heavy study load
    completedDays: [15, 16],
  },
};
