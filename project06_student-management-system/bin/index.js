#!/user/bin/env node
import inquirer from 'inquirer';
import chalkAnimation from "chalk-animation";
class Student {
    static studentID = 0;
    _name;
    _studentID;
    _courses;
    _balance;
    constructor(name) {
        this._name = name;
        this._studentID = (Student.studentID++).toString().padStart(5, '0');
        this._courses = [];
        this._balance = 0;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get studentID() {
        return this._studentID;
    }
    get courses() {
        return this._courses;
    }
    get balance() {
        return this._balance;
    }
    enroll(course, cost) {
        this._courses.push(course);
        this._balance += cost;
    }
    payTuition(amount) {
        this._balance -= amount;
    }
    showStatus() {
        console.log(`Name: ${this._name}`);
        console.log(`Student ID: ${this._studentID}`);
        console.log(`Courses Enrolled: ${this._courses.join(', ')}`);
        console.log(`Balance: ${this._balance}`);
    }
}
class Course {
    _name;
    _cost;
    constructor(name, cost) {
        this._name = name;
        this._cost = cost;
    }
    get name() {
        return this._name;
    }
    get cost() {
        return this._cost;
    }
}
class Teacher {
    _name;
    _courses;
    constructor(name) {
        this._name = name;
        this._courses = [];
    }
    setName(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    get courses() {
        return this._courses;
    }
    addCourse(course) {
        this._courses.push(course);
    }
}
const students = [];
const courses = [];
const teachers = [];
const enrollStudent = async () => {
    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the student\'s name:',
        },
    ]);
    const student = new Student(name);
    students.push(student);
    const courseNames = courses.map((course) => course.name);
    const { course } = await inquirer.prompt([
        {
            type: 'list',
            name: 'course',
            message: 'Select a course to enroll in:',
            choices: courseNames,
        },
    ]);
    const selectedCourse = courses.find((c) => c.name === course);
    if (selectedCourse) {
        student.enroll(selectedCourse.name, selectedCourse.cost);
    }
    else {
        console.log("The selected course not found");
    }
};
const viewStudentBalance = async () => {
    const studentNames = students.map((student) => student.name);
    const { student } = await inquirer.prompt([
        {
            type: 'list',
            name: 'student',
            message: 'Select a student:',
            choices: studentNames,
        },
    ]);
    const selectedStudent = students.find((s) => s.name === student);
    if (selectedStudent)
        console.log(`${selectedStudent.name}'s balance is ${selectedStudent.balance}.`);
    else
        console.log("The selected student not found");
};
const payTuition = async () => {
    const studentNames = students.map((student) => student.name);
    const { student, amount } = await inquirer.prompt([
        {
            type: 'list',
            name: 'student',
            message: 'Select a student:',
            choices: studentNames,
        },
        {
            type: 'input',
            name: 'amount',
            message: 'Enter the amount to pay:',
        },
    ]);
    const selectedStudent = students.find((s) => s.name === student);
    if (selectedStudent) {
        selectedStudent.payTuition(amount);
    }
    else {
        console.log("The selected student not found");
    }
};
const addCourse = async () => {
    const { name, cost } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the course name:',
        },
        {
            type: 'input',
            name: 'cost',
            message: 'Enter the course cost:',
        },
    ]);
    const course = new Course(name, cost);
    courses.push(course);
};
const addTeacher = async () => {
    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the Teacher name:',
        }
    ]);
    const teacher = new Teacher(name);
    teacher.setName(teacher.name);
    teachers.push(teacher);
};
const assignTeacher = async () => {
    const courseNames = courses.map((course) => course.name);
    const { course: selectedCourse } = await inquirer.prompt([
        {
            type: 'list',
            name: 'course',
            message: 'Select a course:',
            choices: courseNames,
        },
    ]);
    const teacherNames = teachers.map((teacher) => teacher.name);
    const { teacher: selectedTeacher } = await inquirer.prompt([
        {
            type: 'list',
            name: 'teacher',
            message: 'Select a teacher:',
            choices: teacherNames,
        },
    ]);
    const course = courses.find((c) => c.name === selectedCourse);
    if (course) {
        const teacher = teachers.find((t) => t.name === selectedTeacher);
        if (teacher) {
            teacher.addCourse(course);
        }
        else {
            console.log("The selected teacher not found");
        }
    }
    else {
        console.log("The selected course not found");
    }
    // const course = courses.find((c) => c.name === selectedCourse);
    // const teacher = teachers.find((t) => t.name === selectedTeacher);
    // teacher.addCourse(course);
};
const mainMenu = async () => {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Select an option:',
            choices: [
                {
                    name: 'Enroll student in a course',
                    value: 'enroll_student',
                },
                {
                    name: 'View student balance',
                    value: 'view_balance',
                },
                {
                    name: 'Pay tuition',
                    value: 'pay_tuition',
                },
                {
                    name: 'Add a course',
                    value: 'add_course',
                },
                {
                    name: 'Add Teacher',
                    value: 'add_teacher',
                },
                {
                    name: 'Assign a teacher to a course',
                    value: 'assign_teacher',
                },
                {
                    name: 'Exit',
                    value: 'exit',
                },
            ],
        },
    ]);
    switch (choice) {
        case 'enroll_student':
            await enrollStudent();
            break;
        case 'view_balance':
            await viewStudentBalance();
            break;
        case 'pay_tuition':
            await payTuition();
            break;
        case 'add_teacher':
            await addTeacher();
            break;
        case 'add_course':
            await addCourse();
            break;
        case 'assign_teacher':
            await assignTeacher();
            break;
        case 'exit':
            return;
    }
    mainMenu();
};
const sleep = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
};
async function welcome() {
    let title = chalkAnimation.rainbow("Welcome to JH Student Managment System\n");
    await sleep();
    title.stop();
}
await welcome();
mainMenu();
