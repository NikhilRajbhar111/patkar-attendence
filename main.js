const form = document.getElementById('studentForm');
const nameInput = document.getElementById('studentName');
const studentList = document.getElementById('studentList');

let students = [];
let nextId = 1;

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    if (!name) return;

    students.push({ id: nextId++, name: name, status: 'Absent' });
    nameInput.value = '';
    renderStudents();
});

function markAttendance(id, status) {
    const student = students.find(function (s) {
        return s.id === id;
    });

    if (student) {
        student.status = status;
        renderStudents();
    }
}

function removeStudent(id) {
    students = students.filter(function (s) {
        return s.id !== id;
    });
    renderStudents();
}

function renderStudents() {
    studentList.innerHTML = '';

    students.forEach(function (student) {
        const li = document.createElement('li');
        const name = document.createElement('span');
        name.className = 'student-name';
        name.textContent = student.name + ' — ' + student.status;

        const actions = document.createElement('div');
        actions.className = 'actions';

        const presentBtn = document.createElement('button');
        presentBtn.textContent = 'Present';
        presentBtn.className = 'present-btn';
        presentBtn.addEventListener('click', function () {
            markAttendance(student.id, 'Present');
        });

        const absentBtn = document.createElement('button');
        absentBtn.textContent = 'Absent';
        absentBtn.className = 'absent-btn';
        absentBtn.addEventListener('click', function () {
            markAttendance(student.id, 'Absent');
        });

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.addEventListener('click', function () {
            removeStudent(student.id);
        });

        actions.append(presentBtn, absentBtn, removeBtn);
        li.append(name, actions);
        studentList.appendChild(li);
    });

    document.getElementById('total').textContent = students.length;
    document.getElementById('present').textContent =
        students.filter(s => s.status === 'Present').length;
    document.getElementById('absent').textContent =
        students.filter(s => s.status === 'Absent').length;
}