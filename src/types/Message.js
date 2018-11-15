const storage = require('../storage');

class Message {

  constructor() {

  }

  /*
  * Used to save the changes that have been made to the message.
  * @param {Boolean} push Do we want to push these changes to Discord's API?
  */
  save(push = true) {

    storage.messages[this.id] = {
      id: this.id,
      channel_id: this.channel_id,
      guild_id: this.guild_id,
      author: this.author,
      member: this.member,
      content: this.content,
      timestamp: this.timestamp,
      edited_timestamp: this.timestamp,
      tts: this.tts,
      mention_everyone: this.mention_everyone,
      attachments: this.attachments,
      embeds: this.embeds,
      reactions: this.reactions,
      nonce: this.nonce,
      pinned: this.pinned,
      webhook_id: this.webhook_id,
      type: this.type,
      activity: this.activity,
      application: this.application
    };
  }

}

module.exports = Message;
