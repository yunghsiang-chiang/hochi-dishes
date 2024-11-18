$(document).ready(function () {
    const getIngredientsApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/food-nutrition';
    const saveIngredientApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/food-nutrition';

    // 初始化載入所有食材
    loadIngredients();

    // 監聽儲存按鈕
    $('#saveIngredientBtn').click(function () {
        const ingredientId = $('#ingredient_id').val();
        const ingredientName = $('#ingredient_name').val().trim();
        const commonName = $('#common_name').val().trim();

        if (!ingredientName) {
            alert('Ingredient Name is required.');
            return;
        }

        const data = {
            ingredient_id: ingredientId || undefined,
            ingredient_name: ingredientName,
            common_name: commonName || ''
        };

        saveIngredient(data);
    });

    // 載入食材列表
    function loadIngredients() {
        $.get(getIngredientsApiUrl, function (response) {
            const ingredients = response.$values || [];
            const $tableBody = $('#ingredientTable tbody');
            $tableBody.empty();

            ingredients.forEach((ingredient) => {
                const row = `
                    <tr>
                        <td>${ingredient.ingredient_id}</td>
                        <td>${ingredient.ingredient_name}</td>
                        <td>${ingredient.common_name || '—'}</td>
                        <td>
                            <button type="button" class="btn btn-sm btn-primary editIngredientBtn" data-id="${ingredient.ingredient_id}" 
                                data-name="${ingredient.ingredient_name}" 
                                data-common="${ingredient.common_name}">
                                Edit
                            </button>
                        </td>
                    </tr>
                `;
                $tableBody.append(row);
            });

            // 綁定編輯按鈕的點擊事件
            $('.editIngredientBtn').click(function () {
                const ingredientId = $(this).data('id');
                const ingredientName = $(this).data('name');
                const commonName = $(this).data('common');

                // 填入表單
                $('#ingredient_id').val(ingredientId);
                $('#ingredient_name').val(ingredientName);
                $('#common_name').val(commonName || '');
            });
        });
    }

    // 儲存食材
    function saveIngredient(data) {
        $.ajax({
            url: saveIngredientApiUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function () {
                alert('Ingredient saved successfully!');
                resetForm();
                loadIngredients();
            },
            error: function (xhr) {
                alert('Error saving ingredient: ' + xhr.responseText);
            }
        });
    }

    // 重置表單
    function resetForm() {
        $('#ingredient_id').val('');
        $('#ingredient_name').val('');
        $('#common_name').val('');
    }
});
