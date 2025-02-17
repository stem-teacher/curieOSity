# The STEM-Tech Learning Pack

## The Challenge
In looking at how STEM subjects are taught at the high-school today, what stands stark, is that instruction methods  have changed little in the last 40+ years.

There is a school curriculum, the teacher presents using power points presentation and a white board, students take notes and drill for an HSC examination. Exams are done on paper & the whole process is highly manual, teacher dependent, and student centered learning is a buzz-word used by academics, but not a practical class room reality.

Thus Australian students, and thus Australia, continue to be failed due to poor and increasingly less real world relevant STEM education.

## The Opportunity


I have created:
1.  a stub observable framework lesson in the ‘sample-chemistry’ directory.
2. a stub stem-tech base application.

Before proceeding, I need to ensure
a. I can correctly display and process chemistry questions,
b. package this within the tauri framework.

In the first instance, please specifically spell out the steps that:
1.  will enable correctly display the chemistry question.
2. correct display of chemistry response similar to the image in 2019-hsc-q25-response.jpg, but generated using latex commands.
3 detail how to include a panel to facilitate entry of latex commands, and its real-time display on a second display panel.
4. any required import configuraitons.



Step 4. Add a Panel for LaTeX Entry with Real-Time Preview
• In your lesson HTML (e.g. in your index.md or a dedicated lesson view page) set up two UI sections:
 – A “LaTeX Input Panel” consisting of a textarea element where the user can type LaTeX commands.
 – A “Preview Panel” (for example, a div with an id like “latex-preview”) where the entered LaTeX is rendered.
• Write a JavaScript function that attaches an input event listener to the textarea. Every time the user types a new character, the listener should read the text and call the KaTeX render function.
 For example:
  document.getElementById("latex-input").addEventListener("input", (e) => {
   const input = e.target.value;
   try {
    katex.render(input, document.getElementById("latex-preview"), { throwOnError: false });
   } catch (error) {
    document.getElementById("latex-preview").innerText = "Error in LaTeX syntax";
   }
  });
• Provide initial placeholder text in the textarea (such as a sample chemical equation) and style both panels using CSS (grid or flex layout) so that they appear side-by-side (or one above the other) as desired.

Step 5. Required Import and Configuration Adjustments
• In your observablehq.config.js file (found at lessons/sample-chemistry/observablehq.config.js), update the head configuration to include the KaTeX CSS as noted in Step 1.
• Confirm that your package.json has the kaTeX dependency in the "dependencies" section.
• In your Tauri app configuration (typically in tauri.conf.json), ensure that the source root includes the sample-chemistry folder (if using multi-app structure) so that the lesson pages load properly.
• If you use Vite as your bundler (e.g. via vite.config.ts), verify that it is set up for ES modules so that your imports (like "import katex from 'katex'") work correctly.

Step 6. Testing and Final Adjustments
• Run “npm run dev” from your sample-chemistry directory to preview your app via Tauri.
• Navigate to the page that displays the chemistry question and verify that the chemical equation (written in LaTeX) renders correctly.
• Test the LaTeX input panel by typing some LaTeX commands (e.g. \(\ce{H2O}\) or other chemical notation) and see that the preview panel updates in real time without errors.
• Adjust CSS styles and layout as necessary to match your design goals similar to the original 2019-hsc-q25-response.jpg image.

Following these steps ensures that you have a working chemistry lesson that can display LaTeX-rendered chemical equations, provide a real-time interactive LaTeX input and preview, and integrate cleanly with your Tauri-based app and Observable framework setup.

Feel free to ask for further code examples or clarifications for any of the steps.

So - tomorrow morning.

1. Create a set of lesson against the overall plan.
2. Create the continuous build approach.
3. Demonstate the year approach
4. Build a student version of the application
5. Build a teacher version of the application.
6. Create the first few lessons.
7. Create a demonstration summative test
8. Create a final exam.
9. have a base of common material, that allows the student to ask questions verball.
