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
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                //順序 下拉選單初始化
                DataTable dataTable = new DataTable();
                dataTable = clsDB.MySQL_Select("SELECT dishes_type_id, dishes_type_name FROM food.c_dishes_type");
                ddl_newdishes_type.DataSource = dataTable;
                ddl_newdishes_type.DataTextField = "dishes_type_name";
                ddl_newdishes_type.DataValueField = "dishes_type_id";
                ddl_newdishes_type.DataBind();
                ddl_newdishes_type.Items.Insert(0, new ListItem("請選擇", "--"));
                //烹飪手法 下拉選單初始化
                DataTable cooking_method_dt = new DataTable();
                cooking_method_dt = clsDB.MySQL_Select("SELECT cooking_method_id, cooking_method FROM food.c_cooking_method");
                ddl_cooking_method.DataSource = cooking_method_dt;
                ddl_cooking_method.DataTextField = "cooking_method";
                ddl_cooking_method.DataValueField = "cooking_method_id";
                ddl_cooking_method.DataBind();
                ddl_cooking_method.Items.Insert(0, new ListItem("請選擇", "--"));
            }
        }

        protected void ddl_cooking_method_SelectedIndexChanged(object sender, EventArgs e)
        {
            gv_view_from_db();
        }

        protected void ddl_newdishes_type_SelectedIndexChanged(object sender, EventArgs e)
        {
            gv_view_from_db();
        }
        /// <summary>
        /// 將查詢資訊 呈現於網頁上
        /// </summary>
        protected void gv_view_from_db()
        {
            //注意! Switch 元件沒有被Checked 從Request.Form.Keys中 不存在
            //foreach (string s in Request.Form.Keys)
            //{
            //    Response.Write(s.ToString() + ": " + Request.Form[s] + "<br>");
            //}
            //幾個狀況
            //下拉選單 變動
            //模糊查詢 關鍵字
            //宣告變數 承接元件狀態
            int cooking_method_selected_index = ddl_cooking_method.SelectedIndex;
            int dishes_type_selected_index = ddl_newdishes_type.SelectedIndex;
            string dishes_name_text = Request.Form["dishes_name_text"];
            string dishes_material_text = Request.Form["dishes_material_text"];
            string dishes_cooking_time_text = Request.Form["dishes_cooking_time_text"];

            if (cooking_method_selected_index !=0 || dishes_type_selected_index != 0)
            {
                DataTable dataTable = new DataTable();
                string sqlcommand_str = @"with a as (SELECT dishes_type_id, dishes_type_name FROM food.c_dishes_type ),
                b as (SELECT cooking_method_id, cooking_method FROM food.c_cooking_method),
                c as (SELECT dishes_name, dishes_type, cooking_method,material_id_names
                 FROM food.c_dishes where ";
                if (cooking_method_selected_index !=0 && dishes_type_selected_index != 0)
                {
                    sqlcommand_str += @"dishes_type = '" + ddl_newdishes_type.SelectedValue + @"' and cooking_method ='"+ddl_cooking_method.SelectedValue+ @"' ) ";
                }else if (cooking_method_selected_index != 0)
                {
                    sqlcommand_str += @"cooking_method ='" + ddl_cooking_method.SelectedValue + @"' ) ";
                }else if (dishes_type_selected_index != 0)
                {
                    sqlcommand_str += @"dishes_type = '" + ddl_newdishes_type.SelectedValue + @"' ) ";
                }
                sqlcommand_str += "select c.dishes_name '名稱',a.dishes_type_name '順序',b.cooking_method '手法',c.material_id_names '食材' from c left join a on c.dishes_type = a.dishes_type_id left join b on c.cooking_method=b.cooking_method_id";

                dataTable = clsDB.MySQL_Select(sqlcommand_str);
                if (dataTable.Rows.Count > 0)
                {
                    gv_view.DataSource = dataTable;
                    gv_view.DataBind();
                }
                else
                {
                    gv_view.DataSource = null;
                    gv_view.DataBind();
                }
            }
            else if (!String.IsNullOrWhiteSpace(dishes_name_text) || !String.IsNullOrWhiteSpace(dishes_material_text))
            {
                DataTable dataTable = new DataTable();
                int first_column = 0;
                string sqlcommand_str = @"with a as (SELECT dishes_type_id, dishes_type_name FROM food.c_dishes_type ),
                b as (SELECT cooking_method_id, cooking_method FROM food.c_cooking_method),
                c as (SELECT dishes_name, dishes_type, cooking_method,material_id_names
                 FROM food.c_dishes where ";
                if (!String.IsNullOrWhiteSpace(dishes_name_text))
                {
                    sqlcommand_str += @"dishes_name like '%"+ dishes_name_text + "%' ";
                    first_column = 1;
                }
                if (!String.IsNullOrWhiteSpace(dishes_material_text))
                {
                    if (first_column == 1)
                    {
                        sqlcommand_str += "and ";
                    }
                    sqlcommand_str += @"material_id_names like '%" + dishes_material_text + "%' ";
                    first_column = 1;
                }
                sqlcommand_str += " ) ";
                sqlcommand_str += "select c.dishes_name '名稱',a.dishes_type_name '順序',b.cooking_method '手法',c.material_id_names '食材' from c left join a on c.dishes_type = a.dishes_type_id left join b on c.cooking_method=b.cooking_method_id";

                dataTable = clsDB.MySQL_Select(sqlcommand_str);
                if (dataTable.Rows.Count > 0)
                {
                    gv_view.DataSource = dataTable;
                    gv_view.DataBind();
                }
                else
                {
                    gv_view.DataSource = null;
                    gv_view.DataBind();
                }
            }
            else
            {
                gv_view.DataSource = null;
                gv_view.DataBind();
            }


        }

        protected void gv_view_RowDataBound(object sender, GridViewRowEventArgs e)
        {

            if (e.Row.RowType == DataControlRowType.DataRow)
            {

            }
        }
    }
}