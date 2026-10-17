import { useState } from "react";
import "./App.css";

const exams = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    category: "Programming",
    questions: 5,
    duration: 5,
    difficulty: "Easy",
    color: "purple",
  },
  {
    id: 2,
    title: "Database Management",
    category: "Computer Science",
    questions: 5,
    duration: 5,
    difficulty: "Medium",
    color: "blue",
  },
  {
    id: 3,
    title: "Data Structures & Algorithms",
    category: "Programming",
    questions: 5,
    duration: 5,
    difficulty: "Hard",
    color: "orange",
  },
];

const questionsByExam = {
  1: [
    {
      question: "What does `typeof []` return in JavaScript?",
      options: ["array", "object", "undefined", "list"],
      answer: 1,
    },
    {
      question: "Which keyword declares a block-scoped variable that can be reassigned?",
      options: ["const", "let", "static", "define"],
      answer: 1,
    },
    {
      question: "Which operator checks equality without type conversion?",
      options: ["==", "=", "===", "!="],
      answer: 2,
    },
    {
      question: "Which array method adds an item to the end of an array?",
      options: ["push()", "pop()", "shift()", "slice()"],
      answer: 0,
    },
    {
      question: "What value does a function return when it has no return statement?",
      options: ["null", "false", "0", "undefined"],
      answer: 3,
    },
  ],
  2: [
    {
      question: "Which SQL statement retrieves data from a table?",
      options: ["GET", "SELECT", "FETCH TABLE", "READ"],
      answer: 1,
    },
    {
      question: "What is a primary key used for?",
      options: [
        "To uniquely identify each row",
        "To sort rows alphabetically",
        "To encrypt a table",
        "To duplicate a row",
      ],
      answer: 0,
    },
    {
      question: "What is the main goal of database normalization?",
      options: [
        "Increase duplicate data",
        "Reduce data redundancy",
        "Remove all relationships",
        "Make queries unnecessary",
      ],
      answer: 1,
    },
    {
      question: "Which SQL clause combines matching rows from related tables?",
      options: ["MERGE", "GROUP", "JOIN", "UNION ALL"],
      answer: 2,
    },
    {
      question: "Which command removes rows from a table?",
      options: ["DROP", "DELETE", "CLEAR", "REMOVE"],
      answer: 1,
    },
  ],
  3: [
    {
      question: "Which data structure follows the LIFO principle?",
      options: ["Queue", "Stack", "Graph", "Tree"],
      answer: 1,
    },
    {
      question: "What is the time complexity of binary search on a sorted array?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      answer: 2,
    },
    {
      question: "Which data structure follows the FIFO principle?",
      options: ["Stack", "Heap", "Queue", "Hash table"],
      answer: 2,
    },
    {
      question: "What is the average-case lookup time for a hash table?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      answer: 0,
    },
    {
      question: "Which data structure is commonly used for breadth-first search?",
      options: ["Stack", "Queue", "Binary search tree", "Hash set"],
      answer: 1,
    },
  ],
};

