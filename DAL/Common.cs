using System;
using System.Collections;
using System.Data;
using System.Data.SqlClient;
using System.Security.Cryptography;
using System.Text;
using System.Web.UI.WebControls;


namespace DAL
{
    public class Common
    {

        SqlDataAdapter da;
        SqlConnection dbConn;
        SqlCommand cmd;
        DataSet ds;
        DataTable dt;
        private Hashtable m_Erroobj = new Hashtable();
        string ConnectionString1 = System.Configuration.ConfigurationManager.AppSettings["dbconn"].ToString();

        public DataSet select_data(string procedure, string call_name, string sel1, string sel2, string sel3, string sel4)
        {
            //try
            //{
            dbConn = new SqlConnection(ConnectionString1);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.Add(new SqlParameter("@call_name", call_name));
            cmd.Parameters.Add(new SqlParameter("@sel1", sel1));
            cmd.Parameters.Add(new SqlParameter("@sel2", sel2));
            cmd.Parameters.Add(new SqlParameter("@sel3", sel3));
            cmd.Parameters.Add(new SqlParameter("@sel4", sel4));

            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds);
            dbConn.Close();
            //cmd.ExecuteNonQuery();

            return ds;
            //}
            //catch
            //{
            //    return null;
            //}
        }

        public DataSet select_data_6(string procedure, string call_name, string sel1, string sel2, string sel3, string sel4, string sel5, string sel6)
        {
            //try
            //{
            dbConn = new SqlConnection(ConnectionString1);
            dbConn.Open();

            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.Add(new SqlParameter("@call_name", call_name));
            cmd.Parameters.Add(new SqlParameter("@sel1", sel1));
            cmd.Parameters.Add(new SqlParameter("@sel2", sel2));
            cmd.Parameters.Add(new SqlParameter("@sel3", sel3));
            cmd.Parameters.Add(new SqlParameter("@sel4", sel4));
            cmd.Parameters.Add(new SqlParameter("@sel5", sel5));
            cmd.Parameters.Add(new SqlParameter("@sel6", sel6));

            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds);
            dbConn.Close();

            //cmd.ExecuteNonQuery();

