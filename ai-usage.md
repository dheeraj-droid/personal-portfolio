# AI Usage Report

## AI tool used

OpenAI Codex was used to help implement this portfolio website.

## How AI helped

- Translated the assignment requirements and resume details into the portfolio structure and content.
- Generated and refined the HTML, CSS, and vanilla JavaScript.
- Implemented responsive layouts, light and dark themes, the time-based greeting, navigation highlighting, and contact form validation.
- Helped review the code, troubleshoot issues, prepare documentation, and verify behavior in a browser.

## Representative prompts

The following are polished examples that summarize the requests made during development; they are not verbatim quotations:

1. "Review the assignment requirements and create a responsive personal portfolio using semantic HTML, CSS, and vanilla JavaScript."
2. "Use the information in my resume for the About, Skills, and Projects sections, and label unavailable project links as placeholders."
3. "Keep the design minimal and monochrome, with readable typography and responsive layouts for mobile, tablet, and desktop."
4. "Implement a light/dark theme toggle, a time-based greeting, a welcome interaction, and clear contact form validation."
5. "Review the final implementation against the assignment and remove redundant code while retaining the required functionality."

## Generated code and review

I used AI to assist with the HTML, CSS, and JavaScript. I read and reviewed each part of the generated code as the portfolio was developed, assessed whether it met the assignment requirements, and suggested changes based on that review. I kept the code I found appropriate and moved forward with it. For example, I requested a simpler layout and the removal of decorative elements and saved theme preferences.

I also completed the manual browser checks and found the results satisfactory. Codex performed the automated checks described below.

## Issues and corrections

During my manual testing, I identified issues including the main heading wrapping despite available space and the navigation not clearly indicating the current section. I reported these issues and requested corrections. I also reviewed the design and requested a simpler layout. During a later code audit, an unnecessary CSS import, a button hover visibility issue, redundant CSS, and an outdated comment were identified and corrected with AI assistance.

## Testing and verification

I manually tested the website, identified issues, reported them, and checked the changes. My checks included the layout, navigation, theme switch, welcome interaction, greeting, and contact form. I confirmed that the final results were satisfactory; the checklist is included in the README.

As an additional check, Codex used automated Playwright tests in Microsoft Edge to verify navigation, greeting branches, theme switching, form validation, repeated submissions, keyboard focus, and responsive widths. Codex also checked JavaScript syntax and button hover visibility. Project details were taken from my resume; the portfolio does not independently verify project performance claims.
