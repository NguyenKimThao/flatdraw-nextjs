module.exports = {
  log: function (...msg) {
    console.log(new Date(), msg);
  },

  convertJsonString: function (val) {
    try {
      if (val == null) {
        return '{}';
      }
      return JSON.stringify(val);
    } catch (ex) {
      return '{}';
    }
  },

  converJson: function (val) {
    try {
      if (val == null) {
        return {};
      }
      return JSON.parse(val);
    } catch (ex) {
      return {};
    }
  },

  convertIntToBool: function (val) {
    try {
      if (val == null) {
        return false;
      }
      return Boolean(val);
    } catch (ex) {
      return false;
    }
  },

  convertBoolToInt: function (val) {
    try {
      return val ? 1 : 0;
    } catch (ex) {
      return 0;
    }
  },
};
