function getGreeting() {
  const now = new Date();
  const hour = now.getHours();

  if (hour < 12) {
    return "Good Morning";
  } else if (hour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}

module.exports = getGreeting;
