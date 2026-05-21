
// ============================================
// NTI Assessment System - Main JavaScript
// ============================================

// Global State
const AppState = {
    user: JSON.parse(localStorage.getItem('nti_user')) || null,
    exams: JSON.parse(localStorage.getItem('nti_exams')) || {
        iq: { completed: false, score: 0, answers: {} },
        english: { completed: false, score: 0, answers: {} },
        technical: { completed: false, score: 0, answers: {} }
    },
    currentExam: null,
    currentQuestion: 0,
    timer: null,
    timeRemaining: 0
};

// Exam Data
const ExamData = {
    iq: {
        title: 'IQ SESSION',
        time: 600, // 10 minutes
        questions: [
            {
                id: 1,
                text: 'Which number should come next in the sequence? 2, 4, 8, 16, 32, ?',
                options: ['48', '54', '64', '72'],
                correct: 2 // 0-based index
            },
            {
                id: 2,
                text: 'If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies.',
                options: ['True', 'False', 'Uncertain', 'None'],
                correct: 0
            },
            {
                id: 3,
                text: 'What is the missing number? 1, 1, 2, 3, 5, 8, ?',
                options: ['11', '13', '15', '21'],
                correct: 1
            },
            {
                id: 4,
                text: 'Which shape comes next in the pattern? ○ △ □ ○ △ ?',
                options: ['○', '△', '□', '◇'],
                correct: 2
            },
            {
                id: 5,
                text: 'A train travels 360 miles in 6 hours. What is its average speed?',
                options: ['50 mph', '55 mph', '60 mph', '65 mph'],
                correct: 2
            },
            {
                id: 6,
                text: 'If 5 workers can complete a job in 10 days, how long will 10 workers take?',
                options: ['5 days', '10 days', '15 days', '20 days'],
                correct: 0
            },
            {
                id: 7,
                text: 'What is 25% of 200?',
                options: ['25', '50', '75', '100'],
                correct: 1
            },
            {
                id: 8,
                text: 'Complete the analogy: Book is to Reading as Fork is to ?',
                options: ['Cooking', 'Eating', 'Kitchen', 'Food'],
                correct: 1
            },
            {
                id: 9,
                text: 'If x + y = 10 and x - y = 4, what is x?',
                options: ['3', '5', '7', '9'],
                correct: 2
            },
            {
                id: 10,
                text: 'Which number does not belong? 2, 3, 5, 7, 9, 11',
                options: ['2', '5', '9', '11'],
                correct: 2
            },
            {
                id: 11,
                text: 'What is the next letter? A, C, E, G, ?',
                options: ['H', 'I', 'J', 'K'],
                correct: 1
            },
            {
                id: 12,
                text: 'If a clock shows 3:15, what is the angle between the hour and minute hands?',
                options: ['0°', '7.5°', '15°', '30°'],
                correct: 1
            },
            {
                id: 13,
                text: 'What is the sum of the first 10 positive integers?',
                options: ['45', '50', '55', '60'],
                correct: 2
            },
            {
                id: 14,
                text: 'If A = 1, B = 2, C = 3, what is the value of CAB?',
                options: ['312', '321', '123', '132'],
                correct: 0
            },
            {
                id: 15,
                text: 'Which word is the odd one out? Apple, Banana, Carrot, Date',
                options: ['Apple', 'Banana', 'Carrot', 'Date'],
                correct: 2
            }
        ]
    },
    english: {
        title: 'ENGLISH SESSION',
        time: 600, // 10 minutes
        questions: [
            {
                id: 1,
                text: 'Choose the correct meaning of the underlined word: She made a significant contribution to the project.',
                options: ['small', 'important', 'weak', 'simple'],
                correct: 1
            },
            {
                id: 2,
                text: 'Select the synonym for "abundant":',
                options: ['scarce', 'plentiful', 'rare', 'limited'],
                correct: 1
            },
            {
                id: 3,
                text: 'Choose the correct preposition: I am interested ___ learning new languages.',
                options: ['on', 'at', 'in', 'for'],
                correct: 2
            },
            {
                id: 4,
                text: 'Identify the error: "The team are playing their best game today."',
                options: ['team', 'are', 'their', 'today'],
                correct: 1
            },
            {
                id: 5,
                text: 'Choose the correct form: By next year, I ___ my degree.',
                options: ['will finish', 'will have finished', 'finish', 'finished'],
                correct: 1
            },
            {
                id: 6,
                text: 'Select the antonym for "generous":',
                options: ['kind', 'selfish', 'helpful', 'giving'],
                correct: 1
            },
            {
                id: 7,
                text: 'Choose the correct word: The ___ of the building is impressive.',
                options: ['architecture', 'architect', 'architectural', 'architects'],
                correct: 0
            },
            {
                id: 8,
                text: 'Identify the sentence type: "Did you finish your homework?"',
                options: ['Declarative', 'Imperative', 'Interrogative', 'Exclamatory'],
                correct: 2
            },
            {
                id: 9,
                text: 'Choose the correct phrasal verb: Please ___ the lights before leaving.',
                options: ['turn on', 'turn off', 'turn up', 'turn down'],
                correct: 1
            },
            {
                id: 10,
                text: 'Select the correct spelling:',
                options: ['accomodate', 'acommodate', 'accommodate', 'acomodate'],
                correct: 2
            },
            {
                id: 11,
                text: 'Choose the correct article: She is ___ honest person.',
                options: ['a', 'an', 'the', 'no article'],
                correct: 1
            },
            {
                id: 12,
                text: 'Identify the figure of speech: "Time is money."',
                options: ['Simile', 'Metaphor', 'Personification', 'Hyperbole'],
                correct: 1
            },
            {
                id: 13,
                text: 'Choose the correct form: If I ___ you, I would accept the offer.',
                options: ['am', 'was', 'were', 'be'],
                correct: 2
            },
            {
                id: 14,
                text: 'Select the word with the correct stress pattern:',
                options: ['PHOtograph', 'photoGRAPH', 'photograph', 'PHOTOgraph'],
                correct: 0
            },
            {
                id: 15,
                text: 'Choose the correct idiom meaning: "Break a leg!"',
                options: ['Be careful', 'Good luck', 'Run fast', 'Stop trying'],
                correct: 1
            }
        ]
    },
    technical: {
        title: 'TECHNICAL SESSION (FRONT-END)',
        time: 1200, // 20 minutes
        questions: [
            {
                id: 1,
                text: 'Which HTML tag is used to link an external CSS file?',
                options: ['<link>', '<style>', '<script>', '<css>'],
                correct: 0
            },
            {
                id: 2,
                text: 'What does CSS stand for?',
                options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style System', 'Colorful Style Sheets'],
                correct: 1
            },
            {
                id: 3,
                text: 'Which CSS property controls text size?',
                options: ['font-style', 'text-size', 'font-size', 'text-style'],
                correct: 2
            },
            {
                id: 4,
                text: 'What is the correct JavaScript syntax to change the content of an HTML element?',
                options: ['document.getElement("p").innerHTML = "Hello"', '#demo.innerHTML = "Hello"', 'document.getElementById("demo").innerHTML = "Hello"', 'document.getElementByName("p").innerHTML = "Hello"'],
                correct: 2
            },
            {
                id: 5,
                text: 'Which Bootstrap class is used to create a responsive grid?',
                options: ['.container', '.row', '.col-*', '.grid'],
                correct: 2
            },
            {
                id: 6,
                text: 'What is the purpose of the alt attribute in an <img> tag?',
                options: ['To make the image load faster', 'To provide alternative text for accessibility', 'To align the image', 'To add a border'],
                correct: 1
            },
            {
                id: 7,
                text: 'Which HTTP method is used to submit form data?',
                options: ['GET', 'POST', 'PUT', 'DELETE'],
                correct: 1
            },
            {
                id: 8,
                text: 'What does DOM stand for?',
                options: ['Data Object Model', 'Document Object Model', 'Digital Object Model', 'Dynamic Object Model'],
                correct: 1
            },
            {
                id: 9,
                text: 'Which CSS selector has the highest specificity?',
                options: ['Class selector', 'ID selector', 'Element selector', 'Universal selector'],
                correct: 1
            },
            {
                id: 10,
                text: 'What is the default display property of a <div> element?',
                options: ['inline', 'inline-block', 'block', 'flex'],
                correct: 2
            },
            {
                id: 11,
                text: 'Which JavaScript method is used to add an element to the end of an array?',
                options: ['push()', 'pop()', 'shift()', 'unshift()'],
                correct: 0
            },
            {
                id: 12,
                text: 'What is the correct way to declare a constant in JavaScript?',
                options: ['var', 'let', 'const', 'constant'],
                correct: 2
            },
            {
                id: 13,
                text: 'Which CSS property is used to make a flex container?',
                options: ['display: flex', 'flex: container', 'container: flex', 'display: block'],
                correct: 0
            },
            {
                id: 14,
                text: 'What is the purpose of the <meta viewport> tag?',
                options: ['To add keywords for SEO', 'To control layout on mobile browsers', 'To link to external stylesheets', 'To define the character set'],
                correct: 1
            },
            {
                id: 15,
                text: 'Which event occurs when a user clicks on an HTML element?',
                options: ['onchange', 'onmouseclick', 'onclick', 'onmouseover'],
                correct: 2
            },
            {
                id: 16,
                text: 'What does API stand for?',
                options: ['Application Programming Interface', 'Advanced Programming Interface', 'Application Process Integration', 'Automated Programming Interface'],
                correct: 0
            },
            {
                id: 17,
                text: 'Which CSS property is used to create space between elements?',
                options: ['spacing', 'margin', 'padding', 'gap'],
                correct: 1
            },
            {
                id: 18,
                text: 'What is the correct syntax for a media query in CSS?',
                options: ['@media screen and (max-width: 600px)', '@query screen (max-width: 600px)', '@screen media (max-width: 600px)', '@media (screen: max-width 600px)'],
                correct: 0
            },
            {
                id: 19,
                text: 'Which HTML5 element is used to define navigation links?',
                options: ['<nav>', '<navigation>', '<menu>', '<links>'],
                correct: 0
            },
            {
                id: 20,
                text: 'What is the purpose of localStorage in JavaScript?',
                options: ['To store data temporarily', 'To store data permanently in the browser', 'To store data on the server', 'To store cookies'],
                correct: 1
            }
        ]
    }
};

