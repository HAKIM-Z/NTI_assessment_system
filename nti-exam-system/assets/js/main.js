/**
 * NTI Exam System - Main JavaScript
 * Handles: Auth, Exams, Timer, Navigation, Results
 */

// ============================================
// DEMO DATA (Simulating Database)
// ============================================
const DEMO_DATA = {
    user: {
        name: "Ahmed Mohamed",
        email: "ahmed@student.nti.eg",
        role: "Candidate Account"
    },
    exams: {
        iq: {
            title: "IQ Session",
            totalQuestions: 15,
            timeLimit: 600, // 10 minutes in seconds
            questions: [
                { id: 1, question: "Which number should come next in the sequence? 2, 4, 8, 16, 32, ?", options: ["48", "54", "64", "72"], correct: 2 },
                { id: 2, question: "If all Bloops are Bleeps and all Bleeps are Blops, then:", options: ["All Bloops are Blops", "All Blops are Bloops", "Some Bloops are not Blops", "None of the above"], correct: 0 },
                { id: 3, question: "What is the missing number? 3, 7, 15, 31, 63, ?", options: ["95", "127", "111", "99"], correct: 1 },
                { id: 4, question: "A train travels 360 km in 4 hours. What is its average speed?", options: ["80 km/h", "90 km/h", "100 km/h", "70 km/h"], correct: 1 },
                { id: 5, question: "Which shape has the most sides?", options: ["Hexagon", "Octagon", "Pentagon", "Decagon"], correct: 3 },
                { id: 6, question: "If 2x + 5 = 15, what is x?", options: ["5", "10", "7.5", "4"], correct: 0 },
                { id: 7, question: "What comes next: J, F, M, A, M, J, ?", options: ["A", "J", "S", "N"], correct: 1 },
                { id: 8, question: "Which number is the odd one out? 2, 3, 5, 9, 11", options: ["2", "3", "5", "9"], correct: 3 },
                { id: 9, question: "A cube has how many faces?", options: ["4", "5", "6", "8"], correct: 2 },
                { id: 10, question: "What is 25% of 200?", options: ["25", "50", "75", "100"], correct: 1 },
                { id: 11, question: "Complete the pattern: △, □, ○, △, □, ?", options: ["△", "□", "○", "◇"], correct: 2 },
                { id: 12, question: "If A=1, B=2, C=3, what is the value of CAB?", options: ["312", "213", "123", "321"], correct: 0 },
                { id: 13, question: "Which is heavier: 1kg of feathers or 1kg of iron?", options: ["Feathers", "Iron", "Same weight", "Cannot tell"], correct: 2 },
                { id: 14, question: "What is the next prime number after 13?", options: ["14", "15", "16", "17"], correct: 3 },
                { id: 15, question: "How many degrees in a right angle?", options: ["45°", "90°", "180°", "360°"], correct: 1 }
            ]
        },
        english: {
            title: "English Session",
            totalQuestions: 15,
            timeLimit: 600,
            questions: [
                { id: 1, question: "Choose the correct meaning of the underlined word: She made a significant contribution to the project.", options: ["small", "important", "weak", "simple"], correct: 1 },
                { id: 2, question: "Select the correct sentence:", options: ["He don't like coffee.", "He doesn't likes coffee.", "He doesn't like coffee.", "He not like coffee."], correct: 2 },
                { id: 3, question: "What is the antonym of 'generous'?", options: ["kind", "selfish", "wealthy", "friendly"], correct: 1 },
                { id: 4, question: "Choose the correct preposition: I am interested ___ learning new technologies.", options: ["on", "at", "in", "for"], correct: 2 },
                { id: 5, question: "Which word is spelled correctly?", options: ["accomodate", "accommodate", "acommodate", "acomodate"], correct: 1 },
                { id: 6, question: "Complete the sentence: If I ___ rich, I would travel the world.", options: ["am", "was", "were", "be"], correct: 2 },
                { id: 7, question: "What is the synonym of 'rapid'?", options: ["slow", "quick", "steady", "calm"], correct: 1 },
                { id: 8, question: "Choose the correct form: She ___ to the gym every morning.", options: ["go", "goes", "going", "gone"], correct: 1 },
                { id: 9, question: "What does 'break the ice' mean?", options: ["Destroy something", "Start a conversation", "Make someone angry", "Win a competition"], correct: 1 },
                { id: 10, question: "Select the passive voice: The report ___ by the manager yesterday.", options: ["is written", "was written", "has written", "wrote"], correct: 1 },
                { id: 11, question: "Choose the correct word: The ___ of the building is impressive.", options: ["architecture", "architect", "architectural", "architects"], correct: 0 },
                { id: 12, question: "What is the plural of 'analysis'?", options: ["analyses", "analysises", "analysiss", "analysi"], correct: 0 },
                { id: 13, question: "Complete: Despite ___ hard, he failed the exam.", options: ["study", "studied", "studying", "to study"], correct: 2 },
                { id: 14, question: "Choose the correct idiom: He's always ___ in the clouds.", options: ["head", "walking", "living", "head"], correct: 0 },
                { id: 15, question: "What does 'ambiguous' mean?", options: ["Clear", "Confusing", "Bright", "Simple"], correct: 1 }
            ]
        },
        technical: {
            title: "Technical Assessment (Front-End)",
            totalQuestions: 20,
            timeLimit: 1200, // 20 minutes
            questions: [
                { id: 1, question: "Which HTML tag is used to link an external CSS file?", options: ["<link>", "<style>", "<script>", "<css>"], correct: 0 },
                { id: 2, question: "What does CSS stand for?", options: ["Computer Style Sheets", "Creative Style System", "Cascading Style Sheets", "Colorful Style Sheets"], correct: 2 },
                { id: 3, question: "Which CSS property controls text size?", options: ["font-style", "text-size", "font-size", "text-style"], correct: 2 },
                { id: 4, question: "What is the correct JavaScript syntax to change the content of an HTML element?", options: ["document.getElement('p').innerHTML = 'Hello'", "document.getElementById('p').innerHTML = 'Hello'", "#p.innerHTML = 'Hello'", "document.getElementByName('p').innerHTML = 'Hello'"], correct: 1 },
                { id: 5, question: "Which Bootstrap class is used to create a responsive grid?", options: [".container", ".row", ".col", ".grid"], correct: 2 },
                { id: 6, question: "What is the purpose of the 'alt' attribute in images?", options: ["To style the image", "To provide alternative text", "To link the image", "To resize the image"], correct: 1 },
                { id: 7, question: "Which HTTP status code means 'Not Found'?", options: ["200", "301", "404", "500"], correct: 2 },
                { id: 8, question: "What does 'DOM' stand for?", options: ["Data Object Model", "Document Object Model", "Digital Ordinance Model", "Desktop Orientation Module"], correct: 1 },
                { id: 9, question: "Which method is used to add an element at the end of an array in JavaScript?", options: ["push()", "pop()", "shift()", "unshift()"], correct: 0 },
                { id: 10, question: "What is the default display property of a <div> element?", options: ["inline", "block", "flex", "grid"], correct: 1 },
                { id: 11, question: "Which CSS property is used to make a flex container?", options: ["display: flex", "flex: container", "container: flex", "layout: flex"], correct: 0 },
                { id: 12, question: "What is the correct way to declare a variable in JavaScript (ES6+)?", options: ["var name", "let name", "const name", "All of the above"], correct: 3 },
                { id: 13, question: "Which event fires when an HTML document has been completely loaded?", options: ["onchange", "onload", "onclick", "onsubmit"], correct: 1 },
                { id: 14, question: "What does API stand for?", options: ["Application Programming Interface", "Advanced Programming Interface", "Application Process Integration", "Automated Program Interface"], correct: 0 },
                { id: 15, question: "Which CSS unit is relative to the font-size of the root element?", options: ["em", "rem", "px", "vh"], correct: 1 },
                { id: 16, question: "What is the purpose of localStorage in JavaScript?", options: ["Store data on server", "Store data in browser", "Store cookies", "Store cache"], correct: 1 },
                { id: 17, question: "Which Bootstrap component is used for navigation?", options: [".nav", ".navbar", ".navigation", ".menu"], correct: 1 },
                { id: 18, question: "What does 'responsive design' mean?", options: ["Fast loading", "Adapts to screen size", "High resolution", "Mobile only"], correct: 1 },
                { id: 19, question: "Which HTML5 tag is used to define navigation links?", options: ["<nav>", "<navigation>", "<menu>", "<links>"], correct: 0 },
                { id: 20, question: "What is the purpose of the 'z-index' property in CSS?", options: ["Control opacity", "Control stacking order", "Control zoom level", "Control size"], correct: 1 }
            ]
        }
    }
};

