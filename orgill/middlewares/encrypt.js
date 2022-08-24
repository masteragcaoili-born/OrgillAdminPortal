// Encrypt.
const Encrypt = (input = '') => {
  if (!input && input !== 0) {
      return '';
  }
  // if (window.location.hostname === "localhost") {
  //     return input;
  // }
  let rslts = [];
  let x = 1;
  for (const s of input.split('')) {
    let y = s.charCodeAt(0);
    y = String.fromCharCode(y + x);
    (x < 5) ? x++ : x = 1
    rslts.push(y);
  }
  return rslts.join('');
};
// Decrypt.
const Decrypt = (input = '', force = false) => {
  if (!input) {
      return '';
  }
  // if (!force && window.location.hostname === "localhost") {
  //     return input;
  // }
  let rslts = [];
  let x = 1;
  for (const s of input.split('')) {
    let y = s.charCodeAt(0);
    y = String.fromCharCode(y - x);
    x < 5 ? x++ : x = 1
    rslts.push(y);
  }
  return rslts.join('');
};
module.exports = {
  Encrypt: Encrypt,
  Decrypt: Decrypt
}