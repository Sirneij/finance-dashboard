class SidebarController {
  constructor() {
    this.isSidebarOpen = true;
    this.isMobile = window.innerWidth < 768;
    this.navLinks = document.querySelectorAll("[data-nav-link]");
    this.host = window.location.origin;

    // Cache DOM elements
    this.sidebar = document.getElementById("sidebar");
    this.main = document.getElementById("main");
    this.mobileOverlay = document.getElementById("mobile-overlay");
    this.logo = document.getElementById("logo");
    this.togglePath = document.getElementById("toggle-path");
    this.navLabels = document.querySelectorAll("[data-nav-label]");

    // Bind methods
    this.checkWidth = this.checkWidth.bind(this);
    this.toggle = this.toggle.bind(this);

    // Set initial state
    requestAnimationFrame(() => {
      this.checkWidth();
      this.updateUI(true); // true for initial load
      this.highlightCurrentPage();
    });

    window.addEventListener("resize", this.checkWidth);
  }

  checkWidth() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth < 768;

    if (wasMobile !== this.isMobile) {
      this.isSidebarOpen = !this.isMobile;
      this.updateUI();
    }
  }

  toggle() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.updateUI();
  }

  updateUI(isInitialLoad = false) {
    // Mobile specific
    if (this.isMobile) {
      this.sidebar.classList.toggle("-translate-x-full", !this.isSidebarOpen);
      this.main.classList.toggle("overflow-hidden", this.isSidebarOpen);
      this.mobileOverlay?.classList.toggle("hidden", !this.isSidebarOpen);

      // Reset desktop classes
      this.main.classList.remove("md:ml-64", "md:ml-20");
    } else {
      // Desktop specific
      if (isInitialLoad) {
        // Force initial margin on load
        this.main.classList.add("md:ml-64");
      } else {
        this.main.classList.toggle("md:ml-64", this.isSidebarOpen);
        this.main.classList.toggle("md:ml-20", !this.isSidebarOpen);
      }

      // Reset mobile classes
      this.sidebar.classList.remove("-translate-x-full");
      this.main.classList.remove("overflow-hidden");
      this.mobileOverlay?.classList.add("hidden");
    }

    // Common updates
    this.sidebar.classList.toggle("w-64", this.isSidebarOpen);
    this.sidebar.classList.toggle("w-20", !this.isSidebarOpen);

    // Update logo
    if (this.logo) {
      const logoURL = this.host.includes("sirneij.github.io")
        ? `${this.host}/finance-dashboard/assets/images/logo.svg`
        : "./assets/images/logo.svg";
      const logoSmallURL = this.host.includes("sirneij.github.io")
        ? `${this.host}/finance-dashboard/assets/images/logo-small.svg`
        : "./assets/images/logo-small.svg";

      this.logo.src = this.isSidebarOpen
        ? logoURL.replace("null", ".")
        : logoSmallURL.replace("null", ".");

      this.logo.classList.toggle("h-12", this.isSidebarOpen);
      this.logo.classList.toggle("h-8", !this.isSidebarOpen);
    }

    // Update toggle icon
    if (this.togglePath) {
      this.togglePath.setAttribute(
        "d",
        this.isSidebarOpen ? "M15 19l-7-7 7-7" : "M9 19l7-7-7-7"
      );
    }

    // Update labels
    this.navLabels.forEach((label) => {
      label.style.display = this.isSidebarOpen ? "block" : "none";
    });
  }
  highlightCurrentPage() {
    const currentPath = window.location.pathname;

    this.navLinks.forEach((link) => {
      const linkPath = link.getAttribute("href");

      const isActive =
        currentPath === linkPath ||
        (currentPath === "/" && linkPath === "/") ||
        (currentPath !== "/" &&
          linkPath !== "/" &&
          currentPath.includes(linkPath)) ||
        (currentPath === "/" && linkPath === "index.html");

      // Remove existing active classes
      link.classList.remove(
        "bg-gray-100",
        "text-primary-600",
        "dark:bg-gray-700",
        "dark:text-primary-500"
      );

      // Add active classes if current page
      if (isActive) {
        link.classList.add(
          "bg-gray-100",
          "text-primary-600",
          "dark:bg-gray-700",
          "dark:text-primary-500"
        );
      }
    });
  }
}

// Theme handling
const themeController = {
  init() {
    const userTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const theme = userTheme || (systemTheme.matches ? "dark" : "light");

    this.updateTheme(theme === "dark");
    systemTheme.addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        this.updateTheme(e.matches);
      }
    });
  },

  toggle() {
    const isDark = document.documentElement.classList.contains("dark");
    this.updateTheme(!isDark);
    localStorage.setItem("theme", !isDark ? "dark" : "light");
  },

  updateTheme(isDark) {
    document.documentElement.classList.toggle("dark", isDark);
    document.getElementById("sun-icon").classList.toggle("hidden", !isDark);
    document.getElementById("moon-icon").classList.toggle("hidden", isDark);
  },
};

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.sidebarController = new SidebarController();
  themeController.init();
});
