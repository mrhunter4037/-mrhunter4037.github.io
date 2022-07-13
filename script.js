let studentsList = [];
if (localStorage.students.length > 1) {
  studentsList = JSON.parse(localStorage.students);
}

/*random names for the predefined list*/
let randomNames = ['Liam', 'Noah', 'Oliver', 'Elijah', 'James',
  'William', 'Benj', 'Lucas', 'Henry', 'Theodore'];

//Date part
let day = document.getElementById("day");
const d1 = new Date().getMonth() + 1;
const d2 = new Date().getDate();
const d3 = new Date().getFullYear();
day.innerHTML = `<h1>Attendance for ${d1}/${d2}/${d3}</h1>`;
//-**********************************************************************
//show and hide the popup Box
function showForm() {
  const e = document.getElementById("popup-wrapper");
  e.style.display = "flex";
}
function hideForm() {
  const e = document.getElementById("popup-wrapper");
  e.style.display = "none";
}
/* next three functions editForm & editForm2 & editForm3 is active in row edit routine*/
function editForm(index) {
  const a = document.getElementById("close-btn");
  a.style.display = "none";
  const newId = document.getElementById("student-id");
  const fName = document.getElementById("student-first-name");
  const lName = document.getElementById("student-last-name");
  newId.value = studentsList[index].id;
  fName.value = studentsList[index].firstName;
  lName.value = studentsList[index].lastName;
  const e = document.getElementById("inp");
  e.innerHTML = `
  <input type="button" name="form-clr-btn"
  id="form-edit-btn" value="Save edit" class="btn" onclick="editForm2(${index})">

  <input type="button" name="form-clr-btn" id="form-edit-btn"
  value="Cancel" class="btn" onclick="editForm3()">

  <input type="button" name="st-del-btn"id="form-del-btn" value="Remove student" class="btn" 
  ondblclick="deleteRecord(${index})"style="color: white; background-color: red;"">`
  showForm();
}

function editForm2(index) {
  const a = document.getElementById("close-btn");
  a.style.display = "flex";
  const newId = document.getElementById("student-id");
  const fName = document.getElementById("student-first-name");
  const lName = document.getElementById("student-last-name");
  if (newId.value !== "" && fName.value !== "" && lName.value !== "") {
    studentsList[index].id = newId.value;
    studentsList[index].firstName = fName.value;
    studentsList[index].lastName = lName.value;
    studentsList[index].attendance = "none";
  }
  else {
    alert("Please Fill all fields");
    editForm(index);
    return;
  }
  newId.value = "";
  fName.value = "";
  lName.value = "";
  const e = document.getElementById("inp");
  e.innerHTML = `<input type="button" name="form-sub-btn" 
  id="form-sub-btn" value="Save" onclick="addRecord()" class="btn">

  <input type="button" name="form-clr-btn" id="form-clr-btn" value="Clear" class="btn">`
  hideForm();
  locStorage();
  renderList();

}
function editForm3() {
  const a = document.getElementById("close-btn");
  a.style.display = "flex";
  const newId = document.getElementById("student-id");
  const fName = document.getElementById("student-first-name");
  const lName = document.getElementById("student-last-name");
  newId.value = "";
  fName.value = "";
  lName.value = "";
  const e = document.getElementById("inp");
  e.innerHTML = `<input type="button" name="form-sub-btn" 
  id="form-sub-btn" value="Save" onclick="addRecord()" class="btn">

  <input type="button" name="form-clr-btn" id="form-clr-btn" value="Clear" class="btn" onclick="clearFields()">`
  hideForm();
  renderList();
}
//to clear form fields after click on clear button
function clearFields() {
  const newId = document.getElementById("student-id");
  const fName = document.getElementById("student-first-name");
  const lName = document.getElementById("student-last-name");
  newId.value = "";
  fName.value = "";
  lName.value = "";
}