function App() {
  const [studentName, setStudentName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [examAnswers, setExamAnswers] = useState({});
  const [examError, setExamError] = useState("");
  const [examResults, setExamResults] = useState([]);

  function handleLogin(event) {
    event.preventDefault();

    if (!nameInput.trim()) {
      alert("Please enter your name.");
      return;
    }

    setStudentName(nameInput.trim());
    setShowLogin(false);
    setCurrentPage("dashboard");
  }

  function handleLogout() {
    setStudentName("");
    setNameInput("");
    setSelectedExam(null);
    setExamAnswers({});
    setExamError("");
    setCurrentPage("home");
  }

  function startExam(exam) {
    setSelectedExam(exam);
    setExamAnswers({});
    setExamError("");
    setCurrentPage("exam");
  }

  function beginExam() {
    setExamAnswers({});
    setExamError("");
    setCurrentPage("takingExam");
  }

  function submitExam(event) {
    event.preventDefault();
    const questions = questionsByExam[selectedExam.id];

    if (Object.keys(examAnswers).length !== questions.length) {
      setExamError("Please answer every question before submitting.");
      return;
    }

    const score = questions.reduce(
      (total, question, index) =>
        total + (examAnswers[index] === question.answer ? 1 : 0),
      0,
    );

    setExamResults((previousResults) => [
      {
        id: `${Date.now()}-${selectedExam.id}`,
        examTitle: selectedExam.title,
        questions,
        answers: examAnswers,
        score,
        completedAt: new Date().toISOString(),
      },
      ...previousResults,
    ]);
    setExamError("");
    setCurrentPage("results");
  }

  return (
    <div className="app">
      <header className="navbar">
        <button
          className="brand"
          onClick={() => setCurrentPage(studentName ? "dashboard" : "home")}
        >
          <span className="brand-icon">E</span>
          examly
        </button>

        <nav className="nav-links">
          <button
            onClick={() => setCurrentPage(studentName ? "dashboard" : "home")}
          >
            Home
          </button>

          <button
            onClick={() => {
              if (!studentName) {
                setShowLogin(true);
              } else {
                setCurrentPage("dashboard");
              }
            }}
          >
            Exams
          </button>

          <button onClick={() => setCurrentPage("results")}>Results</button>

          {studentName ? (
            <button className="login-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button
              className="login-button"
              onClick={() => setShowLogin(true)}
            >
              Student Login
            </button>
          )}
        </nav>
      </header>

      {currentPage === "home" && (
        <main className="hero">
          <div className="hero-content">
            <div className="eyebrow">
              ✦ YOUR JOURNEY TO SUCCESS STARTS HERE
            </div>

            <h1>
              Test Your Knowledge.
              <br />
              <span>Unlock Your Potential.</span>
            </h1>

            <p>
              Prepare smarter, practice better, and track your progress with
              Eexamly — your personal online examination platform.
            </p>

            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={() => setShowLogin(true)}
              >
                Get Started <span>→</span>
              </button>

              <button
                className="secondary-button"
                onClick={() => setCurrentPage("exams")}
              >
                Explore Exams
              </button>
            </div>

            <div className="hero-stats">
              <div>
                <strong>{exams.length}+</strong>
                <span>Practice Exams</span>
              </div>

              <div>
                <strong>MCQ</strong>
                <span>Question Format</span>
              </div>

              <div>
                <strong>24/7</strong>
                <span>Learn Anytime</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-glow"></div>

            <div className="exam-preview">
              <div className="preview-top">
                <span className="preview-icon">✎</span>
                <span className="status-badge">● Ready to practice</span>
              </div>

              <h3>Your Next Challenge</h3>
              <p>Choose an exam and start improving your skills.</p>

              <div className="preview-progress">
                <div className="progress-heading">
                  <span>Learning journey</span>
                  <strong>Let's begin!</strong>
                </div>
                <div className="progress-track">
                  <div className="progress-fill"></div>
                </div>
              </div>

              <div className="preview-footer">
                <span>🎯 Set your goal</span>
                <span>📚 Start learning</span>
              </div>
            </div>

            <div className="floating-card floating-one">
              <span>✓</span>
              <div>
                <strong>Learn by doing</strong>
                <small>Practice makes progress</small>
              </div>
            </div>

            <div className="floating-card floating-two">
              <span>⚡</span>
              <div>
                <strong>Challenge yourself</strong>
                <small>One question at a time</small>
              </div>
            </div>
          </div>
        </main>
      )}

      {currentPage === "exams" && (
        <main className="dashboard">
          <div className="section-heading">
            <span className="eyebrow">YOUR LEARNING STARTS HERE</span>
            <h1>Explore Exams</h1>
            <p>Choose a subject and challenge your knowledge.</p>
          </div>

          <div className="exam-grid">
            {exams.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                onStart={() => startExam(exam)}
              />
            ))}
          </div>

          <button
            className="secondary-button back-button"
            onClick={() => setCurrentPage(studentName ? "dashboard" : "home")}
          >
            ← Back
          </button>
        </main>
      )}

      {currentPage === "dashboard" && (
        <main className="dashboard">
          <div className="welcome-panel">
            <div>
              <span className="eyebrow">STUDENT DASHBOARD</span>
              <h1>Welcome back, {studentName}! 👋</h1>
              <p>Ready to challenge yourself and learn something new?</p>
            </div>

            <div className="welcome-icon">🎓</div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <span>Available Exams</span>
              <strong>{exams.length}</strong>
              <small>Ready for practice</small>
            </div>

            <div className="stat-card">
              <span>Question Format</span>
              <strong>MCQ</strong>
              <small>Multiple choice</small>
            </div>

            <div className="stat-card">
              <span>Your Status</span>
              <strong>Active</strong>
              <small>Keep learning!</small>
            </div>
          </div>

          <div className="section-heading dashboard-heading">
            <h2>Available Examinations</h2>
            <p>Select an exam to view its details and begin.</p>
          </div>

          <div className="exam-grid">
            {exams.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                onStart={() => startExam(exam)}
              />
            ))}
          </div>
        </main>
      )}

      {currentPage === "exam" && selectedExam && (
        <ExamPage
          exam={selectedExam}
          onBack={() => setCurrentPage(studentName ? "dashboard" : "exams")}
          onStart={beginExam}
        />
      )}

      {currentPage === "takingExam" && selectedExam && (
        <ExamTakingPage
          exam={selectedExam}
          questions={questionsByExam[selectedExam.id]}
          answers={examAnswers}
          error={examError}
          onAnswer={(questionIndex, answerIndex) => {
            setExamAnswers((currentAnswers) => ({
              ...currentAnswers,
              [questionIndex]: answerIndex,
            }));
            setExamError("");
          }}
          onBack={() => setCurrentPage("exam")}
          onSubmit={submitExam}
        />
      )}

      {currentPage === "results" && (
        <ResultsPage
          results={examResults}
          onRetake={(examTitle) => {
            const exam = exams.find((item) => item.title === examTitle);
            if (exam) startExam(exam);
          }}
          onBrowseExams={() =>
            setCurrentPage(studentName ? "dashboard" : "exams")
          }
        />
      )}

      {showLogin && (
        <div
          className="modal-overlay"
          onClick={() => setShowLogin(false)}
        >
          <div
            className="login-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowLogin(false)}
              aria-label="Close login"
            >
              ×
            </button>

            <div className="modal-logo">E</div>
            <h2>Welcome to Eexamly</h2>
            <p>Enter your name to explore the student dashboard.</p>

            <form onSubmit={handleLogin}>
              <label htmlFor="student-name">Student Name</label>
              <input
                id="student-name"
                type="text"
                placeholder="Enter your full name"
                value={nameInput}
                onChange={(event) => setNameInput(event.target.value)}
                required
              />

              <button className="primary-button form-button" type="submit">
                Continue →
              </button>
            </form>

            <small className="demo-note">
              Demo login only — this does not create a secure account.
            </small>
          </div>
        </div>
      )}

      <footer className="footer">
        <span>© 2026 Eexamly</span>
        <span>Learn. Practice. Succeed.</span>
      </footer>
    </div>
  );
}

