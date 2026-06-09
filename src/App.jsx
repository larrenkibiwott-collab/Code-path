import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0D0F14",
  surface: "#161920",
  card: "#1C2029",
  border: "#252A36",
  accent: "#4F9EFF",
  accentGlow: "#4F9EFF22",
  green: "#3DD68C",
  yellow: "#F5C542",
  red: "#FF5C5C",
  purple: "#A78BFA",
  textPrimary: "#F0F2F8",
  textSecondary: "#8892A4",
  textMuted: "#555F72",
};

const CURRICULUM = [
  {
    id: "python-basics",
    language: "Python",
    icon: "🐍",
    title: "Python Fundamentals",
    topics: [
      { id: "variables", title: "Variables & Data Types", xp: 50 },
      { id: "strings", title: "Strings & Text", xp: 50 },
      { id: "numbers", title: "Numbers & Math", xp: 50 },
      { id: "lists", title: "Lists & Collections", xp: 75 },
      { id: "conditionals", title: "If / Else Logic", xp: 75 },
      { id: "loops", title: "Loops", xp: 100 },
      { id: "functions", title: "Functions", xp: 100 },
    ],
  },
  {
    id: "html-css",
    language: "HTML & CSS",
    icon: "🌐",
    title: "Web Building Blocks",
    locked: true,
    topics: [
      { id: "html-basics", title: "HTML Structure", xp: 50 },
      { id: "css-styling", title: "CSS Styling", xp: 75 },
      { id: "flexbox", title: "Flexbox Layout", xp: 100 },
    ],
  },
  {
    id: "javascript",
    language: "JavaScript",
    icon: "⚡",
    title: "JavaScript Essentials",
    locked: true,
    topics: [
      { id: "js-basics", title: "JS Syntax & Variables", xp: 50 },
      { id: "dom", title: "DOM Manipulation", xp: 100 },
    ],
  },
];

const TOOLS_DATA = [
  {
    name: "GitHub",
    icon: "🐙",
    category: "Version Control",
    priority: "Essential",
    color: COLORS.accent,
    why: "Every developer uses GitHub to save, share, and collaborate on code. University projects will require it.",
    learn: "https://github.com",
    tip: "Think of it like Google Drive but for code — with a full history of every change you've ever made.",
  },
  {
    name: "VS Code",
    icon: "💻",
    category: "Code Editor",
    priority: "Essential",
    color: COLORS.green,
    why: "The #1 code editor used by professionals and students worldwide. Free, powerful, and extensible.",
    learn: "https://code.visualstudio.com",
    tip: "Install extensions like Pylance (Python) and Prettier (code formatter) right away.",
  },
  {
    name: "Notion",
    icon: "📓",
    category: "Notes & Docs",
    priority: "Recommended",
    color: COLORS.purple,
    why: "Great for taking notes on what you learn, organising university work, and tracking your progress.",
    learn: "https://notion.so",
    tip: "Many CS students use Notion to document their projects and keep interview prep notes.",
  },
  {
    name: "Stack Overflow",
    icon: "🏗️",
    category: "Q&A Community",
    priority: "Essential",
    color: COLORS.yellow,
    why: "When you get stuck (and you will), this is where every developer goes to find answers.",
    learn: "https://stackoverflow.com",
    tip: "Search your exact error message — 90% of the time, someone already asked the same question.",
  },
  {
    name: "Replit",
    icon: "🔁",
    category: "Online IDE",
    priority: "Great for Beginners",
    color: "#FF6B6B",
    why: "Code in your browser with zero setup. Perfect for practising Python and sharing projects.",
    learn: "https://replit.com",
    tip: "Great for quick experiments or showing your work to others without needing them to install anything.",
  },
  {
    name: "Neon / Supabase",
    icon: "🗄️",
    category: "Database Tools",
    priority: "Learn Later",
    color: COLORS.green,
    why: "When you get to databases (SQL), these are modern, beginner-friendly platforms to practise on.",
    learn: "https://supabase.com",
    tip: "Supabase is basically a database with a clean UI — perfect for your first backend project.",
  },
];

