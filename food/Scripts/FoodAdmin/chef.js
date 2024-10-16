$(document).ready(function () {
    const apiUrl = 'http://internal.hochi.org.tw:8082/api/dishes/chefs';

    // 加载现有的厨师数据
    loadChefs();

    // 点击提交按钮时
    $('#submitChef').click(function () {
        var chefId = $('#chefId').val();
        var chefName = $('#chefName').val();
        var region = $('#region').val();

        const chefData = {
            name: chefName,
            region: region
        };

        // 如果 chefId 有值，表示是更新操作
        if (chefId) {
            chefData.chef_id = parseInt(chefId);
        }

        $.ajax({
            type: "POST",
            url: apiUrl,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(chefData),
            success: function (response) {
                alert('Chef saved successfully!');
                if (chefId) {
                    updateChefRow(response);
                } else {
                    addChefRow(response);
                }
                resetForm();
            },
            error: function (xhr, status, error) {
                alert('Error: ' + xhr.responseText);
            }
        });
    });

    // 加载厨师列表
    function loadChefs() {
        $.ajax({
            type: "GET",
            url: apiUrl,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (chefs) {
                renderChefs(chefs);
            },
            error: function (xhr, status, error) {
                alert('Failed to load chefs: ' + xhr.responseText);
            }
        });
    }

    // 渲染厨师列表
    function renderChefs(chefs) {
        var rows = '';
        chefs.forEach(function (chef) {
            rows += generateChefRow(chef);
        });
        $('#chefTable tbody').html(rows);

        // 绑定编辑按钮
        bindEditButtons();
    }

    // 添加新厨师行到表格
    function addChefRow(chef) {
        const row = generateChefRow(chef);
        $('#chefTable tbody').append(row);
        bindEditButtons();
    }

    // 更新表格中某个厨师的行
    function updateChefRow(chef) {
        const row = generateChefRow(chef);
        $('#chefTable tbody').find(`tr[data-id='${chef.chef_id}']`).replaceWith(row);
        bindEditButtons();
    }

    // 生成厨师的表格行 HTML
    function generateChefRow(chef) {
        return `<tr data-id="${chef.chef_id}">
                    <td>${chef.chef_id}</td>
                    <td>${chef.name}</td>
                    <td>${chef.region || ''}</td>
                    <td>
                        <button type="button" class="btn btn-secondary edit" data-id="${chef.chef_id}" data-name="${chef.name}" data-region="${chef.region}">Edit</button>
                    </td>
                </tr>`;
    }

    // 绑定编辑按钮的事件
    function bindEditButtons() {
        $('.edit').off('click').on('click', function () {
            var chefId = $(this).data('id');
            var chefName = $(this).data('name');
            var region = $(this).data('region');
            $('#chefId').val(chefId);
            $('#chefName').val(chefName);
            $('#region').val(region);
        });
    }

    // 重置表单
    function resetForm() {
        $('#chefId').val('');
        $('#chefName').val('');
        $('#region').val('');
    }
});