// ============================================
// AUTH SYSTEM
// ============================================
const Auth = {
    isLoggedIn() {
        return localStorage.getItem('nti_user') !== null;
    },

    login(email, password) {
        // Demo login - accepts any credentials
        const user = { ...DEMO_DATA.user, email };
        localStorage.setItem('nti_user', JSON.stringify(user));
        localStorage.setItem('nti_exam_progress', JSON.stringify({
            iqCompleted: false,
            englishCompleted: false,
            technicalCompleted: false,
            iqScore: 0,
            englishScore: 0,
            technicalScore: 0
        }));
        return true;
    },

    logout() {
        localStorage.removeItem('nti_user');
        localStorage.removeItem('nti_exam_progress');
        localStorage.removeItem('nti_current_exam');
        localStorage.removeItem('nti_exam_answers');
        window.location.href = '../auth/login.html';
    },

    getUser() {
        const user = localStorage.getItem('nti_user');
        return user ? JSON.parse(user) : null;
    },

    updateUI() {
        const user = this.getUser();
        if (user) {
            const greetingEls = document.querySelectorAll('.user-greeting');
            const roleEls = document.querySelectorAll('.user-role');
            greetingEls.forEach(el => el.textContent = `HI ${user.name.toUpperCase()}`);
            roleEls.forEach(el => el.textContent = user.role);
        }
    },

    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = '../auth/login.html';
        }
    }
};

