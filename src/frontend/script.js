const API_BASE_URL = "https://jobtrack-job-application-manager.onrender.com/api";
const APPLICATIONS_URL = `${API_BASE_URL}/applications`;
const AUTH_URL = `${API_BASE_URL}/auth`;

let currentUser = null;
let applications = [];


/* =========================================
   START APPLICATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    initializeApp();
    setupEventListeners();
});


/* =========================================
   INITIALIZE APP
========================================= */

function initializeApp() {

    const storedUser = localStorage.getItem("jobtrackUser");

    if (storedUser) {

        try {

            currentUser = JSON.parse(storedUser);

            document
                .getElementById("intro-page")
                .classList.add("hidden");

            showDashboard();

            loadApplications();

        } catch (error) {

            localStorage.removeItem("jobtrackUser");

            showIntroPage();
        }

    } else {

        showIntroPage();

    }
}


/* =========================================
   EVENT LISTENERS
========================================= */

function setupEventListeners() {

    /* =========================
       INTRO PAGE
    ========================= */

    const getStartedButton =
        document.getElementById("get-started-button");

    if (getStartedButton) {
        getStartedButton.addEventListener(
            "click",
            openAuthFromIntro
        );
    }


    const introStartButton =
        document.getElementById("intro-start-button");

    if (introStartButton) {
        introStartButton.addEventListener(
            "click",
            openAuthFromIntro
        );
    }


    const backToIntro =
        document.getElementById("back-to-intro");

    if (backToIntro) {
        backToIntro.addEventListener(
            "click",
            showIntroPage
        );
    }


    /* =========================
       HOW IT WORKS
    ========================= */

    const stepCards =
        document.querySelectorAll(".step-card");

    const progressDots =
        document.querySelectorAll(".progress-dot");

    const progressFill =
        document.getElementById("progress-fill");


    function activateStep(step) {

        stepCards.forEach(card => {

            card.classList.toggle(
                "active",
                Number(card.dataset.step) === step
            );

        });


        progressDots.forEach(dot => {

            dot.classList.toggle(
                "active",
                Number(dot.dataset.step) === step
            );

        });


        if (progressFill) {

            const progress =
                ((step - 1) / 3) * 100;

            progressFill.style.width =
                `${progress}%`;
        }
    }


    stepCards.forEach(card => {

        card.addEventListener("click", () => {

            activateStep(
                Number(card.dataset.step)
            );

        });

    });


    progressDots.forEach(dot => {

        dot.addEventListener("click", () => {

            activateStep(
                Number(dot.dataset.step)
            );

        });

    });


    if (stepCards.length > 0) {
        activateStep(1);
    }


    /* =========================
       AUTHENTICATION
    ========================= */

    document
        .getElementById("login-form")
        .addEventListener(
            "submit",
            handleLogin
        );


    document
        .getElementById("register-form")
        .addEventListener(
            "submit",
            handleRegister
        );


    document
        .getElementById("show-register")
        .addEventListener(
            "click",
            showRegisterForm
        );


    document
        .getElementById("show-login")
        .addEventListener(
            "click",
            showLoginForm
        );


    document
        .getElementById("logout-button")
        .addEventListener(
            "click",
            handleLogout
        );


    /* =========================
       DASHBOARD
    ========================= */

    document
        .getElementById("add-application-button")
        .addEventListener(
            "click",
            () => openApplicationModal()
        );


    document
        .getElementById("close-modal")
        .addEventListener(
            "click",
            closeApplicationModal
        );


    document
        .getElementById("application-form")
        .addEventListener(
            "submit",
            handleApplicationSubmit
        );


    document
        .getElementById("search-input")
        .addEventListener(
            "input",
            filterApplications
        );


    document
        .getElementById("status-filter")
        .addEventListener(
            "change",
            filterApplications
        );


    document
        .getElementById("application-modal")
        .addEventListener(
            "click",
            (event) => {

                if (
                    event.target.id ===
                    "application-modal"
                ) {

                    closeApplicationModal();

                }

            }
        );
}


/* =========================================
   INTRO PAGE
========================================= */

function showIntroPage() {

    document
        .getElementById("intro-page")
        .classList.remove("hidden");


    document
        .getElementById("auth-container")
        .classList.add("hidden");


    document
        .getElementById("dashboard-container")
        .classList.add("hidden");

}


function openAuthFromIntro() {

    document
        .getElementById("intro-page")
        .classList.add("hidden");


    document
        .getElementById("dashboard-container")
        .classList.add("hidden");


    document
        .getElementById("auth-container")
        .classList.remove("hidden");


    showLoginForm();

}


/* =========================================
   AUTHENTICATION
========================================= */

function showAuth() {

    document
        .getElementById("intro-page")
        .classList.add("hidden");


    document
        .getElementById("auth-container")
        .classList.remove("hidden");


    document
        .getElementById("dashboard-container")
        .classList.add("hidden");

}