const LESSON_CONTENT = {
  variables: {
    title: "Variables & Data Types",
    intro: "A variable is like a labelled box. You store a value inside, give the box a name, and use that name to access the value later.",
    steps: [
      {
        concept: "Creating a variable",
        explanation: "In Python, you create a variable just by writing its name, an equals sign, and the value. No special keyword needed.",
        code: `name = "Larren"\nage = 18\nprint(name)   # Output: Larren\nprint(age)    # Output: 18`,
        note: "The = sign doesn't mean 'equal' like in maths. It means 'store this value in this box'.",
      },
      {
        concept: "Data Types",
        explanation: "Every value has a type. The three most common types to start with are: text (called strings), whole numbers (integers), and decimals (floats).",
        code: `# String — text wrapped in quotes\nmy_name = "Larren"\n\n# Integer — a whole number\nmy_age = 18\n\n# Float — a decimal number\ngpa = 3.7\n\n# Boolean — True or False\nis_student = True`,
        note: "Python figures out the type automatically — you don't need to declare it like in Java or C++.",
      },
      {
        concept: "Using variables together",
        explanation: "You can use variables in calculations or combine them into sentences.",
        code: `first_name = "Larren"\nyear = 1\n\n# Combine strings with +\ngreeting = "Hello, " + first_name\nprint(greeting)  # Hello, Larren\n\n# Do maths with numbers\nnext_year = year + 1\nprint(next_year)  # 2`,
        note: "When combining text, this is called 'concatenation'. You'll use it all the time.",
      },
    ],
    quiz: [
      {
        q: "What does the = sign do in Python?",
        options: ["Checks if two values are equal", "Stores a value into a variable", "Prints a value to the screen", "Creates a new function"],
        answer: 1,
      },
      {
        q: 'What data type is the value "Hello, World!"?',
        options: ["Integer", "Float", "Boolean", "String"],
        answer: 3,
      },
      {
        q: "Which of these correctly creates a variable storing the number 25?",
        options: ['age = "25"', "age == 25", "age = 25", "int age = 25"],
        answer: 2,
      },
    ],
    challenge: {
      title: "🏗️ Build: Your Profile Card",
      description: "Using what you just learned about variables, create a mini profile card in Python. Store your name, age, country, and a fun fact as variables, then print them all out in a nice format.",
      starter: `# Your Profile Card\n# Fill in your details using variables!\n\nname = ""\nage = 0\ncountry = ""\nfun_fact = ""\n\n# Now print them out nicely\nprint("=== My Profile ===")\n# Add your print statements below...`,
      hint: "Use print() for each line. You can combine strings with + to make it look nice, like: print('Name: ' + name)",
    },
  },
  strings: {
    title: "Strings & Text",
    intro: "Strings are how Python handles text. Almost every program you build will use strings — for user names, messages, file content, and more.",
    steps: [
      {
        concept: "String basics",
        explanation: "A string is any text surrounded by quotes. You can use single or double quotes.",
        code: `message1 = "Hello World"\nmessage2 = 'Hello World'\n\n# Both work exactly the same\nprint(message1)  # Hello World\nprint(message2)  # Hello World`,
        note: "Pick one style and be consistent. Most Python developers prefer double quotes.",
      },
      {
        concept: "String methods",
        explanation: "Python strings come with built-in tools called methods. You call them with a dot after the variable.",
        code: `name = "larren"\n\nprint(name.upper())      # LARREN\nprint(name.capitalize())  # Larren\nprint(name.len())        # Error! Use len(name)\nprint(len(name))         # 6 — number of characters`,
        note: "len() is a function, not a method — so it goes around the string, not after it.",
      },
      {
        concept: "f-strings (the modern way)",
        explanation: "f-strings let you insert variables directly inside a string, which is much cleaner than using +.",
        code: `name = "Larren"\nyear = 1\n\n# Old way (messy)\nprint("Hello " + name + ", you are in year " + str(year))\n\n# f-string (clean!)\nprint(f"Hello {name}, you are in year {year}")`,
        note: "Put an f before the opening quote, then wrap any variable in curly braces {}. This is how professional Python devs write strings.",
      },
    ],
    quiz: [
      {
        q: "What does .upper() do to a string?",
        options: ["Makes it longer", "Converts it to uppercase", "Removes spaces", "Reverses the string"],
        answer: 1,
      },
      {
        q: 'What does len("hello") return?',
        options: ["hello", "1", "5", "6"],
        answer: 2,
      },
      {
        q: 'Which is the correct f-string syntax for a variable called city?',
        options: ['"My city is {city}"', 'f"My city is {city}"', 'f"My city is (city)"', '"My city is " + {city}'],
        answer: 1,
      },
    ],
    challenge: {
      title: "🏗️ Build: Mad Libs Generator",
      description: "Create a simple Mad Libs story. Ask for a noun, verb, and adjective using variables, then use an f-string to build a funny sentence with them.",
      starter: `# Mad Libs Generator\n\nnoun = "robot"\nverb = "danced"\nadjective = "purple"\n\n# Use an f-string to make a funny sentence\nstory = f""\n\nprint(story)`,
      hint: 'Try something like: f"The {adjective} {noun} {verb} at the university."',
    },
  },
};

