from flask import Flask, render_template, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from datetime import datetime
import logging

app = Flask(__name__)
CORS(app)

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hogwarts.db'

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(20), nullable=False)
    lastname = db.Column(db.String(20), nullable=False)
    created = db.Column(db.DateTime, default=datetime.utcnow)
    lastupdated = db.Column(db.DateTime, default=datetime.utcnow)
    magicskills = db.relationship('StudentSkill', backref='studentid', lazy=True)
    courses = db.relationship('StudentCourse', backref='studentid', lazy=True)


class StudentSkill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    skill = db.Column(db.String(50), nullable=False)
    skilltype = db.Column(db.String(20), nullable=False)
    level = db.Column(db.Integer, nullable=False)


class StudentCourse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    course = db.Column(db.String(50), nullable=False)


class StudentSchema(ma.ModelSchema):
    class Meta:
        model = Student


class StudentSkillSchema(ma.ModelSchema):
    class Meta:
        model = StudentSkill


class StudentCourseSchema(ma.ModelSchema):
    class Meta:
        model = StudentCourse


@app.route('/api/magicskills/get')
def getmagicskills():
    magicskills = ['Alchemy', 'Animation', 'Conjuror', 'Disintegration', 'Elemental', 'Healing', 'Illusion', 'Immortality', 'Invisibility',
               'Invulnerability', 'Necromancer', 'Omnipresent', 'Omniscient', 'Poison', 'Possession', 'Self-detonation', 'Summoning', 'Water breathing']
    return jsonify(magicskills)


@app.route('/api/courses/get')
def getcourses():
    courses = ['Alchemy basics', 'Alchemy advanced', 'Magic for day-to-day life',
           'Magic for medical professionals', 'Dating with magic']
    return jsonify(courses)


@app.route('/api/students/create', methods=['POST'])
def createstudent():
    student = request.get_json()

    firstname = student.get('firstname')
    lastname = student.get('lastname')
    if not firstname or not lastname:
        # add message '{"message": "First Name and Last Name are both mandatory"}'
        abort(404)

    new_student = Student(firstname=firstname, lastname=lastname)
    db.session.add(new_student)

    magicskills = student.get('magicskills')
    for magicskill in magicskills:
        skill = magicskill.get('skill')
        skilltype = magicskill.get('skilltype')
        level = magicskill.get('level')
        new_skill = StudentSkill(studentid=new_student, skill=skill, skilltype=skilltype, level=level)
        db.session.add(new_skill)

    courses = student.get('courses')
    for course in courses:
        new_course = StudentCourse(studentid=new_student, course=course)
        db.session.add(new_course)

    db.session.commit()
    
    return 'Added new student'


@app.route('/api/students/get')
def getstudent():
    students = db.session.query(Student).all()
    student_schema = StudentSchema(many=True)
    output = student_schema.dump(students)
    return jsonify(output)


@app.route('/api/students/get/<id>')
def getstudentbyid(id):
    student = db.session.query(Student).get(id)
    student_schema = StudentSchema()
    output = student_schema.dump(student)
    return jsonify(output)


@app.route('/api/studentskills/get/<id>')
def getstudentskill(id):
    studentskill = db.session.query(StudentSkill).get(id)
    studentskill_schema = StudentSkillSchema()
    output = studentskill_schema.dump(studentskill)
    return jsonify(output)


@app.route('/api/studentcourses/get/<id>')
def getstudentcourse(id):
    studentcourse = db.session.query(StudentCourse).get(id)
    studentcourse_schema = StudentCourseSchema()
    output = studentcourse_schema.dump(studentcourse)
    return jsonify(output)


# @app.route('/')
# @app.route('/<path:path>')
# def index(path='/'):
#     return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
