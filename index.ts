interface ICourse {
  _id: number;
  title: string;
}

interface IStudent {
  _id: number;
  name: string;
}

interface IEnrollments {
  course_id: number;
  student_id: number;
}

const courses: ICourse[] = [
  { _id: 1, title: "JavaScript I" },
  { _id: 2, title: "HTML y CSS I" },
];

const students: IStudent[] = [
  { _id: 1, name: "Pedro Perez" },
  { _id: 2, name: "Maria Gomez" },
];

const enrollments: IEnrollments[] = [
  { course_id: 1, student_id: 1 },
  { course_id: 2, student_id: 1 },
  { course_id: 2, student_id: 2 },
];

interface IStudentCourses {
  student: {
    id: number;
    name: string;
  };
  courses: ICourse[];
}

function getCourseByStudentId(studentId: number): IStudentCourses {
  const student = students.find(
    (classStudent) => classStudent._id === studentId
  );
  if (!student) throw new Error("Not student found");
  const studentEnrollments = enrollments.filter(
    (enrollment) => enrollment.student_id === studentId
  );
  const coursesId: number[] = studentEnrollments.map(
    (enrollment) => enrollment.course_id
  );
  const filteredCourses: ICourse[] = courses.filter((course) =>
    coursesId.includes(course._id)
  );
  return {
    student: {
      id: student!._id,
      name: student!.name,
    },
    courses: filteredCourses,
  };
}

interface ICoursesStudent {
  course: {
    id: number;
    title: string;
  };
  student: IStudent[];
}

function getStudentByCourseId(courseId): ICoursesStudent {
  const course = courses.find((course) => course._id === courseId);
  if (!course) throw new Error("Not student found");
  const filteredEnrollments = enrollments.filter(
    (element) => element.course_id === courseId
  );
  const studentIds = filteredEnrollments.map((element) => element.student_id);
  const filteredStudents = students.filter((student) =>
    studentIds.includes(student._id)
  );
  return {
    course: {
      id: courseId,
      title: course.title,
    },
    student: filteredStudents,
  };
}
