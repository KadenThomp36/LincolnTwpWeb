var homeActive = "";
var officialsActive = "";
var meetingsActive = "";
var linksActive = "";

function currentPage(currentPageName) {
  navitems = document.getElementById(currentPageName);
  if (currentPageName == 'officials'){
    navitems.setAttribute("class", "active nav-link dropdown-toggle");
  } else {
    navitems.setAttribute("class", "active nav-link");
  }
}


class customHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <header>
    <nav class="navbar navbar-expand-lg navbar-dark border-bottom opacity-2 blur-header">
      <div class="container">
        <a class="navbar-brand" href="index.html">
          Lincoln Township
        </a>
        <button 
          class="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item checkActive"><a class="nav-link" id="home" aria-current="page" href="index.html">Home</a></li>
            <li class="nav-item dropdown checkActive">
              <a 
                id="officials"
                class="nav-link dropdown-toggle" 
                id="navbarDropdown" 
                href="#" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Officials
              </a>
              <ul class="dropdown-menu collapse dropdown-menu-end mt-2" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="Supervisor.html">Supervisor</a></li>
                <li><a class="dropdown-item" href="Clerk.html">Clerk</a></li>
                <li><a class="dropdown-item" href="Treasurer.html">Treasurer</a></li>
                <li><a class="dropdown-item" href="Trustees.html">Trustees</a></li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li><a class="dropdown-item" href="EOfficials.html"> Elected Officials</a></li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li><a class="dropdown-item" href="Officials.html">Township Officials</a></li>
              </ul>
            </li>
            <li class="nav-item checkActive" ><a class="nav-link" id="meetings" href="MonthlyMeetings.html">Monthly Meetings</a></li>
            <li class="nav-item checkActive" ><a class="nav-link" id="links" href="UsefulLinks.html">Useful Links</a></li>
          </ul>
        </div>
      </div>
    </nav>
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
  customElements.define('lincoln-header', customHeader);