// Utility Functions
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function showModal(title, text, icon = 'ℹ️', buttons = []) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const modalIcon = document.getElementById('modal-icon');
    const modalButtons = document.getElementById('modal-buttons');

    modalTitle.textContent = title;
    modalText.textContent = text;
    modalIcon.textContent = icon;

    modalButtons.innerHTML = '';
    if (buttons.length === 0) {
        const okBtn = document.createElement('button');
        okBtn.className = 'btn btn-primary';
        okBtn.textContent = 'OK';
        okBtn.onclick = () => hideModal();
        modalButtons.appendChild(okBtn);
    } else {
        buttons.forEach(btn => {
            const button = document.createElement('button');
            button.className = `btn ${btn.class || 'btn-primary'}`;
            button.textContent = btn.text;
            button.onclick = () => {
                if (btn.action) btn.action();
                hideModal();
            };
            modalButtons.appendChild(button);
        });
    }

    modal.classList.add('active');
}

function hideModal() {
    document.getElementById('modal').classList.remove('active');
}

function saveState() {
    localStorage.setItem('nti_user', JSON.stringify(AppState.user));
    localStorage.setItem('nti_exams', JSON.stringify(AppState.exams));
}

function checkAuth() {
    if (!AppState.user && !window.location.pathname.includes('index.html') && !window.location.pathname.includes('register')) {
        window.location.href = '../index.html';
    }
}

