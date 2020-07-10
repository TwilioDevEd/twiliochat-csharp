using System.Collections.Generic;
using Twilio.Jwt.AccessToken;

namespace TwilioChat.Web.Domain
{
    public interface ITokenGenerator
    {
        string Generate(string identity);
    }

    public class TokenGenerator : ITokenGenerator
    {
        public string Generate(string identity)
        {
            var grants = new HashSet<IGrant>
            {
                new ChatGrant {ServiceSid = Configuration.ChatServiceSID}
            };

            var token = new Token(
                Configuration.AccountSID,
                Configuration.ApiKey,
                Configuration.ApiSecret,
                identity,
                grants: grants);

            return token.ToJwt();
        }
    }
}
