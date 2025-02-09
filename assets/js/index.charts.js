function initializeMonthlyChart() {
  const options = {
    series: [
      {
        name: "Income",
        data: [3000, 3500, 4000, 3800, 4200, 4500],
      },
      {
        name: "Expenses",
        data: [2500, 2800, 3000, 2900, 3100, 3300],
      },
      {
        name: "Savings",
        data: [500, 700, 1000, 900, 1100, 1200],
      },
    ],
    chart: {
      type: "area",
      height: 300,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
        autoSelected: "zoom",
      },
      fontFamily: "inherit",
      background: "transparent",
    },
    colors: ["#22c55e", "#ef4444", "#3b82f6"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    grid: {
      borderColor: "rgba(156, 163, 175, 0.1)",
      strokeDashArray: 4,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      labels: {
        style: {
          colors: "rgba(156, 163, 175, 0.9)",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => `$${value}`,
        style: {
          colors: "rgba(156, 163, 175, 0.9)",
        },
      },
    },
    legend: {
      show: false,
    },
    theme: {
      mode: document.documentElement.classList.contains("dark")
        ? "dark"
        : "light",
    },
  };

  return new ApexCharts(
    document.querySelector("#monthly-summary-chart"),
    options
  );
}

function initializeFinancialChart() {
  const options = {
    series: [
      {
        name: "Income",
        data: [1500, 2000, 1800, 2200, 1900],
      },
      {
        name: "Expenses",
        data: [1200, 1400, 1100, 1600, 1300],
      },
      {
        name: "Balance",
        data: [300, 600, 700, 600, 600],
      },
    ],
    chart: {
      type: "area",
      height: "100%",
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
        autoSelected: "zoom",
      },
      fontFamily: "inherit",
      background: "transparent",
    },
    colors: ["#22c55e", "#ef4444", "#3b82f6"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 2,
      curve: "smooth",
      dashArray: [0, 0, 5],
    },
    grid: {
      borderColor: "rgba(156, 163, 175, 0.1)",
      strokeDashArray: 4,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    xaxis: {
      categories: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
      labels: {
        style: {
          colors: "rgba(156, 163, 175, 0.9)",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => `$${value}`,
        style: {
          colors: "rgba(156, 163, 175, 0.9)",
        },
      },
    },
    legend: {
      show: false,
    },
    theme: {
      mode: document.documentElement.classList.contains("dark")
        ? "dark"
        : "light",
    },
  };

  return new ApexCharts(
    document.querySelector("#financial-trends-chart"),
    options
  );
}

// Initialize charts when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const monthlyChart = initializeMonthlyChart();
  const financialChart = initializeFinancialChart();

  monthlyChart.render();
  financialChart.render();

  // Handle theme changes
  const observer = new MutationObserver(() => {
    const isDark = document.documentElement.classList.contains("dark");
    monthlyChart.updateOptions({ theme: { mode: isDark ? "dark" : "light" } });
    financialChart.updateOptions({
      theme: { mode: isDark ? "dark" : "light" },
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  // Handle resize
  window.addEventListener(
    "resize",
    debounce(() => {
      monthlyChart.updateOptions({});
      financialChart.updateOptions({});
    }, 300)
  );
});

function debounce(fn, ms) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, arguments), ms);
  };
}
