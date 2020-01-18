import logging
from datetime import datetime
from flask import Flask, request, abort, jsonify, render_template
from sqlalchemy import func
from flask_cors import CORS
from hogwarts.db.db import db, ma
from hogwarts.models import Student, StudentSkill, StudentCourse
from hogwarts.schemas import StudentSkillSchema, StudentCourseSchema, StudentSchema
import hogwarts.utils as utils
import hogwarts.constants as constants


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hogwarts/db/hogwarts.db'
    db.init_app(app)
    ma.init_app(app)
    return app


def filter_server_log_messages():
    log = logging.getLogger('werkzeug')
    log.setLevel(logging.ERROR)


app = create_app()
filter_server_log_messages()


@app.route('/api/magicskills')
def getmagicskills():
    return jsonify(constants.magicskills)


@app.route('/api/courses')
def getcourses():
    return jsonify(constants.courses)


@app.route('/api/student', methods=['POST'])
def createstudent():
    student_json = request.get_json()
    firstname, lastname, magicskills, courses = utils.parsestudent_json(student_json)
    
    if not firstname or not lastname:
        abort(400, 'Both first name and last name are mandatory fields')
    
    student_instance = Student(firstname=firstname, lastname=lastname)
    
    utils.persist_new_student(db, student_instance)
    utils.persist_new_magicskills(StudentSkill, student_instance, magicskills)
    utils.persist_new_courses(StudentCourse, student_instance, courses)

    db.session.commit()
    return 'Success'


@app.route('/api/student/<id>', methods=['GET'])
def getstudent(id):
    student = db.session.query(Student).get(id)
    
    if not student:
        abort(404, 'Student not found')
    
    student_schema = StudentSchema()
    output = student_schema.dump(student)
    return jsonify(output)


@app.route('/api/student', methods=['PUT'])
def editstudent():
    updated_student_json = request.get_json()
    id = updated_student_json.get('id')
    firstname, lastname, magicskills, courses = utils.parsestudent_json(updated_student_json)
    
    current_student = db.session.query(Student).get(id)
    utils.persist_existing_student(current_student, firstname, lastname)
    utils.persist_magicskills_existing_student(db, StudentSkill,current_student, magicskills)
    utils.persist_courses_existing_student(db, StudentCourse, current_student, courses)
    
    # update update time

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


@app.route('/api/stats/students/daily', methods=['GET'])
def getstudentsbyday():
    students = db.session.query(
            func.count(Student.id),
            func.date(Student.created)
        ).group_by(func.date(Student.created)
    ).all()
    output = [{'number': num, 'date': date} for num, date in students]
    return jsonify(output)


@app.route('/api/stats/students/skills', methods=['GET'])
def getstudentskills():    
    def init_count(magicskills):
        count = {}
        for skill in magicskills:
            count[skill] = {
                'existing': 0,
                'desired': 0
            }
        return count
    
    studentskills = db.session.query(
        func.count('*'),
        StudentSkill.skill,
        StudentSkill.skilltype
    ).group_by(
        StudentSkill.skill,
        StudentSkill.skilltype
    ).all()
    
    count = init_count(constants.magicskills)
    for num, skill, skilltype in studentskills:
        count[skill][skilltype] = num
        
    output = [{'skill': skill, 'num_existing': count[skill]['existing'], 'num_desired': count[skill]['desired']} for skill in constants.magicskills]
    return jsonify(output)


@app.route('/api/stats/students/courses', methods=['GET'])
def getstudentcourses():    
    def init_count(courses):
        count = {}
        for course in courses:
            count[course] = 0
        return count
    
    studentcourses = db.session.query(
        func.count('*'),
        StudentCourse.course
    ).group_by(
        StudentCourse.course
    ).all()
    
    count = init_count(constants.courses)
    for num, course in studentcourses:
        count[course] = num
        
    output = [{'course': course, 'count': count[course]} for course in constants.courses]
    return jsonify(output)


if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)