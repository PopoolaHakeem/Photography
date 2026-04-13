const bookingList = document.getElementById("bookingList");

function loadBookings() {

    if (localStorage.getItem("isAdmin") !== "true") {
        window.location.href = "login.html";
    }

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookingList.innerHTML = "";

    if (bookings.length === 0) {
        bookingList.innerHTML = "<p class='text-gray-400'>No bookings yet.</p>";
        return;
    }

    bookings.forEach((booking, index) => {
        const div = document.createElement("div");

        div.className = "border border-gray-700 p-4 rounded flex justify-between items-center";

        div.innerHTML = `
      <div>
        <p><strong>${booking.name}</strong></p>
        <p class="text-gray-400">${booking.email}</p>
        <p class="text-gray-400">${booking.date} - ${booking.package}</p>
      </div>

      <button onclick="deleteBooking(${index})"
        class="bg-red-600 px-4 py-2 rounded">
        Delete
      </button>
    `;

        bookingList.appendChild(div);
    });
}

function deleteBooking(index) {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.splice(index, 1);

    localStorage.setItem("bookings", JSON.stringify(bookings));

    loadBookings();
}

function logout() {
  localStorage.removeItem("isAdmin");
  window.location.href = "login.html";
}

function uploadImage() {
  const fileInput = document.getElementById("imageInput");
  const file = fileInput.files[0];

  if (!file) return alert("Select an image");

  const reader = new FileReader();

  reader.onload = function() {
    const imageData = reader.result;

    let images = JSON.parse(localStorage.getItem("gallery")) || [];
    images.push(imageData);

    localStorage.setItem("gallery", JSON.stringify(images));

    loadImages();
  };

  reader.readAsDataURL(file);
}

function loadImages() {
  const imageList = document.getElementById("imageList");
  const images = JSON.parse(localStorage.getItem("gallery")) || [];

  imageList.innerHTML = "";

  images.forEach((img, index) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <img src="${img}" class="rounded-lg mb-2"/>
      <button onclick="deleteImage(${index})"
        class="bg-red-600 w-full py-1 rounded">
        Delete
      </button>
    `;

    imageList.appendChild(div);
  });
}

function deleteImage(index) {
  let images = JSON.parse(localStorage.getItem("gallery")) || [];

  images.splice(index, 1);

  localStorage.setItem("gallery", JSON.stringify(images));

  loadImages();
}

// Load images on page open
loadImages();

// Load on page start
loadBookings();