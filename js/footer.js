
class Footer extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
      <footer class="footer-bs justify-content-center">
    <div class="row mx-auto" style="max-width: 1315px;">
      <div class="col-md-3 footer-nav animated border-0">
        <h4>Lincoln Township Hall</h4>
        <ul class="list">
          <li>Get Directions</li>
          <li><a href="https://goo.gl/maps/piPSR82zw8zMaiNy7">1882 N. Hope Rd. Midland, Michigan 48642</a></li>
          <li>Contact</li>
          <li><a href="tel:989-374-2220">989-374-2220</a></li>
        </ul>
      </div>
          
          <div class="col-md-3 footer-nav">
                <ul class="list">
                  <h4>Menu</h4>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="EOfficials.html">Elected Officials</a></li>
                    <li><a href="Officials.html">Officials</a></li>
                    <li><a href="MonthlyMeetings.html">Monthly Meetings</a></li>
                    <li><a href="UsefulLinks.html">Useful Links</a></li>
                </ul>
            </div>
          <div class="col-md-3 footer-nav">
                <ul class="list">
                  <h4>Useful Links</h4>
                    <li><a href="#">Property Tax Information</a></li>
                    <li><a href="#">Forms, Permits, and Policies</a></li>
                    <li><a href="#">Water District #1</a></li>
                    <li><a href="#">Trash Collection</a></li>
                    <li><a href="#">Zoning Ordinances</a></li>
                    <li><a href="#">Michigan Voter Information</a></li>
                </ul>
            </div>
        
      <div class="col-md-3 footer-nav">
          <h4>Plans</h4>
          <ul class="list">
              <li><a href="#">Zoning Maps</a></li>
              <li><a href="#">Township Master Plan</a></li>
              <li><a href="#">Parks Master Plan</a></li>
              <li><a href="#">Township Recreation Plan</a></li>
            </ul>
        </div>
      
    </div>
    <p><small class="text-muted">Feedback to _____, images _____ Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></small></p>
</footer>
      `;
    }
  }
  customElements.define('lincoln-footer', Footer);