import { Student } from '../../entities/student';

export class StudentDto {
    user_id: number;
    username: string;
    password: string;
    password_confirm: string;
    email: string;
    gradebook_id: string;
    student_name: string;
    student_fname: string;
    student_surname: string;
    group_id: string;
    plain_password: string;
    photo: string;

    static parseStudent(student: Student): StudentDto{
        const dto = new StudentDto();

        dto.username = student.username;
        dto.password = student.password;
        dto.password_confirm = student.passwordConfirm;
        dto.email = student.email;
        dto.gradebook_id = student.gradebookId;
        dto.student_surname = student.studentSurname;
        dto.student_name = student.studentName;
        dto.student_fname = student.studentFname;
        dto.group_id = student.groupId;
        dto.plain_password = student.password;
        dto.photo = student.photo;

        return dto;
    }

    toStudent(): Student {
        const entity = new Student();

        entity.userId = this.user_id;
        entity.gradebookId = this.gradebook_id;
        entity.studentSurname = this.student_surname;
        entity.studentName = this.student_name;
        entity.studentFname = this.student_fname;
        entity.groupId = this.group_id;
        entity.plainPassword = this.plain_password;
        entity.photo = this.photo;

        return entity;
    }
}