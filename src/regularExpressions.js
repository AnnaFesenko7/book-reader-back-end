const passwordRegexp =
  /^(?!\-|\.)[0-9a-zA-Z\*\!\@\#\$\%\^\&\(\)\{\}\[\]\:\;\<\>,\.\?\/\~_\+\-\=\|\\]{5,30}$/;
const nameRegexp =
  /^[a-zA-Z0-9][0-9a-zA-Z\*\!\@\#\$\%\^\&\(\)\{\}\[\]\:\;\<\>,\.\?\/\~_\+\-\=\|\\\ ]{2,99}$/;
const emailRegExp =
  /^(?!-)([\w\.\!#\$%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]{2,})+@(([\w\.\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]{1,56})+\.)+[\w]{2,}(?!-)$/;
const yearRegExp = /^\d{4}$/;

module.exports = {
  passwordRegexp,
  nameRegexp,
  emailRegExp,
  yearRegExp,
};
