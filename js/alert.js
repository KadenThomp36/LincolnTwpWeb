
//to enable/disable add 'd-none' to the class list in the first div
class Alert extends HTMLElement {
    connectedCallback() {
      this.innerHTML =`
      <div class="alert alert-warning d-none alert-dismissible fade show m-2 mx-auto" role="alert" style="max-width: 1300px; margin:50px;">
        <div style="width: 90%" class="text-center">
          <strong>Trash & Recycling behind one week due to weather</strong>
        </div>
        <div>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
      `;
    }
  }
  customElements.define('lincoln-alert', Alert);