function showDashboard() {

    document
        .getElementById("intro-page")
        .classList.add("hidden");


    document
        .getElementById("auth-container")
        .classList.add("hidden");


    document
        .getElementById("dashboard-container")
        .classList.remove("hidden");


    document
        .getElementById("welcome-message")
        .textContent =
        `Welcome, ${currentUser.name}`;

}


function showLoginForm() {

    document
        .getElementById("login-section")
        .classList.remove("hidden");


    document
        .getElementById("register-section")
        .classList.add("hidden");


    clearAuthMessages();

}


function showRegisterForm() {

    document
        .getElementById("login-section")
        .classList.add("hidden");


    document
        .getElementById("register-section")
        .classList.remove("hidden");


    clearAuthMessages();

}


function clearAuthMessages() {

    document
        .getElementById("login-message")
        .textContent = "";


    document
        .getElementById("register-message")
        .textContent = "";

}


/* =========================================
   LOGIN
========================================= */

async function handleLogin(event) {

    event.preventDefault();


    const email =
        document
            .getElementById("login-email")
            .value
            .trim();


    const password =
        document
            .getElementById("login-password")
            .value;


    const message =
        document.getElementById(
            "login-message"
        );


    message.textContent =
        "Logging in...";


    try {

        const user =
            await request(
                `${AUTH_URL}/login`,
                {
                    method: "POST",

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );


        currentUser = user;


        localStorage.setItem(
            "jobtrackUser",
            JSON.stringify(user)
        );


        document
            .getElementById("login-form")
            .reset();


        showDashboard();


        await loadApplications();


    } catch (error) {

        message.textContent =
            error.message;

    }

}


/* =========================================
   REGISTER
========================================= */

async function handleRegister(event) {

    event.preventDefault();


    const name =
        document
            .getElementById("register-name")
            .value
            .trim();


    const email =
        document
            .getElementById("register-email")
            .value
            .trim();


    const password =
        document
            .getElementById("register-password")
            .value;


    const message =
        document.getElementById(
            "register-message"
        );


    message.textContent =
        "Creating account...";


    try {

        await request(
            `${AUTH_URL}/register`,
            {
                method: "POST",

                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            }
        );


        document
            .getElementById("register-form")
            .reset();


        showLoginForm();


        document
            .getElementById("login-email")
            .value = email;


        document
            .getElementById("login-message")
            .textContent =
            "Account created successfully. Please log in.";


    } catch (error) {

        message.textContent =
            error.message;

    }

}


/* =========================================
   LOGOUT
========================================= */

function handleLogout() {

    currentUser = null;

    applications = [];


    localStorage.removeItem(
        "jobtrackUser"
    );


    document
        .getElementById(
            "applications-container"
        )
        .innerHTML = "";


    showIntroPage();

}


/* =========================================
   APPLICATIONS
========================================= */

async function loadApplications() {

    const container =
        document.getElementById(
            "applications-container"
        );


    container.innerHTML =
        "<p>Loading applications...</p>";


    try {

        applications =
            await request(
                APPLICATIONS_URL
            );


        renderApplications(
            applications
        );


    } catch (error) {

        container.innerHTML =
            `<p>Failed to load applications: ${escapeHtml(error.message)}</p>`;

    }

}


/* =========================================
   RENDER APPLICATIONS
========================================= */

function renderApplications(data) {

    const container =
        document.getElementById(
            "applications-container"
        );


    if (
        !data ||
        data.length === 0
    ) {

        container.innerHTML =
            "<p>No job applications found.</p>";

        return;
    }


    container.innerHTML =
        data
            .map(
                application =>
                    createApplicationCard(
                        application
                    )
            )
            .join("");


    document
        .querySelectorAll(".edit-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.id
                        );

                    openApplicationModal(id);

                }
            );

        });


    document
        .querySelectorAll(".delete-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.id
                        );

                    deleteApplication(id);

                }
            );

        });

}


/* =========================================
   APPLICATION CARD
========================================= */

function createApplicationCard(
    application
) {

    return `
        <div class="application-card">

            <h3>
                ${escapeHtml(
                    application.companyName
                )}
            </h3>

            <p class="job-title">
                ${escapeHtml(
                    application.jobTitle
                )}
            </p>

            <span class="status-badge">
                ${escapeHtml(
                    application.status
                )}
            </span>

            <p>
                <strong>Location:</strong>
                ${escapeHtml(
                    application.location
                )}
            </p>

            <p>
                <strong>Applied:</strong>
                ${
                    application.applicationDate ||
                    "Not specified"
                }
            </p>

            <div class="application-actions">

                <button
                    class="edit-button"
                    data-id="${application.id}">
                    Edit
                </button>

                <button
                    class="delete-button"
                    data-id="${application.id}">
                    Delete
                </button>

            </div>

        </div>
    `;

}


