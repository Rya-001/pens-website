// ========================================
// PT.PENS Admin Dashboard JavaScript
// ========================================

// Global State
const state = {
  products: [],
  news: [],
  documents: [],
  activities: [],
  members: [],
  currentSection: "dashboard",
  editingProduct: null,
  editingNews: null,
};

// ========================================
// Initialization
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

function initializeApp() {
  setupEventListeners();
  loadAllData();
  initializeChart();
  checkAuthentication();
}

// ========================================
// Authentication
// ========================================

function checkAuthentication() {
  // Simple authentication check
  const isAuthenticated = localStorage.getItem("adminAuthenticated");

  if (!isAuthenticated) {
    // In a real app, redirect to login page
    console.log("User not authenticated");
    // window.location.href = 'login.html';
  }

  // Load user info
  const userName = localStorage.getItem("adminUserName") || "Admin User";
  document.getElementById("userName").textContent = userName;
}

// ========================================
// Event Listeners
// ========================================

function setupEventListeners() {
  // Navigation
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", handleNavigation);
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById("mobileMenuToggle");
  if (mobileToggle) {
    mobileToggle.addEventListener("click", toggleSidebar);
  }

  // Sidebar toggle
  const sidebarToggle = document.getElementById("sidebarToggle");
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", toggleSidebar);
  }

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", handleLogout);

  // Add buttons
  document
    .getElementById("addProductBtn")
    .addEventListener("click", () => openProductModal());
  document
    .getElementById("addNewsBtn")
    .addEventListener("click", () => openNewsModal());
  document
    .getElementById("uploadDocumentBtn")
    .addEventListener("click", () => openDocumentModal());

  const addMemberBtn = document.getElementById("addMemberBtn");
  if (addMemberBtn) {
    addMemberBtn.addEventListener("click", () => openMemberModal());
  }

  // Forms
  document
    .getElementById("productForm")
    .addEventListener("submit", handleProductSubmit);
  document
    .getElementById("newsForm")
    .addEventListener("submit", handleNewsSubmit);
  document
    .getElementById("documentForm")
    .addEventListener("submit", handleDocumentSubmit);

  const memberForm = document.getElementById("memberForm");
  if (memberForm) {
    memberForm.addEventListener("submit", handleMemberSubmit);
  }

  // Modal close buttons
  document.querySelectorAll(".modal-close, [data-modal]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const modalId = e.currentTarget.dataset.modal;
      if (modalId) {
        closeModal(modalId);
      }
    });
  });

  // Image preview
  document.getElementById("productImage").addEventListener("input", (e) => {
    previewImage(e.target.value, "productImagePreview");
  });

  document.getElementById("newsImage").addEventListener("input", (e) => {
    previewImage(e.target.value, "newsImagePreview");
  });

  // File upload
  const fileInput = document.getElementById("documentFile");
  const fileUploadArea = document.getElementById("fileUploadArea");

  fileUploadArea.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", handleFileSelect);

  // Drag and drop
  fileUploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    fileUploadArea.style.borderColor = "var(--primary-color)";
  });

  fileUploadArea.addEventListener("dragleave", () => {
    fileUploadArea.style.borderColor = "var(--border-color)";
  });

  fileUploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    fileUploadArea.style.borderColor = "var(--border-color)";
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      fileInput.files = files;
      handleFileSelect({ target: fileInput });
    }
  });

  // Document categories
  document.querySelectorAll("#documentCategories li").forEach((item) => {
    item.addEventListener("click", (e) => {
      document
        .querySelectorAll("#documentCategories li")
        .forEach((li) => li.classList.remove("active"));
      e.currentTarget.classList.add("active");
      const category = e.currentTarget.dataset.category;
      filterDocuments(category);
    });
  });

  // Activity filter
  document
    .getElementById("activityFilter")
    .addEventListener("change", filterActivities);
  document
    .getElementById("activityDate")
    .addEventListener("change", filterActivities);

  // Member status filter
  const memberFilter = document.getElementById("memberStatusFilter");
  if (memberFilter) {
    memberFilter.addEventListener("change", (e) => {
      renderMembers(e.target.value);
    });
  }

  // Global search
  document
    .getElementById("globalSearch")
    .addEventListener("input", handleGlobalSearch);
}

// ========================================
// Navigation
// ========================================

