<a href="https://www.twilio.com">
  <img src="https://static0.twilio.com/marketing/bundles/marketing/img/logos/wordmark-red.svg" alt="Twilio" width="250" />
</a>

# Important Notice

We intend to sunset the Programmable Chat API on July 25, 2022 to focus on the next generation of chat: the [Twilio Conversations API](https://www.twilio.com/docs/conversations). Find out about the [EOL process](https://www.twilio.com/changelog/programmable-chat-end-of-life). We have also prepared [this Migration Guide](https://www.twilio.com/docs/conversations/migrating-chat-conversations) to assist in the transition from Chat to Conversations.

# Twilio Chat - ASP.NET MVC

C# implementation of Twilio Chat using ASP.NET MVC

[![Build status](https://ci.appveyor.com/api/projects/status/e0h30vnonbjwyyhd/branch/master?svg=true)](https://ci.appveyor.com/project/TwilioDevEd/twiliochat-csharp/branch/master)

## Local Development

**NOTE**: You need a Windows environment with Visual Studio to run this project. Since this project was made using .NET Framework 4.5, it's not compatible with .NET Core, so it's mandatory to run on Windows.

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
     <add key="TwilioChatServiceSid" value="Your Chat Service SID" />
   </appSettings>
   ```

   As usual your `TwilioAccountSid` can be found at https://www.twilio.com/user/account

   Your `TwilioApiKey` and `TwilioApiSecret` can be found at https://www.twilio.com/console/dev-tools/api-keys

   And finally, your `TwilioChatServiceSid` can be found at https://www.twilio.com/console/chat/dashboard

1. Open the project using Visual Studio

1. Using Visual Studio's UI, choose Build Solution from the Build menu.

1. To run the code, click the green play button in the toolbar.

1. Check it out at [http://localhost:1398](http://localhost:1398)

That's it!

## Tests

1. If Test Explorer is not open, open it by choosing Test > Windows > Test Explorer from the top menu bar.
1. Choose Run All to run the tests.

## Meta

* No warranty expressed or implied. Software is as is. Diggity.
* [MIT License](http://www.opensource.org/licenses/mit-license.html)
* Lovingly crafted by Twilio Developer Education.
