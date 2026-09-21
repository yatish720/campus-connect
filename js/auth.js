// Campus Connect demo authentication.
// This is Stage 1 local demo authentication. Firebase will replace this in Stage 3.
const STUDENT = { id: "NCJ2026001", password: "student123", name: "Janardhan", role: "student" };
const ADMIN = { id: "ADMIN001", password: "admin123", name: "College Administrator", role: "admin" };

function setSession(user) {
  localStorage.setItem("campusConnectSession", JSON.stringify({
    id: user.id, name: user.name, role: user.role,
    loginAt: new Date().toISOString()
  }));
}

function getSession() {
  try { return JSON.parse(localStorage.getItem("campusConnectSession")); }
  catch(e) { return null; }
}

function logout() {
  localStorage.removeItem("campusConnectSession");
  window.location.href = "../index.html";
}

function requireRole(role) {
  const session = getSession();
  if (!session || session.role !== role) {
    const target = role === "admin" ? "../admin-login.html" : "../login.html";
    window.location.replace(target);
    return false;
  }
  return true;
}

document.addEventListener("DOMContentLoaded", () => {
  const studentForm = document.getElementById("studentLogin");
  if (studentForm) {
    const existing = getSession();
    if (existing?.role === "student") {
      document.getElementById("loginMessage").textContent = "Already signed in. Redirecting…";
      setTimeout(() => window.location.href = "student-dashboard.html", 300);
    }

    studentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("studentId").value.trim();
      const pw = document.getElementById("studentPassword").value;
      const msg = document.getElementById("loginMessage");

      if (id === STUDENT.id && pw === STUDENT.password) {
        setSession(STUDENT);
        msg.textContent = "Login successful. Opening dashboard…";
        msg.style.color = "#47e5aa";
        setTimeout(() => window.location.href = "student-dashboard.html", 300);
      } else {
        msg.textContent = "Invalid credentials. Use NCJ2026001 / student123";
        msg.style.color = "#ff8d8d";
      }
    });
  }

  const adminForm = document.getElementById("adminLogin");
  if (adminForm) {
    const existing = getSession();
    if (existing?.role === "admin") {
      document.getElementById("adminMessage").textContent = "Already signed in. Redirecting…";
      setTimeout(() => window.location.href = "admin/dashboard.html", 300);
    }

    adminForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("adminId").value.trim();
      const pw = document.getElementById("adminPassword").value;
      const msg = document.getElementById("adminMessage");

      if (id === ADMIN.id && pw === ADMIN.password) {
        setSession(ADMIN);
        msg.textContent = "Login successful. Opening admin panel…";
        msg.style.color = "#47e5aa";
        setTimeout(() => window.location.href = "admin/dashboard.html", 300);
      } else {
        msg.textContent = "Invalid credentials. Use ADMIN001 / admin123";
        msg.style.color = "#ff8d8d";
      }
    });
  }

  // Protect dashboard pages.
  if (document.body.dataset.role) requireRole(document.body.dataset.role);

  // Put the logged-in identity into common dashboard elements.
  const session = getSession();
  if (session) {
    document.querySelectorAll("[data-user-id]").forEach(el => el.textContent = session.id);
    document.querySelectorAll("[data-user-name]").forEach(el => el.textContent = session.name);
  }
});
