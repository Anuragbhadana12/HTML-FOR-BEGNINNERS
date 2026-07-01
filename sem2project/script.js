let students = JSON.parse(localStorage.getItem("students")) || [];

function calculateGrade(percent) {

    if(percent >= 90) return "A+";
    if(percent >= 80) return "A";
    if(percent >= 70) return "B";
    if(percent >= 60) return "C";
    if(percent >= 50) return "D";

    return "F";
}

function saveData() {
    localStorage.setItem("students", JSON.stringify(students));
}

function addStudent() {

    const name = document.getElementById("name").value;

    const math = Number(document.getElementById("math").value);

    const science = Number(document.getElementById("science").value);

    const english = Number(document.getElementById("english").value);

    if(!name || math === "" || science === "" || english === "") {
        alert("Fill all fields");
        return;
    }

    const total = math + science + english;

    const percentage = (total / 300) * 100;

    const grade = calculateGrade(percentage);

    students.push({
        name,
        math,
        science,
        english,
        percentage: percentage.toFixed(2),
        grade
    });

    saveData();

    displayStudents();

    document.getElementById("name").value = "";
    document.getElementById("math").value = "";
    document.getElementById("science").value = "";
    document.getElementById("english").value = "";
}

function displayStudents() {

    const table = document.getElementById("studentTable");

    table.innerHTML = "";

    students.forEach((student,index)=>{

        table.innerHTML += `
        <tr>
            <td>${student.name}</td>
            <td>${student.math}</td>
            <td>${student.science}</td>
            <td>${student.english}</td>
            <td>${student.percentage}</td>
            <td>${student.grade}</td>
            <td>
                <button class="delete-btn"
                onclick="deleteStudent(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;
    });

    updateStats();
}

function deleteStudent(index){

    students.splice(index,1);

    saveData();

    displayStudents();
}

function updateStats(){

    document.getElementById("totalStudents").innerText =
    students.length;

    let totalPercent = 0;

    students.forEach(student=>{
        totalPercent += Number(student.percentage);
    });

    let avg = students.length ?
    (totalPercent/students.length).toFixed(2)
    : 0;

    document.getElementById("avgPercent").innerText = avg;
}

document.getElementById("search")
.addEventListener("keyup", function(){

    let value = this.value.toLowerCase();

    let rows = document.querySelectorAll("#studentTable tr");

    rows.forEach(row=>{

        let name = row.children[0]
        .innerText.toLowerCase();

        row.style.display =
        name.includes(value) ? "" : "none";
    });
});

displayStudents();