function logout() {
    AppState.user = null;
    AppState.exams = {
        iq: { completed: false, score: 0, answers: {} },
        english: { completed: false, score: 0, answers: {} },
        technical: { completed: false, score: 0, answers: {} }
    };
    saveState();
    window.location.href = '../index.html';
}

// Timer Functions
function startTimer(duration, onTick, onComplete) {
    AppState.timeRemaining = duration;

    if (AppState.timer) clearInterval(AppState.timer);

    AppState.timer = setInterval(() => {
        AppState.timeRemaining--;
        onTick(AppState.timeRemaining);

        if (AppState.timeRemaining <= 0) {
            clearInterval(AppState.timer);
            onComplete();
        }
    }, 1000);
}

function stopTimer() {
    if (AppState.timer) {
        clearInterval(AppState.timer);
        AppState.timer = null;
    }
}

// Exam Functions
function initExam(examType) {
    AppState.currentExam = examType;
    AppState.currentQuestion = 0;

    const exam = ExamData[examType];
    const savedAnswers = AppState.exams[examType].answers;

    renderQuestion(examType, 0);
    renderQuestionGrid(examType);

    startTimer(exam.time, (time) => {
        const timerEl = document.getElementById('timer');
        if (timerEl) {
            timerEl.textContent = formatTime(time);
            if (time <= 60) timerEl.classList.add('warning');
        }
    }, () => {
        submitExam(examType);
    });
}