function handleNavigation(e) {
  e.preventDefault();
  const section = e.currentTarget.dataset.section;

  // Update active nav item
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");

  // Update active section
  document.querySelectorAll(".content-section").forEach((section) => {
    section.classList.remove("active");
  });
  document.getElementById(`${section}-section`).classList.add("active");

  // Update page title
  const titles = {
    dashboard: "Dashboard",
    products: "Product Management",
    news: "News Management",
    documents: "Document Management",
    activity: "Activity Log",
  };
  document.getElementById("pageTitle").textContent = titles[section];

  state.currentSection = section;

  // Close sidebar on mobile
  if (window.innerWidth <= 768) {
    document.getElementById("sidebar").classList.remove("active");
  }
}

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

// ========================================
// Data Loading
// ========================================

async function loadAllData() {
  await Promise.all([
    loadProducts(),
    loadNews(),
    loadDocuments(),
    loadActivities(),
    loadMembers(),
  ]);

  updateDashboardStats();
}

async function loadProducts() {
  try {
    // Fetch from PHP API connected to MySQL database
    const response = await fetch("api/products.php");
    const result = await response.json();

    if (result.success && result.data) {
      // Handle both array and object with items property
      state.products = Array.isArray(result.data)
        ? result.data
        : result.data.items || [];

      // Ensure price is a number for each product
      state.products = state.products.map((p) => ({
        ...p,
        price: parseFloat(p.price) || 0,
      }));
    } else {
      console.warn("No products returned from API, using empty array");
      state.products = [];
    }

    renderProducts();
  } catch (error) {
    console.error("Error loading products:", error);
    showNotification("Failed to load products from database", "error");
    state.products = [];
    renderProducts();
  }
}

async function loadNews() {
  try {
    // Fetch from PHP API connected to MySQL database
    const response = await fetch("api/news.php");
    const result = await response.json();

    if (result.success && result.data) {
      state.news = Array.isArray(result.data)
        ? result.data
        : result.data.items || [];

      // Map API fields to expected format
      state.news = state.news.map((n) => ({
        ...n,
        date: n.publish_date || n.date,
        status: n.status || "draft",
      }));
    } else {
      console.warn("No news returned from API, using empty array");
      state.news = [];
    }

    renderNews();
  } catch (error) {
    console.error("Error loading news:", error);
    showNotification("Failed to load news from database", "error");
    state.news = [];
    renderNews();
  }
}

async function loadDocuments() {
  try {
    // Fetch from PHP API connected to MySQL database
    const response = await fetch("api/documents.php");
    const result = await response.json();

    if (result.success && result.data) {
      state.documents = Array.isArray(result.data)
        ? result.data
        : result.data.items || [];

      // Map API fields to expected format
      state.documents = state.documents.map((d) => ({
        ...d,
        size: formatFileSize(d.file_size || 0),
        uploadDate: d.created_at ? d.created_at.split("T")[0] : "",
        type: d.file_type || "pdf",
      }));
    } else {
      console.warn("No documents returned from API, using empty array");
      state.documents = [];
    }

    renderDocuments();
    updateDocumentCategoryCounts();
  } catch (error) {
    console.error("Error loading documents:", error);
    showNotification("Failed to load documents from database", "error");
    state.documents = [];
    renderDocuments();
  }
}

async function loadActivities() {
  try {
    // Fetch from PHP API connected to MySQL database
    const response = await fetch("api/activities.php");
    const result = await response.json();

    if (result.success && result.data) {
      const activities = Array.isArray(result.data)
        ? result.data
        : result.data.items || [];

      // Map API fields to expected format
      state.activities = activities.map((a) => ({
        id: a.id,
        type: a.action || "update",
        title: formatActivityTitle(a.action, a.entity_type),
        description:
          a.description ||
          `${a.action} ${a.entity_type}: ${a.entity_name || ""}`,
        timestamp: a.created_at,
        user: a.user_name || "System",
      }));
    } else {
      console.warn("No activities returned from API, using empty array");
      state.activities = [];
    }

    renderRecentActivities();
    renderActivityTimeline();
  } catch (error) {
    console.error("Error loading activities:", error);
    showNotification("Failed to load activities from database", "error");
    state.activities = [];
    renderRecentActivities();
    renderActivityTimeline();
  }
}

