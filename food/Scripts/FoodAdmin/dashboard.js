$(document).ready(function () {
    $.ajax({
        url: 'http://internal.hochi.org.tw:8082/api/Recipes/description-count',
        method: 'GET',
        success: function (data) {
            // 解析 API 回傳的資料格式
            const descriptions = data.$values.map(item => item.description);
            const quantities = data.$values.map(item => item.qty);

            // 設定 Chart.js 直條圖
            const ctx = $('#recipeChart')[0].getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: descriptions,
                    datasets: [{
                        label: '數量',
                        data: quantities,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: '數量'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: '食譜類別'
                            }
                        }
                    }
                }
            });
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });
});
