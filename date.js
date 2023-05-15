//jshints esversion:6

exports.getDay = function () {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  };

  return today.toLocaleDateString("en-US", options);
};
