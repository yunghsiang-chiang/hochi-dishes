$(document).ready(function () {
    // API URL
    const apiUrl = "http://internal.hochi.org.tw:8082/api/Chefs/chefs/recipeCounts";

    // 使用 AJAX 取得資料
    $.getJSON(apiUrl, function (data) {
        // 過濾資料，提取 chefName 和 recipeCount
        const chefNames = data.$values.map(item => item.chefName);
        const recipeCounts = data.$values.map(item => item.recipeCount);

        // 建立 Chart.js 圖表
        const ctx = document.getElementById('chefRecipeChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chefNames,
                datasets: [{
                    label: 'Recipe Count',
                    data: recipeCounts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Chef Name'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Recipe Count'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            }
        });
    }).fail(function () {
        alert("Failed to load data from API.");
    });
});
