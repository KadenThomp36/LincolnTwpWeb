function generateTableRow(
  year,
  month,
  day,
  boardMeeting,
  disabledMin = false,
  disabledAgen = false,
  special = false,
  budget = false,
  subText = ``,
  agendaPathOverride,
  minutesPathOverride
) {
  let agendaPath = agendaPathOverride;
  let minutesPath = minutesPathOverride;

  if (!agendaPathOverride) {
    agendaPath = generatePath(year, month, boardMeeting, true, special, budget);
  }
  if (!minutesPathOverride) {
    minutesPath = generatePath(
      year,
      month,
      boardMeeting,
      false,
      special,
      budget
    );
  }
  const row = document.createElement("tr");

  const dateCell = document.createElement("th");

  if (subText) {
    dateCell.innerHTML = `${month} ${day}<br><small class="text-muted">${subText}</small>`;
  } else {
    dateCell.textContent = `${month} ${day}`;
  }

  if (special) {
    dateCell.innerHTML = `${month} ${day}<br><small class="text-muted">Special Meeting <u>6:00pm</u></small>`;
  }

  if (budget) {
    dateCell.innerHTML = `${month} ${day}<br><small class="text-muted">Budget Meeting Workshop <u>6:00pm</u></small>`;
  }

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
    minutesButton.className = agendaButton.className + " customDisabled";
  }

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

function generatePath(year, month, boardMeeting, agenda, special, budget) {
  let path = "https://kdentee.com/";
  let monthTrim = month.substring(0, 3);
  if (boardMeeting) {
    path += year + "b/";
  } else {
    path += year + "p/";
  }

  path += monthTrim + "mtg";

  path += "/" + monthTrim;
  if (agenda) {
    path += "agnd";
  } else {
    path += "min";
  }

  if (special) {
    path += "-spcl";
  }

  if (budget) {
    path += "-budg";
  }

  path += ".pdf";

  return path.toLowerCase();
}

function generateTable(year, meetings, boardMeeting) {
  const container = document.getElementById("meetingsContainer");

  const outerDiv = document.createElement("div");
  if (boardMeeting) {
    outerDiv.id = `${year}bm`;
  } else {
    outerDiv.id = `${year}pm`;
  }
  outerDiv.className = "mx-auto d-none table-holder";
  outerDiv.style.maxWidth = "1300px";

  const h1 = document.createElement("h1");
  if (boardMeeting) {
    h1.textContent = `${year} Board Meetings`;
  } else {
    h1.textContent = `${year} Planning Commission Meetings`;
  }

  outerDiv.appendChild(h1);

  const p = document.createElement("p");
  p.className = "lead";
  p.style.maxWidth = "500px";

  if (boardMeeting) {
    p.innerHTML = `Meetings are held on the <strong>2nd Tuesday</strong> of each month at
    the <a href="https://goo.gl/maps/piPSR82zw8zMaiNy7" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top"
      title="Click for Directions" style="color: black;"><strong>Lincoln Township Hall.</strong></a> Meetings begin
    at <em>7:00pm Unless otherwise specified</em>`;
  } else {
    p.innerHTML = `Meetings are held at the <a href="https://goo.gl/maps/piPSR82zw8zMaiNy7" target="_blank" data-bs-toggle="tooltip" data-bs-placement="top"
    title="Click for Directions" style="color: black;"><strong>Lincoln Township Hall.</strong></a> Meetings begin
  at <em>6:30pm Unless otherwise specified</em>`;
  }

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
      boardMeeting,
      meeting.disabledMin,
      meeting.disabledAgen,
      meeting.special,
      meeting.budget,
      meeting.subText,
      meeting.agendaPath,
      meeting.minutesPath
    );
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  innerDiv.appendChild(table);
  outerDiv.appendChild(innerDiv);
  container.appendChild(outerDiv);
}

function generateYear(years) {
  const container = document.getElementById("year-list");
  years.reverse();
  years.forEach((year) => {
    const innerOption = document.createElement("option");
    innerOption.value = year;
    innerOption.classList = "year";
    innerOption.innerHTML = `${year}`;

    container.appendChild(innerOption);
  });
}

async function init() {
  try {
    // Initiate both fetch requests in parallel
    const [responseDataBoard, responseDataPlanning] = await Promise.all([
      fetch(
        "https://script.google.com/macros/s/AKfycbyOzJMuBLjS61Nc922OJPt5v9Nns0AO-mLFul9mZjOQQEWwMdWlvjBsqF0a9JbJLVsDlw/exec?meetingType=BoardMeetings"
      ),
      fetch(
        "https://script.google.com/macros/s/AKfycbyOzJMuBLjS61Nc922OJPt5v9Nns0AO-mLFul9mZjOQQEWwMdWlvjBsqF0a9JbJLVsDlw/exec?meetingType=PlanningMeetings"
      ),
    ]);

    // Process text data in parallel
    const [textDataBoard, textDataPlanning] = await Promise.all([
      responseDataBoard.text(),
      responseDataPlanning.text(),
    ]);

    const [meetingDataBoard, meetingDataPlanning] = await Promise.all([
      processBoardMeetings(textDataBoard),
      processPlanningMeetings(textDataPlanning),
    ]);

    const years = [];

    // Generate tables for BoardMeetings
    for (const [year, meetings] of Object.entries(meetingDataBoard)) {
      if (!years.includes(year)) {
        years.push(year);
      }
      await generateTable(year, meetings, true);
    }

    // Generate tables for PlanningMeetings
    for (const [year, meetings] of Object.entries(meetingDataPlanning)) {
      await generateTable(year, meetings, false);
    }

    await generateYear(years);
  } catch (error) {
    console.error("Error fetching or converting data:", error);
  }
}

function processBoardMeetings(textData) {
  const valuesBoard = textData.split(",");
  const meetingDataBoard = {};

  for (let i = 0; i < valuesBoard.length; i += 10) {
    const year = valuesBoard[i];
    const meeting = {
      month: valuesBoard[i + 1],
      day: valuesBoard[i + 2],
      disabledAgen: valuesBoard[i + 3].toLowerCase() === "true",
      disabledMin: valuesBoard[i + 4].toLowerCase() === "true",
      special: valuesBoard[i + 5].toLowerCase() === "true",
      budget: valuesBoard[i + 6].toLowerCase() === "true",
      subText: valuesBoard[i + 7],
      agendaPath: valuesBoard[i + 8],
      minutesPath: valuesBoard[i + 9],
    };

    if (!meetingDataBoard[year]) {
      meetingDataBoard[year] = [];
    }
    meetingDataBoard[year].push(meeting);
  }

  return meetingDataBoard;
}

function processPlanningMeetings(textData) {
  const valuesPlanning = textData.split(",");
  const meetingDataPlanning = {};

  for (let i = 0; i < valuesPlanning.length; i += 7) {
    const year = valuesPlanning[i];
    const meeting = {
      month: valuesPlanning[i + 1],
      day: valuesPlanning[i + 2],
      disabledAgen: valuesPlanning[i + 3].toLowerCase() === "true",
      disabledMin: valuesPlanning[i + 4].toLowerCase() === "true",
      agendaPath: valuesPlanning[i + 5],
      minutesPath: valuesPlanning[i + 6],
    };

    if (!meetingDataPlanning[year]) {
      meetingDataPlanning[year] = [];
    }
    meetingDataPlanning[year].push(meeting);
  }

  return meetingDataPlanning;
}

init();
