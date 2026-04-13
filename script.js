const form = document.getElementById("bookingForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const inputs = form.querySelectorAll("input, select");

  const booking = {
    name: inputs[0].value,
    email: inputs[1].value,
    date: inputs[2].value,
    package: inputs[3].value
  };

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push(booking);

  localStorage.setItem("bookings", JSON.stringify(bookings));

  alert("Booking Successful!");

  form.reset();
});

function loadGallery() {
  const container = document.getElementById("galleryContainer");
  const images = JSON.parse(localStorage.getItem("gallery")) || [];

  container.innerHTML = "";

  images.forEach(img => {
    const image = document.createElement("img");
    image.src = img;
    image.className = "rounded-lg hover:scale-105 transition";

    container.appendChild(image);
  });
}

loadGallery();