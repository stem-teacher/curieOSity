
Here’s the revised brief for sharing with another AI:

CurieOsity: AI-Driven STEM Learning Platform

Project Overview

CurieOsity is a STEM learning application designed for high school students, integrating AI-driven tutoring, interactive data visualization, and mathematical/chemical notation rendering. The app is being developed using Tauri, with a UI built on HTML, Tailwind CSS v4.0, and shadcn/ui components.

A parallel application is also in development, likely with a similar architecture but serving a different educational or analytical function.

Technology Stack

1. Frontend
	•	HTML + Tailwind CSS v4.0 (for streamlined UI)
	•	shadcn/ui (component library based on Radix UI)
	•	D3.js (for interactive data visualizations)
	•	KaTeX (for mathematical notation)
	•	mhchem.js (for chemical notation)
	•	Markdown rendering (for lesson content)

2. Backend
	•	Tauri (Rust-based framework) for a lightweight, secure desktop application.
	•	Local-first storage with an option for cloud sync.
	•	AI-assisted tutoring and debugging via API calls to OpenAI, Gemini, or Anthropic models.

AI Objectives for the Other AI
	1.	Generate a sample web page based on this brief.
	2.	Given a set of Markdown content, generate a simple lesson page with:
	•	Formatted text
	•	KaTeX-rendered equations
	•	mhchem.js chemical notation
	•	Basic D3.js visualizations (if applicable).

Let me know if you need any refinements before sharing this with another AI! 🚀
Yes, mhchem.js is a LaTeX-compatible library for rendering chemical equations and notation. It is commonly used alongside KaTeX or MathJax to properly format chemical formulas in LaTeX-like syntax.

How to Use mhchem.js with KaTeX

Since KaTeX supports mhchem.js, you can write chemical equations in a LaTeX-style format using the \ce{} command.

Examples
	1.	Basic Chemical Reaction

\ce{H2 + O2 -> H2O}

Renders as:
\(\ce{H2 + O2 -> H2O}\)

	2.	Ionic Equations

\ce{Na+ + Cl- -> NaCl}

Renders as:
\(\ce{Na+ + Cl- -> NaCl}\)

	3.	Reversible Reactions

\ce{CO2 + H2O <=> H2CO3}

Renders as:
\(\ce{CO2 + H2O <=> H2CO3}\)

	4.	Isotopes & Charges

\ce{^{14}C}

Renders as:
\(\ce{^{14}C}\)

How to Include in HTML

Make sure mhchem.js is loaded alongside KaTeX in your web app:

<script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.4/katex.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mhchem/3.3.4/mhchem.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.4/katex.min.css">

Then, render chemical equations dynamically:

<span class="chemistry">\ce{H2 + O2 -> H2O}</span>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".chemistry").forEach(el => {
      katex.render(el.textContent, el, { throwOnError: false });
    });
  });
</script>

Would you like this implemented directly into the lesson page generator for the CurieOsity project? 🚀