// Helper function to format activity title
function formatActivityTitle(action, entityType) {
  const actionMap = {
    create: "Created",
    update: "Updated",
    delete: "Deleted",
    login: "Logged In",
    logout: "Logged Out",
  };
  const entityMap = {
    product: "Product",
    news: "News Article",
    document: "Document",
    member: "Member",
    auth: "Authentication",
  };
  return `${actionMap[action] || action} ${
    entityMap[entityType] || entityType
  }`;
}

// Load members from database
async function loadMembers() {
  try {
    const response = await fetch("api/members.php");
    const result = await response.json();

    if (result.success && result.data) {
      state.members = Array.isArray(result.data)
        ? result.data
        : result.data.items || [];
    } else {
      console.warn("No members returned from API");
      state.members = [];
    }

    renderMembers();
  } catch (error) {
    console.error("Error loading members:", error);
    state.members = [];
    renderMembers();
  }
}

// Render members table
function renderMembers(filter = "all") {
  const tbody = document.getElementById("membersTableBody");
  if (!tbody) return;

  const filteredMembers =
    filter === "all"
      ? state.members
      : state.members.filter((m) => m.status === filter);

  if (filteredMembers.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="8" style="text-align:center;padding:20px;">No members found</td></tr>';
    return;
  }

  tbody.innerHTML = filteredMembers
    .map(
      (member) => `
        <tr>
            <td>${member.id}</td>
            <td>${member.full_name}</td>
            <td>${member.email}</td>
            <td>${member.company_name || "-"}</td>
            <td>${member.country || "-"}</td>
            <td><span class="status-badge ${member.status}">${
        member.status
      }</span></td>
            <td>${formatDate(member.created_at)}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editMember(${
                  member.id
                })" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-secondary" onclick="toggleMemberStatus(${
                  member.id
                }, '${member.status}')" title="${
        member.status === "active" ? "Suspend" : "Activate"
      }">
                    <i class="fas fa-${
                      member.status === "active" ? "pause" : "play"
                    }"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteMember(${
                  member.id
                })" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `
    )
    .join("");
}

// Toggle member status
function toggleMemberStatus(id, currentStatus) {
  const newStatus = currentStatus === "active" ? "suspended" : "active";

  fetch("api/members.php", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id, status: newStatus }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.success) {
        showNotification(
          `Member ${newStatus === "active" ? "activated" : "suspended"}`,
          "success"
        );
        loadMembers();
      } else {
        throw new Error(result.error || "Failed to update");
      }
    })
    .catch((err) => {
      console.error("Error updating member:", err);
      showNotification(err.message || "Failed to update member", "error");
    });
}

