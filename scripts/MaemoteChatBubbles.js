class MaemoteChatBubbles extends ChatBubbles {
  constructor(...args) {
    super(...args);
  }

  _getDuration(html) {
    return game.settings.get('maemotes', 'chatBubblesDuration') * 1000;
  }
}
