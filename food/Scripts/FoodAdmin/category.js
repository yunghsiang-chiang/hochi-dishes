$(document).ready(function () {
    const apiUrl = 'http://internal.hochi.org.tw:8082/api/dishes/categories';

    // 加载现有的分类
    loadCategories();

    // 点击提交按钮时
    $('#submitCategory').click(function () {
        var categoryId = $('#categoryId').val();
        var categoryName = $('#categoryName').val();
        var description = $('#description').val();
        var icon = $('#icon').val();

        const categoryData = {
            category_name: categoryName,
            description: description,
            icon: icon
        };

        // 如果 categoryId 有值，表示是更新操作
        if (categoryId) {
            categoryData.category_id = parseInt(categoryId);
        }

        $.ajax({
            type: "POST",
            url: apiUrl,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(categoryData),
            success: function (response) {
                alert('Category saved successfully!');
                if (categoryId) {
                    updateCategoryRow(response);
                } else {
                    addCategoryRow(response);
                }
                resetForm();
            },
            error: function (xhr, status, error) {
                alert('Error: ' + xhr.responseText);
            }
        });
    });

    // 加载分类列表
    function loadCategories() {
        $.ajax({
            type: "GET",
            url: apiUrl,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (categories) {
                renderCategories(categories);
            },
            error: function (xhr, status, error) {
                alert('Failed to load categories: ' + xhr.responseText);
            }
        });
    }

    // 渲染分类列表
    function renderCategories(categories) {
        var rows = '';
        categories.forEach(function (category) {
            rows += generateCategoryRow(category);
        });
        $('#categoryTable tbody').html(rows);

        // 绑定编辑按钮
        bindEditButtons();
    }

    // 添加新分类行到表格
    function addCategoryRow(category) {
        const row = generateCategoryRow(category);
        $('#categoryTable tbody').append(row);
        bindEditButtons();
    }

    // 更新表格中某个分类的行
    function updateCategoryRow(category) {
        const row = generateCategoryRow(category);
        $('#categoryTable tbody').find(`tr[data-id='${category.category_id}']`).replaceWith(row);
        bindEditButtons();
    }

    // 生成分类的表格行 HTML，包含 Icon 图片
    function generateCategoryRow(category) {
        return `<tr data-id="${category.category_id}">
                <td>${category.category_id}</td>
                <td>${category.category_name}</td>
                <td>${category.description || ''}</td>
                <td>${category.icon ? `<img src="${category.icon}" alt="${category.category_name}" style="width: 50px; height: 50px;">` : 'No icon'}</td>
                <td>
                    <button type="button" class="btn btn-secondary edit" data-id="${category.category_id}" data-name="${category.category_name}" data-description="${category.description}" data-icon="${category.icon}">Edit</button>
                </td>
            </tr>`;
    }

    // 绑定编辑按钮的事件
    function bindEditButtons() {
        $('.edit').off('click').on('click', function () {
            var categoryId = $(this).data('id');
            var categoryName = $(this).data('name');
            var description = $(this).data('description');
            var icon = $(this).data('icon');
            $('#categoryId').val(categoryId);
            $('#categoryName').val(categoryName);
            $('#description').val(description);
            $('#icon').val(icon);
        });
    }

    // 重置表单
    function resetForm() {
        $('#categoryId').val('');
        $('#categoryName').val('');
        $('#description').val('');
        $('#icon').val('');
    }
});