// Delete member
function deleteMember(id) {
  if (confirm("Are you sure you want to delete this member?")) {
    fetch(`api/members.php?id=${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          showNotification("Member deleted successfully", "success");
          loadMembers();
          updateDashboardStats();
        } else {
          throw new Error(result.error || "Failed to delete");
        }
      })
      .catch((err) => {
        console.error("Error deleting member:", err);
        showNotification(err.message || "Failed to delete member", "error");
      });
  }
}

// Open member modal
function openMemberModal(memberId = null) {
  const modal = document.getElementById("memberModal");
  const form = document.getElementById("memberForm");
  const title = document.getElementById("memberModalTitle");

  form.reset();
  document.getElementById("memberId").value = "";

  if (memberId) {
    title.textContent = "Edit Member";
    const member = state.members.find((m) => m.id === memberId);
    if (member) {
      document.getElementById("memberId").value = member.id;
      document.getElementById("memberFullName").value = member.full_name;
      document.getElementById("memberEmail").value = member.email;
      document.getElementById("memberCompany").value =
        member.company_name || "";
      document.getElementById("memberPhone").value = member.phone || "";
      document.getElementById("memberCountry").value = member.country || "";
      document.getElementById("memberStatus").value = member.status;
      document.getElementById("memberPassword").value = "";
      document.getElementById("memberPassword").removeAttribute("required");
    }
  } else {
    title.textContent = "Add New Member";
    document
      .getElementById("memberPassword")
      .setAttribute("required", "required");
  }

  modal.classList.add("active");
}

// Handle member form submit
async function handleMemberSubmit(e) {
  e.preventDefault();

  const memberId = document.getElementById("memberId").value;
  const memberData = {
    full_name: document.getElementById("memberFullName").value,
    email: document.getElementById("memberEmail").value,
    company_name: document.getElementById("memberCompany").value,
    phone: document.getElementById("memberPhone").value,
    country: document.getElementById("memberCountry").value,
    status: document.getElementById("memberStatus").value,
  };

  const password = document.getElementById("memberPassword").value;
  if (password) {
    memberData.password = password;
  }

  try {
    let response;

    if (memberId) {
      // Update existing member
      memberData.id = memberId;
      response = await fetch("api/members.php", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memberData),
      });
    } else {
      // Create new member
      if (!password || password.length < 6) {
        showNotification(
          "Password is required and must be at least 6 characters",
          "error"
        );
        return;
      }
      memberData.action = "register";
      response = await fetch("api/members.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memberData),
      });
    }

    const result = await response.json();

    if (result.success) {
      showNotification(
        memberId
          ? "Member updated successfully"
          : "Member created successfully",
        "success"
      );
      loadMembers();
      updateDashboardStats();
      closeModal("memberModal");
    } else {
      throw new Error(result.error || "Failed to save member");
    }
  } catch (error) {
    console.error("Error saving member:", error);
    showNotification(error.message || "Failed to save member", "error");
  }
}

// Edit member
function editMember(id) {
  openMemberModal(id);
}

// ========================================
// Rendering Functions
// ========================================

function renderProducts() {
  const tbody = document.getElementById("productsTableBody");
  tbody.innerHTML = "";

  state.products.forEach((product) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="${
      product.name
    }" class="product-image"></td>
            <td>${product.name}</td>
            <td>${formatCategory(product.category)}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td><span class="status-badge ${product.status}">${
      product.status
    }</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit" onclick="editProduct(${
                      product.id
                    })">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" onclick="deleteProduct(${
                      product.id
                    })">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
    tbody.appendChild(tr);
  });
}

function renderNews() {
  const grid = document.getElementById("newsGrid");
  grid.innerHTML = "";

  state.news.forEach((article) => {
    const card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `
            <img src="${article.image}" alt="${
      article.title
    }" class="news-image">
            <div class="news-content">
                <div class="news-meta">
                    <span class="news-date">${formatDate(article.date)}</span>
                    <span class="status-badge ${article.status}">${
      article.status
    }</span>
                </div>
                <h3 class="news-title">${article.title}</h3>
                <p class="news-excerpt">${article.excerpt}</p>
                <div class="news-actions">
                    <button class="btn btn-sm btn-secondary" onclick="editNews(${
                      article.id
                    })">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteNews(${
                      article.id
                    })">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
    grid.appendChild(card);
  });
}

function renderDocuments(filter = "all") {
  const grid = document.getElementById("documentsGrid");
  grid.innerHTML = "";

  const filteredDocs =
    filter === "all"
      ? state.documents
      : state.documents.filter((doc) => doc.category === filter);

  filteredDocs.forEach((doc) => {
    const card = document.createElement("div");
    card.className = "document-card";
    card.innerHTML = `
            <div class="document-icon">
                <i class="fas fa-file-${doc.type}"></i>
            </div>
            <div class="document-name">${doc.name}</div>
            <div class="document-meta">
                ${doc.size} • ${formatDate(doc.uploadDate)}
            </div>
            <div class="document-actions">
                <button class="btn btn-sm btn-secondary" onclick="downloadDocument(${
                  doc.id
                })">
                    <i class="fas fa-download"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteDocument(${
                  doc.id
                })">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    grid.appendChild(card);
  });
}

function renderRecentActivities() {
  const list = document.getElementById("recentActivityList");
  list.innerHTML = "";

  const recentActivities = state.activities.slice(0, 5);

  recentActivities.forEach((activity) => {
    const item = document.createElement("div");
    item.className = "activity-item";
    item.innerHTML = `
            <div class="activity-icon ${activity.type}">
                <i class="fas fa-${getActivityIcon(activity.type)}"></i>
            </div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-description">${activity.description}</div>
                <div class="activity-time">${formatTimeAgo(
                  activity.timestamp
                )}</div>
            </div>
        `;
    list.appendChild(item);
  });
}

function renderActivityTimeline() {
  const timeline = document.getElementById("activityTimeline");
  timeline.innerHTML = "";

  state.activities.forEach((activity) => {
    const item = document.createElement("div");
    item.className = "timeline-item";
    item.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-header">
                    <span class="timeline-title">${activity.title}</span>
                    <span class="timeline-time">${formatDateTime(
                      activity.timestamp
                    )}</span>
                </div>
                <div class="timeline-description">${activity.description}</div>
            </div>
        `;
    timeline.appendChild(item);
  });
}

