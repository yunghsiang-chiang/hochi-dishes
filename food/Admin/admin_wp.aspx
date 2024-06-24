<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="admin_wp.aspx.cs" Inherits="food.Admin.admin_wp" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
        <ajaxToolkit:TabContainer ID="TabContainer1" runat="server">
            <ajaxToolkit:TabPanel ID="TabPanel1" runat="server">
                <HeaderTemplate>參數設定</HeaderTemplate>
                <ContentTemplate>

                </ContentTemplate>
            </ajaxToolkit:TabPanel>
            <ajaxToolkit:TabPanel ID="TabPanel2" runat="server">
                <HeaderTemplate>食材管理</HeaderTemplate>
                <ContentTemplate>

                </ContentTemplate>
            </ajaxToolkit:TabPanel>
            <ajaxToolkit:TabPanel ID="TabPanel3" runat="server">
                <HeaderTemplate>菜色管理</HeaderTemplate>
                <ContentTemplate>

                </ContentTemplate>
            </ajaxToolkit:TabPanel>
            <ajaxToolkit:TabPanel ID="TabPanel4" runat="server">
                <HeaderTemplate>菜單管理</HeaderTemplate>
                <ContentTemplate>

                </ContentTemplate>
            </ajaxToolkit:TabPanel>
            <ajaxToolkit:TabPanel ID="TabPanel5" runat="server">
                <HeaderTemplate>課程活動菜單管理</HeaderTemplate>
                <ContentTemplate>

                </ContentTemplate>
            </ajaxToolkit:TabPanel>
            <ajaxToolkit:TabPanel ID="TabPanel6" runat="server">
                <HeaderTemplate>報表分析</HeaderTemplate>
                <ContentTemplate>

                </ContentTemplate>
            </ajaxToolkit:TabPanel>
            <ajaxToolkit:TabPanel ID="TabPanel7" runat="server">
                <HeaderTemplate>採購管理</HeaderTemplate>
                <ContentTemplate>

                </ContentTemplate>
            </ajaxToolkit:TabPanel>
            <ajaxToolkit:TabPanel ID="TabPanel8" runat="server">
                <HeaderTemplate>回前台</HeaderTemplate>
                <ContentTemplate></ContentTemplate>
            </ajaxToolkit:TabPanel>
        </ajaxToolkit:TabContainer>
    </form>
</body>
</html>
