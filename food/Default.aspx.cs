using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using food.App_Code;
using System.Net.Sockets;
using System.Web.UI.HtmlControls;
using System.Web.Services;
using MySql.Data.MySqlClient;
using System.Data.SqlClient;
using System.Web.DynamicData;

namespace food
{
    public partial class _Default : Page
    {
        clsDB clsDB = new clsDB();
        // 頁面載入時初始化下拉選單
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                // 初始化 "順序" 下拉選單
                DataTable dataTable = clsDB.MySQL_Select("SELECT dishes_type_id, dishes_type_name FROM food.c_dishes_type");
                ddl_newdishes_type.DataSource = dataTable;
                ddl_newdishes_type.DataTextField = "dishes_type_name";
                ddl_newdishes_type.DataValueField = "dishes_type_id";
                ddl_newdishes_type.DataBind();
                ddl_newdishes_type.Items.Insert(0, new ListItem("請選擇", "--"));

                // 初始化 "烹飪手法" 下拉選單
                DataTable cooking_method_dt = clsDB.MySQL_Select("SELECT cooking_method_id, cooking_method FROM food.c_cooking_method");
                ddl_cooking_method.DataSource = cooking_method_dt;
                ddl_cooking_method.DataTextField = "cooking_method";
                ddl_cooking_method.DataValueField = "cooking_method_id";
                ddl_cooking_method.DataBind();
                ddl_cooking_method.Items.Insert(0, new ListItem("請選擇", "--"));
            }
        }
        // 當 "烹飪手法" 選擇變更時重新查詢資料
        protected void ddl_cooking_method_SelectedIndexChanged(object sender, EventArgs e)
        {
            gv_view_from_db();
        }
        // 當 "順序" 選擇變更時重新查詢資料
        protected void ddl_newdishes_type_SelectedIndexChanged(object sender, EventArgs e)
        {
            gv_view_from_db();
        }
        /// <summary>
        /// 從資料庫查詢資料並顯示在 GridView 中
        /// </summary>
        protected void gv_view_from_db()
        {
            // 取得元件的狀態
            int cooking_method_selected_index = ddl_cooking_method.SelectedIndex;
            int dishes_type_selected_index = ddl_newdishes_type.SelectedIndex;
            string dishes_name_text = Request.Form["dishes_name_text"];
            string dishes_material_text = Request.Form["dishes_material_text"];

            // 構建查詢字串
            string sqlcommand_str = @"WITH a AS (SELECT dishes_type_id, dishes_type_name FROM food.c_dishes_type),
                                      b AS (SELECT cooking_method_id, cooking_method FROM food.c_cooking_method),
                                      c AS (SELECT dishes_name, dishes_type, cooking_method, material_id_names
                                            FROM food.c_dishes WHERE 1=1";

            // 根據下拉選單選擇的條件拼接 SQL 查詢
            if (cooking_method_selected_index != 0)
            {
                sqlcommand_str += " AND cooking_method = @CookingMethod";
            }
            if (dishes_type_selected_index != 0)
            {
                sqlcommand_str += " AND dishes_type = @DishesType";
            }

            // 查詢關鍵字
            if (!string.IsNullOrWhiteSpace(dishes_name_text))
            {
                sqlcommand_str += " AND dishes_name LIKE @DishesName";
            }
            if (!string.IsNullOrWhiteSpace(dishes_material_text))
            {
                sqlcommand_str += " AND material_id_names LIKE @Material";
            }

            sqlcommand_str += @") 
                              SELECT c.dishes_name AS '名稱', a.dishes_type_name AS '順序', 
                                     b.cooking_method AS '手法', c.material_id_names AS '食材' 
                              FROM c 
                              LEFT JOIN a ON c.dishes_type = a.dishes_type_id 
                              LEFT JOIN b ON c.cooking_method = b.cooking_method_id";

            // 建立參數化查詢，防止 SQL 注入
            var parameters = new List<MySqlParameter>();
            if (cooking_method_selected_index != 0)
            {
                parameters.Add(new MySqlParameter("@CookingMethod", ddl_cooking_method.SelectedValue));
            }
            if (dishes_type_selected_index != 0)
            {
                parameters.Add(new MySqlParameter("@DishesType", ddl_newdishes_type.SelectedValue));
            }
            if (!string.IsNullOrWhiteSpace(dishes_name_text))
            {
                parameters.Add(new MySqlParameter("@DishesName", "%" + dishes_name_text + "%"));
            }
            if (!string.IsNullOrWhiteSpace(dishes_material_text))
            {
                parameters.Add(new MySqlParameter("@Material", "%" + dishes_material_text + "%"));
            }

            // 查詢資料庫
            DataTable dataTable = clsDB.MySQL_Select(sqlcommand_str, parameters.ToArray());

            // 顯示查詢結果
            gv_view.DataSource = dataTable;
            gv_view.DataBind();
        }

        protected void gv_view_RowDataBound(object sender, GridViewRowEventArgs e)
        {

            if (e.Row.RowType == DataControlRowType.DataRow)
            {

            }
        }
    }
}