// ========================================
// Dashboard Stats
// ========================================

function updateDashboardStats() {
  document.getElementById("totalProducts").textContent = state.products.length;
  document.getElementById("totalNews").textContent = state.news.filter(
    (n) => n.status === "published"
  ).length;
  document.getElementById("totalDocuments").textContent =
    state.documents.length;
  document.getElementById("activitiesToday").textContent =
    state.activities.filter((a) => {
      const today = new Date().toDateString();
      return new Date(a.timestamp).toDateString() === today;
    }).length;

  // Update members count
  const totalMembersEl = document.getElementById("totalMembers");
  if (totalMembersEl) {
    totalMembersEl.textContent = state.members.length;
  }
}

function updateDocumentCategoryCounts() {
  const counts = {
    all: state.documents.length,
    contracts: state.documents.filter((d) => d.category === "contracts").length,
    invoices: state.documents.filter((d) => d.category === "invoices").length,
    reports: state.documents.filter((d) => d.category === "reports").length,
    certificates: state.documents.filter((d) => d.category === "certificates")
      .length,
    others: state.documents.filter((d) => d.category === "others").length,
  };

  Object.keys(counts).forEach((category) => {
    const element = document.querySelector(
      `[data-category="${category}"] .count`
    );
    if (element) {
      element.textContent = counts[category];
    }
  });
}

// ========================================
// Chart Initialization
// ========================================

let statsChart;

function initializeChart() {
  const ctx = document.getElementById("statsChart");
  if (!ctx) return;

  statsChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Products", "News", "Documents"],
      datasets: [
        {
          data: [
            state.products.length,
            state.news.length,
            state.documents.length,
          ],
          backgroundColor: [
            "rgba(99, 102, 241, 0.8)",
            "rgba(236, 72, 153, 0.8)",
            "rgba(16, 185, 129, 0.8)",
          ],
          borderColor: [
            "rgba(99, 102, 241, 1)",
            "rgba(236, 72, 153, 1)",
            "rgba(16, 185, 129, 1)",
          ],
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#cbd5e1",
            padding: 15,
            font: {
              size: 12,
            },
          },
        },
      },
    },
  });
}

// ========================================
// Modal Functions
// ========================================

function openProductModal(productId = null) {
  const modal = document.getElementById("productModal");
  const form = document.getElementById("productForm");
  const title = document.getElementById("productModalTitle");

  form.reset();
  document.getElementById("productImagePreview").innerHTML = "";

  if (productId) {
    const product = state.products.find((p) => p.id === productId);
    if (product) {
      title.textContent = "Edit Product";
      document.getElementById("productId").value = product.id;
      document.getElementById("productName").value = product.name;
      document.getElementById("productCategory").value = product.category;
      document.getElementById("productPrice").value = product.price;
      document.getElementById("productDescription").value = product.description;
      document.getElementById("productImage").value = product.image;
      document.getElementById("productStatus").value = product.status;
      previewImage(product.image, "productImagePreview");
    }
  } else {
    title.textContent = "Add New Product";
    document.getElementById("productId").value = "";
  }

  modal.classList.add("active");
}

function openNewsModal(newsId = null) {
  const modal = document.getElementById("newsModal");
  const form = document.getElementById("newsForm");
  const title = document.getElementById("newsModalTitle");

  form.reset();
  document.getElementById("newsImagePreview").innerHTML = "";

  if (newsId) {
    const article = state.news.find((n) => n.id === newsId);
    if (article) {
      title.textContent = "Edit Article";
      document.getElementById("newsId").value = article.id;
      document.getElementById("newsTitle").value = article.title;
      document.getElementById("newsExcerpt").value = article.excerpt;
      document.getElementById("newsContent").value = article.content;
      document.getElementById("newsImage").value = article.image;
      document.getElementById("newsAuthor").value = article.author;
      document.getElementById("newsDate").value = article.date;
      document.getElementById("newsStatus").value = article.status;
      previewImage(article.image, "newsImagePreview");
    }
  } else {
    title.textContent = "Add New Article";
    document.getElementById("newsId").value = "";
    document.getElementById("newsDate").value = new Date()
      .toISOString()
      .split("T")[0];
  }

  modal.classList.add("active");
}

