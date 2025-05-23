export function setYearAndLastModified(yearId = "currentyear", modId = "lastModified") {
  // Set the current year and last modified date in the specified elements
  const currentYear = document.getElementById(yearId);
  const lastModified = document.getElementById(modId);
  if (currentYear) currentYear.textContent = new Date().getFullYear();
  if (lastModified) lastModified.textContent = `Last Modification: ${document.lastModified}`;
}