            return ds;
            //}
            //catch
            //{
            //    return null;
            //}
        }

        public DataSet select_data_20(string comCostID, string ProcName, string CallType,
            string parm1 = "", string parm2 = "", string parm3 = "", string parm4 = "", string parm5 = "", string parm6 = "", string parm7 = "", string parm8 = "",
            string parm9 = "", string parm10 = "", string parm11 = "", string parm12 = "", string parm13 = "", string parm14 = "", string parm15 = "",
            string parm16 = "", string parm17 = "", string parm18 = "", string parm19 = "", string parm20 = "")
        {
            try
            {
                dbConn = new SqlConnection(ConnectionString1);
                dbConn.Open();

                cmd = new SqlCommand(ProcName, dbConn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@ComC1", comCostID));
                cmd.Parameters.Add(new SqlParameter("@CallType", CallType));
                cmd.Parameters.Add(new SqlParameter("@Desc1", parm1));
                cmd.Parameters.Add(new SqlParameter("@Desc2", parm2));
                cmd.Parameters.Add(new SqlParameter("@Desc3", parm3));
                cmd.Parameters.Add(new SqlParameter("@Desc4", parm4));
                cmd.Parameters.Add(new SqlParameter("@Desc5", parm5));
                cmd.Parameters.Add(new SqlParameter("@Desc6", parm6));
                cmd.Parameters.Add(new SqlParameter("@Desc7", parm7));
                cmd.Parameters.Add(new SqlParameter("@Desc8", parm8));
                cmd.Parameters.Add(new SqlParameter("@Desc9", parm9));
                cmd.Parameters.Add(new SqlParameter("@Desc10", parm10));
                cmd.Parameters.Add(new SqlParameter("@Desc11", parm11));
                cmd.Parameters.Add(new SqlParameter("@Desc12", parm12));
                cmd.Parameters.Add(new SqlParameter("@Desc13", parm13));
                cmd.Parameters.Add(new SqlParameter("@Desc14", parm14));
                cmd.Parameters.Add(new SqlParameter("@Desc15", parm15));
                cmd.Parameters.Add(new SqlParameter("@Desc16", parm16));
                cmd.Parameters.Add(new SqlParameter("@Desc17", parm17));
                cmd.Parameters.Add(new SqlParameter("@Desc18", parm18));
                cmd.Parameters.Add(new SqlParameter("@Desc19", parm19));
                cmd.Parameters.Add(new SqlParameter("@Desc20", parm20));

                da = new SqlDataAdapter(cmd);
                ds = new DataSet();
                da.Fill(ds);
                dbConn.Close();

                //cmd.ExecuteNonQuery();

                return ds;
            }
            catch
            {
                return null;
            }
        }
        public DataSet select_data_20X(string comCostID, string ProcName, string CallType, DataSet parmXmlu = null,
       DataSet parmXmld = null,
       string parm1 = "", string parm2 = "", string parm3 = "", string parm4 = "", string parm5 = "",
       string parm6 = "", string parm7 = "", string parm8 = "",
       string parm9 = "", string parm10 = "", string parm11 = "", string parm12 = "", string parm13 = "",
       string parm14 = "", string parm15 = "",
       string parm16 = "", string parm17 = "", string parm18 = "", string parm19 = "", string parm20 = "")
        {
            try
            {
                dbConn = new SqlConnection(ConnectionString1);
                dbConn.Open();
                cmd = new SqlCommand(ProcName, dbConn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@ComC1", comCostID));
                cmd.Parameters.Add(new SqlParameter("@CallType", CallType));
                cmd.Parameters.Add("@dsxmlu", SqlDbType.Xml).Value = (parmXmlu == null ? null : parmXmlu.GetXml());
                cmd.Parameters.Add("@dsxmld", SqlDbType.Xml).Value = (parmXmld == null ? null : parmXmld.GetXml());
                cmd.Parameters.Add(new SqlParameter("@Desc1", parm1));
                cmd.Parameters.Add(new SqlParameter("@Desc2", parm2));
                cmd.Parameters.Add(new SqlParameter("@Desc3", parm3));
                cmd.Parameters.Add(new SqlParameter("@Desc4", parm4));
                cmd.Parameters.Add(new SqlParameter("@Desc5", parm5));
                cmd.Parameters.Add(new SqlParameter("@Desc6", parm6));
                cmd.Parameters.Add(new SqlParameter("@Desc7", parm7));
                cmd.Parameters.Add(new SqlParameter("@Desc8", parm8));
                cmd.Parameters.Add(new SqlParameter("@Desc9", parm9));
                cmd.Parameters.Add(new SqlParameter("@Desc10", parm10));
                cmd.Parameters.Add(new SqlParameter("@Desc11", parm11));
                cmd.Parameters.Add(new SqlParameter("@Desc12", parm12));
                cmd.Parameters.Add(new SqlParameter("@Desc13", parm13));
                cmd.Parameters.Add(new SqlParameter("@Desc14", parm14));
                cmd.Parameters.Add(new SqlParameter("@Desc15", parm15));
                cmd.Parameters.Add(new SqlParameter("@Desc16", parm16));
                cmd.Parameters.Add(new SqlParameter("@Desc17", parm17));
                cmd.Parameters.Add(new SqlParameter("@Desc18", parm18));
                cmd.Parameters.Add(new SqlParameter("@Desc19", parm19));
                cmd.Parameters.Add(new SqlParameter("@Desc20", parm20));

                da = new SqlDataAdapter(cmd);
                ds = new DataSet();
                da.Fill(ds);
                dbConn.Close();

                //cmd.ExecuteNonQuery();

                return ds;
            }
            catch (Exception exp)
            {
                return null;
            } // try
        }


        public DataSet select_data_40X(string comCostID, string ProcName, string CallType, DataSet parmXmlu = null, DataSet parmXmld = null,
           string parm1 = "", string parm2 = "", string parm3 = "", string parm4 = "", string parm5 = "", string parm6 = "", string parm7 = "", string parm8 = "",
           string parm9 = "", string parm10 = "", string parm11 = "", string parm12 = "", string parm13 = "", string parm14 = "", string parm15 = "", string parm16 = "",
           string parm17 = "", string parm18 = "", string parm19 = "", string parm20 = "", string parm21 = "", string parm22 = "", string parm23 = "", string parm24 = "",
           string parm25 = "", string parm26 = "", string parm27 = "", string parm28 = "", string parm29 = "", string parm30 = "", string parm31 = "", string parm32 = "",
           string parm33 = "", string parm34 = "", string parm35 = "", string parm36 = "", string parm37 = "", string parm38 = "", string parm39 = "", string parm40 = "")

        {
            try
            {
                dbConn = new SqlConnection(ConnectionString1);
                dbConn.Open();
                cmd = new SqlCommand(ProcName, dbConn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@ComC1", comCostID));
                cmd.Parameters.Add(new SqlParameter("@CallType", CallType));
                cmd.Parameters.Add("@dsxmlu", SqlDbType.Xml).Value = (parmXmlu == null ? null : parmXmlu.GetXml());
                cmd.Parameters.Add("@dsxmld", SqlDbType.Xml).Value = (parmXmld == null ? null : parmXmld.GetXml());
                cmd.Parameters.Add(new SqlParameter("@Desc1", parm1));
                cmd.Parameters.Add(new SqlParameter("@Desc2", parm2));
                cmd.Parameters.Add(new SqlParameter("@Desc3", parm3));
                cmd.Parameters.Add(new SqlParameter("@Desc4", parm4));
                cmd.Parameters.Add(new SqlParameter("@Desc5", parm5));
                cmd.Parameters.Add(new SqlParameter("@Desc6", parm6));
                cmd.Parameters.Add(new SqlParameter("@Desc7", parm7));
                cmd.Parameters.Add(new SqlParameter("@Desc8", parm8));
                cmd.Parameters.Add(new SqlParameter("@Desc9", parm9));
                cmd.Parameters.Add(new SqlParameter("@Desc10", parm10));
                cmd.Parameters.Add(new SqlParameter("@Desc11", parm11));
                cmd.Parameters.Add(new SqlParameter("@Desc12", parm12));
                cmd.Parameters.Add(new SqlParameter("@Desc13", parm13));
                cmd.Parameters.Add(new SqlParameter("@Desc14", parm14));
                cmd.Parameters.Add(new SqlParameter("@Desc15", parm15));
                cmd.Parameters.Add(new SqlParameter("@Desc16", parm16));
                cmd.Parameters.Add(new SqlParameter("@Desc17", parm17));
                cmd.Parameters.Add(new SqlParameter("@Desc18", parm18));
                cmd.Parameters.Add(new SqlParameter("@Desc19", parm19));
                cmd.Parameters.Add(new SqlParameter("@Desc20", parm20));
                cmd.Parameters.Add(new SqlParameter("@Desc21", parm21));
                cmd.Parameters.Add(new SqlParameter("@Desc22", parm22));
                cmd.Parameters.Add(new SqlParameter("@Desc23", parm23));
                cmd.Parameters.Add(new SqlParameter("@Desc24", parm24));
                cmd.Parameters.Add(new SqlParameter("@Desc25", parm25));
                cmd.Parameters.Add(new SqlParameter("@Desc26", parm26));
                cmd.Parameters.Add(new SqlParameter("@Desc27", parm27));
                cmd.Parameters.Add(new SqlParameter("@Desc28", parm28));
                cmd.Parameters.Add(new SqlParameter("@Desc29", parm29));
                cmd.Parameters.Add(new SqlParameter("@Desc30", parm30));
                cmd.Parameters.Add(new SqlParameter("@Desc31", parm31));
                cmd.Parameters.Add(new SqlParameter("@Desc32", parm32));
                cmd.Parameters.Add(new SqlParameter("@Desc33", parm33));
                cmd.Parameters.Add(new SqlParameter("@Desc34", parm34));
                cmd.Parameters.Add(new SqlParameter("@Desc35", parm35));
                cmd.Parameters.Add(new SqlParameter("@Desc36", parm36));
                cmd.Parameters.Add(new SqlParameter("@Desc37", parm37));
                cmd.Parameters.Add(new SqlParameter("@Desc38", parm38));
                cmd.Parameters.Add(new SqlParameter("@Desc39", parm39));
                cmd.Parameters.Add(new SqlParameter("@Desc40", parm40));

                da = new SqlDataAdapter(cmd);
                ds = new DataSet();
                da.Fill(ds);
                dbConn.Close();

                //cmd.ExecuteNonQuery();

                return ds;
            }
            catch (Exception exp)
            {
                dbConn.Close();
                return null;
            } // try
        }

        public string EncodeMD5(string originalStr)
        {
            Byte[] originalBytes;
            Byte[] encodedBytes;
            MD5 md5 = new MD5CryptoServiceProvider();
            originalBytes = ASCIIEncoding.Default.GetBytes(originalStr);
            encodedBytes = md5.ComputeHash(originalBytes);
            return BitConverter.ToString(encodedBytes);
        }

        public string Encode(string serverName)
        {
            return Convert.ToBase64String(Encoding.UTF8.GetBytes(serverName));
        }

        public string Decode(string encodedServername)
        {
            return Encoding.UTF8.GetString(Convert.FromBase64String(encodedServername));
        }

        public void GetAllProject(System.Web.UI.WebControls.DropDownList ddlProjectFor, string user, System.Web.UI.WebControls.DropDownList ddlComp)
        {
            ds = new DataSet();
            ds = select_data_20("", "ERPACCDB.dbo.SP_PERMISSION", "ALL_PROJ", user, ddlComp.SelectedValue);
            ddlProjectFor.DataSource = ds.Tables[0];
            ddlProjectFor.DataTextField = "PROJ";
            ddlProjectFor.DataValueField = "PROJID";
            ddlProjectFor.DataBind();
            ddlProjectFor.Items.Insert(0, new ListItem("--Select--", ""));
        }
        public void GetAllProjectForm(System.Web.UI.WebControls.DropDownList ddlProjectFor, string user, System.Web.UI.WebControls.DropDownList ddlComp)
        {
            ds = new DataSet();
            ds = select_data_20("", "ERPACCDB.dbo.SP_PERMISSION", "GET_PROJECT_LIST", user, ddlComp.SelectedValue);
            ddlProjectFor.DataSource = ds.Tables[0];
            ddlProjectFor.DataTextField = "PROJ";
            ddlProjectFor.DataValueField = "PROJID";
            ddlProjectFor.DataBind();
            ddlProjectFor.Items.Insert(0, new ListItem("--Select--", ""));
        }

        public DataSet select_dropdown_data(string procedure, string call_type, DropDownParam ddlParam)
        {

            dbConn = new SqlConnection(ConnectionString1);
            dbConn.Open();
            cmd = new SqlCommand(procedure, dbConn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.Add(new SqlParameter("@CALLTYPE", call_type));
            cmd.Parameters.Add(new SqlParameter("@param1", ddlParam.param1));
            cmd.Parameters.Add(new SqlParameter("@param2", ddlParam.param2));
            cmd.Parameters.Add(new SqlParameter("@param3", ddlParam.param3));
            cmd.Parameters.Add(new SqlParameter("@param4", ddlParam.param4));

            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds);
            dbConn.Close();
            return ds;

        }
        public DataSet select_data_XML(string ProcName, DataSet parmXmlu = null)
        {
            try
            {
                dbConn = new SqlConnection(ConnectionString1);
                dbConn.Open();
                cmd = new SqlCommand(ProcName, dbConn);
                cmd.CommandType = CommandType.StoredProcedure;

                //cmd.Parameters.Add(new SqlParameter("@ComC1", comCostID));
                //cmd.Parameters.Add(new SqlParameter("@CallType", CallType));
                cmd.Parameters.Add("@dsxmlu", SqlDbType.Xml).Value = (parmXmlu == null ? null : parmXmlu.GetXml());

                da = new SqlDataAdapter(cmd);
                ds = new DataSet();
                da.Fill(ds);
                dbConn.Close();

                //cmd.ExecuteNonQuery();

                return ds;
            }
            catch (Exception exp)
            {
                return null;
            } // try
        }
        public DataSet UpdateImage(string comCostID, string ProcName, string CallType, byte[] image,
      string parm1 = "", string parm2 = "", string parm3 = "", string parm4 = "", string parm5 = "", string parm6 = "", string parm7 = "", string parm8 = "",
      string parm9 = "", string parm10 = "", string parm11 = "", string parm12 = "", string parm13 = "", string parm14 = "", string parm15 = "",
      string parm16 = "", string parm17 = "", string parm18 = "", string parm19 = "", string parm20 = "", string parm21 = "", string parm22 = "",
      string parm23 = "", string parm24 = "", string parm25 = "")
        {
            try
            {
                dbConn = new SqlConnection(ConnectionString1);
                dbConn.Open();

                cmd = new SqlCommand(ProcName, dbConn);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@ComC1", comCostID));
                cmd.Parameters.Add(new SqlParameter("@CallType", CallType));
                cmd.Parameters.Add(new SqlParameter("@Img", image));
                cmd.Parameters.Add(new SqlParameter("@Desc1", parm1));
                cmd.Parameters.Add(new SqlParameter("@Desc2", parm2));
                cmd.Parameters.Add(new SqlParameter("@Desc3", parm3));
                cmd.Parameters.Add(new SqlParameter("@Desc4", parm4));
                cmd.Parameters.Add(new SqlParameter("@Desc5", parm5));
                cmd.Parameters.Add(new SqlParameter("@Desc6", parm6));
                cmd.Parameters.Add(new SqlParameter("@Desc7", parm7));
                cmd.Parameters.Add(new SqlParameter("@Desc8", parm8));
                cmd.Parameters.Add(new SqlParameter("@Desc9", parm9));
                cmd.Parameters.Add(new SqlParameter("@Desc10", parm10));
                cmd.Parameters.Add(new SqlParameter("@Desc11", parm11));
                cmd.Parameters.Add(new SqlParameter("@Desc12", parm12));
                cmd.Parameters.Add(new SqlParameter("@Desc13", parm13));
                cmd.Parameters.Add(new SqlParameter("@Desc14", parm14));
                cmd.Parameters.Add(new SqlParameter("@Desc15", parm15));
                cmd.Parameters.Add(new SqlParameter("@Desc16", parm16));
                cmd.Parameters.Add(new SqlParameter("@Desc17", parm17));
                cmd.Parameters.Add(new SqlParameter("@Desc18", parm18));
                cmd.Parameters.Add(new SqlParameter("@Desc19", parm19));
                cmd.Parameters.Add(new SqlParameter("@Desc20", parm20));
                cmd.Parameters.Add(new SqlParameter("@Desc21", parm21));
                cmd.Parameters.Add(new SqlParameter("@Desc22", parm22));
                cmd.Parameters.Add(new SqlParameter("@Desc23", parm23));
                cmd.Parameters.Add(new SqlParameter("@Desc24", parm24));
                cmd.Parameters.Add(new SqlParameter("@Desc25", parm25));

                da = new SqlDataAdapter(cmd);
                ds = new DataSet();
                da.Fill(ds);
                dbConn.Close();

                //cmd.ExecuteNonQuery();

                return ds;
            }
            catch
            {
                return null;
            }
        }
    }


}