function openDocumentModal() {
  const modal = document.getElementById("documentModal");
  const form = document.getElementById("documentForm");

  form.reset();
  document.getElementById("fileInfo").classList.remove("active");

  modal.classList.add("active");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active");
}

// ========================================
// Form Handlers
// ========================================

async function handleProductSubmit(e) {
  e.preventDefault();

  const productId = document.getElementById("productId").value;
  const productData = {
    name: document.getElementById("productName").value,
    category: document.getElementById("productCategory").value,
    price: parseFloat(document.getElementById("productPrice").value),
    description: document.getElementById("productDescription").value,
    image: document.getElementById("productImage").value,
    status: document.getElementById("productStatus").value,
  };

  try {
    let response;
    if (productId) {
      // Update existing product via API
      productData.id = parseInt(productId);
      response = await fetch("api/products.php", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
    } else {
      // Create new product via API
      response = await fetch("api/products.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
    }

    const result = await response.json();

    if (result.success) {
      showNotification(
        result.message || "Product saved successfully",
        "success"
      );
      await loadProducts(); // Reload from database
      updateDashboardStats();
      closeModal("productModal");
    } else {
      throw new Error(result.error || "Failed to save product");
    }
  } catch (error) {
    console.error("Error saving product:", error);
    showNotification(error.message || "Failed to save product", "error");
  }
}

async function handleNewsSubmit(e) {
  e.preventDefault();

  const newsId = document.getElementById("newsId").value;
  const newsData = {
    title: document.getElementById("newsTitle").value,
    excerpt: document.getElementById("newsExcerpt").value,
    content: document.getElementById("newsContent").value,
    image: document.getElementById("newsImage").value,
    author: document.getElementById("newsAuthor").value,
    publish_date: document.getElementById("newsDate").value,
    status: document.getElementById("newsStatus").value,
  };

  try {
    let response;
    if (newsId) {
      // Update existing article via API
      newsData.id = parseInt(newsId);
      response = await fetch("api/news.php", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newsData),
      });
    } else {
      // Create new article via API
      response = await fetch("api/news.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newsData),
      });
    }

    const result = await response.json();

    if (result.success) {
      showNotification(
        result.message || "Article saved successfully",
        "success"
      );
      await loadNews(); // Reload from database
      updateDashboardStats();
      closeModal("newsModal");
    } else {
      throw new Error(result.error || "Failed to save article");
    }
  } catch (error) {
    console.error("Error saving news:", error);
    showNotification(error.message || "Failed to save article", "error");
  }
}

async function handleDocumentSubmit(e) {
  e.preventDefault();

  const fileInput = document.getElementById("documentFile");
  const file = fileInput?.files[0];

  if (!file) {
    showNotification("Please select a file to upload", "error");
    return;
  }

  // Create FormData for file upload
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "name",
    document.getElementById("documentName").value || file.name
  );
  formData.append(
    "category",
    document.getElementById("documentCategory").value || "others"
  );
  formData.append(
    "description",
    document.getElementById("documentDescription").value || ""
  );

  try {
    const response = await fetch("api/documents.php", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      showNotification("Document uploaded successfully", "success");
      loadDocuments(); // Reload documents from database
      updateDashboardStats();
      closeModal("documentModal");
    } else {
      throw new Error(result.error || "Upload failed");
    }
  } catch (error) {
    console.error("Error uploading document:", error);
    showNotification(error.message || "Failed to upload document", "error");
  }
}

// ========================================
// CRUD Operations
// ========================================

function editProduct(id) {
  openProductModal(id);
}

