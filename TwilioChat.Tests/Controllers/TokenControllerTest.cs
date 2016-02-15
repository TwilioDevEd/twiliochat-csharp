using Moq;
using NUnit.Framework;
using TestStack.FluentMVCTesting;
using TwilioChat.Web.Controllers;
using TwilioChat.Web.Domain;

namespace TwilioChat.Tests.Controllers
{
    public class TokenControllerTest
    {
        [Test]
        public void WhenAGenerateActionIsCalled_ThenATokenIsGenerated()
        {
            var mockTokenGenerator = new Mock<ITokenGenerator>();
            var controller = new TokenController(mockTokenGenerator.Object);

            controller.WithCallTo(c => c.Index("browser", "identity"))
                .ShouldReturnJson();
        }
    }
}
