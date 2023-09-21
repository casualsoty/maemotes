class MaemoteChatBubbles extends ChatBubbles {
  constructor(...args) {
    super(...args);
  }

  _getDuration() {
    return game.settings.get('maemotes', 'chatBubblesDuration') * 1000;
  }
}
