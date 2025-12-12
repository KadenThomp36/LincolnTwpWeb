/**
 * Lincoln Township Admin Dashboard
 * Modern, clean JavaScript functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    initNavigation();
    initMobileMenu();
    initInteractiveElements();
});

/* ==========================================================================
   Sidebar Functionality
   ========================================================================== */

function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mainContent = document.getElementById('mainContent');

    // Load saved sidebar state
    const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (sidebarCollapsed) {
        sidebar.classList.add('collapsed');
    }

    // Toggle sidebar
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    });
}

/* ==========================================================================
   Navigation Functionality
   ========================================================================== */

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    const pageTitle = document.getElementById('pageTitle');
    const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const page = this.getAttribute('data-page');

            // Update active nav item
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            this.closest('.nav-item').classList.add('active');

            // Show corresponding page
            document.querySelectorAll('.page-content').forEach(content => {
                content.classList.remove('active');
            });
            const targetPage = document.getElementById(`page-${page}`);
            if (targetPage) {
                targetPage.classList.add('active');
            }

            // Update page title and breadcrumb
            const pageName = this.querySelector('span').textContent;
            pageTitle.textContent = pageName;
            breadcrumbCurrent.textContent = pageName;

            // Close mobile menu if open
            closeMobileMenu();

            // Update URL hash
            history.pushState(null, null, `#${page}`);
        });
    });

    // Handle initial hash
    const hash = window.location.hash.slice(1);
    if (hash) {
        const targetLink = document.querySelector(`.nav-link[data-page="${hash}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }

    // Handle browser back/forward
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.slice(1) || 'dashboard';
        const targetLink = document.querySelector(`.nav-link[data-page="${hash}"]`);
        if (targetLink) {
            targetLink.click();
        }
    });
}

/* ==========================================================================
   Mobile Menu Functionality
   ========================================================================== */

function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    mobileToggle.addEventListener('click', function() {
        sidebar.classList.add('mobile-open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    overlay.addEventListener('click', closeMobileMenu);
}

function closeMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

/* ==========================================================================
   Interactive Elements
   ========================================================================== */

function initInteractiveElements() {
    // Quick action buttons
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            handleQuickAction(action);
        });
    });

    // Folder navigation
    const folderItems = document.querySelectorAll('.folder-item');
    folderItems.forEach(item => {
        item.addEventListener('click', function() {
            folderItems.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // View toggle buttons
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Color scheme buttons
    const colorBtns = document.querySelectorAll('.color-btn');
    colorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            colorBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            // Could save to localStorage and apply theme
        });
    });

    // Table row hover effects
    initTableInteractions();

    // Card hover interactions
    initCardInteractions();

    // Notification badge
    initNotifications();
}

function handleQuickAction(action) {
    // Navigate to appropriate page based on action
    const actionMap = {
        'Add Meeting': 'meetings',
        'Upload Document': 'documents',
        'Add Official': 'officials',
        'New Announcement': 'announcements'
    };

    const page = actionMap[action];
    if (page) {
        const targetLink = document.querySelector(`.nav-link[data-page="${page}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }

    // Show a subtle feedback animation
    showToast(`Opening ${action}...`);
}

function initTableInteractions() {
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function(e) {
            // Don't trigger if clicking on action buttons
            if (e.target.closest('.table-actions')) return;

            tableRows.forEach(r => r.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

function initCardInteractions() {
    // Add new official card
    const addNewCard = document.querySelector('.official-card.add-new');
    if (addNewCard) {
        addNewCard.addEventListener('click', function() {
            showToast('Add Official form coming soon!');
        });
    }

    // Meeting edit buttons
    const meetingEditBtns = document.querySelectorAll('.meeting-actions .btn-icon');
    meetingEditBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const meeting = this.closest('.meeting-item').querySelector('h4').textContent;
            showToast(`Editing: ${meeting}`);
        });
    });
}

function initNotifications() {
    const notificationBtn = document.querySelector('.action-btn[title="Notifications"]');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            showToast('Notifications panel coming soon!');
            // Could show a dropdown panel here
        });
    }

    const quickAddBtn = document.querySelector('.action-btn[title="Quick Actions"]');
    if (quickAddBtn) {
        quickAddBtn.addEventListener('click', function() {
            // Scroll to quick actions or show modal
            const quickActionsCard = document.querySelector('.quick-actions-card');
            if (quickActionsCard) {
                // Navigate to dashboard first
                const dashboardLink = document.querySelector('.nav-link[data-page="dashboard"]');
                if (dashboardLink) {
                    dashboardLink.click();
                    setTimeout(() => {
                        quickActionsCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                }
            }
        });
    }
}

/* ==========================================================================
   Toast Notifications
   ========================================================================== */

function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <i class="bi bi-${getToastIcon(type)}"></i>
        <span>${message}</span>
    `;

    // Add styles if not already present
    if (!document.querySelector('#toast-styles')) {
        const styles = document.createElement('style');
        styles.id = 'toast-styles';
        styles.textContent = `
            .toast-notification {
                position: fixed;
                bottom: 24px;
                right: 24px;
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 14px 20px;
                background: #1F2937;
                color: white;
                border-radius: 10px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                z-index: 9999;
                animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
                font-size: 14px;
                font-weight: 500;
            }
            .toast-notification i {
                font-size: 18px;
            }
            .toast-info i { color: #60A5FA; }
            .toast-success i { color: #34D399; }
            .toast-warning i { color: #FBBF24; }
            .toast-error i { color: #F87171; }
            @keyframes slideIn {
                from { transform: translateX(100px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(styles);
    }

    document.body.appendChild(toast);

    // Remove toast after animation
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function getToastIcon(type) {
    const icons = {
        info: 'info-circle',
        success: 'check-circle',
        warning: 'exclamation-triangle',
        error: 'x-circle'
    };
    return icons[type] || icons.info;
}

/* ==========================================================================
   Utility Functions
   ========================================================================== */

// Format dates
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Format file sizes
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// Debounce function for search inputs
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Search functionality (can be expanded)
const handleSearch = debounce(function(query, type) {
    console.log(`Searching ${type} for: ${query}`);
    // Implement search logic here
}, 300);

// Initialize search inputs
document.querySelectorAll('.search-input input').forEach(input => {
    input.addEventListener('input', function() {
        const page = document.querySelector('.page-content.active').id.replace('page-', '');
        handleSearch(this.value, page);
    });
});

/* ==========================================================================
   Form Handlers (Placeholder)
   ========================================================================== */

// These would connect to your backend
const AdminAPI = {
    async getMeetings() {
        // Fetch meetings from your backend
        console.log('Fetching meetings...');
    },

    async saveMeeting(data) {
        console.log('Saving meeting:', data);
        showToast('Meeting saved!', 'success');
    },

    async getOfficials() {
        console.log('Fetching officials...');
    },

    async saveOfficial(data) {
        console.log('Saving official:', data);
        showToast('Official saved!', 'success');
    },

    async uploadDocument(file) {
        console.log('Uploading document:', file.name);
        showToast('Document uploaded!', 'success');
    },

    async saveAnnouncement(data) {
        console.log('Saving announcement:', data);
        showToast('Announcement saved!', 'success');
    },

    async saveSettings(data) {
        console.log('Saving settings:', data);
        showToast('Settings saved!', 'success');
    }
};

// Save buttons
document.querySelectorAll('.settings-card-footer .btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.settings-card');
        const title = card.querySelector('h4').textContent;
        showToast(`${title} saved!`, 'success');
    });
});

// Primary action buttons
document.querySelectorAll('.page-header-right .btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
        const action = this.querySelector('span').textContent;
        showToast(`${action} - Coming soon!`, 'info');
    });
});

// Secondary action buttons
document.querySelectorAll('.page-header-right .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function() {
        const action = this.querySelector('span').textContent;
        showToast(`${action} - Coming soon!`, 'info');
    });
});

/* ==========================================================================
   Keyboard Shortcuts
   ========================================================================== */

document.addEventListener('keydown', function(e) {
    // Escape to close mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }

    // Ctrl/Cmd + K for search focus
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.page-content.active .search-input input');
        if (searchInput) {
            searchInput.focus();
        }
    }

    // Ctrl/Cmd + B to toggle sidebar
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        document.getElementById('sidebarToggle').click();
    }
});

console.log('Lincoln Township Admin Dashboard initialized');
