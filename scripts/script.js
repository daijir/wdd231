document.addEventListener('DOMContentLoaded', function() {
    // JavaScript for Footer Year and Last Modified
    const currentYear = document.getElementById("currentyear");
    const lastModified = document.getElementById("lastModified");
    currentYear.textContent = new Date().getFullYear();
    lastModified.textContent = `Last Update: ${document.lastModified}`;

    // Hamburger menu toggle
    const menuBtn = document.querySelector(".menu-btn");
    const navMenu = document.querySelector(".nav-menu");
    menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    });

    const courseDetails = document.getElementById("course-details");
    const closeButton = document.getElementById("close-button");
    const courseDetailsText = document.querySelector("#course-details div");

    // Course data
    const courses = [
        { code: "CSE 110", name: "Programming Building Blocks", credits: 2, type: "CSE", completed: true, description: "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.", technologies: "Python" },
        { code: "WDD 130", name: "Web Fundamentals", credits: 2, type: "WDD", completed: true, description: "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.", technologies: "HTML, CSS" },
        { code: "CSE 111", name: "Programming with Functions", credits: 2, type: "CSE", completed: false, description: "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.", technologies: "Python" },
        { code: "CSE 210", name: "Programming with Classes", credits: 2, type: "CSE", completed: true, description: "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.", technologies: "Python" },
        { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, type: "WDD", completed: true, description: "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.", technologies: "HTML, CSS, JavaScript" },
        { code: "WDD 231", name: "Frontend Development I", credits: 2, type: "WDD", completed: false, description: "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.", technologies: "HTML, CSS, JavaScript" }
    ];

    const courseList = document.getElementById("course-list");
    const totalCredits = document.getElementById("total-credits");

    function displayCourses(filteredCourses) {
        courseList.innerHTML = "";
        let total = 0;

        filteredCourses.forEach(course => {
            const div = document.createElement("div");
            div.className = `course-card${course.completed ? " completed" : ""}`;
            div.innerHTML = `<strong>${course.code}</strong><br>${course.name}<br>${course.credits} credits`;
            div.addEventListener("click", () => {
            courseDetails.showModal();
            courseDetailsText.innerHTML = `
                <div class="dialog-header">
                    <span id="dialog-code">${course.code}</span>
                    <button id="close-button">X</button>
                </div>
                <h2>${course.name}</h2>
                <p>${course.credits} credits</p>
                <p>Certificate: Web and Computer Programming</p>
                <p>${course.description}</p>
                <p>Technology: ${course.technologies}</p>
            `;
            document.getElementById("close-button").onclick = () => courseDetails.close();
        });
            courseList.appendChild(div);
            total += course.credits;
        });
        
        totalCredits.textContent = total;
    }

    // Initial load
    displayCourses(courses);

    document.getElementById("filter-all").addEventListener("click", () => displayCourses(courses));
    document.getElementById("filter-cse").addEventListener("click", () => displayCourses(courses.filter(c => c.type === "CSE")));
    document.getElementById("filter-wdd").addEventListener("click", () => displayCourses(courses.filter(c => c.type === "WDD")));
});