function ExamCard({ exam, onStart }) {
  return (
    <article className="exam-card">
      <div className={"exam-card-icon " + exam.color}>
        {exam.id === 1 ? "{" : exam.id === 2 ? "▤" : "⌘"}
      </div>

      <span className="exam-category">{exam.category}</span>
      <h3>{exam.title}</h3>

      <div className="exam-details">
        <span>📝 {exam.questions} questions</span>
        <span>⏱️ {exam.duration} minutes</span>
      </div>

      <div className="exam-card-bottom">
        <span className={`difficulty ${exam.color}`}>
          {exam.difficulty}
        </span>

        <button onClick={onStart} className="start-button">
          Start Exam →
        </button>
      </div>
    </article>
  );
}

function ExamPage({ exam, onBack, onStart }) {
  return (
    <main className="dashboard">
      <button className="secondary-button" onClick={onBack}>
        ← Back to Exams
      </button>

      <section className="instructions-card">
        <span className="eyebrow">EXAM INSTRUCTIONS</span>
        <h1>{exam.title}</h1>

        <p>
          You are about to begin a practice examination. Read the details
          below before proceeding.
        </p>

        <div className="instruction-grid">
          <div>
            <span>Questions</span>
            <strong>{exam.questions}</strong>
          </div>

          <div>
            <span>Duration</span>
            <strong>{exam.duration} minutes</strong>
          </div>

          <div>
            <span>Difficulty</span>
            <strong>{exam.difficulty}</strong>
          </div>
        </div>

        <h3>Important Instructions</h3>

        <ul>
          <li>Each question has one correct answer.</li>
          <li>Read every question carefully.</li>
          <li>Choose the answer you think is correct.</li>
          <li>Your score will be calculated after submission.</li>
        </ul>

        <p className="coming-soon">
          Select one answer for each question. Your score will be shown after
          you submit the exam.
        </p>

        <button className="primary-button exam-start-button" onClick={onStart}>
          Start Exam →
        </button>
      </section>
    </main>
  );
}