//this function rcreate the whole table body in every change happens to the data like add edit set attendance etc.
//the predefined list-->
if (studentsList.length === 0) {
  for (let i = 0; i < 4; i++) {
    const student = { id: 123, firstName: "ahmad", lastName: "saeed", attendance: "none" };
    student.id = generateRandom(181000, 211999);
    student.firstName = randomNames[generateRandom(0, 9)];
    student.lastName = randomNames[generateRandom(0, 9)];
    student.attendance = "none";
    studentsList[i] = student;
  }
}
function renderList() {
  locStorage();
  const e = document.getElementById("tb");
  const tf = document.getElementById("tf");//tf for tabel footer
  e.innerHTML = "";
  tf.innerHTML = "";
  let pCount = 0; //statistics counters
  let aCount = 0;
  let lCount = 0;
  for (let i = 4; i <= studentsList.length; i++) {
    let newItm = "";
    if (studentsList[i].attendance === "none") {
      newItm =
        `<tr>
            <td>${i + 1} <div class="edit" onclick="editForm(${i})" title="Edit"></div></td>
            <td>${studentsList[i].id}</td>
            <td>${studentsList[i].firstName} ${studentsList[i].lastName}</td>
            <td>
              <button class="cirle" onclick="takAttendancePresent(${i})" 
              title="Present">
                &#9989;
              </button>
            </td>
            <td>
              <button class="cirle" onclick="takAttendanceAbsent(${i})" title="Absent">
                &#128683;
              </button>
            </td>
            <td>
              <button class="cirle" onclick="takAttendanceLate(${i})" title="Late">
                &#128337;
              </button>
            </td>
        </tr>
      `;
    }
    if (studentsList[i].attendance === "present") {
      newItm = `
      <tr>
        <td class="present">${i + 1} <div class="edit" onclick="editForm(${i})" title="Edit"></div></td>
        <td class="present">${studentsList[i].id}</td>
        <td class="present">${studentsList[i].firstName} ${studentsList[i].lastName}</td> 
        <td class="present">
          <button class="cirle"  disabled 
          style="border: 1px solid rgba(0, 0, 0, 0.4);   opacity: 50%; cursor: default; box-shadow: none;">
            &#9989;
          </button>
        </td>
        <td class="present">
          <button class="cirle" 
          style="color: transparent;background-color: #effceb; box-shadow: none; cursor: default;" 
          disabled>
            &#9989;
          </button>
        </td>
        <td class="present">
          <button class="cirle" 
          style="color: transparent;background-color: #effceb; box-shadow: none; cursor: default;" 
          disabled>
            &#9989;
          </button>
        </td>
      </tr>`;
      pCount += 1;
    }
    if (studentsList[i].attendance === "absent") {
      newItm = `
        <tr>
          <td class="absent">${i + 1} <div class="edit" onclick="editForm(${i})" title="Edit"></div></td>
          <td class="absent">${studentsList[i].id}</td>
          <td class="absent">${studentsList[i].firstName} ${studentsList[i].lastName}</td>
          <td class="absent">
          <button class="cirle"
          title="Present" style="color: transparent;
          background-color: #f9edee; box-shadow: none;  cursor: default;" 
          disabled>
            &#9989;
          </button>
        </td>
          <td class="absent">
            <button class="cirle"  disabled 
            style="border: 1px solid rgba(0, 0, 0, 0.4);   opacity: 50%; cursor: default; box-shadow: none;">
              &#128683;
            </button>
          </td>
          <td class="absent">
          <button class="cirle" 
          title="Present" style="color: transparent;
          background-color: #f9edee; box-shadow: none; cursor: default;" 
          disabled>
            &#9989;
          </button>
        </td>
        </tr>
      `;
      aCount += 1;
    }
    if (studentsList[i].attendance === "late") {
      newItm = `
        <tr>
          <td class="late">${i + 1} <div class="edit" onclick="editForm(${i})" title="Edit"></div></td>
          <td class="late">${studentsList[i].id}</td>
          <td class="late">${studentsList[i].firstName} ${studentsList[i].lastName}</td>
          <td class="late">
          <button class="cirle"
          title="Present" style="color: transparent;
          background-color: #fcf8e9; box-shadow: none; cursor: default;" 
          disabled>
            &#9989;
          </button>
        </td>
        <td class="late">
        <button class="cirle" 
        title="Present" style="color: transparent;
        background-color: #fcf8e9; box-shadow: none; cursor: default;" 
        disabled>
          &#9989;
        </button>
      </td>
          <td class="late">
            <button class="cirle"  disabled 
            style="border: 1px solid rgba(0, 0, 0, 0.4);   opacity: 50%; cursor: default; box-shadow: none;">
              &#128337;
            </button>
          </td>
        </tr>
      `;
      lCount += 1;
    }
    e.innerHTML += newItm;
    let newStat = `
    <tr>
    <th colspan="3">Statistics</th>
    <th>${pCount}</th>
    <th>${aCount}</th>
    <th>${lCount}</th>
  </tr>`;
    tf.innerHTML = newStat;
  }
}
//function to add a new student when click on save button inside popup box
function addRecord() {
  const newId = document.getElementById("student-id");
  const fName = document.getElementById("student-first-name");
  const lName = document.getElementById("student-last-name");
  const student = { id: 123, firstName: "ahmad", lastName: "saeed", attendance: "none" };
  student.id = newId.value;
  student.firstName = fName.value;
  student.lastName = lName.value;
  student.attendance = "none";
  lName.value = "";
  fName.value = "";
  newId.value = "";
  if (student.id !== "" && student.firstName !== "" && student.lastName !== "") {
    studentsList.push(student);
    hideForm();
    renderList();
  }
  else {
    alert("Please fill all fields");
  }

}
//deletes student when click on remove student button
function deleteRecord(index) {
  studentsList.splice(index, 1);
  editForm3();
  hideForm();
  renderList();
}
//the following three functions changes the attendance state 
function takAttendancePresent(index) {
  studentsList[index].attendance = "present";
  renderList();
}
function takAttendanceLate(index) {
  studentsList[index].attendance = "late";
  renderList();
}
function takAttendanceAbsent(index) {
  studentsList[index].attendance = "absent";
  renderList();
}
//to empty studentsList when click on clear button
function emptyArray() {
  studentsList.splice(0, studentsList.length)
  renderList();
}
//reset all attendance state to none when click on Reset attendance button
function resetAttendance() {
  for (let i = 0; i < studentsList.length; i++) {
    studentsList[i].attendance = "none";
  }
  renderList();
}
//gives a random number between min and max values
function generateRandom(min, max) {

  let difference = max - min;

  let rand = Math.random();

  rand = Math.floor(rand * difference);

  rand = rand + min;

  return rand;
}
//the following two functions to download a csv file with today's date name when click
//on save button
function saveData() {
  let x = `attendance-${d1}/${d2}/${d3}`;//today's date as a file name
  exportToCsv(x, studentsList);
}

function exportToCsv(filename, rows) {
  var processRow = function (row) {
    var innerValue = row.id + ";" + row.firstName + ";" + row.lastName + ";" + row.attendance + "\n";
    return innerValue;
  };

  var csvFile = '';
  for (var i = 0; i < rows.length; i++) {
    csvFile += processRow(rows[i]);
  }

  var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
//to store studentsList to localStorage
function locStorage() {
  localStorage.students = JSON.stringify(studentsList);
}