const LOADING_MESSAGES = [
  "Thinking like a senior dev...",
  "Compiling your lesson...",
  "Debugging the knowledge base...",
  "Running the AI engine...",
];

// ── Small Components ──────────────────────────────────────────────

function ProgressBar({ value, max, color = COLORS.accent, height = 6 }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ background: COLORS.border, borderRadius: 99, height, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 99, transition: "width 0.6s ease" }} />
    </div>
  );
}

function Badge({ label, color }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", padding: "3px 8px", borderRadius: 99, background: color + "22", color, border: `1px solid ${color}44`, textTransform: "uppercase" }}>
      {label}
    </span>
  );
}

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ position: "relative", background: "#0A0C10", border: `1px solid ${COLORS.border}`, borderRadius: 10, overflow: "hidden", margin: "10px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 14px", borderBottom: `1px solid ${COLORS.border}` }}>
        <span style={{ color: COLORS.textMuted, fontSize: 11, fontFamily: "monospace" }}>python</span>
        <button onClick={copy} style={{ background: "none", border: "none", color: copied ? COLORS.green : COLORS.textMuted, fontSize: 11, cursor: "pointer" }}>
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <pre style={{ margin: 0, padding: "14px 16px", fontFamily: "'Fira Code', 'Courier New', monospace", fontSize: 13, lineHeight: 1.7, color: COLORS.textPrimary, overflowX: "auto", whiteSpace: "pre" }}>
        {code.split("\n").map((line, i) => {
          const styled = line
            .replace(/(#.*)$/, '<span style="color:#6A9955">$1</span>')
            .replace(/\b(print|len|str|int|float|input)\b/g, '<span style="color:#DCDCAA">$1</span>')
            .replace(/\b(True|False|None)\b/g, '<span style="color:#569CD6">$1</span>')
            .replace(/"([^"]*)"/g, '<span style="color:#CE9178">"$1"</span>')
            .replace(/'([^']*)'/g, "<span style=\"color:#CE9178\">'$1'</span>");
          return <span key={i} dangerouslySetInnerHTML={{ __html: styled + "\n" }} />;
        })}
      </pre>
    </div>
  );
}

function XPToast({ xp, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{ position: "fixed", top: 24, right: 24, background: COLORS.green, color: "#fff", padding: "12px 20px", borderRadius: 12, fontWeight: 700, fontSize: 16, zIndex: 9999, boxShadow: "0 8px 32px #3DD68C44", animation: "slideIn 0.3s ease" }}>
      +{xp} XP earned! 🎉
    </div>
  );
}

// ── Views ─────────────────────────────────────────────────────────

