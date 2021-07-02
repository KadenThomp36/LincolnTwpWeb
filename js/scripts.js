/*!
* Start Bootstrap - Bare v5.0.2 (https://startbootstrap.com/template/bare)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-bare/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
document.addEventListener("DOMContentLoaded", function(event) { 
class Header extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

      <div class="container">       
          <a class="navbar-brand" href="index.html">
            Lincoln Township
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li class="nav-item"><a class="nav-link" aria-current="page" href="index.html">Home</a></li>
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle active" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Officials</a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="Supervisor.html">Supervisor</a></li>
                        <li><a class="dropdown-item" href="Clerk.html">Clerk</a></li>
                        <li><a class="dropdown-item" href="Treasurer.html">Treasurer</a></li>
                        <li><a class="dropdown-item" href="#">Trustees</a></li>
                        <li><hr class="dropdown-divider"/></li>
                        <li><a class="dropdown-item" href="#"> Elected Officials</a></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" href="#">Township Officials</a></li>
                    </ul>
                  </li>
                  <li class="nav-item"><a class="nav-link" href="#">Monthly Meetings</a></li>
                  <li class="nav-item"><a class="nav-link" href="#">Forms, Permits & Policies</a></li>
              </ul>
          </div>
      </div>
  </nav>
      `;
    }
  }
  
  customElezments.define('header-component', Header);
});

var buttonUp = () => {
  const input = document.querySelector(".searchbox-input");
  const cards = document.getElementsByClassName("card");
  let filter = input.value
  for (let i = 0; i < cards.length; i++) {
      let title = cards[i].querySelector(".card-body");
      if (title.innerText.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
          cards[i].classList.remove("d-none")
      } else {
          cards[i].classList.add("d-none")
      }
  }
}