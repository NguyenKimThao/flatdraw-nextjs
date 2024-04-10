module.exports = class Utils {
  static log(...msg) {
    console.log(new Date(), msg);
  }

  static convertJsonString(val) {
    try {
      if (val == null) {
        return '{}';
      }
      return JSON.stringify(val);
    } catch (ex) {
      return '{}';
    }
  }

  static converJson(val) {
    try {
      if (val == null) {
        return {};
      }
      return JSON.parse(val);
    } catch (ex) {
      return {};
    }
  }

  static convertIntToBool(val) {
    try {
      if (val == null) {
        return false;
      }
      return Boolean(val);
    } catch (ex) {
      return false;
    }
  }

  static convertBoolToInt(val) {
    try {
      return val ? 1 : 0;
    } catch (ex) {
      return 0;
    }
  }
};