function ExamTakingPage({
  exam,
  questions,
  answers,
  error,
  onAnswer,
  onBack,
  onSubmit,
}) {
  return (
    <main className="dashboard">
      <button className="secondary-button" onClick={onBack}>
        ← Back to Instructions
      </button>

      <section className="quiz-panel">
        <div className="section-heading">
          <span className="eyebrow">PRACTICE EXAM</span>
          <h1>{exam.title}</h1>
          <p>
            {questions.length} questions · Select one answer for each question.
          </p>
        </div>

        <form onSubmit={onSubmit}>
          {questions.map((item, questionIndex) => (
            <fieldset className="question-card" key={item.question}>
              <legend>
                <span>Question {questionIndex + 1}</span>
                {item.question}
              </legend>
              <div className="answer-options">
                {item.options.map((option, answerIndex) => (
                  <label
                    className={`answer-option${answers[questionIndex] === answerIndex ? " selected" : ""}`}
                    key={option}
                  >
                    <input
                      type="radio"
                      name={`question-${questionIndex}`}
                      value={answerIndex}
                      checked={answers[questionIndex] === answerIndex}
                      onChange={() => onAnswer(questionIndex, answerIndex)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}

          {error && (
            <p className="quiz-error" role="alert">
              {error}
            </p>
          )}

          <button className="primary-button" type="submit">
            Submit Exam
          </button>
        </form>
      </section>
    </main>
  );
}

function ResultsPage({ results, onRetake, onBrowseExams }) {
  return (
    <main className="dashboard">
      <div className="section-heading">
        <span className="eyebrow">YOUR PROGRESS</span>
        <h1>Exam Results</h1>
        <p>Review your scores and see how you answered each question.</p>
      </div>

      {results.length === 0 ? (
        <section className="empty-results">
          <h2>No results yet</h2>
          <p>Complete an exam and your score will appear here.</p>
          <button className="primary-button" onClick={onBrowseExams}>
            Browse Exams →
          </button>
        </section>
      ) : (
        <div className="results-list">
          {results.map((result) => {
            const percentage = Math.round(
              (result.score / result.questions.length) * 100,
            );

            return (
              <article className="result-card" key={result.id}>
                <div className="result-summary">
                  <div>
                    <span className="eyebrow">
                      {new Date(result.completedAt).toLocaleString()}
                    </span>
                    <h2>{result.examTitle}</h2>
                  </div>
                  <div className="result-score">
                    <strong>{percentage}%</strong>
                    <span>
                      {result.score} / {result.questions.length} correct
                    </span>
                  </div>
                </div>

                <div className="result-review">
                  {result.questions.map((question, index) => {
                    const isCorrect = result.answers[index] === question.answer;

                    return (
                      <div
                        className={`review-question ${isCorrect ? "correct" : "incorrect"}`}
                        key={`${result.id}-${question.question}`}
                      >
                        <strong>
                          {isCorrect ? "Correct" : "Incorrect"} · Question{" "}
                          {index + 1}
                        </strong>
                        <p>{question.question}</p>
                        <span>
                          Your answer: {question.options[result.answers[index]]}
                        </span>
                        {!isCorrect && (
                          <span>
                            Correct answer: {question.options[question.answer]}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <button
                  className="secondary-button retake-button"
                  onClick={() => onRetake(result.examTitle)}
                >
                  Retake Exam
                </button>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default App;
