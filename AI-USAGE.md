# AI usage

This project was built with AI assistance. This file is the record of it. It is
graded as the finals badge, and it is worth 100 points.

Start it in week 1 and keep it up as you go. The commit history of this file is
part of the evidence: a file written all at once the night before the deadline
looks exactly like what it is.

## 1. How I used AI

At least six entries. One per real use. Every entry needs a commit link.

### YYYY-MM-DD - short title

- **Tool:**
- **What I asked for:**
- **What it gave back:**
- **What I kept, what I changed, and why:**
- **Commit:** https://github.com/YOUR-USERNAME/YOUR-REPO/commit/SHA

### 2026-09-21 - Transition for Navigation Bar

- **Tool: ChatGPT**
- **What I asked for: To add transition when the background colors appear.**
- **What it gave back: .nav li {
  transition: background-color 0.3s ease, border-radius 0.3s ease;
}**
- **What I kept, what I changed, and why: I kept the whole thing, since it added what I needed.**
- **Commit:** https://github.com/Kish-Mnlo/final-project-MANALO/commit/6dfef89fcd864bd5e173ae6ab8c45e3a8f333f44

### 2026-09-27 - Create the Front-end for Services

- **Tool: Claude** 
- **What I asked for: how to do the front-end with adding, updating, editing, and deleting of services cards**
- **What it gave back: The edited versions of the styles.css and commissions.jsx files to incorporate the api and gether the info from the serviceSeed.json**
- **What I kept, what I changed, and why: I kept the essentials of the form and basically changed the design of it all. The css of course to fit the theme.**
- **Commit:** https://github.com/Kish-Mnlo/final-project-MANALO/commit/26d789a4cdae63f25d05a71cc057dc4e3e94fd65

### 2026-09-27 - Create the Front-end for Artworks

- **Tool: Claude**
- **What I asked for: 
  1. Categories are shown and can be pressed to filter each artwork depending on their category id
  2. One edit categories button that can be pressed and opens a form where it can select which category to edit, to add category, or delete category
  3. This is also where artworks are shown which are only image cards, these image cards can be pressed to pop up its information, and also have buttons to edit or delete.
  4. Next to the edit categories button, an add artwork button is also present to add artworks**
- **What it gave back: A full edit of Artwork.jsx including all the features along with the css to match.**
- **What I kept, what I changed, and why: There are some features that are not working such as the delete category not working.**
- **Commit:** https://github.com/YOUR-USERNAME/YOUR-REPO/commit/SHA

## 2. Where the AI got it wrong

Three cases. Be specific. If you write that the AI was never wrong, this section
scores zero.

### Case 1 - short title

- **What it gave me:**
- **What was wrong with it:**
- **What I did instead:**
- **Commit:** https://github.com/YOUR-USERNAME/YOUR-REPO/commit/SHA

### Case 1 - Create the Front-end for Services

- **What it gave me: It gave me three seperate files for the front end which included the Service card, the service form, and the actual return for the commission.jsx file.**
- **What was wrong with it: I didn't want to have three seperate files and the two were components used by the commission.jsx file anyway. I thought it would add clutter to the files.**
- **What I did instead: I combined the three instead and had all of them inside commission.jsx to be able to group them easily.**
- **Commit:** https://github.com/Kish-Mnlo/final-project-MANALO/commit/26d789a4cdae63f25d05a71cc057dc4e3e94fd65

### Case 2 - Create the Front-end for Artworks

- **What it gave me: It was able to give me the edited file for Artwork.jsx alongside its css.**
- **What was wrong with it: Some features I asked for weren't working such as the delete category feature.**
- **What I did instead: I edited it since the delete category function was missing that it should be comparing strings.**
- **Commit:** 

## 3. Who wrote what

At least a fifth of this project is code you wrote yourself. Name it, and explain
it in your own words.

> Group projects: give each member their own heading below, and use your GitHub
> handle as the heading. You are graded on your own section.

### Written by me

- **File: categoryRepo.js**
- **Commit:** https://github.com/Kish-Mnlo/final-project-MANALO/commit/c5e5c423dbe2c2940aeb2b38db3d2cc51996fd3f
- **What it does and why it is built this way: This is for the queries for the category table. I added a getByName function to be able to validate if the name of the category already exists.**

- **File: artworksRepo.js**
- **Commit:** https://github.com/Kish-Mnlo/final-project-MANALO/commit/49216c60f2f608d26d0c006e587dd691b71bb691
- **What it does and why it is built this way: This is for the queries for the artwork table. It is essentially the same way from the sightings example given and was used as a template.**

- **File: serviceRepo.js**
- **Commit:** https://github.com/Kish-Mnlo/final-project-MANALO/commit/f9411a92b7495f5f1af622cf102f278fd509789f
- **What it does and why it is built this way: This is for the queries for the service table. It is the same way with the sightings example and was used as a template.**

- **File: server.js**
- **Commit:**
- **What it does and why it is built this way: I edited the template from the sightings to create all routes for the three tables, created validation functions for all three table bodies, and I also added middleware called multer to handle the file uploads for the image which I followed tutorials to be able to add.**

- **File:**
- **Commit:**
- **What it does and why it is built this way:**

### The AI-written part I understand best

- **File:**
- **Commit:**
- **What it does and why we kept it:**
