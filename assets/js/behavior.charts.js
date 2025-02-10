document.addEventListener("DOMContentLoaded", function () {
  // Sample data - replace with real data
  const categories = {
    groceries: 30,
    utilities: 20,
    entertainment: 15,
    transport: 25,
    others: 10,
  };

  const options = {
    series: Object.values(categories),
    labels: Object.keys(categories).map(
      (cat) => cat.charAt(0).toUpperCase() + cat.slice(1)
    ),
    chart: {
      type: "pie",
      height: 300,
      foreColor: document.documentElement.classList.contains("dark")
        ? "#9ca3af"
        : "#4b5563",
    },
    colors: ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"],
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    theme: {
      mode: document.documentElement.classList.contains("dark")
        ? "dark"
        : "light",
    },
  };

  const chart = new ApexCharts(
    document.querySelector("#spending-categories-chart"),
    options
  );
  chart.render();

  // Update chart theme when dark mode changes
  const observer = new MutationObserver(() => {
    const isDark = document.documentElement.classList.contains("dark");
    chart.updateOptions({
      chart: {
        foreColor: isDark ? "#9ca3af" : "#4b5563",
      },
      theme: {
        mode: isDark ? "dark" : "light",
      },
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
});
