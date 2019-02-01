function number(en, prevVal) {
  return prevVal !== undefined && prevVal !== null ? prevVal + 1 : 0;
}

function string(en) {
  return en;
}

module.exports = {
  number,
  string
};
