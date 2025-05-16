document.addEventListener("DOMContentLoaded", async () => {
  // JavaScript for Footer Year and Last Modified
  const currentYear = document.getElementById("currentyear");
  const lastModified = document.getElementById("lastModified");
  currentYear.textContent = new Date().getFullYear();
  lastModified.textContent = `Last Modification: ${document.lastModified}`;

  const hamburgerElement = document.querySelector("#myButton");
  const navElement = document.querySelector(".menuLinks");
  hamburgerElement.addEventListener("click", () => {
    navElement.classList.toggle("open");
  });

  // Render members
  const directory = document.getElementById("business-cards");

  fetch("data/members.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((businesses) => {
      businesses.forEach((member) => {
        const card = document.createElement("div");
        card.className = "member-card";
        card.innerHTML = `
        <div class="member-details">
          <strong>${member.name}</strong><br>
          <p>Email: ${member.email}</p>
          <p>Phone: ${member.phoneNumber}</p>
          <p>Address: ${member.address}</p>
        </div>
      `;
        directory.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error fetching business data:", error);
      directory.innerHTML = "<p>Business data could not be loaded.</p>";
    });
});
