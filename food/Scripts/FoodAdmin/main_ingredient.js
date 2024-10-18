$(document).ready(function () {
    const apiUrl = 'http://internal.hochi.org.tw:8082/api/MainIngredients';

    // 加载现有的主食材数据
    loadMainIngredients();

    // 提交按钮点击时
    $('#submitMainIngredient').click(function () {
        var mainIngredientId = $('#mainIngredientId').val();
        var mainIngredientName = $('#mainIngredientName').val();
        var description = $('#description').val();
        var category = $('#category').val();

        const mainIngredientData = {
            main_ingredient_name: mainIngredientName,
            description: description,
            category: category
        };

        if (mainIngredientId) {
            mainIngredientData.main_ingredient_id = parseInt(mainIngredientId);
        }

        $.ajax({
            type: "POST",
            url: apiUrl,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(mainIngredientData),
            success: function (response) {
                alert('Main Ingredient saved successfully!');
                loadMainIngredients();
                resetForm();
            },
            error: function (xhr, status, error) {
                alert('Error: ' + xhr.responseText);
            }
        });
    });

    // 删除按钮点击时
    $('#deleteMainIngredient').click(function () {
        var mainIngredientId = $('#mainIngredientId').val();
        if (!mainIngredientId) {
            alert('Please select a main ingredient to delete.');
            return;
        }

        if (confirm('Are you sure you want to delete this main ingredient?')) {
            $.ajax({
                type: "DELETE",
                url: `${apiUrl}/${mainIngredientId}`,
                success: function () {
                    alert('Main Ingredient deleted successfully!');
                    loadMainIngredients();
                    resetForm();
                },
                error: function (xhr, status, error) {
                    alert('Error: ' + xhr.responseText);
                }
            });
        }
    });

    // 加载主食材列表
    function loadMainIngredients() {
        $.ajax({
            type: "GET",
            url: apiUrl,
            contentType: "application/json",
            dataType: "json",
            success: function (mainIngredients) {
                renderMainIngredients(mainIngredients);
            },
            error: function (xhr, status, error) {
                alert('Failed to load main ingredients: ' + xhr.responseText);
            }
        });
    }

    // 渲染主食材列表
    function renderMainIngredients(mainIngredients) {
        var rows = '';
        mainIngredients.forEach(function (mainIngredient) {
            rows += `<tr data-id="${mainIngredient.main_ingredient_id}">
                        <td>${mainIngredient.main_ingredient_id}</td>
                        <td>${mainIngredient.main_ingredient_name}</td>
                        <td>${mainIngredient.description || ''}</td>
                        <td>${mainIngredient.category || ''}</td>
                        <td>
                            <button class="btn btn-secondary edit" data-id="${mainIngredient.main_ingredient_id}">Edit</button>
                        </td>
                    </tr>`;
        });
        $('#mainIngredientTable tbody').html(rows);

        $('.edit').click(function () {
            var mainIngredientId = $(this).data('id');
            loadMainIngredientDetails(mainIngredientId);
        });
    }

    // 加载单个主食材的详细信息
    function loadMainIngredientDetails(mainIngredientId) {
        $.ajax({
            type: "GET",
            url: `${apiUrl}/${mainIngredientId}`,
            success: function (mainIngredient) {
                $('#mainIngredientId').val(mainIngredient.main_ingredient_id);
                $('#mainIngredientName').val(mainIngredient.main_ingredient_name);
                $('#description').val(mainIngredient.description);
                $('#category').val(mainIngredient.category);
            },
            error: function (xhr, status, error) {
                alert('Failed to load main ingredient details: ' + xhr.responseText);
            }
        });
    }

    // 重置表单
    function resetForm() {
        $('#mainIngredientId').val('');
        $('#mainIngredientName').val('');
        $('#description').val('');
        $('#category').val('');
    }
});
