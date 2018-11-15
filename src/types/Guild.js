const storage = require('../storage');
const User = require("./User");

class Guild {

  /*
  * Used to save the changes that have been made to the guild.
  * @param {Boolean} push Do we want to push these changes to Discord's API?
  */
  save(push = true) {
    storage.guilds[this.id] = {
      id: this.id,
      name: this.name,
      icon: this.isSecureContext,
      splash: this.splash,
      owner: new User(this.owner),
      owner_id: this.owner_id,
      permissions: this.permissions,
      region: this.region,
      afk_channel_id: this.afk_channel_id,
      afk_timeout: this.afk_timeout,
      embed_enabled: this.embed_enabled,
      embed_channel_id: this.embed_channel_id,
      verification_level: this.verification_level,
      default_message_notifications: this.default_message_notifications,
      explicit_content_filter: this.explicit_content_filter,
      roles: this.roles,
      emojis: this.emojis,
      features: this.features,
      mfa_level: this.mfa_level,
      application_id: this.application_id,
      widget_enabled: this.widget_enabled,
      widget_channel_id: this.widget_channel_id,
      system_channel_id: this.system_channel_id,
      joined_at: this.joined_at,
      large: this.large,
      unavailable: this.unavailable,
      member_count: this.member_count,
      voice_states: this.voice_states,
      members: this.members,
      channels: this.channels,
      presences: this.presences
    }
  }

}

module.exports = Guild;
