/*!
* Start Bootstrap - Bare v5.0.2 (https://startbootstrap.com/template/bare)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-bare/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project


var buttonUp = () => {
  const input = document.querySelector(".searchbox-input");
  const cards = document.getElementsByClassName("targ");
  const oopsie = document.getElementsByClassName("oops");
  let filter = input.value
  var hit = true;
  oopsie[0].classList.add("d-none")
  
  for (let i = 0; i < cards.length; i++) {
      let title = cards[i].querySelector(".card-body");
      if (title.innerText.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
          cards[i].classList.remove("d-none")

          hit = false
      } else {
          cards[i].classList.add("d-none")

      }

  }
  if (hit == true){
    oopsie[0].classList.remove("d-none")
  }
}

class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <header>
    <div class="h-auto mt-5 d-flex align-items-center container">
      <div class="row">
        <div class="col">
          <h1 class="text-light">Homepage</h1>
          <h3 class="text-white-50">Lincoln Township, Midland Michigan</h3>
        </div>
      </div>
    </div>
    
    </header>
    `;
  }
}
customElements.define('main-header', Header);