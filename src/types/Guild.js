const storage = require('../storage');
const User = require("./User");

class Guild {

  constructor(options, push) {
    Object.keys(options).forEach(key => {
      this[key] = options[key];
    });

    return this;
  }

  save(push = true) {
    var data = {
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
    };
    storage.guilds[data.id] = this;

    if (push) {
      API.request('PATCH', {url: 'MODIFY_GUILD', params: [data.id]}, true, data);
    }
    return this;
  }

}

module.exports = Guild;
