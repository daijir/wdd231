export function setYearAndLastModified(yearId = "currentyear", modId = "lastModified") {
  const currentYear = document.getElementById(yearId);
  const lastModified = document.getElementById(modId);
  if (currentYear) currentYear.textContent = new Date().getFullYear();
  if (lastModified) lastModified.textContent = `Last Modification: ${document.lastModified}`;
}