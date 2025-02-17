async function populateSidebarLessons() {
  try {
    const lessons = [
      { type: "program-title", title: "Data Science Program" }, // Program Title (Top Level - not clickable)
      { type: "lesson-dir-start", title: "1. Introduction" }, // Start of "Introduction" directory
      {
        filename: "1-introduction/1-handout-ideal-gases.md",
        title: "1.1 Ideal Gases",
      },
      // ... Add more lessons in "1-introduction" ...
      { type: "lesson-dir-end" }, // End of "Introduction" directory

      { type: "lesson-dir-start", title: "2. Data Collection" }, // Start of "Data Collection" directory
      {
        filename: "lessons/2-data-collection/2-1-data-ethics.md",
        title: "2.1 Data Ethics",
      }, // Example - adjust filename!
      // ... Add more lessons in "2-data-collection" ...
      { type: "lesson-dir-end" }, // End of "Data Collection" directory

      { filename: "3-example-calculation.md", title: "3. Example Calculation" }, // Lesson in root lessons dir
      // ... Add more top-level lessons ...
    ];

    const sidebarLessonsList = document.querySelector(
      "#sidebar > ol:last-of-type",
    );
    sidebarLessonsList.innerHTML = ""; // Clear existing list

    lessons.forEach((lessonItem) => {
      const listItem = document.createElement("li");

      if (lessonItem.type === "program-title") {
        listItem.classList.add("sidebar-program-title"); // Style program title differently
        listItem.textContent = lessonItem.title;
      } else if (lessonItem.type === "lesson-dir-start") {
        listItem.classList.add("sidebar-lesson-dir-start"); // Style dir start
        listItem.textContent = lessonItem.title;
      } else if (lessonItem.type === "lesson-dir-end") {
        listItem.classList.add("sidebar-lesson-dir-end"); // Style dir end (if needed - can be just a visual separator)
        // listItem.textContent = lessonItem.title; // Or leave empty for just a visual break
      } else if (lessonItem.filename && lessonItem.title) {
        // Regular lesson link
        listItem.classList.add("sidebar-link");
        const link = document.createElement("a");
        link.href = `#lesson=${lessonItem.filename}`;
        link.textContent = lessonItem.title;
        listItem.appendChild(link);
      }

      sidebarLessonsList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error populating sidebar lessons:", error);
  }
}
