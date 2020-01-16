from flask import Flask, render_template, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from datetime import datetime
import logging
# import utils
# from models import Student, StudentSkill, StudentCourse
# from schemas import StudentSchema, StudentSkillSchema, StudentCourseSchema


app = Flask(__name__)
CORS(app)

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db/hogwarts.db'

db = SQLAlchemy(app)
ma = Marshmallow(app)


# Utils
def parsestudent_json(student_json):
    firstname = student_json.get('firstname')
    lastname = student_json.get('lastname')
    magicskills = student_json.get('magicskills')
    courses = student_json.get('courses')
    return firstname, lastname, magicskills, courses


def parsemagicskill_json(magicskill_json):
    skill = magicskill_json.get('skill')
    skilltype = magicskill_json.get('skilltype')
    level = magicskill_json.get('level')
    return skill, skilltype, level


def persist_new_student(db, student_instance):
    return db.session.add(student_instance)


def persist_new_magicskills(student_instance, magicskills):
    for magicskill in magicskills:
        skill, skilltype, level = parsemagicskill_json(magicskill)
        magicskill_instance = StudentSkill(skill=skill, skilltype=skilltype, level=level)
        student_instance.magicskills.append(magicskill_instance)
    return True
        
        
def persist_new_courses(student_instance, courses):
    for course in courses:
        course_instance = StudentCourse(course=course)
        student_instance.courses.append(course_instance)
    return True
        

def persist_existing_student(current_student, new_firstname, new_lastname):
    current_student.firstname = new_firstname
    current_student.lastname = new_lastname
    return True


def persist_magicskills_existing_student(db, current_student, new_magicskills):
    for current_skill in current_student.magicskills:
        db.session.delete(current_skill)
    persist_new_magicskills(current_student, new_magicskills)
    return True


def persist_courses_existing_student(db, current_student, new_courses):
    for current_course in current_student.courses:
        db.session.delete(current_course)
    persist_new_courses(current_student, new_courses)
    return True


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(20), nullable=False)
    lastname = db.Column(db.String(20), nullable=False)
    created = db.Column(db.DateTime, default=datetime.utcnow)
    lastupdated = db.Column(db.DateTime, default=datetime.utcnow)
    magicskills = db.relationship('StudentSkill', lazy=True, cascade='all')
    courses = db.relationship('StudentCourse', lazy=True, cascade='all')


class StudentSkill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    studentid = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    skill = db.Column(db.String(50), nullable=False)
    skilltype = db.Column(db.String(20), nullable=False)
    level = db.Column(db.Integer, nullable=False)


class StudentCourse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    studentid = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    course = db.Column(db.String(50), nullable=False)


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


@app.route('/api/magicskills')
def getmagicskills():
    magicskills = ['Alchemy', 'Animation', 'Conjuror', 'Disintegration', 'Elemental', 'Healing', 'Illusion', 'Immortality', 'Invisibility',
                   'Invulnerability', 'Necromancer', 'Omnipresent', 'Omniscient', 'Poison', 'Possession', 'Self-detonation', 'Summoning', 'Water breathing']
    return jsonify(magicskills)


@app.route('/api/courses')
def getcourses():
    courses = ['Alchemy basics', 'Alchemy advanced', 'Magic for day-to-day life',
               'Magic for medical professionals', 'Dating with magic']
    return jsonify(courses)


@app.route('/api/student', methods=['POST'])
def createstudent():
    student_json = request.get_json()
    firstname, lastname, magicskills, courses = parsestudent_json(student_json)
    student_instance = Student(firstname=firstname, lastname=lastname)
    
    persist_new_student(db, student_instance)
    persist_new_magicskills(student_instance, magicskills)
    persist_new_courses(student_instance, courses)

    db.session.commit()
    return 'Success'


@app.route('/api/student/<id>', methods=['GET'])
def getstudent(id):
    student = db.session.query(Student).get(id)
    student_schema = StudentSchema(exclude=('magicskills.id', 'courses.id'))
    output = student_schema.dump(student)
    return jsonify(output)


@app.route('/api/student', methods=['PUT'])
def editstudent():
    updated_student_json = request.get_json()
    id = updated_student_json.get('id')
    firstname, lastname, magicskills, courses = parsestudent_json(updated_student_json)
    
    current_student = db.session.query(Student).get(id)
    persist_existing_student(current_student, firstname, lastname)
    persist_magicskills_existing_student(db, current_student, magicskills)
    persist_courses_existing_student(db, current_student, courses)

    db.session.commit()
    return 'Success'


@app.route('/api/student/<id>', methods=['DELETE'])
def deletestudent(id):
    student = db.session.query(Student).get(id)
    db.session.delete(student)
    db.session.commit()
    return 'Success'


@app.route('/api/students', methods=['GET'])
def getstudents():
    students = db.session.query(Student).all()
    student_schema = StudentSchema(many=True, exclude=('magicskills', 'courses'))
    output = student_schema.dump(students)
    return jsonify(output)


# @app.route('/api/studentskills/get/<id>')
# def getstudentskill(id):
#     studentskill = db.session.query(StudentSkill).get(id)
#     studentskill_schema = StudentSkillSchema()
#     output = studentskill_schema.dump(studentskill)
#     return jsonify(output)


# @app.route('/api/studentcourses/get/<id>')
# def getstudentcourse(id):
#     studentcourse = db.session.query(StudentCourse).get(id)
#     studentcourse_schema = StudentCourseSchema()
#     output = studentcourse_schema.dump(studentcourse)
#     return jsonify(output)


# @app.route('/')
# @app.route('/<path:path>')
# def index(path='/'):
#     return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
