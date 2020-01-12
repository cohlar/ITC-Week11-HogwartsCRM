from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

magicskills = ['Alchemy', 'Animation', 'Conjuror', 'Disintegration', 'Elemental', 'Healing', 'Illusion', 'Immortality', 'Invisibility',
               'Invulnerability', 'Necromancer', 'Omnipresent', 'Omniscient', 'Poison', 'Possession', 'Self-detonation', 'Summoning', 'Water breathing']
courses = ['Alchemy basics', 'Alchemy advanced', 'Magic for day-to-day life',
           'Magic for medical professionals', 'Dating with magic']
level_min, level_max = 1, 5

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hogwarts.db'

db = SQLAlchemy(app)


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(20), nullable=False)
    lastname = db.Column(db.String(20), nullable=False)
    created = db.Column(db.DateTime, default=datetime.now)
    lastupdated = db.Column(db.DateTime, default=datetime.now)


class ExistingStudentSkills(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    studentid = db.Column(db.Integer, db.ForeignKey(
        'student.id'), nullable=False)
    skillindex = db.Column(db.Integer, nullable=False)
    level = db.Column(db.Integer, nullable=False)


class DesiredStudentSkills(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    studentid = db.Column(db.Integer, db.ForeignKey(
        'student.id'), nullable=False)
    skillindex = db.Column(db.Integer, nullable=False)
    level = db.Column(db.Integer, nullable=False)


class StudentCourses(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    studentid = db.Column(db.Integer, db.ForeignKey(
        'student.id'), nullable=False)
    courseindex = db.Column(db.Integer, nullable=False)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/students/add/<firstname>/<lastname>')
def add(firstname, lastname):
    student = Student(firstname=firstname, lastname=lastname)
    db.session.add(student)
    db.session.commit()
    return 'Added new student'


@app.route('/api/students')
def get():
    students = db.session.query(Student).all()
    output = []
    for student in students:
        output.append({
            'id': student.id,
            'firstname': student.firstname,
            'lastname': student.lastname
        })
    return json.dumps(output)


@app.route('/api/students/<id>')
def getbyid(id):
    student = db.session.query(Student).get(id)
    print(student)
    output = {
        'id': student.id,
        'firstname': student.firstname,
        'lastname': student.lastname
    }
    return json.dumps(output)


if __name__ == '__main__':
    students = db.session.query(Student).all()
    app.run(debug=True)
