export const checkSession = (): boolean => {
  const sessionData = localStorage.getItem("session");
  if (!sessionData) return false;

  const { loggedInAt } = JSON.parse(sessionData);
  const currentTime = new Date().getTime();
  const sessionDuration = 30 * 60 * 1000;

  return currentTime - loggedInAt < sessionDuration;
};

export const logout = () => {
  document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "/login";
};
