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

        //protected void bt_newdishes_image_Click(object sender, EventArgs e)
        //{
        //    //1.檢查是否已選好檔案，若否，則停止上傳。
        //    if (FileUpload1.HasFile == false)
        //    {
        //        Response.Write("<script>alert('請先挑選檔案之後，再來上傳!');</script>");
        //        return;
        //    }
        //    //2.檢查副檔名是否允許
        //    string fileName = FileUpload1.FileName;  //-- User上傳的檔名（不包含 Client端的路徑！）

        //    string fileExtension = Path.GetExtension(fileName).ToLower();//取得副檔名

        //    List<string> allowExtension = new List<string> { ".jpg", ".bmp", ".heic" };
        //    if (allowExtension.IndexOf(fileExtension) == -1)
        //    {
        //        Response.Write("<script>alert('此檔案類型不被允許，請重新挑選!');</script>");
        //        return;
        //    }
        //    //3.檢查檔案大小是否允許
        //    int filesize = FileUpload1.PostedFile.ContentLength;//取得檔案大小
        //    int allowsize = 3500000;//(K) //允許大小 
        //    if (filesize > allowsize)
        //    {
        //        Response.Write("<script>alert('您上傳的檔案大小是:" + filesize / 1024 + " K，必須小於: 3.5MB');</script>");
        //        return;
        //    }
        //    //4.檢查路徑是否存在，不存在就自動建立
        //    string savePath = "C:\\Users\\egrou\\source\\repos\\food\\food\\images\\";
        //    if (Directory.Exists(savePath) == false)
        //    {
        //        Directory.CreateDirectory(savePath);
        //    }

        //    //5.檢查檔名是否有同名
        //    string savepathfilename = Path.Combine(savePath, fileName);//結合檔案路徑+檔名
        //    string onlyfileName = Path.GetFileNameWithoutExtension(fileName);//取得檔名(不含副檔名)
        //    int i = 1;
        //    while (File.Exists(savepathfilename))
        //    {
        //        fileName = string.Concat(onlyfileName, "_", i, fileExtension);
        //        savepathfilename = Path.Combine(savePath, fileName);
        //        i++;
        //    }
        //    //6.完成檔案上傳的動作。
        //    ViewState["savepathfilename"] = savepathfilename;
        //    FileUpload1.SaveAs(savepathfilename);
        //    //Response.Write("<script>alert('上傳成功，檔名----" + fileName + " ; 檔案大小: " + filesize / 1000 + " k');</script>");

        //    if (fileExtension == ".heic")
        //    {
        //        //將上傳的檔案 轉換jpg 提供網頁顯示
        //        FileInfo info = new FileInfo("C:\\Users\\egrou\\source\\repos\\food\\food\\images\\" + fileName);
        //        using (MagickImage image = new MagickImage(info.FullName))
        //        {
        //            // Save frame as jpg
        //            image.Write("C:\\Users\\egrou\\source\\repos\\food\\food\\images\\" + onlyfileName + ".jpg");
        //        }
        //        i_newdishes_image.ImageUrl = "~/images/" + onlyfileName + ".jpg";
        //    }else if (fileExtension == ".jpg" || fileExtension == ".bmp")
        //    {
        //        //將上傳的檔案 轉換jpg 提供網頁顯示
        //        i_newdishes_image.ImageUrl = "~/images/" + onlyfileName + fileExtension;
        //    }
        //}
    }
}