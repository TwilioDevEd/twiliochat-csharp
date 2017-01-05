using Twilio.JWT;

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
            var token = new AccessToken(
                Configuration.AccountSID, Configuration.ApiKey, Configuration.ApiSecret)
            {
                Identity = identity
            };

            var grant = new IpMessagingGrant {EndpointId = endpointId, ServiceSid = Configuration.IpmServiceSID};
            token.AddGrant(grant);

            return token.ToJwt();
        }
    }
}