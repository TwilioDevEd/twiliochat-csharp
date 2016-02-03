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

        // POST: Token/Generate
        [HttpPost]
        public ActionResult Generate(string deviceId, string identity)
        {
            if (deviceId == null || identity == null) return null;

            const string appName = "TwilioChatDemo";
            var endpointId = string.Format("{0}:{1}:{2}", appName, identity, deviceId);

            var token = _tokenGenerator.Generate(identity, endpointId);
            return Json(new {identity, token}, JsonRequestBehavior.AllowGet);
        }
    }
}