function Dashboard({ profile, onStartLesson, onGoTools, onGoProgress }) {
  const totalXP = profile.xp;
  const level = Math.floor(totalXP / 200) + 1;
  const xpToNext = (level * 200) - totalXP;
  const completedTopics = profile.completed.length;

  return (
    <div style={{ padding: "0 0 40px" }}>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${COLORS.surface}, #1a1f2e)`, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: "28px 28px 24px", marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ color: COLORS.textMuted, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Welcome back</div>
            <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: COLORS.textPrimary }}>Ready to code today? 🚀</h2>
            <p style={{ margin: "8px 0 0", color: COLORS.textSecondary, fontSize: 14 }}>
              {completedTopics === 0 ? "Start your first lesson — Python awaits." : `You've completed ${completedTopics} topic${completedTopics > 1 ? "s" : ""}. Keep the momentum going.`}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: COLORS.accent }}>{totalXP}</div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Total XP</div>
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: COLORS.textSecondary }}>Level {level} → Level {level + 1}</span>
            <span style={{ fontSize: 12, color: COLORS.textMuted }}>{xpToNext} XP to go</span>
          </div>
          <ProgressBar value={totalXP % 200} max={200} color={COLORS.accent} height={8} />
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Topics Done", value: completedTopics, icon: "✅", color: COLORS.green },
          { label: "Tests Passed", value: profile.testsPassed, icon: "🧪", color: COLORS.purple },
          { label: "Challenges", value: profile.challengesDone, icon: "🏗️", color: COLORS.yellow },
        ].map((s) => (
          <div key={s.label} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "16px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 22 }}>{s.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color, lineHeight: 1.2 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Curriculum */}
      <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em" }}>Your Learning Path</h3>
      {CURRICULUM.map((module) => (
        <div key={module.id} style={{ background: COLORS.card, border: `1px solid ${module.locked ? COLORS.border : COLORS.accent + "44"}`, borderRadius: 14, padding: "18px 20px", marginBottom: 12, opacity: module.locked ? 0.5 : 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>{module.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: COLORS.textPrimary, fontSize: 15 }}>{module.title}</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted }}>{module.topics.length} topics</div>
              </div>
            </div>
            {module.locked ? <Badge label="Locked" color={COLORS.textMuted} /> : <Badge label="Active" color={COLORS.green} />}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {module.topics.map((topic) => {
              const done = profile.completed.includes(topic.id);
              return (
                <button
                  key={topic.id}
                  onClick={() => !module.locked && onStartLesson(topic.id)}
                  disabled={module.locked}
                  style={{ padding: "7px 13px", borderRadius: 8, border: `1px solid ${done ? COLORS.green : COLORS.border}`, background: done ? COLORS.green + "18" : COLORS.surface, color: done ? COLORS.green : COLORS.textSecondary, fontSize: 12, fontWeight: 600, cursor: module.locked ? "not-allowed" : "pointer", transition: "all 0.2s" }}
                >
                  {done ? "✓ " : ""}{topic.title}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Quick-access buttons */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 8 }}>
        <button onClick={onGoTools} style={{ padding: "14px", background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, color: COLORS.textPrimary, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
          🧰 Dev Tools Guide
        </button>
        <button onClick={onGoProgress} style={{ padding: "14px", background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, color: COLORS.textPrimary, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
          📊 My Progress
        </button>
      </div>
    </div>
  );
}

function LessonView({ topicId, profile, onComplete, onBack }) {
  const [step, setStep] = useState(0); // 0,1,2 = content steps; "quiz" = quiz; "challenge" = challenge; "done" = done
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [aiExplanation, setAiExplanation] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [challengeCode, setChallengeCode] = useState("");
  const [challengeFeedback, setChallengeFeedback] = useState("");
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  const lesson = LESSON_CONTENT[topicId];

  const askAI = async (question) => {
    setAiLoading(true);
    setAiExplanation("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are CodePath, a friendly coding tutor for absolute beginners about to start a Software Engineering degree. Explain concepts simply, with short sentences, real-world analogies, and encouragement. Never use jargon without explaining it. Keep responses under 150 words.",
          messages: [{ role: "user", content: question }],
        }),
      });
      const data = await res.json();
      setAiExplanation(data.content?.[0]?.text || "Sorry, couldn't load explanation.");
    } catch {
      setAiExplanation("Couldn't reach the AI tutor right now. Try again!");
    }
    setAiLoading(false);
  };

  const submitChallenge = async () => {
    if (!challengeCode.trim()) return;
    setFeedbackLoading(true);
    setChallengeFeedback("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are CodePath, a coding tutor reviewing a beginner's Python challenge submission. Give warm, specific feedback: what they did well, what could improve, and one small next-step tip. Keep it under 120 words. Never be harsh.",
          messages: [{
            role: "user",
            content: `Challenge: "${lesson.challenge.description}"\n\nStudent's code:\n\`\`\`python\n${challengeCode}\n\`\`\`\n\nPlease review this.`
          }],
        }),
      });
      const data = await res.json();
      setChallengeFeedback(data.content?.[0]?.text || "");
    } catch {
      setChallengeFeedback("Couldn't reach the AI tutor. But great effort!");
    }
    setFeedbackLoading(false);
  };

  if (!lesson) {
    return (
      <div style={{ padding: 32, textAlign: "center" }}>
        <div style={{ fontSize: 40 }}>🚧</div>
        <p style={{ color: COLORS.textSecondary }}>This lesson is being built. Check back soon!</p>
        <button onClick={onBack} style={{ ...btnStyle }}>← Back</button>
      </div>
    );
  }

  const currentStep = lesson.steps[step];
  const quizScore = lesson.quiz.reduce((acc, q, i) => acc + (quizAnswers[i] === q.answer ? 1 : 0), 0);

  if (step === "done") {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
        <h2 style={{ color: COLORS.textPrimary, fontSize: 24, margin: "0 0 10px" }}>Topic Complete!</h2>
        <p style={{ color: COLORS.textSecondary, marginBottom: 24 }}>You finished <strong style={{ color: COLORS.accent }}>{lesson.title}</strong>.</p>
        <div style={{ display: "inline-block", background: COLORS.green + "22", border: `1px solid ${COLORS.green}`, borderRadius: 12, padding: "16px 28px", marginBottom: 28 }}>
          <div style={{ fontSize: 32, fontWeight: 900, color: COLORS.green }}>+{lesson.quiz.length * 15 + 20} XP</div>
          <div style={{ color: COLORS.textMuted, fontSize: 12 }}>added to your profile</div>
        </div>
        <br />
        <button onClick={() => onComplete(topicId, lesson.quiz.length * 15 + 20)} style={{ ...btnStyle, background: COLORS.accent }}>
          Back to Dashboard →
        </button>
      </div>
    );
  }

  if (step === "challenge") {
    return (
      <div>
        <button onClick={() => setStep("quiz")} style={{ ...ghostBtn, marginBottom: 20 }}>← Back to Quiz</button>
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.yellow}44`, borderRadius: 14, padding: 22, marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: COLORS.yellow, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Build Challenge</div>
          <h3 style={{ color: COLORS.textPrimary, margin: "0 0 10px", fontSize: 18 }}>{lesson.challenge.title}</h3>
          <p style={{ color: COLORS.textSecondary, margin: "0 0 14px", lineHeight: 1.6 }}>{lesson.challenge.description}</p>
          <div style={{ background: COLORS.accentGlow, border: `1px solid ${COLORS.accent}33`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: COLORS.accent }}>
            💡 Hint: {lesson.challenge.hint}
          </div>
        </div>
        <div style={{ marginBottom: 8, fontSize: 13, color: COLORS.textSecondary }}>Write your Python code below:</div>
        <div style={{ position: "relative" }}>
          <div style={{ background: "#0A0C10", border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "8px 12px 4px", marginBottom: 4, fontSize: 11, color: COLORS.textMuted, fontFamily: "monospace" }}>python</div>
          <textarea
            value={challengeCode}
            onChange={(e) => setChallengeCode(e.target.value)}
            placeholder={lesson.challenge.starter}
            style={{ width: "100%", minHeight: 180, background: "#0A0C10", border: `1px solid ${COLORS.border}`, borderRadius: "0 0 10px 10px", color: COLORS.textPrimary, fontFamily: "'Fira Code', monospace", fontSize: 13, padding: "12px 14px", resize: "vertical", outline: "none", boxSizing: "border-box", lineHeight: 1.7 }}
          />
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <button onClick={submitChallenge} disabled={feedbackLoading} style={{ ...btnStyle, background: COLORS.yellow, color: "#111", flex: 1 }}>
            {feedbackLoading ? "Reviewing..." : "Submit for AI Review ✨"}
          </button>
        </div>
        {challengeFeedback && (
          <div style={{ background: COLORS.card, border: `1px solid ${COLORS.green}44`, borderRadius: 12, padding: 18, marginTop: 16 }}>
            <div style={{ fontSize: 12, color: COLORS.green, fontWeight: 700, marginBottom: 8 }}>AI Tutor Feedback</div>
            <p style={{ color: COLORS.textSecondary, margin: 0, lineHeight: 1.7, fontSize: 14 }}>{challengeFeedback}</p>
            <button onClick={() => setStep("done")} style={{ ...btnStyle, marginTop: 16, background: COLORS.green, width: "100%" }}>
              Complete Lesson 🎉
            </button>
          </div>
        )}
        {!challengeFeedback && (
          <button onClick={() => setStep("done")} style={{ ...ghostBtn, marginTop: 12, width: "100%", textAlign: "center" }}>
            Skip & Complete →
          </button>
        )}
      </div>
    );
  }

  if (step === "quiz") {
    return (
      <div>
        <button onClick={() => setStep(lesson.steps.length - 1)} style={{ ...ghostBtn, marginBottom: 20 }}>← Back to Lesson</button>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: COLORS.purple, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Quick Quiz</div>
          <h3 style={{ color: COLORS.textPrimary, margin: "6px 0 4px", fontSize: 20 }}>Test Your Knowledge</h3>
          <p style={{ color: COLORS.textMuted, margin: 0, fontSize: 13 }}>{lesson.quiz.length} questions on {lesson.title}</p>
        </div>
        {lesson.quiz.map((q, qi) => (
          <div key={qi} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 18, marginBottom: 14 }}>
            <div style={{ fontWeight: 700, color: COLORS.textPrimary, marginBottom: 12, fontSize: 14 }}>
              {qi + 1}. {q.q}
            </div>
            {q.options.map((opt, oi) => {
              let bg = COLORS.surface;
              let border = COLORS.border;
              let color = COLORS.textSecondary;
              if (quizSubmitted) {
                if (oi === q.answer) { bg = COLORS.green + "22"; border = COLORS.green; color = COLORS.green; }
                else if (quizAnswers[qi] === oi) { bg = COLORS.red + "22"; border = COLORS.red; color = COLORS.red; }
              } else if (quizAnswers[qi] === oi) {
                bg = COLORS.accent + "22"; border = COLORS.accent; color = COLORS.accent;
              }
              return (
                <button
                  key={oi}
                  onClick={() => !quizSubmitted && setQuizAnswers((a) => ({ ...a, [qi]: oi }))}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 14px", marginBottom: 8, borderRadius: 8, border: `1px solid ${border}`, background: bg, color, fontSize: 13, cursor: quizSubmitted ? "default" : "pointer", fontWeight: quizAnswers[qi] === oi ? 700 : 400 }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        ))}
        {!quizSubmitted ? (
          <button
            onClick={() => setQuizSubmitted(true)}
            disabled={Object.keys(quizAnswers).length < lesson.quiz.length}
            style={{ ...btnStyle, background: COLORS.purple, width: "100%", opacity: Object.keys(quizAnswers).length < lesson.quiz.length ? 0.5 : 1 }}
          >
            Submit Quiz
          </button>
        ) : (
          <div style={{ background: COLORS.card, border: `1px solid ${quizScore === lesson.quiz.length ? COLORS.green : COLORS.yellow}44`, borderRadius: 12, padding: 18, textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{quizScore === lesson.quiz.length ? "🎯" : "📚"}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: quizScore === lesson.quiz.length ? COLORS.green : COLORS.yellow }}>
              {quizScore}/{lesson.quiz.length} Correct
            </div>
            <p style={{ color: COLORS.textSecondary, fontSize: 13, margin: "8px 0 16px" }}>
              {quizScore === lesson.quiz.length ? "Perfect! You're ready for the challenge." : "Good effort! Review the lesson if anything was unclear."}
            </p>
            <button onClick={() => setStep("challenge")} style={{ ...btnStyle, background: COLORS.yellow, color: "#111" }}>
              Next: Build Challenge 🏗️
            </button>
          </div>
        )}
      </div>
    );
  }

  // Content step
  return (
    <div>
      <button onClick={onBack} style={{ ...ghostBtn, marginBottom: 20 }}>← Dashboard</button>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: COLORS.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Python · Step {step + 1} of {lesson.steps.length}
        </div>
        <h2 style={{ color: COLORS.textPrimary, margin: "6px 0 0", fontSize: 22 }}>{lesson.title}</h2>
      </div>
      {step === 0 && (
        <div style={{ background: COLORS.accentGlow, border: `1px solid ${COLORS.accent}33`, borderRadius: 12, padding: "14px 16px", marginBottom: 20, color: COLORS.textSecondary, fontSize: 14, lineHeight: 1.6 }}>
          {lesson.intro}
        </div>
      )}
      <ProgressBar value={step + 1} max={lesson.steps.length + 2} color={COLORS.accent} height={4} />
      <div style={{ margin: "20px 0 14px", fontSize: 11, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Concept</div>
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 20, marginBottom: 16 }}>
        <h3 style={{ color: COLORS.accent, margin: "0 0 10px", fontSize: 17 }}>{currentStep.concept}</h3>
        <p style={{ color: COLORS.textSecondary, margin: "0 0 14px", lineHeight: 1.7, fontSize: 14 }}>{currentStep.explanation}</p>
        <CodeBlock code={currentStep.code} />
        {currentStep.note && (
          <div style={{ marginTop: 12, background: COLORS.purple + "18", border: `1px solid ${COLORS.purple}33`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: COLORS.purple }}>
            📌 {currentStep.note}
          </div>
        )}
      </div>

      {/* Ask AI */}
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => askAI(`Explain "${currentStep.concept}" in Python to a complete beginner who has never coded before. Use a real-life analogy.`)}
          style={{ ...ghostBtn, fontSize: 13 }}
        >
          {aiLoading ? "🤖 Thinking..." : "🤖 Ask AI Tutor to explain this differently"}
        </button>
        {aiExplanation && (
          <div style={{ background: COLORS.card, border: `1px solid ${COLORS.purple}33`, borderRadius: 10, padding: 16, marginTop: 10, color: COLORS.textSecondary, fontSize: 13, lineHeight: 1.7 }}>
            <strong style={{ color: COLORS.purple }}>AI Tutor:</strong> {aiExplanation}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} style={{ ...ghostBtn }}>← Previous</button>
        )}
        <button
          onClick={() => step < lesson.steps.length - 1 ? setStep(step + 1) : setStep("quiz")}
          style={{ ...btnStyle, flex: 1, background: step < lesson.steps.length - 1 ? COLORS.accent : COLORS.purple }}
        >
          {step < lesson.steps.length - 1 ? "Next Concept →" : "Take Quiz 🧪"}
        </button>
      </div>
    </div>
  );
}

function ToolsView({ onBack }) {
  const [selected, setSelected] = useState(null);
  const [aiTip, setAiTip] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const getStartGuide = async (tool) => {
    setAiTip("");
    setAiLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are a friendly coding mentor. Give a beginner a 3-step 'how to get started' guide for a developer tool. Each step should be one short, concrete action. Keep it under 100 words total. Use simple language.",
          messages: [{ role: "user", content: `Give me a 3-step getting-started guide for ${tool.name} as a complete beginner to software engineering.` }],
        }),
      });
      const data = await res.json();
      setAiTip(data.content?.[0]?.text || "");
    } catch {
      setAiTip("Couldn't load guide. Visit the website to get started!");
    }
    setAiLoading(false);
  };

  return (
    <div>
      <button onClick={onBack} style={{ ...ghostBtn, marginBottom: 20 }}>← Dashboard</button>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ color: COLORS.textPrimary, margin: "0 0 6px", fontSize: 22 }}>🧰 Developer Tools Guide</h2>
        <p style={{ color: COLORS.textSecondary, margin: 0, fontSize: 14 }}>The tools every software engineering student needs to know about — before and during university.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {TOOLS_DATA.map((tool) => (
          <div key={tool.name}>
            <button
              onClick={() => { setSelected(selected?.name === tool.name ? null : tool); setAiTip(""); setAiLoading(false); }}
              style={{ width: "100%", background: COLORS.card, border: `1px solid ${selected?.name === tool.name ? tool.color : COLORS.border}`, borderRadius: 12, padding: "14px 16px", textAlign: "left", cursor: "pointer", transition: "all 0.2s" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 22 }}>{tool.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: COLORS.textPrimary, fontSize: 15 }}>{tool.name}</div>
                    <div style={{ fontSize: 12, color: COLORS.textMuted }}>{tool.category}</div>
                  </div>
                </div>
                <Badge label={tool.priority} color={tool.color} />
              </div>
            </button>
            {selected?.name === tool.name && (
              <div style={{ background: COLORS.surface, border: `1px solid ${tool.color}33`, borderTop: "none", borderRadius: "0 0 12px 12px", padding: 18 }}>
                <p style={{ color: COLORS.textSecondary, fontSize: 14, lineHeight: 1.7, margin: "0 0 10px" }}>{tool.why}</p>
                <div style={{ background: COLORS.card, borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: tool.color }}>
                  💡 {tool.tip}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => getStartGuide(tool)} style={{ ...btnStyle, background: tool.color, flex: 1, fontSize: 13 }}>
                    {aiLoading ? "Loading..." : "Get AI Start Guide ✨"}
                  </button>
                  <a href={tool.learn} target="_blank" rel="noreferrer" style={{ ...ghostBtn, textDecoration: "none", fontSize: 13 }}>Visit →</a>
                </div>
                {aiTip && (
                  <div style={{ background: COLORS.card, border: `1px solid ${tool.color}33`, borderRadius: 10, padding: 14, marginTop: 12, color: COLORS.textSecondary, fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-line" }}>
                    <strong style={{ color: tool.color }}>Getting Started:</strong>{"\n"}{aiTip}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressView({ profile, onBack }) {
  const totalPossible = CURRICULUM.reduce((a, m) => a + m.topics.length, 0);
  const completedPct = Math.round((profile.completed.length / totalPossible) * 100);

  return (
    <div>
      <button onClick={onBack} style={{ ...ghostBtn, marginBottom: 20 }}>← Dashboard</button>
      <h2 style={{ color: COLORS.textPrimary, margin: "0 0 6px", fontSize: 22 }}>📊 My Progress</h2>
      <p style={{ color: COLORS.textSecondary, margin: "0 0 24px", fontSize: 14 }}>Track your journey from beginner to university-ready developer.</p>

      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 20, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontWeight: 700, color: COLORS.textPrimary }}>Overall Completion</span>
          <span style={{ color: COLORS.accent, fontWeight: 700 }}>{completedPct}%</span>
        </div>
        <ProgressBar value={profile.completed.length} max={totalPossible} color={COLORS.accent} height={10} />
        <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 8 }}>
          {profile.completed.length} of {totalPossible} topics completed
        </div>
      </div>

      {CURRICULUM.map((module) => {
        const done = module.topics.filter((t) => profile.completed.includes(t.id)).length;
        return (
          <div key={module.id} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 18, marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ fontWeight: 700, color: module.locked ? COLORS.textMuted : COLORS.textPrimary }}>
                {module.icon} {module.title}
              </div>
              <span style={{ fontSize: 13, color: COLORS.textSecondary }}>{done}/{module.topics.length}</span>
            </div>
            <ProgressBar value={done} max={module.topics.length} color={module.locked ? COLORS.textMuted : COLORS.green} height={6} />
          </div>
        );
      })}

      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 20, marginTop: 8 }}>
        <h3 style={{ color: COLORS.textPrimary, margin: "0 0 14px", fontSize: 16 }}>🏆 Milestones</h3>
        {[
          { label: "First topic completed", done: profile.completed.length >= 1, icon: "🎯" },
          { label: "First quiz passed", done: profile.testsPassed >= 1, icon: "🧪" },
          { label: "First build challenge done", done: profile.challengesDone >= 1, icon: "🏗️" },
          { label: "5 topics completed", done: profile.completed.length >= 5, icon: "🚀" },
          { label: "Reached 500 XP", done: profile.xp >= 500, icon: "⭐" },
        ].map((m) => (
          <div key={m.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
            <span style={{ fontSize: 18 }}>{m.icon}</span>
            <span style={{ flex: 1, color: m.done ? COLORS.textPrimary : COLORS.textMuted, fontSize: 14 }}>{m.label}</span>
            {m.done && <span style={{ color: COLORS.green, fontSize: 18 }}>✓</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Button styles ─────────────────────────────────────────────────

const btnStyle = {
  padding: "12px 20px",
  borderRadius: 10,
  border: "none",
  background: COLORS.accent,
  color: "#fff",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
  transition: "opacity 0.2s",
};

const ghostBtn = {
  padding: "10px 16px",
  borderRadius: 10,
  border: `1px solid ${COLORS.border}`,
  background: "none",
  color: COLORS.textSecondary,
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
};

// ── App ───────────────────────────────────────────────────────────

export default function CodePath() {
  const [view, setView] = useState("dashboard"); // dashboard | lesson | tools | progress
  const [currentTopic, setCurrentTopic] = useState(null);
  const [profile, setProfile] = useState({ xp: 0, completed: [], testsPassed: 0, challengesDone: 0 });
  const [toast, setToast] = useState(null);

  const handleComplete = (topicId, xpGained) => {
    setProfile((p) => ({
      xp: p.xp + xpGained,
      completed: p.completed.includes(topicId) ? p.completed : [...p.completed, topicId],
      testsPassed: p.testsPassed + 1,
      challengesDone: p.challengesDone + 1,
    }));
    setToast(xpGained);
    setView("dashboard");
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'Inter', 'Segoe UI', sans-serif", color: COLORS.textPrimary }}>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes slideIn { from { transform: translateY(-16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        button:hover { opacity: 0.88; }
        textarea:focus { border-color: ${COLORS.accent} !important; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 99px; }
      `}</style>

      {toast && <XPToast xp={toast} onDone={() => setToast(null)} />}

      {/* Header */}
      <div style={{ background: COLORS.surface, borderBottom: `1px solid ${COLORS.border}`, padding: "0 20px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚡</div>
            <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em" }}>CodePath</span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["dashboard", "tools", "progress"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{ padding: "6px 12px", borderRadius: 8, border: "none", background: view === v ? COLORS.accent + "22" : "none", color: view === v ? COLORS.accent : COLORS.textMuted, fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}
              >
                {v === "dashboard" ? "🏠" : v === "tools" ? "🧰" : "📊"} {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px" }}>
        {view === "dashboard" && (
          <Dashboard
            profile={profile}
            onStartLesson={(id) => { setCurrentTopic(id); setView("lesson"); }}
            onGoTools={() => setView("tools")}
            onGoProgress={() => setView("progress")}
          />
        )}
        {view === "lesson" && currentTopic && (
          <LessonView
            topicId={currentTopic}
            profile={profile}
            onComplete={handleComplete}
            onBack={() => setView("dashboard")}
          />
        )}
        {view === "tools" && <ToolsView onBack={() => setView("dashboard")} />}
        {view === "progress" && <ProgressView profile={profile} onBack={() => setView("dashboard")} />}
      </div>
    </div>
  );
}
