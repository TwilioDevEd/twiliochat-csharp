using System.Web.Configuration;

namespace TwilioChat.Web.Domain
{
    public class Configuration
    {
        public static string AccountSID
        {
            get { return WebConfigurationManager.AppSettings["TwilioAccountSid"]; }
        }

        public static string ApiKey
        {
            get { return WebConfigurationManager.AppSettings["TwilioApiKey"]; }
        }

        public static string ApiSecret
        {
            get { return WebConfigurationManager.AppSettings["TwilioApiSecret"]; }
        }

        public static string ChatServiceSID
        {
            get { return WebConfigurationManager.AppSettings["TwilioChatServiceSid"]; }
        }
    }
}