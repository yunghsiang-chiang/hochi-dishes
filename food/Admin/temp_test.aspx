<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="temp_test.aspx.cs" Inherits="food.Admin.temp_test" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <webopt:BundleReference runat="server" Path="~/Content/css" />
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.3/themes/base/jquery-ui.css" />
    <script src="../Scripts/jquery-3.7.0.js"></script>
    <script src="../Scripts/jquery-ui-1.13.2.js"></script>
    <script src="../Scripts/bootstrap.min.js"></script>
</head>
<body>
    <script>
        $(function () {
            var availableTags = [
                "ActionScript",
                "AppleScript",
                "Asp",
                "BASIC",
                "C",
                "C++",
                "Clojure",
                "COBOL",
                "ColdFusion",
                "Erlang",
                "Fortran",
                "Groovy",
                "Haskell",
                "Java",
                "JavaScript",
                "Lisp",
                "Perl",
                "PHP",
                "Python",
                "Ruby",
                "Scala",
                "Scheme"
            ];
            $(".autoinput").autocomplete({
                source: availableTags
            });
        });
    </script>
    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>
        <div class="container">
            <section>
                <div class="ui-widget">
                    <label for="tags">Tags: </label>
                    <input id="tags" class="form-control autoinput" />
                    <label for="tags">Tags: </label>
                    <input id="tag" class="autoinput" />
                </div>
            </section>
        </div>
    </form>
</body>
</html>
