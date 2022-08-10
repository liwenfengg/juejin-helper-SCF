const env = process.env || {};

module.exports = {
  WORDS_API: env.WORDS_API,
  APPEND_EMOJI: env.APPEND_EMOJI,
  ONLY_EMOJI: env.ONLY_EMOJI
};