/* =========================================
   SEARCH & FILTER
========================================= */

function filterApplications() {

    const searchTerm =
        document
            .getElementById("search-input")
            .value
            .toLowerCase()
            .trim();


    const statusFilter =
        document
            .getElementById("status-filter")
            .value;


    const filtered =
        applications.filter(
            application => {

                const matchesSearch =

                    application.companyName
                        .toLowerCase()
                        .includes(searchTerm)

                    ||

                    application.jobTitle
                        .toLowerCase()
                        .includes(searchTerm)

                    ||

                    application.location
                        .toLowerCase()
                        .includes(searchTerm);


                const matchesStatus =
                    !statusFilter ||
                    application.status ===
                    statusFilter;


                return (
                    matchesSearch &&
                    matchesStatus
                );

            }
        );


    renderApplications(filtered);

}


/* =========================================
   ADD / EDIT APPLICATION
========================================= */

function openApplicationModal(
    id = null
) {

    const modal =
        document.getElementById(
            "application-modal"
        );


    const title =
        document.getElementById(
            "modal-title"
        );


    const form =
        document.getElementById(
            "application-form"
        );


    const idInput =
        document.getElementById(
            "application-id"
        );


    if (id === null) {

        title.textContent =
            "Add Application";


        form.reset();


        idInput.value = "";


        document
            .getElementById(
                "application-date"
            )
            .value =
            getTodayDate();


    } else {

        const application =
            applications.find(
                item =>
                    item.id === id
            );


        if (!application) {
            return;
        }


        title.textContent =
            "Edit Application";


        idInput.value =
            application.id;


        document
            .getElementById(
                "company-name"
            )
            .value =
            application.companyName;


        document
            .getElementById(
                "job-title"
            )
            .value =
            application.jobTitle;


        document
            .getElementById(
                "application-status"
            )
            .value =
            application.status;


        document
            .getElementById(
                "location"
            )
            .value =
            application.location;


        document
            .getElementById(
                "application-date"
            )
            .value =
            application.applicationDate ||
            "";

    }


    modal
        .classList
        .remove("hidden");

}


/* =========================================
   CLOSE MODAL
========================================= */

function closeApplicationModal() {

    document
        .getElementById(
            "application-modal"
        )
        .classList
        .add("hidden");

}


/* =========================================
   SAVE APPLICATION
========================================= */

async function handleApplicationSubmit(
    event
) {

    event.preventDefault();


    const id =
        document
            .getElementById(
                "application-id"
            )
            .value;


    const application = {

        companyName:
            document
                .getElementById(
                    "company-name"
                )
                .value
                .trim(),

        jobTitle:
            document
                .getElementById(
                    "job-title"
                )
                .value
                .trim(),

        status:
            document
                .getElementById(
                    "application-status"
                )
                .value,

        location:
            document
                .getElementById(
                    "location"
                )
                .value
                .trim(),

        applicationDate:
            document
                .getElementById(
                    "application-date"
                )
                .value
    };


    try {

        if (id) {

            await request(
                `${APPLICATIONS_URL}/${id}`,
                {
                    method: "PUT",

                    body:
                        JSON.stringify(
                            application
                        )
                }
            );

        } else {

            await request(
                APPLICATIONS_URL,
                {
                    method: "POST",

                    body:
                        JSON.stringify(
                            application
                        )
                }
            );

        }


        closeApplicationModal();


        await loadApplications();


    } catch (error) {

        alert(error.message);

    }

}


/* =========================================
   DELETE APPLICATION
========================================= */

async function deleteApplication(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this application?"
        );


    if (!confirmed) {
        return;
    }


    try {

        await request(
            `${APPLICATIONS_URL}/${id}`,
            {
                method: "DELETE"
            }
        );


        await loadApplications();


    } catch (error) {

        alert(error.message);

    }

}


/* =========================================
   API REQUEST HELPER
========================================= */

async function request(
    url,
    options = {}
) {

    const response =
        await fetch(
            url,
            {
                headers: {
                    "Content-Type":
                        "application/json",

                    ...(options.headers || {})
                },

                ...options
            }
        );


    const contentType =
        response.headers.get(
            "content-type"
        ) || "";


    let data;


    if (
        contentType.includes(
            "application/json"
        )
    ) {

        data =
            await response.json();

    } else {

        data =
            await response.text();

    }


    if (!response.ok) {

        let errorMessage =
            "Something went wrong.";


        if (
            typeof data === "string" &&
            data.trim()
        ) {

            errorMessage =
                data;

        }


        if (
            typeof data === "object" &&
            data !== null
        ) {

            errorMessage =
                data.error ||
                Object.values(data).join(", ") ||
                errorMessage;

        }


        throw new Error(
            errorMessage
        );

    }


    return data;

}


/* =========================================
   GET TODAY'S DATE
========================================= */

function getTodayDate() {

    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    return `${year}-${month}-${day}`;

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHtml(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}