const itSchool = {
    // свойства
    name: "School",
    description: "Modern online IT school",
    maxGroupCount: 5,
    maxStudentsCount: 13,

    // свойства-массивы
    availableCourses: ["Front-end Pro", "Front-end Basic"],
    startedGroups: [],

    // courseName: "Front-end Pro", amountOfStudents: 10 , totalLessons: 30
    __callback: {},
    startLearningGroup(courseName, amountOfStudents, totalLessons){
        if(this.availableCourses.includes(courseName)){
            if(amountOfStudents <= this.maxStudentsCount){
                if(!this.startedGroups.some((startedGroup) => startedGroup.courseName === courseName)){
                    this.startedGroups.push({courseName, amountOfStudents, totalLessons, passedLessons: 0});
                    this.dispatch("GROUP_STARTED", courseName);
                }
                else{
                    console.log(`Group with ${courseName} already started.`);
                }
            }
            else{
                console.log(`We not supperted ${amountOfStudents} amount of students.`);
            }
        }
        else{
            console.log(`Sorry, course ${courseName} not supported yet.`);
        }
    },
    endLearningGroup(courseName){
      if(this.startedGroups.some((startedGroup) => startedGroup.courseName === courseName)){
          if(this.startedGroups.some((startedGroups) => startedGroups.totalLessons === startedGroups.passedLessons)){
            this.startedGroups = this.startedGroups.filter((startedGroup) => startedGroup.courseName !== courseName);
            this.dispatch("GROUP_ENDED", courseName);
          }
          else{
            console.log(`Your group ${courseName} has unfinished lessons!`);
          }
      }
      else{
          console.log(`You are trying to finish not existing lerning group!`);
      }
    },
    addCourse(courseName){
        if(this.availableCourses.find(item => item === courseName)){
            console.log(`Course ${courseName} already add!`);
        }
        else{
            this.availableCourses.push(courseName);
            this.dispatch("GROUP_ADD",courseName);
        }
    },
    removeCourse(courseName){
        if(this.availableCourses.find(item => item === courseName)){
            let arr1 = [];
            arr1 = this.availableCourses.filter(item => item !== courseName);
            this.availableCourses = arr1;
            this.dispatch("GROUP_REMOVE",courseName);
        }
        else{
            console.log(`Course ${courseName} does not exist!`);
        }
    },
    doneLesson(courseName){
        if(this.startedGroups.some((startedGroup) => startedGroup.courseName === courseName)){
            return this.startedGroups.find(item => item.courseName === courseName).passedLessons++;
        }
        else{
            console.log(`The course ${courseName} is not in the list of started!`);
        }
    },
    on(eventName, callback) {
        this.__callback[eventName] = callback;
    },

    dispatch(eventName, data){
        this.__callback[eventName] && this.__callback[eventName](data);
    }
};

itSchool.on(
    "GROUP_STARTED",
    (courseName) => console.log(`A new group on the ${courseName} course has started!`),
);


itSchool.on(
    "GROUP_ENDED",
    (courseName) => console.log(`Group ${courseName} course has completed!`),
);

itSchool.on(
    "COURSE_ADD",
    (courseName) => console.log(`Congratulations, you have successfully added a course ${courseName}.`),
);

itSchool.on(
    "COURSE_REMOVE",
    (courseName) => console.log(`Congratulations, you have successfully removed a course ${courseName}.`),
);
;
// добавить курс
itSchool.addCourse("Python Basic");

// убрать курс
itSchool.removeCourse("Front-end Basic");

// старт групп
itSchool.startLearningGroup("Front-end Pro", 10, 35);
itSchool.startLearningGroup("Front-end Basic", 13, 27);
itSchool.startLearningGroup("Python Basic", 6, 40);

//прохождение курса
itSchool.doneLesson("Python Basic");

// конец групп
itSchool.endLearningGroup("Front-end Basic");
itSchool.endLearningGroup("Python Basic");