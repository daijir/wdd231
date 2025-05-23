let membersCache = null;

export async function getMembers() {
  if (membersCache) {
    return membersCache;
  }
  const response = await fetch("data/members.json");
  if (!response.ok) {
    throw new Error("response was not ok");
  }
  const data = await response.json();
  membersCache = data;
  return data;
}

export function createBusinessCard(member) {
  const card = document.createElement("div");
  card.className = "member-card";
  card.innerHTML = `
    <div class="member-details">
      <div class="member-logo">
        <img src="${member.image}" alt="${member.name} Logo" loading="lazy" width="350" height="350">
      </div>
      <strong>${member.name}</strong><br>
      <p><b>Email:</b> ${member.email}</p>
      <p><b>Phone:</b> ${member.phoneNumber}</p>
      <p><b>Address:</b> ${member.address}</p>
      <p><b>Description:</b></br> ${member.description}</p>
    </div>
  `;
  return card;
}

export function displayMembers(businesses, directory, createBusinessCard) {
  const fragment = document.createDocumentFragment();
  businesses.forEach((member) => {
    const card = createBusinessCard(member);
    fragment.appendChild(card);
  });
  directory.appendChild(fragment);
}