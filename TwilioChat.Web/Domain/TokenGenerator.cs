using System.Collections.Generic;
using Twilio.Jwt.AccessToken;

namespace TwilioChat.Web.Domain
{
    public interface ITokenGenerator
    {
        string Generate(string identity, string endpointId);
    }

    public class TokenGenerator : ITokenGenerator
    {
        public string Generate(string identity, string endpointId)
        {
            var grants = new HashSet<IGrant>
            {
                new ChatGrant {EndpointId = endpointId, ServiceSid = Configuration.ChatServiceSID}
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
