import UserWelcome from "../user/UserWelcome";
import ScheduleHeaderButtons from "./ScheduleHeaderButtons";

export default function SchedulesHeader({ activeView, setActiveView }) {
  return (
    <header className="medium:block sticky top-0 z-40 hidden border-b border-stone-300 bg-white/30 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80">
      {/* mb-8  */}
      <div className="flex items-center justify-between px-6 py-4">
        <UserWelcome
          title="Study Schedule"
          subText="Plan and track your learning sessions"
        />

        <div className="hidden md:flex">
          <ScheduleHeaderButtons
            activeView={activeView}
            setActiveView={setActiveView}
          />
        </div>
      </div>
    </header>
  );
}

/*
Again in the ScheduleLayout header there is a setting button what it is meant for?

Great question! Looking at the code, the settings button is currently just a **placeholder** - it's rendered but doesn't have any actual functionality:

## **🎯 What It's Intended For:**

The settings button should open a **Schedule Settings Panel/Modal** where users can configure:

### **📅 Schedule Preferences:**

- **Study time preferences** (morning person vs night owl)
- **Session duration** (15 min, 30 min, 45 min, 1 hour)
- **Daily study goals** (number of cards, time spent)
- **Break intervals** between sessions


### **🔔 Notification Settings:**

- **Reminder notifications** (15 min before, 1 hour before)
- **Study streak reminders**
- **Missed session alerts**
- **Weekly progress summaries**


### **🧠 Learning Algorithm:**

- **Spaced repetition settings** (aggressive, normal, relaxed)
- **Difficulty adjustment** sensitivity
- **Review frequency** for different card types
- **Retention targets** (80%, 90%, 95%)


### **📊 Display Options:**

- **Default view** (today, week, month)
- **Calendar start day** (Sunday vs Monday)
- **Time format** (12-hour vs 24-hour)
- **Color themes** for different subjects


### **⚡ Smart Features:**

- **Auto-scheduling** preferences
- **Workload balancing** settings
- **Peak performance time** detection
- **Adaptive scheduling** based on performance


## **🔧 Current State:**

Right now it's just a **visual element** with no functionality - clicking it does nothing.

## **💡 Should We Implement It?**

When we add Firebase integration, this settings button could:

1. **Open a settings modal** with all the preferences above
2. **Save settings to Firestore** under the user's profile
3. **Apply settings** to influence scheduling algorithms
4. **Sync across devices** for consistent experience


Would you like me to:

1. **Remove it** (since it's not functional yet)
2. **Create the settings modal** with all the configuration options
3. **Leave it as placeholder** for future implementation


What's your preference? It's definitely something we should implement when we add Firebase, as user preferences are crucial for a personalized learning experience!
*/
