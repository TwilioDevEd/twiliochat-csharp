var GENERAL_CHANNEL_UNIQUE_NAME = 'general';
var GENERAL_CHANNEL_NAME = 'General Channel';
var MESSAGES_HISTORY_LIMIT = 50;
var accessManager;
var messagingClient;
var generalChannel;
var currentChannel;
var currentChannelContainer;
var channelArray;

var username;

var messageList;
var channelList;
var inputText;
var usernameInput;
var usernameSpan;
var statusRow;
var connectPanel;
var connectImage;
var addChannelImage;
var leaveSpan;
var newChannelInputRow;
var newChannelInput;
var deleteChannelSpan;
var typingRow;
var typingPlaceholder;

$(document).ready(function() {
  messageList = $('#message-list');
  channelList = $('#channel-list');
  inputText = $('#input-text');
  usernameInput = $('#username-input');
  usernameSpan = $('#username-span');
  statusRow = $('#status-row');
  connectPanel = $('#connect-panel');
  connectImage = $('#connect-image');
  leaveSpan = $('#leave-span');
  addChannelImage = $('#add-channel-image');
  newChannelInputRow = $('#new-channel-input-row');
  newChannelInput = $('#new-channel-input');
  deleteChannelSpan = $('#delete-channel-span');
  typingRow = $('#typing-row');
  typingPlaceholder = $('#typing-placeholder');
  usernameInput.focus();
  setupListeners();
});

setupListeners = function() {
  usernameInput.keypress(handleUsernameInputKeypress);
  inputText.keypress(handleInputTextKeypress);
  newChannelInput.keypress(handleNewChannelInputKeypress);
  connectImage.click(connectClientWithUsername);
  addChannelImage.click(showAddChannelInput);
  leaveSpan.click(disconnectClient);
  deleteChannelSpan.click(deleteCurrentChannel);
}

handleUsernameInputKeypress = function(event) {
  if (event.keyCode == 13){
    connectClientWithUsername();
  }
}

handleInputTextKeypress = function(event) {
  if (event.keyCode == 13) {
    currentChannel.sendMessage($(this).val());
    event.preventDefault();
    $(this).val('');
  }
  else {
    notifyTyping();
  }
}

notifyTyping = $.throttle(function() {
  currentChannel.typing();
}, 1000);

handleNewChannelInputKeypress = function(event) {
  if (event.keyCode == 13) {
    messagingClient.createChannel({
      friendlyName: newChannelInput.val()
    }).then(hideAddChannelInput);
    $(this).val('');
    event.preventDefault();
  }
}

connectClientWithUsername = function() {
  var usernameText = usernameInput.val();
  usernameInput.val('');
  if (usernameText == '') {
    alert('Username cannot be empty');
    return;
  }
  username = usernameText;
  fetchAccessToken(username, connectMessagingClient);
}

fetchAccessToken = function (username, handler) {
  $.post('/token', {
    identity: username,
    device: 'browser'
  }, function(data) {
    handler(data);
  }, 'json');
};

connectMessagingClient = function(tokenResponse) {
  // Initialize the IP messaging client
  accessManager = new Twilio.AccessManager(tokenResponse.token);
  messagingClient = new Twilio.IPMessaging.Client(accessManager);
  updateConnectedUI();
  loadChannelList(joinGeneralChannel);
  messagingClient.on('channelAdded', $.throttle(loadChannelList));
  messagingClient.on('channelRemoved', $.throttle(loadChannelList));
  messagingClient.on('tokenExpired', refreshToken);
};

refreshToken = function() {
  fetchAccessToken(username, setNewToken);
}

setNewToken = function(tokenResponse) {
  accessManager.updateToken(tokenResponse.token);
}

updateConnectedUI = function() {
  usernameSpan.text(username);
  statusRow.css('visibility', 'visible');
  messageList.css('height', '92%');
  connectPanel.css('display', 'none');
  inputText.addClass('with-shadow');
  typingRow.css('display', 'block');
}

loadChannelList = function(handler) {
  if (messagingClient === undefined) {
    console.log('Client is not initialized');
    return;
  }

  messagingClient.getChannels().then(function(channels) {
    channelArray = $.map(channels, function(value, index) {
      return value;
    });
    channelArray = sortChannelsByName(channelArray);
    channelList.text('');
    channelArray.forEach(addChannel);
    if (typeof handler == "function") {
      handler();
    }
  });
};

joinGeneralChannel = function() {
  console.log('Attempting to join "general" chat channel...');
  if (!generalChannel) {
    // If it doesn't exist, let's create it
    messagingClient.createChannel({
      uniqueName: GENERAL_CHANNEL_UNIQUE_NAME,
      friendlyName: GENERAL_CHANNEL_NAME
    }).then(function(channel) {
      console.log('Created general channel');
      generalChannel = channel;
      loadChannelList(joinGeneralChannel);
    });
  }
  else {
    console.log('Found general channel:');
    setupChannel(generalChannel);
  }
};

