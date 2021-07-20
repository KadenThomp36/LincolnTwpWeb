
class Alert extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
      <div class="alert alert-warning alert-dismissible fade show m-2" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
        <strong>Trash & Recycling</strong> is behind, check the news card <a class="alert-link" href="index.html">here</a> to learn more
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      `;
    }
  }
  customElements.define('lincoln-alert', Alert);