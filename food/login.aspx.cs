using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using food.App_Code;

namespace food
{
    public partial class login : System.Web.UI.Page
    {
        clsDB clsDB = new clsDB();  
        protected void Page_Load(object sender, EventArgs e)
        {

            if (!IsPostBack)
            {
                //連接慈場IP才能拜訪登入頁面
                string ip_address = clsDB.GetIPAddress();
                if (ip_address.StartsWith("10.10.3") || ip_address.StartsWith("10.10.1"))
                {
                    //可以登入
                }
                else
                {
                    //不可以登入管理者
                    Response.Redirect("http://10.10.3.75:8080/");
                }

                //如果已經登入過，再次進入=登出
                HttpCookie reqCookies = Request.Cookies["person"];
                if (reqCookies != null)
                {
                    reqCookies.Expires = DateTime.Now.AddDays(-1);
                    Response.Cookies.Add(reqCookies);
                    //套轉回原本網址
                    if (String.IsNullOrEmpty(Request.QueryString["beforeUrls"]))
                    {
                        Response.Redirect("http://10.10.3.75:8080/");
                    }
                    else
                    {
                        Response.Redirect(Request.QueryString["beforeUrls"]);
                    }
                }
            }
            
            
        }
        /// <summary>
        /// 登入功能
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void bt_submit_Click(object sender, EventArgs e)
        {
            String str_accound = Request.Form["tb_account"].ToString();
            String str_password = Request.Form["tb_password"].ToString();

            DataTable logindt = new DataTable();
            logindt = clsDB.MySQL_Select("SELECT person_id, person_name, person_password, person_area, person_subinv FROM hochi_config.c_fellow_hochi_learners where person_id = '" + str_accound + "' and person_password = MD5('" + str_password + "')");
            Response.Write("<script>console.log('"+ "SELECT person_id, person_name, person_password, person_area, person_subinv FROM hochi_config.c_fellow_hochi_learners where person_id = '" + str_accound + "' and person_password = MD5('" + str_password + "')" + "');</script>");
            if (logindt.Rows.Count > 0)
            {
                //產生一個Cookie
                HttpCookie cookie = new HttpCookie("person");
                //設定單值
                cookie["person_id"] = Server.UrlEncode(logindt.Rows[0]["person_id"].ToString());
                cookie["person_name"] = Server.UrlEncode(logindt.Rows[0]["person_name"].ToString());
                cookie["person_area"] = Server.UrlEncode(logindt.Rows[0]["person_area"].ToString());
                cookie["person_subinv"] = Server.UrlEncode(logindt.Rows[0]["person_subinv"].ToString());
                //設定過期日
                cookie.Expires = DateTime.Now.AddDays(30);
                //寫到用戶端
                Response.Cookies.Add(cookie);
                //套轉回原本網址
                if (String.IsNullOrEmpty(Request.QueryString["beforeUrls"]))
                {
                    Response.Redirect("http://10.10.3.75:8080/");
                }
                else
                {
                    Response.Redirect(Request.QueryString["beforeUrls"]);
                }
            }
            Response.Write("<script>alert('功能撰寫中...\\n帳號:" + str_accound + "\\n密碼:" + str_password + "');</script>");
        }
    }
}