setupChannel = function(channel) {
  // Join the channel
  channel.join().then(function(joinedChannel) {
    console.log('Joined channel ' + joinedChannel.friendlyName);
    leaveCurrentChannel();
    updateChannelUI(channel);
    currentChannel = channel;
    loadMessages();
    channel.on('messageAdded', addMessageToList);
    channel.on('typingStarted', showTypingStarted);
    channel.on('typingEnded', hideTypingStarted);
    channel.on('memberJoined', notifyMemberJoined);
    channel.on('memberLeft', notifyMemberLeft);
    inputText.prop('disabled', false).focus();
    messageList.text('');
  });
};

loadMessages = function() {
  currentChannel.getMessages(MESSAGES_HISTORY_LIMIT).then(function (messages) {
    messages.forEach(addMessageToList);
  });
}

leaveCurrentChannel = function() {
  if (currentChannel) {
    currentChannel.leave().then(function(leftChannel) {
      console.log('left ' + leftChannel.friendlyName);
      leftChannel.removeListener('messageAdded', addMessageToList);
      leftChannel.removeListener('typingStarted', showTypingStarted);
      leftChannel.removeListener('typingEnded', hideTypingStarted);
      leftChannel.removeListener('memberJoined', notifyMemberJoined);
      leftChannel.removeListener('memberLeft', notifyMemberLeft);
    });
  }
}

addMessageToList = function(message) {
  var rowDiv = $('<div>').addClass('row no-margin');
  rowDiv.loadTemplate($("#message-template"), {
    username: message.author,
    date: getTodayDate(message.timestamp),
    body: message.body
  });
  if (message.author == username) {
    rowDiv.addClass('own-message');
  }

  messageList.append(rowDiv);
  scrollToMessageListBottom();
};

notifyMemberJoined = function(member) {
  notify(member.identity + ' joined the channel')
}

notifyMemberLeft = function(member) {
  notify(member.identity + ' left the channel');
}

notify = function(message) {
  var row = $('<div>').addClass('col-md-12');
  row.loadTemplate('#member-notification-template', {
    status: message
  });
  messageList.append(row);
  scrollToMessageListBottom();
}

showTypingStarted = function(member) {
  typingPlaceholder.html(member.identity + " is typing...");
}

hideTypingStarted = function(member) {
  typingPlaceholder.html('');
}

scrollToMessageListBottom = function() {
  messageList.scrollTop(messageList[0].scrollHeight);
};

updateChannelUI = function(selectedChannel) {
  var channelElements = $('.channel-element');
  channelElements = $.map(channelElements, function(value, index) {
    return value;
  });
  var channelElement = channelElements.filter(function(element) {
    return $(element).data().sid === selectedChannel.sid;
  });
  channelElement = $(channelElement);
  if (currentChannelContainer == undefined && selectedChannel.uniqueName == GENERAL_CHANNEL_UNIQUE_NAME) {
    currentChannelContainer = channelElement;
  }
  currentChannelContainer.removeClass('selected-channel').addClass('unselected-channel');
  channelElement.removeClass('unselected-channel').addClass('selected-channel');
  currentChannelContainer = channelElement;
}

showAddChannelInput = function() {
  if (messagingClient) {
    newChannelInputRow.css('display', 'block');
    channelList.css('max-height', '69vh');
    newChannelInput.focus();
  }
}

hideAddChannelInput = function() {
  newChannelInputRow.css('display', 'none');
  channelList.css('max-height', '75vh');
  newChannelInput.val('');
}

addChannel = function(channel) {
  if (channel.uniqueName == GENERAL_CHANNEL_UNIQUE_NAME) {
    generalChannel = channel;
  }
  var rowDiv = $('<div>').addClass('row channel-row');
  rowDiv.loadTemplate("#channel-template", {
    channelName: channel.friendlyName
  });

  var channelP = rowDiv.children().children().first();

  rowDiv.click(selectChannel);
  channelP.data('sid', channel.sid);
  if (currentChannel && channel.sid == currentChannel.sid) {
    currentChannelContainer = channelP;
    channelP.addClass('selected-channel');
  }
  else {
    channelP.addClass('unselected-channel')
  }

  channelList.append(rowDiv);
};

deleteCurrentChannel = function() {
  if (!currentChannel) {
    return;
  }
  if (currentChannel.sid == generalChannel.sid) {
    alert('You cannot delete the general channel');
    return;
  }
  currentChannel.delete().then(function(channel) {
    console.log('channel: '+ channel.friendlyName + ' deleted');
    setupChannel(generalChannel);
  });
}

selectChannel = function(event) {
  var target = $(event.target);
  var channelSid = target.data().sid;
  var selectedChannel = channelArray.filter(function(channel) {
    return channel.sid === channelSid;
  })[0];
  if (selectedChannel == currentChannel) {
    return;
  }
  setupChannel(selectedChannel);
};

disconnectClient = function() {
  leaveCurrentChannel();
  channelList.text('');
  messageList.text('');
  channels = undefined;
  statusRow.css('visibility', 'hidden');
  messageList.css('height', '80%');
  connectPanel.css('display', 'block');
  inputText.removeClass('with-shadow');
  typingRow.css('display', 'none');
}

sortChannelsByName = function(channels) {
  return channels.sort(function(a, b) {
    if (a.friendlyName == GENERAL_CHANNEL_NAME) {
      return -1;
    }
    if (b.friendlyName == GENERAL_CHANNEL_NAME) {
      return 1;
    }
    return a.friendlyName.localeCompare(b.friendlyName);
  });
};