// ============================================
// EXAM SYSTEM
// ============================================
const Exam = {
    currentExam: null,
    currentQuestion: 0,
    answers: {},
    timer: null,
    timeRemaining: 0,

    start(examType) {
        this.currentExam = examType;
        this.currentQuestion = 0;
        this.answers = {};
        this.timeRemaining = DEMO_DATA.exams[examType].timeLimit;

        localStorage.setItem('nti_current_exam', JSON.stringify({
            type: examType,
            question: 0,
            timeRemaining: this.timeRemaining
        }));
        localStorage.setItem('nti_exam_answers', JSON.stringify({}));

        window.location.href = `../exams/${examType}.html`;
    },

    load() {
        const examData = JSON.parse(localStorage.getItem('nti_current_exam') || '{}');
        if (!examData.type) {
            window.location.href = '../dashboard/index.html';
            return;
        }

        this.currentExam = examData.type;
        this.currentQuestion = examData.question || 0;
        this.timeRemaining = examData.timeRemaining || DEMO_DATA.exams[this.currentExam].timeLimit;
        this.answers = JSON.parse(localStorage.getItem('nti_exam_answers') || '{}');

        this.renderQuestion();
        this.renderNav();
        this.startTimer();
        this.updateSessionTabs();
    },

    renderQuestion() {
        const exam = DEMO_DATA.exams[this.currentExam];
        const question = exam.questions[this.currentQuestion];
        const container = document.getElementById('question-container');

        if (!container) return;

        const letters = ['A', 'B', 'C', 'D'];

        container.innerHTML = `
            <div class="question-number">Question ${this.currentQuestion + 1} of ${exam.totalQuestions}</div>
            <div class="question-text">${question.question}</div>
            <div class="options-list">
                ${question.options.map((opt, idx) => `
                    <div class="option-item ${this.answers[this.currentQuestion] === idx ? 'selected' : ''}" 
                         onclick="Exam.selectOption(${idx})">
                        <div class="option-letter">${letters[idx]}</div>
                        <div class="option-text">${opt}</div>
                    </div>
                `).join('')}
            </div>
        `;

        // Update nav
        this.renderNav();
    },

    selectOption(index) {
        this.answers[this.currentQuestion] = index;
        localStorage.setItem('nti_exam_answers', JSON.stringify(this.answers));
        this.renderQuestion();
        this.renderNav();
    },

    next() {
        const exam = DEMO_DATA.exams[this.currentExam];
        if (this.currentQuestion < exam.totalQuestions - 1) {
            this.currentQuestion++;
            this.saveProgress();
            this.renderQuestion();
        }
    },

    previous() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.saveProgress();
            this.renderQuestion();
        }
    },

    goToQuestion(index) {
        this.currentQuestion = index;
        this.saveProgress();
        this.renderQuestion();
    },

    saveProgress() {
        localStorage.setItem('nti_current_exam', JSON.stringify({
            type: this.currentExam,
            question: this.currentQuestion,
            timeRemaining: this.timeRemaining
        }));
    },

    renderNav() {
        const nav = document.getElementById('question-nav');
        if (!nav) return;

        const exam = DEMO_DATA.exams[this.currentExam];
        nav.innerHTML = exam.questions.map((_, idx) => `
            <button class="question-nav-btn ${this.answers[idx] !== undefined ? 'answered' : ''} ${idx === this.currentQuestion ? 'current' : ''}"
                    onclick="Exam.goToQuestion(${idx})">
                ${idx + 1}
            </button>
        `).join('');
    },

    startTimer() {
        const timerEl = document.getElementById('timer');
        if (!timerEl) return;

        this.updateTimerDisplay();

        this.timer = setInterval(() => {
            this.timeRemaining--;
            this.saveProgress();
            this.updateTimerDisplay();

            if (this.timeRemaining <= 0) {
                this.submit();
            }
        }, 1000);
    },

    updateTimerDisplay() {
        const timerEl = document.getElementById('timer');
        if (!timerEl) return;

        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        timerEl.textContent = timeStr;
        timerEl.className = 'timer-box';

        if (this.timeRemaining <= 60) {
            timerEl.classList.add('danger');
        } else if (this.timeRemaining <= 180) {
            timerEl.classList.add('warning');
        }
    },

    updateSessionTabs() {
        const tabs = document.querySelectorAll('.session-tab');
        if (!tabs.length) return;

        const progress = JSON.parse(localStorage.getItem('nti_exam_progress') || '{}');

        tabs.forEach(tab => {
            const session = tab.dataset.session;
            if (session === this.currentExam) {
                tab.classList.add('active');
            } else if (progress[`${session}Completed`]) {
                tab.classList.add('completed');
            }
        });
    },

    submit() {
        clearInterval(this.timer);

        const exam = DEMO_DATA.exams[this.currentExam];
        let score = 0;

        exam.questions.forEach((q, idx) => {
            if (this.answers[idx] === q.correct) {
                score++;
            }
        });

        const progress = JSON.parse(localStorage.getItem('nti_exam_progress') || '{}');
        progress[`${this.currentExam}Completed`] = true;
        progress[`${this.currentExam}Score`] = score;
        localStorage.setItem('nti_exam_progress', JSON.stringify(progress));

        // Show completion modal
        this.showCompletionModal(score, exam.totalQuestions);
    },

    showCompletionModal(score, total) {
        const modal = document.getElementById('completion-modal');
        const title = document.getElementById('modal-title');
        const text = document.getElementById('modal-text');
        const btn = document.getElementById('modal-btn');

        if (!modal) {
            // If no modal, redirect directly
            this.redirectAfterSubmit();
            return;
        }

        const percentage = Math.round((score / total) * 100);

        if (this.currentExam === 'iq') {
            title.textContent = 'You have completed the IQ Session!';
            text.textContent = `Score: ${score}/${total} (${percentage}%). Click OK to proceed to the English Session.`;
            btn.onclick = () => {
                modal.classList.remove('active');
                this.start('english');
            };
        } else if (this.currentExam === 'english') {
            title.textContent = 'You have completed the English Session!';
            text.textContent = `Score: ${score}/${total} (${percentage}%). Click OK to proceed to the Technical Assessment.`;
            btn.onclick = () => {
                modal.classList.remove('active');
                this.start('technical');
            };
        } else {
            title.textContent = 'Your Technical Assessment has been submitted!';
            text.textContent = `Score: ${score}/${total} (${percentage}%). Click OK to view your results.`;
            btn.onclick = () => {
                window.location.href = '../results/result.html';
            };
        }

        modal.classList.add('active');
    },

    redirectAfterSubmit() {
        if (this.currentExam === 'iq') {
            this.start('english');
        } else if (this.currentExam === 'english') {
            this.start('technical');
        } else {
            window.location.href = '../results/result.html';
        }
    }
};

