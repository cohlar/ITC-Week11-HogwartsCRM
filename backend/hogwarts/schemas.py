from .db.db import ma
from .models import Student, StudentSkill, StudentCourse


class StudentSkillSchema(ma.ModelSchema):
    class Meta:
        model = StudentSkill
    

class StudentCourseSchema(ma.ModelSchema):
    class Meta:
        model = StudentCourse


class StudentSchema(ma.ModelSchema):
    class Meta:
        model = Student

    magicskills = ma.Nested(StudentSkillSchema, many=True)
    courses = ma.Nested(StudentCourseSchema, many=True)