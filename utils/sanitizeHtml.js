const sanitizeHtml = require('sanitize-html');
// sanitize content to prevent xss attacks
module.exports = (dirtyHtml) => {
  return sanitizeHtml(dirtyHtml, {
    // Allowed tags
    allowedTags: [
      'p',
      'h1',
      'h2',
      'h3',
      'strong',
      'em',
      'u',
      's',
      'ol',
      'ul',
      'li',
      'a',
      'br',
    ],
    // Allowed attributes (e.g., for links)
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
    }, // Force links to open in new tab securely
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
    },
    // Disallow inline styles/scripts
    disallowedTagsMode: 'discard',
  });
};
