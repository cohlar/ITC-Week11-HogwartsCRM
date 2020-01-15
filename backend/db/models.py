from datetime import datetime

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(20), nullable=False)
    lastname = db.Column(db.String(20), nullable=False)
    created = db.Column(db.DateTime, default=datetime.utcnow)
    lastupdated = db.Column(db.DateTime, default=datetime.utcnow)
    magicskills = db.relationship('StudentSkill', lazy=True)
    courses = db.relationship('StudentCourse', lazy=True)


class StudentSkill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    studentid = db.Column(db.Integer, db.ForeignKey(
        'student.id'), nullable=False)
    skill = db.Column(db.String(50), nullable=False)
    skilltype = db.Column(db.String(20), nullable=False)
    level = db.Column(db.Integer, nullable=False)


class StudentCourse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    studentid = db.Column(db.Integer, db.ForeignKey(
        'student.id'), nullable=False)
    course = db.Column(db.String(50), nullable=False)


class StudentSkillSchema(ma.ModelSchema):
    class Meta:
        model = StudentSkill
        exclude = ('id',)


class StudentCourseSchema(ma.ModelSchema):
    class Meta:
        model = StudentCourse
        exclude = ('id',)


class StudentSchema(ma.ModelSchema):
    class Meta:
        model = Student

    magicskills = ma.Nested(StudentSkillSchema, many=True)
    courses = ma.Nested(StudentCourseSchema, many=True)