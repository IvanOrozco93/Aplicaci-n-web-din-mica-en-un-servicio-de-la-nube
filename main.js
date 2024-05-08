$(document).ready(function () {
  const registrationContainer = $("#registration-container");
  const searchContainer = $("#search-container");

  const registerForm = $("#register-form");
  const registerButton = $("#register-button");

  const searchInput = $("#search-input");
  const searchButton = $("#search-button");
  const tableBody = $("#table-body");

  const backToRegistrationButton = $("#back-to-registration");
  const logoutButton = $("#logout");

  registerButton.click(function () {
  
    registrationContainer.hide();
    searchContainer.show();
  });

  registerForm.submit(async function (e) {
    e.preventDefault();
    const userName = $("#nombre").val().trim();

    try {

      console.log(`Se registró el usuario con nombre: ${userName}`);
    } catch (error) {
      console.error("Error al registrar el usuario:", error.message);
    }
  });

  searchButton.click(async function () {
    const searchTerm = searchInput.val().trim();

    try {

      const photo = await $.getJSON(`https://jsonplaceholder.typicode.com/photos/${searchTerm}`);


      tableBody.empty();

      if (photo.id) {
        const row = $("<tr>").html(`
          <td>${photo.id}</td>
          <td>${photo.title}</td>
          <td><img src="${photo.thumbnailUrl}" alt="${photo.title}" style="max-width: 50px;"></td>
          <td>${photo.url}</td>
        `);
        tableBody.append(row);
      } else {
        console.log(`No se encontró ninguna foto con el ID: ${searchTerm}`);
      }
    } catch (error) {
      console.error("Error al obtener datos del servidor:", error.message);
    }
  });

  backToRegistrationButton.click(function () {

    searchContainer.hide();
    registrationContainer.show();
  });

  logoutButton.click(function () {

    searchInput.val("");
    

    searchContainer.hide();
    registrationContainer.show();
  });
});
