/*
* All the endpoints are listed here.
* Do NOT write the endpoint URL's in the requests it self.
* If discord ever changes their endpoints we can easily change it here
*/

module.exports = {
  BASE_URL: function() { return 'https://discordapp.com/api/v6' },
  GET_AUDIT_LOG: function(guildid) {
    return "/guilds/" + guildid + "/audit-logs"
  },
  GET_CHANNEL: function(channelid) {
    return "/channels/" + channelid
  },
  MODIFY_CHANNEL: function(channelid) {
    return "/channels/" + channelid
  },
  DELETE_CHANNEL: function(channelid) {
    return "/channels/" + channelid
  },
  GET_CHANNEL_MESSAGES: function(channelid) {
    return "/channels/" + channelid + "/messages"
  },
  GET_CHANNEL_MESSAGE: function(channelid, messageid) {
    return "/channels/" + channelid + "/messages/" + messageid
  },
  CREATE_MESSAGE: function(channelid) {
    return "/channels/" + channelid + "/messages"
  },
  CREATE_REACTION: function(channelid, messageid, emoji) {
    return "/channels/" + channelid + "/messages/" + messageid + "/reactions/" + emoji + "/@me"
  },
  DELETE_OWN_REACTION: function(channelid, messageid, emoji) {
    return "/channels/" + channelid + "/messages/" + messageid + "/reactions/" + emoji + "/@me"
  },
  DELETE_USER_REACTION: function(channelid, messageid, emoji, userid) {
    return "/channels/" + channelid + "/messages/" + messageid + "/reactions/" + emoji + "/" + userid
  },
  GET_REACTIONS: function(channelid, messageid, emoji) {
    return "/channels/" + channelid + "/messages/" + messageid + "/reactions/" + emoji
  },
  DELETE_ALL_REACTIONS: function(channelid, messageid) {
    return "/channels/" + channelid + "/messages/" + messageid + "/reactions"
  },
  EDIT_MESSAGE: function(channelid, messageid) {
    return "/channels/" + channelid + "/messages/" + messageid
  },
  DELETE_MESSAGE: function(channelid, messageid) {
    return "/channels/" + channelid + "/messages/" + messageid
  },
  BULK_DELETE_MESSAGES: function(channelid) {
    return "/channels/" + channelid + "/messages/bulk-delete"
  },
  EDIT_CHANNEL_PERMISSIONS: function(channelid, overwriteid) {
    return "/channels/" + channelid + "/permissions/" + overwriteid
  },
  GET_CHANNEL_INVITES: function(channelid) {
    return "/channels/" + channelid + "/invites"
  },
  CREATE_CHANNEL_INVITE: function(channelid) {
    return "/channels/" + channelid + "/invites"
  },
  DELETE_CHANNEL_PERMISSION: function(channelid, overwriteid) {
    return "/channels/" + channelid + "/permissions/" + overwriteid
  },
  TRIGGER_TYPING_INDICATOR: function(channelid) {
    return "/channels/" + channelid + "/typing"
  },
  GET_PINNED_MESSAGES: function(channelid) {
    return "/channels/" + channelid + "/pins"
  },
  ADD_PINNED_CHANNEL_MESSAGE: function(channelid, messageid) {
    return "/channels/" + channelid + "/pins/" + messageid
  },
  DELETE_PINNED_CHANNEL_MESSAGE: function(channelid, messageid) {
    return "/channels/" + channelid + "/pins/" + messageid
  },
  LIST_GUILD_EMOJIS: function(guilid) {
    return "/guilds/" + guildid + "/emojis"
  },
  GET_GUILD_EMOJI: function(guildid, emojiid) {
    return "/guilds/" + guildid + "/emojis/" + emojiid
  },
  CREATE_GUILD_EMOJI: function(guildid) {
    return "/guilds/" + guildid + "/emojis"
  },
  MODIFY_GUILD_EMOJI: function(guildid, emojiid) {
    return "/guilds/" + guildid + "/emojis/" + emojiid
  },
  DELETE_GUILD_EMOJI: function(guildid, emojiid) {
    return "/guilds/" + guildid + "/emojis/" + emojiid
  },
  CREATE_GUILD: function() {
    return "/guilds"
  },
  GET_GUILD: function(guildid) {
    return "/guilds/" + guildid
  },
  MODIFY_GUILD: function(guildid) {
    return "/guilds/" + guildid
  },
  DELETE_GUILD: function(guildid) {
    return "/guilds/" + guildid
  },
  GET_GUILD_CHANNELS: function(guildid) {
    return "/guilds/" + guildid + "/channels"
  },
  CREATE_GUILD_CHANNEL: function(guildid) {
    return "/guilds/" + guildid + "/channels"
  },
  MODIFY_GUILD_CHANNEL_POSITIONS: function(guildid) {
    return "/guilds/" + guildid + "/channels"
  },
  GET_GUILD_MEMBER: function(guildid, userid) {
    return "/guilds/" + guildid + "/members/" + userid
  },
  LIST_GUILD_MEMBERS: function(guildid) {
    return "/guilds/" + guildid + "/members"
  },
  MODIFY_GUILD_MEMBER: function(guildid, userid) {
    return "/guilds/" + guildid + "/members/" + userid
  },
  MODIFY_CURRENT_USER_NICK: function(guildid) {
    return "/guilds/" + guildid + "/members/@me/nick"
  },
  ADD_GUILD_MEMBER_ROLE: function(guildid, userid, roleid) {
    return "/guilds/" + guildid + "/members/" + userid + "/roles/" + roleid
  },
  REMOVE_GUILD_MEMBER_ROLE: function(guildid, userid, roleid) {
    return "/guilds/" + guildid + "/members/" + userid + "/roles/" + roleid
  },
  REMOVE_GUILD_MEMBER: function(guildid, userid) {
    return "/guilds/" + guildid + "/members/" + userid
  },
  GET_GUILD_BANS: function(guildid) {
    return "/guilds/" + guildid + "/bans"
  },
  CREATE_GUILD_BAN: function(guildid, userid) {
    return "/guilds/" + guildid + "/bans/" + userid
  },
  REMOVE_GUILD_BAN: function(guildid, userid) {
    return "/guilds/" + guildid + "/bans/" + userid
  },
  GET_GUILD_ROLES: function(guildid) {
    return "/guilds/" + guildid + "/roles"
  },
  CREATE_GUILD_ROLE: function(guildid) {
    return "/guilds/" + guildid + "/roles"
  },
  MODIFY_GUILD_ROLE_POSITIONS: function(guildid) {
    return "/guilds/" + guildid + "/roles"
  },
  MODIFY_GUILD_ROLE: function(guildid, roleid) {
    return "/guilds/" + guildid + "/roles/" + roleid
  },
  DELETE_GUILD_ROLE: function(guildid, roleid) {
    return "/guilds/" + guildid + "/roles/" + roleid
  },
  GET_GUILD_PRUNE_COUNT: function(guildid) {
    return "/guilds/" + guildid + "/prune"
  },
  BEGIN_GUILD_PRUNE: function(guildid) {
    return "/guilds/" + guildid + "/prune"
  },
  GET_GUILD_VOICE_REGIONS: function(guildid) {
    return "/guilds/" + guildid + "/regions"
  },
  GET_GUILD_INVITES: function(guildid) {
    return "/guilds/" + guildid + "/regions"
  },
  GET_GUILD_INTEGRATIONS: function(guildid) {
    return "/guilds/" + guildid + "/integrations"
  },
  CREATE_GUILD_INTEGRATION: function(guildid) {
    return "/guilds/" + guildid + "/integrations"
  },
  MODIFY_GUILD_INTEGRATION: function(guildid, integrationid) {
    return "/guilds/" + guildid + "/integrations/" + integrationid
  },
  DELETE_GUILD_INTEGRATION: function(guildid, integrationid) {
    return "/guilds/" + guildid + "/integrations/" + integrationid
  },
  SYNC_GUILD_INTEGRATION: function(guildid, integrationid) {
    return "/guilds/" + guildid + "/integrations/" + integrationid + "/sync"
  },
  GET_GUILD_EMBED: function(guildid) {
    return "/guilds/" + guildid + "/embed"
  },
  MODIFY_GUILD_EMBED: function(guildid) {
    return "/guilds/" + guildid + "/embed"
  },
  GET_GUILD_VANITY_URL: function(guildid) {
    return "/guilds/" + guildid + "/vanity-url"
  },
  GET_INVITE: function(invitecode) {
    return "/invites/" + invitecode
  },
  DELETE_INVITE: function(invitecode) {
    return "/invites/" + invitecode
  },
  GET_CURRENT_USER: function() {
    return "/users/@me"
  },
  GET_USER: function(userid) {
    return "/users/" + userid
  },
  MODIFY_CURRENT_USER: function() {
    return "/users/@me"
  },
  GET_CURRENT_USER_GUILDS: function() {
    return "/users/@me/guilds"
  },
  LEAVE_GUILD: function(guildid) {
    return "/users/@me/guilds/" + guildid
  },
  GET_USER_DMS: function() {
    return "/users/@me/channels"
  },
  CREATE_DM: function() {
    return "/users/@me/channels"
  },
  LIST_VOICE_REGIONS: function() {
    return "/voice/regions"
  },
  CREATE_WEBHOOK: function(channelid) {
    return "/channels/" + channelid + "/webhooks"
  },
  GET_CHANNEL_WEBHOOKS: function(channelid) {
    return "/channels/" + channelid + "/webhooks"
  },
  GET_GUILD_WEBHOOKS: function(guildid) {
    return "/guilds/" + guildid + "/webhooks"
  },
  GET_WEBHOOK: function(webhookid) {
    return "/webhooks/" + webhookid
  },
  GET_WEBHOOK_WITH_TOKEN: function(webhookid, webhooktoken) {
    return "/webhooks/" + webhookid + "/" + webhooktoken
  },
  MODIFY_WEBHOOK: function(webhookid) {
    return "/webhooks/" + webhookid
  },
  MODIFY_WEBHOOK_WITH_TOKEN: function(webhookid, webhooktoken) {
    return "/webhooks/" + webhookid + "/" + webhooktoken
  },
  DELETE_WEBHOOK: function(webhookid) {
    return "/webhooks/" + webhookid
  },
  DELETE_WEBHOOK_WITH_TOKEN: function(webhookid, webhooktoken) {
    return "/webhooks/" + webhookid + "/" + webhooktoken
  },
  EXECUTE_WEBHOOK: function(webhookid, webhooktoken) {
    return "/webhooks/" + webhookid + "/" + webhooktoken
  },
  EXECUTE_SLACK_WEBHOOK: function(webhookid, webhooktoken) {
    return "/webhooks/" + webhookid + "/" + webhooktoken + "/slack"
  },
  EXECUTE_GITHUB_WEBHOOK: function(webhookid, webhooktoken) {
    return "/webhooks/" + webhookid + "/" + webhooktoken + "/github"
  },
  GET_GATEWAY_BOT: function() {
    return "/gateway/bot"
  }
}
