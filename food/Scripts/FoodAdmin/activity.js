$(document).ready(function () {
    const apiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/activity-meals';

    // 當按下生成餐點選擇按鈕時
    $('#generateMeals').click(function () {
        const activityName = $('#activity_name').val();
        const startDate = $('#start_date').val();
        const endDate = $('#end_date').val();

        if (!activityName || !startDate || !endDate) {
            alert('請填寫活動名稱、起始日期和結束日期。');
            return;
        }

        // 清空並顯示餐點選擇區域
        $('#mealSelectionContainer').empty();
        $('#mealSelectionArea').show();
        $('#saveActivities').show();

        // 生成日期區間
        const start = new Date(startDate);
        const end = new Date(endDate);
        for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
            const formattedDate = date.toISOString().split('T')[0];
            $('#mealSelectionContainer').append(`
                <div class="mb-2">
                    <strong>${formattedDate}</strong>
                    <div class="btn-group ms-2">
                        <button type="button" class="btn btn-outline-primary meal-btn" data-date="${formattedDate}" data-meal="早餐">早餐</button>
                        <button type="button" class="btn btn-outline-primary meal-btn" data-date="${formattedDate}" data-meal="午餐">午餐</button>
                        <button type="button" class="btn btn-outline-primary meal-btn" data-date="${formattedDate}" data-meal="晚餐">晚餐</button>
                    </div>
                </div>
            `);
        }

        // 切換按鈕亮/灰色狀態
        $('.meal-btn').click(function () {
            $(this).toggleClass('btn-primary');
            $(this).toggleClass('btn-outline-primary');
        });
    });

    // 收集活動資料並上傳至API
    $('#saveActivities').click(function () {
        const activityName = $('#activity_name').val();
        const startDate = $('#start_date').val();
        const endDate = $('#end_date').val();
        const activities = [];

        // 遍歷所有亮色按鈕，收集餐點資料
        $('.meal-btn.btn-primary').each(function () {
            const activityDate = $(this).data('date');
            const mealType = $(this).data('meal');

            activities.push({
                activity_name: activityName,
                start_date: startDate,
                end_date: endDate,
                activity_date: activityDate,
                meal_type: mealType
            });
        });

        if (activities.length === 0) {
            alert('請至少選擇一個餐別。');
            return;
        }

        console.log(activities);

        // 發送POST請求
        $.ajax({
            url: apiUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(activities),
            success: function () {
                alert('活動已成功儲存！');
                resetForm();
            },
            error: function (xhr) {
                alert('儲存活動失敗: ' + xhr.responseText);
            }
        });
    });

    // 重置表單
    function resetForm() {
        $('#activity_name').val('');
        $('#start_date').val('');
        $('#end_date').val('');
        $('#mealSelectionContainer').empty();
        $('#mealSelectionArea').hide();
        $('#saveActivities').hide();
    }
});
