const getString = window.location.search;
const formData = new URLSearchParams(getString);
console.log(formData);

const first = formData.get("first");
const last = formData.get("last");
const organizationTitle = formData.get("organization-title");
const email = formData.get("email");
const telephone = formData.get("telephone");
const organization = formData.get("organization");
const description = formData.get("description");
const timestamp = formData.get("timestamp");

const confirmation = document.getElementById("confirmation");
confirmation.innerHTML = `
  <h2>Submission Details</h2>
  <ul class="confirmation-list">
    <li><strong>First Name:</strong> ${first}</li>
    <li><strong>Last Name:</strong> ${last}</li>
    <li><strong>Email:</strong> ${email}</li>
    <li><strong>Mobile Number:</strong> ${telephone}</li>
    <li><strong>Business Name:</strong> ${organization}</li>
    <li><strong>Submitted At:</strong> ${timestamp}</li>
  </ul>
`;

