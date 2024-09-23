using food.App_Code;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ImageMagick;

namespace food
{
    public partial class New_dishes : System.Web.UI.Page
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
                //烹飪手法 下拉選單初始化
                DataTable dt = new DataTable();
                dt = clsDB.MySQL_Select("SELECT cooking_method_id, cooking_method  FROM food.c_cooking_method");
                ddl_cooking_method.DataSource = dt;
                ddl_cooking_method.DataTextField = "cooking_method";
                ddl_cooking_method.DataValueField = "cooking_method_id";
                ddl_cooking_method.DataBind();

                if (Request.QueryString["dishes_name"] != null)
                {
                    DataTable get_food_infor_dt = new DataTable();
                    get_food_infor_dt = clsDB.MySQL_Select("SELECT dishes_type, cooking_method, dishes_image FROM food.c_dishes where dishes_name ='"+ Request.QueryString["dishes_name"] + "'");
                    if (get_food_infor_dt.Rows.Count>0)
                    {
                        ddl_newdishes_type.Items.FindByValue(get_food_infor_dt.Rows[0]["dishes_type"].ToString()).Selected = true;
                        ddl_cooking_method.Items.FindByValue(get_food_infor_dt.Rows[0]["cooking_method"].ToString()).Selected = true;
                        blah.Src = get_food_infor_dt.Rows[0]["dishes_image"].ToString();
                    }
                }
            }
        }
    }
}