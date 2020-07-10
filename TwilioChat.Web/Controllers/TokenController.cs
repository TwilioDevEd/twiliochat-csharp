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
        public ActionResult Index(string identity)
        {
            if (identity == null) return null;

            var token = _tokenGenerator.Generate(identity);
            return Json(new {identity, token});
        }
    }
}