// ============================================
// DASHBOARD SYSTEM
// ============================================
const Dashboard = {
    init() {
        const progress = JSON.parse(localStorage.getItem('nti_exam_progress') || '{}');

        // Update IQ & English card
        const iqCard = document.getElementById('iq-card');
        const techCard = document.getElementById('tech-card');

        if (iqCard) {
            if (progress.iqCompleted && progress.englishCompleted) {
                // Show results
                const iqScore = progress.iqScore || 0;
                const englishScore = progress.englishScore || 0;
                const totalScore = iqScore + englishScore;
                const percentage = Math.round((totalScore / 30) * 100);
                const passed = percentage >= 60;

                iqCard.className = `card-nti result-card ${passed ? 'pass' : 'fail'}`;
                iqCard.innerHTML = `
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <div class="card-icon green">📄</div>
                        <span class="status-badge completed"><i class="fas fa-check-circle"></i> Completed</span>
                    </div>
                    <h3 class="card-title">IQ & English Assessment</h3>
                    <div class="score-breakdown mt-3">
                        <div class="score-item">
                            <div class="score-item-value">${iqScore}/15</div>
                            <div class="score-item-label">IQ Session</div>
                        </div>
                        <div class="score-item">
                            <div class="score-item-value">${englishScore}/15</div>
                            <div class="score-item-label">English Session</div>
                        </div>
                    </div>
                    <div class="text-center mt-3">
                        <div class="score-big ${passed ? 'green' : 'red'}">${percentage}%</div>
                        <div class="score-label">Combined Score</div>
                    </div>
                    <div class="progress-container mt-3">
                        <div class="progress-bar-bg">
                            <div class="progress-bar-fill ${passed ? 'green' : 'red'}" style="width: ${percentage}%"></div>
                        </div>
                    </div>
                    <div class="text-center mt-3">
                        <span class="status-badge ${passed ? 'passed' : 'failed'}">
                            <span class="status-dot ${passed ? 'green' : 'red'}"></span>
                            ${passed ? 'Passed' : 'Failed'}
                        </span>
                    </div>
                `;

                // Unlock technical
                if (techCard) {
                    techCard.classList.remove('locked');
                    techCard.innerHTML = `
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <div class="card-icon yellow">💡</div>
                            ${progress.technicalCompleted ? 
                                '<span class="status-badge completed"><i class="fas fa-check-circle"></i> Completed</span>' :
                                '<span class="status-badge locked"><i class="fas fa-lock"></i> Available</span>'
                            }
                        </div>
                        <h3 class="card-title">Technical Assessment</h3>
                        <p class="card-text">Technical skills evaluation based on your selected job profile (Front-End). 20 questions, 20 minute session.</p>
                        ${progress.technicalCompleted ? `
                            <div class="text-center mt-3">
                                <div class="score-big ${progress.technicalScore >= 12 ? 'green' : 'red'}">${Math.round((progress.technicalScore / 20) * 100)}%</div>
                                <div class="score-label">Score: ${progress.technicalScore}/20</div>
                            </div>
                            <div class="progress-container mt-3">
                                <div class="progress-bar-bg">
                                    <div class="progress-bar-fill ${progress.technicalScore >= 12 ? 'green' : 'red'}" style="width: ${(progress.technicalScore / 20) * 100}%"></div>
                                </div>
                            </div>
                            <div class="text-center mt-3">
                                <span class="status-badge ${progress.technicalScore >= 12 ? 'passed' : 'failed'}">
                                    <span class="status-dot ${progress.technicalScore >= 12 ? 'green' : 'red'}"></span>
                                    ${progress.technicalScore >= 12 ? 'Passed' : 'Failed'}
                                </span>
                            </div>
                        ` : `
                            <a href="../exams/technical.html" class="btn-nti btn-nti-primary w-100 mt-3">
                                <i class="fas fa-play"></i> Start Technical Assessment
                            </a>
                        `}
                    `;
                }
            }
        }
    }
};

