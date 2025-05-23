export async function getMembers() {
  const response = await fetch("data/members.json");
  if (!response.ok) {
    throw new Error("response was not ok");
  }
  return await response.json();
}

export function createBusinessCard(member) {
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
  return card;
}

export function displayMembers(businesses, directory, createBusinessCard) {
  businesses.forEach((member) => {
    const card = createBusinessCard(member);
    directory.appendChild(card);
  });
}