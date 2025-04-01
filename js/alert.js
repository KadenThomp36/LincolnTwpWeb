//to enable/disable add 'd-none' to the class list in the first div
class Alert extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="alert alert-primary alert-dismissible fade show m-2 mx-auto d-flex align-items-center" role="alert" style="max-width: 1300px; margin:50px;">
      <div style="width: 100%" class="text-center">
      Notice of Public Hearing - May 6, 2025 
      <button class="btn btn-link ps-4 p-0 text-decoration-underline" style="color: black;" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setSrcTitle('assets/Misc/Notice.pdf', 'Notice Of Public Hearing')">Learn more</button>
      </div>
      <div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      </div>
      `;
  }
}
customElements.define("lincoln-alert", Alert);