function deleteProduct(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    fetch(`api/products.php?id=${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          showNotification("Product deleted successfully", "success");
          loadProducts();
          updateDashboardStats();
        } else {
          throw new Error(result.error || "Failed to delete");
        }
      })
      .catch((err) => {
        console.error("Error deleting product:", err);
        showNotification(err.message || "Failed to delete product", "error");
      });
  }
}

function editNews(id) {
  openNewsModal(id);
}

function deleteNews(id) {
  if (confirm("Are you sure you want to delete this article?")) {
    fetch(`api/news.php?id=${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          showNotification("Article deleted successfully", "success");
          loadNews();
          updateDashboardStats();
        } else {
          throw new Error(result.error || "Failed to delete");
        }
      })
      .catch((err) => {
        console.error("Error deleting news:", err);
        showNotification(err.message || "Failed to delete article", "error");
      });
  }
}

function downloadDocument(id) {
  const doc = state.documents.find((d) => d.id === id);
  if (doc && doc.file_path) {
    window.open(doc.file_path, "_blank");
  } else {
    showNotification(`Downloading ${doc?.name || "document"}...`, "info");
  }
}

function deleteDocument(id) {
  if (confirm("Are you sure you want to delete this document?")) {
    fetch(`api/documents.php?id=${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          showNotification("Document deleted successfully", "success");
          loadDocuments();
          updateDashboardStats();
        } else {
          throw new Error(result.error || "Failed to delete");
        }
      })
      .catch((err) => {
        console.error("Error deleting document:", err);
        showNotification(err.message || "Failed to delete document", "error");
      });
  }
}

// ========================================
// Helper Functions
// ========================================

function previewImage(url, previewId) {
  const preview = document.getElementById(previewId);
  if (url) {
    preview.innerHTML = `<img src="${url}" alt="Preview">`;
    preview.style.display = "block";
  } else {
    preview.innerHTML = "";
    preview.style.display = "none";
  }
}

function handleFileSelect(e) {
  const file = e.target.files[0];
  const fileInfo = document.getElementById("fileInfo");

  if (file) {
    fileInfo.innerHTML = `
            <strong>${file.name}</strong><br>
            Size: ${(file.size / 1024 / 1024).toFixed(2)} MB<br>
            Type: ${file.type}
        `;
    fileInfo.classList.add("active");
  }
}

function filterDocuments(category) {
  renderDocuments(category);
}

function filterActivities() {
  const filter = document.getElementById("activityFilter").value;
  const date = document.getElementById("activityDate").value;

  let filtered = state.activities;

  if (filter !== "all") {
    filtered = filtered.filter((a) => a.type === filter);
  }

  if (date) {
    filtered = filtered.filter((a) => {
      return new Date(a.timestamp).toISOString().split("T")[0] === date;
    });
  }

  // Re-render with filtered data
  const timeline = document.getElementById("activityTimeline");
  timeline.innerHTML = "";

  filtered.forEach((activity) => {
    const item = document.createElement("div");
    item.className = "timeline-item";
    item.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-header">
                    <span class="timeline-title">${activity.title}</span>
                    <span class="timeline-time">${formatDateTime(
                      activity.timestamp
                    )}</span>
                </div>
                <div class="timeline-description">${activity.description}</div>
            </div>
        `;
    timeline.appendChild(item);
  });
}

function handleGlobalSearch(e) {
  const query = e.target.value.toLowerCase();
  // Implement global search logic
  console.log("Searching for:", query);
}

function logActivity(type, title, description) {
  const activity = {
    id: state.activities.length + 1,
    type,
    title,
    description,
    timestamp: new Date().toISOString(),
    user: "Admin",
  };

  state.activities.unshift(activity);
  renderRecentActivities();
  renderActivityTimeline();
  updateDashboardStats();
}

function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminUserName");
    // window.location.href = 'login.html';
    showNotification("Logged out successfully", "success");
  }
}

function showNotification(message, type = "info") {
  // Simple notification system
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${
          type === "success"
            ? "var(--success-color)"
            : type === "error"
            ? "var(--danger-color)"
            : "var(--info-color)"
        };
        color: white;
        border-radius: 0.75rem;
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ========================================
// Formatting Functions
// ========================================

function formatCategory(category) {
  const categories = {
    agriculture: "Agriculture",
    textile: "Textile",
    handicraft: "Handicraft",
    food: "Food & Beverage",
    electronics: "Electronics",
  };
  return categories[category] || category;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatDateTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatTimeAgo(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

function getActivityIcon(type) {
  const icons = {
    create: "plus-circle",
    update: "edit",
    delete: "trash",
  };
  return icons[type] || "circle";
}

function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Add CSS for notifications
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
