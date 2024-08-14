/*!
 * Start Bootstrap - Bare v5.0.2 (https://startbootstrap.com/template/bare)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-bare/blob/master/LICENSE)
 */
// This file is intentionally blank
// Use this file to add JavaScript to your project

// When the user scrolls the page, execute myFunction

var meeting_changed = false;
var year_changed = false;
var firstmodal = true;
var year_val;
var meeting_val;
var table_to_disp;

var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

var buttonUp = () => {
  const input = document.getElementById("official-search");
  const cards = document.getElementsByClassName("targ");
  const oopsie = document.getElementsByClassName("oops");
  let filter = input.value;
  var hit = true;
  oopsie[0].classList.add("d-none");

  for (let i = 0; i < cards.length; i++) {
    let title = cards[i].querySelector(".card-body");
    if (title.innerText.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
      cards[i].classList.remove("d-none");

      hit = false;
    } else {
      cards[i].classList.add("d-none");
    }
  }
  if (hit == true) {
    oopsie[0].classList.remove("d-none");
  }
};

var myModal = document.getElementById("myModal");
var myInput = document.getElementById("myInput");

myModal.addEventListener("shown.bs.modal", function () {
  myInput.focus();
});
var source;
function setSrc(src) {
  source = src;
  if (!firstmodal) {
    const embed = document.getElementById("embedpdf");
    if (embed) {
      embed.remove();
    }
  }
  firstmodal = false;
  const afterme = document.getElementById("afterme");
  if (afterme) {
    afterme.insertAdjacentHTML(
      "afterend",
      `<iframe src="${src}" id="embedpdf" width="100%" height="500px"></iframe>`
    );
  }
}

function setSrcTitle(src, title) {
  source = src;
  if (firstmodal != true) {
    document.getElementById("embedpdf").remove();
  }
  firstmodal = false;
  document
    .getElementById("afterme")
    .insertAdjacentHTML("afterend", '<object data="" id="embedpdf"></object>');
  document.getElementById("embedpdf").data = src;
  document.getElementById("modalTitle").innerHTML = title;
}

/* Helper function */
function download_file() {
  fileURL = source;
  fileName = source;
  // for non-IE
  if (!window.ActiveXObject) {
    var save = document.createElement("a");
    save.href = fileURL;
    save.target = "_blank";
    var filename = fileURL.substring(fileURL.lastIndexOf("/") + 1);
    save.download = fileName || filename;
    if (
      navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) &&
      navigator.userAgent.search("Chrome") < 0
    ) {
      document.location = save.href;
      // window event not working here
    } else {
      var evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: false,
      });
      save.dispatchEvent(evt);
      (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }
  }

  // for IE < 11
  else if (!!window.ActiveXObject && document.execCommand) {
    var _window = window.open(fileURL, "_blank");
    _window.document.close();
    _window.document.execCommand("SaveAs", true, fileName || fileURL);
    _window.close();
  }
}

function ScrollOnClick(elementID) {
  var elementScrollTo = document.getElementById(elementID);
  scrollTo(0, elementScrollTo.offsetTop);
}

function clearSearch() {
  const oopsie = document.getElementsByClassName("oops");
  const search = document.getElementById("official-search");
  const cards = document.getElementsByClassName("targ");
  search.value = "";
  oopsie[0].classList.add("d-none");
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove("d-none");
  }
}

function meetingChanged() {
  document.getElementById("year-list").disabled = false;
  meeting_changed = true;
  var meet_temp = document.getElementsByClassName("meeting");
  for (var i = 0; i < meet_temp.length; i++) {
    if (meet_temp[i].selected == true) {
      meeting_val = meet_temp[i].value;
    }
  }
}

function YearChanged() {
  year_changed = true;
  var year_temp = document.getElementsByClassName("year");
  for (var i = 0; i < year_temp.length; i++) {
    if (year_temp[i].selected == true) {
      year_val = year_temp[i].value;
    }
  }
}

function dispalyFilterError() {
  const meetings_err = document.getElementById("err-meeting");
  const year_err = document.getElementById("err-year");
  const month_err = document.getElementById("err-month");
  if (meeting_changed == false) {
    meetings_err.classList.remove("d-none");
  } else {
    meetings_err.classList.add("d-none");
    if (year_changed == false) {
      year_err.classList.remove("d-none");
    } else {
      year_err.classList.add("d-none");
    }
  }
}

function displayMeetingYear() {
  table_to_disp = year_val + meeting_val;
  const tables = document.getElementsByClassName("table-holder");
  for (let i = 0; i < tables.length; i++) {
    if (tables[i].id !== "meetingsContainer") {
      tables[i].classList.add("d-none");
      if (tables[i].id == table_to_disp) {
        tables[i].classList.remove("d-none");
      }
    }
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
customElements.define("main-header", Header);

class Div extends HTMLDivElement {
  connectedCallback() {
    this.innerHTML =
      `
    <div class="modal-body">
      <div>
        <object
        id="data"
        type="application/pdf"
        width="1000"
        height="678"
        data="` +
      source +
      `">
          <iframe
          id="src"
          width="1000"
          height="678"
          src="` +
      source +
      `">
            <p>This browser does not support PDF!</p>
          </iframe>

        </object>
      </div>
    </div>
    `;
  }
}
customElements.define("modal-body", Div);
