function generateTableRow(
    year,
    month,
    day,
    agendaPathOverride,
    minutesPathOverride,
    boardMeeting,
    disabledMin = false,
    disabledAgen = false,
    special = false
  ) {
    const agendaPath = generatePath(year, month, boardMeeting, true, special)
    const minutesPath = generatePath(year, month, boardMeeting, false, special)
    const row = document.createElement("tr");
  
    const dateCell = document.createElement("th");
    dateCell.textContent = `${month} ${day}`;
    row.appendChild(dateCell);
  
    const agendaCell = document.createElement("td");
    const agendaButton = document.createElement("button");
    agendaButton.type = "button";
    agendaButton.className = "btn btn-danger";
    if (disabledAgen) {
      agendaButton.className = agendaButton.className + " customDisabled";
    }
  
    agendaButton.dataset.bsToggle = "modal";
    agendaButton.dataset.bsTarget = "#exampleModal";
    agendaButton.textContent = "View";
    agendaButton.addEventListener("click", function () {
      setSrc(agendaPath);
    });
    agendaCell.appendChild(agendaButton);
    row.appendChild(agendaCell);
  
    const minutesCell = document.createElement("td");
    const minutesButton = document.createElement("button");
    minutesButton.type = "button";
    minutesButton.className = "btn btn-danger";
    if (disabledMin) {
      agendaButton.className = agendaButton.className + " customDisabled";
    }
    minutesButton;
  
    minutesButton.dataset.bsToggle = "modal";
    minutesButton.dataset.bsTarget = "#exampleModal";
    minutesButton.textContent = "View";
    minutesButton.addEventListener("click", function () {
      setSrc(minutesPath);
    });
    minutesCell.appendChild(minutesButton);
    row.appendChild(minutesCell);
  
    return row;
  }

  function generatePath(year, month, boardMeeting, agenda, special) {
    let path = '';
    let monthTrim = month.substring(0,3);
    if (boardMeeting) {
        path += 'brdmtgs/' + year + 'b/'
    } else {
        path += 'brdmtgs/' + year + 'p/'
    }

    path += monthTrim + 'mtg';
    
    if (special) {
        path += '-spcl'
    }

    path += '/' + monthTrim;
    if (agenda) {
        path += 'agnd';
    } else {
        path += 'min';
    }

    if (special) {
        path += '-spcl'
    }

    path += '.pdf'

    return path.toLowerCase();
  }
  
  function generateTable(year, meetings, boardMeeting) {
    const container = document.getElementById("meetingsContainer");
  
    const outerDiv = document.createElement("div");
    outerDiv.id = `${year}bm`;
    outerDiv.className = "mx-auto d-none table-holder";
    outerDiv.style.maxWidth = "1300px";
  
    const h1 = document.createElement("h1");
    h1.textContent = `${year} Board Meetings`;
    outerDiv.appendChild(h1);
  
    const p = document.createElement("p");
    p.className = "lead";
    p.style.maxWidth = "500px";
    p.textContent = `Meetings are held on the 2nd Tuesday of each month at the Lincoln Township Hall. Meetings begin at 7:00pm unless otherwise specified.`;
  
    const a = document.createElement("a");
    a.href = "https://goo.gl/maps/piPSR82zw8zMaiNy7";
    a.target = "_blank";
    a.dataset.bsToggle = "tooltip";
    a.dataset.bsPlacement = "top";
    a.title = "Click for Directions";
    a.style.color = "black";
    a.textContent = "Lincoln Township Hall";
  
    p.appendChild(a);
    outerDiv.appendChild(p);
  
    const innerDiv = document.createElement("div");
    innerDiv.className = "box-shadow";
  
    const table = document.createElement("table");
    table.className = "table table-striped align-middle mx-auto";
  
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headerColumns = ["Date", "Agenda", "Meeting Minutes"];
  
    headerColumns.forEach((column) => {
      const th = document.createElement("th");
      th.scope = "col";
      th.className = "sticky-table-head";
      th.textContent = column;
      headerRow.appendChild(th);
    });
  
    thead.appendChild(headerRow);
    table.appendChild(thead);
  
    const tbody = document.createElement("tbody");
    meetings.forEach((meeting) => {
      const row = generateTableRow(
        year,
        meeting.month,
        meeting.day,
        meeting.agendaPath,
        meeting.minutesPath,
        boardMeeting,
        meeting.disabledMin,
        meeting.disabledAgen,
        meeting.special
      );
      tbody.appendChild(row);
    });
  
    table.appendChild(tbody);
    innerDiv.appendChild(table);
    outerDiv.appendChild(innerDiv);
    container.appendChild(outerDiv);
  }
  
  async function init() {
    // Use the imported meetingsData instead of fetchMeetingsData
    for (const [year, meetings] of Object.entries(meetingDataBoard)) {
      await generateTable(year, meetings, true);
    }
  }
  
  init();
  