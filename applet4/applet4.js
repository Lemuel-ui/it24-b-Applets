class StudentList {

    constructor(dataUrl) {
        this.dataUrl = dataUrl;
        this.students = [];
        this.init();
    }

    async init() {
        await this.fetchData();
        this.bindSearchEvent();
    }

    async fetchData() {
        try {
            const response = await fetch(this.dataUrl);
            this.students = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    renderStudentList(students, targetContainer) {
        targetContainer.innerHTML = students.map(student => 
            `<button class="btn btn-primary" style="margin-top:15px; 
                                                    width:25rem">
                 ${student.student_name} | Age: ${student.student_age} | Program: ${student.program} | Year Level: ${student.yearLevel}
            </button><br>`).join('');
    }

    bindSearchEvent() {
        const studentSearchBar = document.getElementById('studentSearchBar');
        const studentSearchListContainer = document.getElementById('studentSearchList');

        studentSearchBar.addEventListener('input', () => {
            this.filterStudents(studentSearchBar.value, studentSearchListContainer);
        });

        this.renderStudentList(this.students, studentSearchListContainer);
    }

    filterStudents(query, searchListContainer) {
        const filteredStudents = this.students.filter(student => {
            return student.student_name.toLowerCase().includes(query.toLowerCase());
        });

        const studentsToRender = query ? filteredStudents : this.students;
        this.renderStudentList(studentsToRender, searchListContainer);
    }
}

const studentList = new StudentList('applet4.json');