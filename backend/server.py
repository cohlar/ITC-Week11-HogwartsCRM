from flask import Flask, render_template, request, abort
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json
import logging

magicskills = ['Alchemy', 'Animation', 'Conjuror', 'Disintegration', 'Elemental', 'Healing', 'Illusion', 'Immortality', 'Invisibility',
               'Invulnerability', 'Necromancer', 'Omnipresent', 'Omniscient', 'Poison', 'Possession', 'Self-detonation', 'Summoning', 'Water breathing']
courses = ['Alchemy basics', 'Alchemy advanced', 'Magic for day-to-day life',
           'Magic for medical professionals', 'Dating with magic']

app = Flask(__name__)

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hogwarts.db'

db = SQLAlchemy(app)


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(20), nullable=False)
    lastname = db.Column(db.String(20), nullable=False)
    created = db.Column(db.DateTime, default=datetime.utcnow)
    lastupdated = db.Column(db.DateTime, default=datetime.utcnow)


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


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/students/create', methods=['POST'])
def create():
    student = request.get_json()

    firstname = student.get('firstname')
    lastname = student.get('lastname')    
    if not firstname or not lastname:
        abort(404) # add message '{"message": "First Name and Last Name are both mandatory"}'
        
    new_student = Student(firstname=firstname, lastname=lastname)
    db.session.add(new_student)
    db.session.commit()

    second_commit = False
    
    magicskills = student.get('magicskills')
    for magicskill in magicskills:
        second_commit = True
        skill = magicskill.get('skill')
        skilltype = magicskill.get('skilltype')
        level = magicskill.get('level')
        new_skill = StudentSkill(studentid=new_student.id, skill=skill, skilltype=skilltype, level=level)
        db.session.add(new_skill)

    courses = student.get('courses')
    for course in courses:
        second_commit = True
        new_course = StudentCourse(studentid=new_student.id, course=course)
        db.session.add(new_course)
    
    if second_commit:
        db.session.commit()
        
    return 'Added new student'


@app.route('/api/students/get')
def get():
    students = db.session.query(Student).all()
    output = []
    for student in students:
        output.append({
            'id': student.id,
            'firstname': student.firstname,
            'lastname': student.lastname,
            'created': student.created.strftime("%d/%m/%Y %H:%M:%S"),
            'lastupdated': student.lastupdated.strftime("%d/%m/%Y %H:%M:%S"),
        })
    return json.dumps(output)


@app.route('/api/students/get/<id>')
def getbyid(id):
    student = db.session.query(Student).get(id)
    output = {
        'id': student.id,
        'firstname': student.firstname,
        'lastname': student.lastname,
        'created': student.created.strftime("%d/%m/%Y %H:%M:%S"),
        'lastupdated': student.lastupdated.strftime("%d/%m/%Y %H:%M:%S"),
    }
    return json.dumps(output)


if __name__ == '__main__':
    app.run(debug=True)
