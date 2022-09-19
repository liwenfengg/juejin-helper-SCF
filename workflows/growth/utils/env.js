const env = process.env || {};

module.exports = {
  WORDS_API: env.WORDS_API || "i",
  APPEND_EMOJI: env.APPEND_EMOJI || false,
  ONLY_EMOJI: env.ONLY_EMOJI || false,
};
