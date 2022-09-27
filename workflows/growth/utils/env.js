const env = process.env || {};

function getValue(name, defa) {
  return env[name] ? JSON.parse(env[name]) : defa;
}

module.exports = {
  WORDS_API: env.WORDS_API || "i",
  APPEND_EMOJI: getValue("APPEND_EMOJI", true),
  ONLY_EMOJI: getValue("ONLY_EMOJI", true),
  COLLECTARTICLE: getValue("COLLECTARTICLE", true),
  DIGGARTICLE: getValue("DIGGARTICLE", true),
  DIGGPIN: getValue("DIGGPIN", true),
  COMMENTARTICLE: getValue("COMMENTARTICLE", true),
  COMMENTPIN: getValue("COMMENTPIN", true),
  FOLLOWAUTHOR: getValue("FOLLOWAUTHOR", true),
  PUBLISHARTICLE: getValue("PUBLISHARTICLE", true),
  PUBLISHPIN: getValue("PUBLISHPIN", true),
  READARTICLE: getValue("READARTICLE", true)
};
