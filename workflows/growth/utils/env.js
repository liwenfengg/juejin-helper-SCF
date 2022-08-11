const env = process.env || {};

module.exports = {
  WORDS_API: env.WORDS_API || "?c=e",
  APPEND_EMOJI: env.APPEND_EMOJI || true,
  ONLY_EMOJI: env.ONLY_EMOJI || false
};