// ============================================
// RESULTS SYSTEM
// ============================================
const Results = {
    init() {
        const progress = JSON.parse(localStorage.getItem('nti_exam_progress') || '{}');

        if (!progress.iqCompleted) {
            window.location.href = '../dashboard/index.html';
            return;
        }

        const iqScore = progress.iqScore || 0;
        const englishScore = progress.englishScore || 0;
        const technicalScore = progress.technicalScore || 0;

        const combinedPercentage = Math.round(((iqScore + englishScore) / 30) * 100);
        const technicalPercentage = Math.round((technicalScore / 20) * 100);

        const iqPassed = combinedPercentage >= 60;
        const techPassed = technicalPercentage >= 60;

        // Update IQ Card
        const iqCard = document.getElementById('result-iq-card');
        if (iqCard) {
            iqCard.className = `card-nti result-card ${iqPassed ? 'pass' : 'fail'}`;
            iqCard.innerHTML = `
                <div class="result-header">
                    <div class="card-icon green">📄</div>
                    <span class="status-badge completed"><i class="fas fa-check-circle"></i> Completed</span>
                </div>
                <h3 class="card-title">IQ & English Assessment</h3>
                <div class="score-breakdown">
                    <div class="score-item">
                        <div class="score-item-value">${iqScore}/15</div>
                        <div class="score-item-label">IQ Session</div>
                    </div>
                    <div class="score-item">
                        <div class="score-item-value">${englishScore}/15</div>
                        <div class="score-item-label">English Session</div>
                    </div>
                </div>
                <div class="text-center mt-3">
                    <div class="score-big ${iqPassed ? 'green' : 'red'}">${combinedPercentage}%</div>
                    <div class="score-label">Combined Percentage Score</div>
                </div>
                <div class="progress-container">
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill ${iqPassed ? 'green' : 'red'}" style="width: ${combinedPercentage}%"></div>
                    </div>
                </div>
                <div class="text-center mt-3">
                    <span class="status-badge ${iqPassed ? 'passed' : 'failed'}">
                        <span class="status-dot ${iqPassed ? 'green' : 'red'}"></span>
                        ${iqPassed ? 'Passed' : 'Failed'}
                    </span>
                </div>
            `;
        }

        // Update Technical Card
        const techCard = document.getElementById('result-tech-card');
        if (techCard && progress.technicalCompleted) {
            techCard.className = `card-nti result-card ${techPassed ? 'pass' : 'fail'}`;
            techCard.innerHTML = `
                <div class="result-header">
                    <div class="card-icon yellow">💡</div>
                    <span class="status-badge completed"><i class="fas fa-check-circle"></i> Completed</span>
                </div>
                <h3 class="card-title">Technical Assessment</h3>
                <p class="card-text">Technical Session (Front-End)</p>
                <div class="text-center mt-3">
                    <div class="score-big ${techPassed ? 'green' : 'red'}">${technicalPercentage}%</div>
                    <div class="score-label">Score: ${technicalScore}/20</div>
                </div>
                <div class="progress-container">
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill ${techPassed ? 'green' : 'red'}" style="width: ${technicalPercentage}%"></div>
                    </div>
                </div>
                <div class="text-center mt-3">
                    <span class="status-badge ${techPassed ? 'passed' : 'failed'}">
                        <span class="status-dot ${techPassed ? 'green' : 'red'}"></span>
                        ${techPassed ? 'Passed' : 'Failed'}
                    </span>
                </div>
            `;
        }
    }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
function showModal(title, text, icon = 'info', buttonText = 'OK', callback = null) {
    const modal = document.getElementById('completion-modal');
    if (modal) {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-text').textContent = text;
        document.getElementById('modal-icon').className = `modal-icon ${icon}`;
        document.getElementById('modal-btn').textContent = buttonText;
        document.getElementById('modal-btn').onclick = () => {
            modal.classList.remove('active');
            if (callback) callback();
        };
        modal.classList.add('active');
    }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Update auth UI
    Auth.updateUI();

    // Handle logout buttons
    document.querySelectorAll('.btn-logout').forEach(btn => {
        btn.addEventListener('click', () => Auth.logout());
    });

    // Initialize dashboard if on dashboard page
    if (document.getElementById('dashboard-page')) {
        Dashboard.init();
    }

    // Initialize results if on results page
    if (document.getElementById('results-page')) {
        Results.init();
    }

    // Initialize exam if on exam page
    if (document.querySelector('.exam-page')) {
        Exam.load();
    }
});
