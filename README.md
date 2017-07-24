<a href="https://www.twilio.com">
  <img src="https://static0.twilio.com/marketing/bundles/marketing/img/logos/wordmark-red.svg" alt="Twilio" width="250" />
</a>

# Twilio Chat - ASP.NET MVC

C# implementation of Twilio Chat using ASP.NET MVC

[![Build status](https://ci.appveyor.com/api/projects/status/e0h30vnonbjwyyhd/branch/master?svg=true)](https://ci.appveyor.com/project/TwilioDevEd/twiliochat-csharp/branch/master)

## Local Development

1. Clone this repository and `cd` into its directory:
   ```
   git clone git@github.com:TwilioDevEd/twiliochat-csharp.git
   cd twiliochat-csharp
   ```

1. Create a new file `TwilioChat.Web/Local.config` and update the content with:
   ```
   <appSettings>
     <add key="TwilioAccountSid" value="Your Twilio Account SID" />
     <add key="TwilioApiKey" value="Your Twilio API Key" />
     <add key="TwilioApiSecret" value="Your Twilio API Secret" />
     <add key="TwilioIpmServiceSid" value="Your Chat Service SID" />
   </appSettings>
   ```

   As usual your `TwilioAccountSid` can be found at https://www.twilio.com/user/account

   Your `TwilioApiKey` and `TwilioApiSecret` can be found at https://www.twilio.com/console/dev-tools/api-keys

   And finally, your `TwilioIpmServiceSid` can be found at https://www.twilio.com/console/chat/dashboard

1. Build the solution.

1. Run the application.

1. Check it out at [http://localhost:1398](http://localhost:1398)

That's it!

## Meta

* No warranty expressed or implied. Software is as is. Diggity.
* [MIT License](http://www.opensource.org/licenses/mit-license.html)
* Lovingly crafted by Twilio Developer Education.
