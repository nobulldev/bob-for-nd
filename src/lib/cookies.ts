/**
 * Utility functions for managing browser cookies.
 */

/**
 * Sets a cookie with a specific name, value, and duration in days.
 */
export const setCookie = (name: string, value: string, days: number): void => {
  const maxAge = days * 24 * 60 * 60; // Convert days to seconds
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`;
};

/**
 * Reads the value of a cookie by its name.
 * Returns null if the cookie does not exist.
 */
export const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const cookiesArray = document.cookie.split(";");

  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
    }
  }
  return null;
};

/**
 * Deletes a cookie by setting its max-age to 0.
 */
export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax; Secure`;
};
