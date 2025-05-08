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

    // Course data
    const courses = [
        { code: "CSE 110", name: "Intro to Programming", credits: 2, type: "CSE", completed: true },
        { code: "WDD 130", name: "Web Fundamentals", credits: 2, type: "WDD", completed: true },
        { code: "CSE 111", name: "Programming with Functions", credits: 2, type: "CSE", completed: false },
        { code: "CSE 210", name: "Programming with Classes", credits: 2, type: "CSE", completed: true },
        { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, type: "WDD", completed: true },
        { code: "WDD 231", name: "Frontend Development I", credits: 2, type: "WDD", completed: false }
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