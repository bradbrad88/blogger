const displayTime = timeData => {
  const au = new Intl.DateTimeFormat("en-au").format(timeData);
  return au;
};

module.exports = { displayTime };
