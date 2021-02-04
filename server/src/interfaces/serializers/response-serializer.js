const camelCaseKeysToUnderscore = (obj) => {
  if (typeof obj != "object") return obj;

  for (var oldName in obj) {
    newName = oldName.replace(/([A-Z])/g, function ($1) {
      return "_" + $1.toLowerCase();
    });

    if (newName != oldName) {
      if (obj.hasOwnProperty(oldName)) {
        obj[newName] = obj[oldName];
        delete obj[oldName];
      }
    }

    if (typeof obj[newName] == "object") {
      obj[newName] = camelCaseKeysToUnderscore(obj[newName]);
    }
  }
  return obj;
};

module.exports = (data) => {
  if (!data) {
    throw new Error("Expect data to be not undefined nor null");
  }

  if (Array.isArray(data)) {
    return data.map(camelCaseKeysToUnderscore);
  }

  return camelCaseKeysToUnderscore(data);
};
