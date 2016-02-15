using System.Web.Mvc;
using TwilioChat.Web.Domain;

namespace TwilioChat.Web.Controllers
{
    public class TokenController : Controller
    {
        private readonly ITokenGenerator _tokenGenerator;

        public TokenController() : this(new TokenGenerator()) { }

        public TokenController(ITokenGenerator tokenGenerator)
        {
            _tokenGenerator = tokenGenerator;
        }

        // POST: Token
        [HttpPost]
        public ActionResult Index(string device, string identity)
        {
            if (device == null || identity == null) return null;

            const string appName = "TwilioChatDemo";
            var endpointId = string.Format("{0}:{1}:{2}", appName, identity, device);

            var token = _tokenGenerator.Generate(identity, endpointId);
            return Json(new {identity, token});
        }
    }
}
