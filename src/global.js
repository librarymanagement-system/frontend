export const formatList = (items = [], key, separator = ", ") => {
    return items.map(item => item[key]).join(separator);
  };
  
  export const formatFullNameList = (items = [], firstNameKey = 'firstName', lastNameKey = 'lastName', separator = ", ") => {
    return items.map(item => `${item[firstNameKey]} ${item[lastNameKey]}`).join(separator);
  };
  