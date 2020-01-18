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


def persist_new_magicskills(StudentSkill, student_instance, magicskills):
    for magicskill in magicskills:
        skill, skilltype, level = parsemagicskill_json(magicskill)
        magicskill_instance = StudentSkill(skill=skill, skilltype=skilltype, level=level)
        student_instance.magicskills.append(magicskill_instance)
    return True
        
        
def persist_new_courses(StudentCourse, student_instance, courses):
    for course in courses:
        course_instance = StudentCourse(course=course)
        student_instance.courses.append(course_instance)
    return True
        

def persist_existing_student(current_student, new_firstname, new_lastname):
    current_student.firstname = new_firstname
    current_student.lastname = new_lastname
    return True


def persist_magicskills_existing_student(db, StudentSkill, current_student, new_magicskills):
    for current_skill in current_student.magicskills:
        db.session.delete(current_skill)
    persist_new_magicskills(StudentSkill, current_student, new_magicskills)
    return True


def persist_courses_existing_student(db, StudentCourse, current_student, new_courses):
    for current_course in current_student.courses:
        db.session.delete(current_course)
    persist_new_courses(StudentCourse, current_student, new_courses)
    return True


def has_duplicate(mylist):
    if len(mylist) > len(set(mylist)):
        return True
    return False