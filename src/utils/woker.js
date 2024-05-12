class Person {
    name = ""
    age = ""
    constructor(name,age){
        this.name = name
        this.age = age
    }
}


class Student extends Person{

    studentClass = ""
    constructor(studentClass,name,age){
        super(name,age)
        this.studentClass = studentClass
    }

    MyStudentName = () => {
        console.log(`我的名字叫：${this.name}, 今年${this.age}岁了， 是${this.studentClass}这个班级的学生`)
    }

}

class Teacher{
    teacherName = ""
    teacherType = ""
    teacherAge = ""
    teacherClass = ""
    constructor(teacherName,teacherType,teacherAge,teacherAgeClass){
        this.teacherName = teacherName
        this.teacherType = teacherType
        this.teacherAge = teacherAge
        this.teacherClass = teacherAgeClass
    }

    MyTeacherName = () => {
        console.log(`我是一名${this.teacherType} ,我的名字叫：${this.teacherName}, 今年${this.teacherAge}岁了， 是${this.teacherClass}这个班级的老师，我有一名学生一直都很优秀，让我们来让他自我介绍介绍吧！`)
        const student = new Student("2年一班", "张三","18")
        student.MyStudentName();
    }
}

const teacher = new Teacher("李老师", "语文老师", "35", "三年级一班");  
teacher.MyTeacherName();