function renderQuestion(examType, index) {
    const exam = ExamData[examType];
    const question = exam.questions[index];
    const savedAnswer = AppState.exams[examType].answers[question.id];

    const container = document.getElementById('question-container');
    if (!container) return;

    container.innerHTML = `
        <div class="question-card fade-in">
            <div class="question-header">
                <span class="question-number">Question ${index + 1} of ${exam.questions.length}</span>
                <span class="text-muted">${exam.title}</span>
            </div>
            <div class="question-text">${question.text}</div>
            <div class="options-list">
                ${question.options.map((opt, i) => `
                    <div class="option-item ${savedAnswer === i ? 'selected' : ''}" onclick="selectOption(${i})">
                        <div class="option-letter">${String.fromCharCode(65 + i)}</div>
                        <div class="option-text">${opt}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="exam-nav-buttons">
            <button class="btn btn-secondary ${index === 0 ? 'hidden' : ''}" onclick="prevQuestion()">
                ← Previous
            </button>
            ${index === exam.questions.length - 1 ? 
                `<button class="btn btn-primary" onclick="submitExam('${examType}')">Submit Exam ✓</button>` :
                `<button class="btn btn-primary" onclick="nextQuestion()">Next →</button>`
            }
        </div>
    `;

    AppState.currentQuestion = index;
    updateQuestionGrid(examType);
}

function selectOption(index) {
    const exam = ExamData[AppState.currentExam];
    const question = exam.questions[AppState.currentQuestion];

    AppState.exams[AppState.currentExam].answers[question.id] = index;
    saveState();

    // Update UI
    document.querySelectorAll('.option-item').forEach((el, i) => {
        el.classList.toggle('selected', i === index);
    });

    updateQuestionGrid(AppState.currentExam);
}

function nextQuestion() {
    const exam = ExamData[AppState.currentExam];
    if (AppState.currentQuestion < exam.questions.length - 1) {
        renderQuestion(AppState.currentExam, AppState.currentQuestion + 1);
    }
}

function prevQuestion() {
    if (AppState.currentQuestion > 0) {
        renderQuestion(AppState.currentExam, AppState.currentQuestion - 1);
    }
}

function renderQuestionGrid(examType) {
    const exam = ExamData[examType];
    const grid = document.getElementById('question-grid');
    if (!grid) return;

    grid.innerHTML = exam.questions.map((q, i) => {
        const isAnswered = AppState.exams[examType].answers[q.id] !== undefined;
        const isCurrent = i === AppState.currentQuestion;
        return `
            <button class="question-btn ${isAnswered ? 'answered' : ''} ${isCurrent ? 'current' : ''}" 
                    onclick="renderQuestion('${examType}', ${i})">
                ${i + 1}
            </button>
        `;
    }).join('');
}

function updateQuestionGrid(examType) {
    renderQuestionGrid(examType);
}

function submitExam(examType) {
    stopTimer();

    const exam = ExamData[examType];
    const answers = AppState.exams[examType].answers;
    let score = 0;

    exam.questions.forEach(q => {
        if (answers[q.id] === q.correct) score++;
    });

    AppState.exams[examType].completed = true;
    AppState.exams[examType].score = score;
    saveState();

    // Show completion modal
    const percentage = Math.round((score / exam.questions.length) * 100);
    const passed = percentage >= 60;

    showModal(
        `Your ${exam.title} has been submitted!`,
        `You scored ${score}/${exam.questions.length} (${percentage}%). ${passed ? 'Congratulations!' : 'Keep practicing!'}`,
        passed ? '✅' : '⚠️',
        [
            {
                text: 'View Results',
                class: 'btn-primary',
                action: () => {
                    window.location.href = '../results/index.html';
                }
            }
        ]
    );
}

// Dashboard Functions
function updateDashboard() {
    const userNameEl = document.getElementById('user-name');
    if (userNameEl && AppState.user) {
        userNameEl.textContent = AppState.user.name || 'Student';
    }

    // Update assessment cards
    const iqCard = document.getElementById('iq-card');
    const technicalCard = document.getElementById('technical-card');

    if (iqCard) {
        if (AppState.exams.iq.completed && AppState.exams.english.completed) {
            iqCard.classList.remove('locked');
            const iqScore = AppState.exams.iq.score;
            const engScore = AppState.exams.english.score;
            const total = iqScore + engScore;
            const max = 30;
            const pct = Math.round((total / max) * 100);

            iqCard.innerHTML = `
                <div class="d-flex justify-content-center align-items-center mb-2">
                    <span class="status-badge completed">
                        <span class="status-dot"></span> Completed
                    </span>
                </div>
                <div class="assessment-icon">📝</div>
                <div class="assessment-title">IQ & ENGLISH ASSESSMENT</div>
                <div class="assessment-meta">
                    <div class="meta-item">
                        <span class="meta-label">IQ Session</span>
                        <span class="meta-value">${iqScore}/15</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">English Session</span>
                        <span class="meta-value">${engScore}/15</span>
                    </div>
                </div>
                <div class="progress-container">
                    <div class="progress-info">
                        <span class="progress-label">Combined Score</span>
                        <span class="progress-value">${pct}%</span>
                    </div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: ${pct}%"></div>
                    </div>
                </div>
                <div class="text-center">
                    <span class="status-badge ${pct >= 60 ? 'passed' : 'failed'}">
                        <span class="status-dot"></span> ${pct >= 60 ? 'Passed' : 'Failed'}
                    </span>
                </div>
            `;
        }
    }

    if (technicalCard) {
        const iqCompleted = AppState.exams.iq.completed;
        const engCompleted = AppState.exams.english.completed;

        if (!iqCompleted || !engCompleted) {
            technicalCard.classList.add('locked');
        } else {
            technicalCard.classList.remove('locked');

            if (AppState.exams.technical.completed) {
                const techScore = AppState.exams.technical.score;
                const pct = Math.round((techScore / 20) * 100);

                technicalCard.innerHTML = `
                    <div class="d-flex justify-content-center align-items-center mb-2">
                        <span class="status-badge completed">
                            <span class="status-dot"></span> Completed
                        </span>
                    </div>
                    <div class="assessment-icon">💡</div>
                    <div class="assessment-title">TECHNICAL ASSESSMENT</div>
                    <div class="assessment-desc">Technical skills evaluation based on your selected job profile (Front-End)</div>
                    <div class="assessment-meta">
                        <div class="meta-item">
                            <span class="meta-label">Technical Session</span>
                            <span class="meta-value">${techScore}/20</span>
                        </div>
                    </div>
                    <div class="progress-container">
                        <div class="progress-info">
                            <span class="progress-label">Score</span>
                            <span class="progress-value">${pct}%</span>
                        </div>
                        <div class="progress-bar-bg">
                            <div class="progress-bar-fill ${pct < 60 ? 'red' : ''}" style="width: ${pct}%"></div>
                        </div>
                    </div>
                    <div class="text-center">
                        <span class="status-badge ${pct >= 60 ? 'passed' : 'failed'}">
                            <span class="status-dot"></span> ${pct >= 60 ? 'Passed' : 'Failed'}
                        </span>
                    </div>
                `;
            }
        }
    }
}

// Results Functions
function updateResults() {
    const resultsContainer = document.getElementById('results-container');
    if (!resultsContainer) return;

    let html = '';

    // IQ & English Results
    if (AppState.exams.iq.completed || AppState.exams.english.completed) {
        const iqScore = AppState.exams.iq.score;
        const engScore = AppState.exams.english.score;
        const total = iqScore + engScore;
        const max = 30;
        const pct = Math.round((total / max) * 100);
        const passed = pct >= 60;

        html += `
            <div class="results-card ${passed ? 'passed' : 'failed'} fade-in">
                <div class="result-header">
                    <div class="d-flex align-items-center gap-2">
                        <span style="font-size: 1.5rem;">📝</span>
                        <span class="result-title">IQ & ENGLISH ASSESSMENT</span>
                    </div>
                    <span class="status-badge ${passed ? 'passed' : 'failed'}">
                        <span class="status-dot"></span> ${passed ? 'Passed' : 'Failed'}
                    </span>
                </div>
                <div class="result-details">
                    <div class="result-item">
                        <div class="result-item-label">IQ Session</div>
                        <div class="result-item-value">${iqScore}/15</div>
                    </div>
                    <div class="result-item">
                        <div class="result-item-label">English Session</div>
                        <div class="result-item-value">${engScore}/15</div>
                    </div>
                </div>
                <div class="progress-container">
                    <div class="progress-info">
                        <span class="progress-label">Combined Percentage Score</span>
                        <span class="progress-value">${pct}%</span>
                    </div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: ${pct}%"></div>
                    </div>
                </div>
            </div>
        `;
    }

    // Technical Results
    if (AppState.exams.technical.completed) {
        const techScore = AppState.exams.technical.score;
        const pct = Math.round((techScore / 20) * 100);
        const passed = pct >= 60;

        html += `
            <div class="results-card ${passed ? 'passed' : 'failed'} fade-in">
                <div class="result-header">
                    <div class="d-flex align-items-center gap-2">
                        <span style="font-size: 1.5rem;">💡</span>
                        <span class="result-title">TECHNICAL ASSESSMENT</span>
                    </div>
                    <span class="status-badge ${passed ? 'passed' : 'failed'}">
                        <span class="status-dot"></span> ${passed ? 'Passed' : 'Failed'}
                    </span>
                </div>
                <div class="result-details">
                    <div class="result-item">
                        <div class="result-item-label">Technical Session (Front-End)</div>
                        <div class="result-item-value">${techScore}/20</div>
                    </div>
                </div>
                <div class="progress-container">
                    <div class="progress-info">
                        <span class="progress-label">Percentage Score</span>
                        <span class="progress-value">${pct}%</span>
                    </div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill ${pct < 60 ? 'red' : ''}" style="width: ${pct}%"></div>
                    </div>
                </div>
            </div>
        `;
    }

    if (html === '') {
        html = `
            <div class="text-center" style="padding: 3rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📋</div>
                <h3 style="margin-bottom: 0.5rem;">No Results Yet</h3>
                <p style="color: var(--text-secondary);">Complete your assessments to see results here.</p>
                <a href="../dashboard/index.html" class="btn btn-primary mt-3">Go to Dashboard</a>
            </div>
        `;
    }

    resultsContainer.innerHTML = html;
}

// Initialize
function init() {
    // Check auth on protected pages
    const protectedPages = ['dashboard', 'exams', 'results'];
    const currentPage = window.location.pathname;

    const isProtected = protectedPages.some(page => currentPage.includes(page));
    if (isProtected && !AppState.user) {
        window.location.href = '../index.html';
        return;
    }

    // Update user display
    const userNameEl = document.getElementById('user-name');
    const userDisplayEl = document.getElementById('user-display');

    if (AppState.user) {
        if (userNameEl) userNameEl.textContent = AppState.user.name || 'Student';
        if (userDisplayEl) userDisplayEl.textContent = AppState.user.name || 'Student';
    }

    // Page-specific initialization
    if (currentPage.includes('dashboard')) {
        updateDashboard();
    } else if (currentPage.includes('results')) {
        updateResults();
    }
}

// Run init when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
