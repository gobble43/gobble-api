const removeQuotes = function(string) {
  if (!string) return;
  return string.replace(/^"|"$/g, '');
};

module.exports = { removeQuotes };
