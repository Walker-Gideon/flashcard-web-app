export default function DisplayTiming({ createdAt, timeDisplay }) {
  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return interval === 1
          ? `${interval} ${unit} ago`
          : `${interval} ${unit}s ago`;
      }
    }

    return "Just now";
  };

  const getExactTime = (date) => {
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };
  const dateObj = createdAt.toDate();

  return (
    <div className="text-xs text-gray-500">
      {timeDisplay ? (
        <p>{createdAt ? getExactTime(dateObj) : "Loading..."}</p>
      ) : (
        <p>{createdAt ? getTimeAgo(createdAt.toDate()) : "Loading..."}</p>
      )}
    </div>
  );
}
