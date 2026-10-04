# AI usage

## 1. How I used AI

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
- **Commit:** https://github.com/Kish-Mnlo/final-project-MANALO/commit/1e206fbeb86509d6fe8e391180d52ffaad86b938

### 2026-10-01 - Coded the Mock-Up design for Front-end

- **Tool: Claude**
- **What I asked for: Since the foundation for the features are ready along with the back-end, I created a front-end mock-up design using figma and used AI to code that into a usable website design.**
- **What it gave back: A fully reformatted file for all four pages along with the matching css file for it.**
- **What I kept, what I changed, and why: There were a bunch of edits that needed to happen such as the awning pattern for the navbar, it was too small. The background colors for a few of them were off too, and some had a background color even if it was supposed to be translucent. While the template design was created using AI, it still needed editing to improve and include items in my vision.**
- **Commit:** https://github.com/Kish-Mnlo/final-project-MANALO/commit/70ab97ab366685e0cd8ea36282e23ee15d89a4c4

### 2026-10-01 - Added file upload to the services feature as well

- **Tool: Claude**
- **What I asked for: Essentially to just copy what I did with the multer from the artworks to the services.**
- **What it gave back: The edited routes and display for the services feature.**
- **What I kept, what I changed, and why: I kept the whole thing because it was essentially just copying an existing code and adding it. I did this to save time to focus on other areas such as adding the authentication part.**
- **Commit:** https://github.com/Kish-Mnlo/final-project-MANALO/commit/310b2804dbeb3423c2ec35eff26b999cffb3be71

### 2026-10-03 - Added authentication to be able to use the add, edit, and delete features

- **Tool: Claude**
- **What I asked for: A one way authetication system where the artist can login using a personalized password to access the add, edit and delete features to be able to update the website without hard-coding it.**
- **What it gave back: Files pertaining to the authentication such as auth.js, an edit to the server.js with the authentication to handle the /login call, and a simple interface to access it in the front-end.**
- **What I kept, what I changed, and why: I kept most of these and changed the password that was given by the AI. There was also bugs encountered through it which will be talked about in the second section where AI got it wrong.**
- **Commit:** https://github.com/Kish-Mnlo/final-project-MANALO/commit/7423e5109eb800e82dee9a31be1ecdb8316f1ad6

## 2. Where the AI got it wrong

### Case 1 - Create the Front-end for Services

- **What it gave me: It gave me three seperate files for the front end which included the Service card, the service form, and the actual return for the commission.jsx file.**
- **What was wrong with it: I didn't want to have three seperate files and the two were components used by the commission.jsx file anyway. I thought it would add clutter to the files.**
- **What I did instead: I combined the three instead and had all of them inside commission.jsx to be able to group them easily.**
- **Commit:** https://github.com/Kish-Mnlo/final-project-MANALO/commit/26d789a4cdae63f25d05a71cc057dc4e3e94fd65

### Case 2 - Create the Front-end for Artworks

- **What it gave me: It was able to give me the edited file for Artwork.jsx alongside its css.**
- **What was wrong with it: Some features I asked for weren't working such as the delete category feature.**
- **What I did instead: I edited it since the delete category function was missing that it should be comparing strings.**
- **Commit:** https://github.com/Kish-Mnlo/final-project-MANALO/commit/77de97ea5c8831fb0af7022c4716cad8525b31d9 

### Case 3 - The login authentication

- **What it gave me: A revamped code for the four pages to hide the add, edit, and delete buttons when not logged in or admin and also the authentication side for the backend handling.**
- **What was wrong with it: When I deployed using render, the log-in function was throwing an error about the json being the wrong input. I checked and fetch(/api/login) was missing the url for the API backend service which was also deployed on render.**
- **What I did instead: I edited this error to accomodate the fix.**
- **Commit:** https://github.com/Kish-Mnlo/final-project-MANALO/commit/f86278d3cc91d16880ddcb17bf55976b1b4d0217

### Case 4 - Fix the backend area to slowly transition it from local to deployed

- **What it gave me: The revamped of the backend such as the multer uploading to the supabase storage instead of local in '/uploads' and the integration of the authentication.**
- **What was wrong with it: The image wasn't uploading and the image_path wasn't properly showing up.**
- **What I did instead: I debugged it and added an environment variable which was needed to communicate to the supabase storage.**
- **Commit:** https://github.com/Kish-Mnlo/final-project-MANALO/commit/8e08f4b3dfecc281b0d7c48a9c6c523544de575b

### Case 5 - Service Card output

- **What it gave me: Only the output with the service cards.**
- **What was wrong with it: Did not include the area with the terms of service in the original wireframe and there was no image.**
- **What I did instead: I added an image upload to the service feature for example and also removed the cropping of the photo. I also seperated both into sections left and right like in the original wireframe.**
- **Commit:** https://github.com/Kish-Mnlo/final-project-MANALO/commit/70ab97ab366685e0cd8ea36282e23ee15d89a4c4 and https://github.com/Kish-Mnlo/final-project-MANALO/commit/310b2804dbeb3423c2ec35eff26b999cffb3be71

## 3. Who wrote what

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
- **Commit:** https://github.com/Kish-Mnlo/final-project-MANALO/commit/f9411a92b7495f5f1af622cf102f278fd509789f
- **What it does and why it is built this way: I edited the template from the sightings to create all routes for the three tables, created validation functions for all three table bodies, and I also added middleware called multer to handle the file uploads for the image which I followed tutorials to be able to add.**

- **File: Navbar.jsx**
- **Commit:** https://github.com/Kish-Mnlo/final-project-MANALO/commit/c855eb1ebfc839d5413c7ecc660cefe6b7e789a5
- **What it does and why it is built this way: The navigation bar to move between pages for the front-end which utilizes react-router-dom  so that it doesn't have to reload each time a page is visited.**

- **File: App.jsx**
- **Commit:** https://github.com/Kish-Mnlo/final-project-MANALO/commit/c855eb1ebfc839d5413c7ecc660cefe6b7e789a5
- **What it does and why it is built this way: The App.jsx is simple and wrapped and only calls the components and pages. This makes it easier to understand each page and is sectioned individually to be able to determine which pages aren't loading. This also makes it easier to wrap the whole App into a component such as when creating the authentication.**

- **File: httpApi.js, index.js**
- **Commit:** https://github.com/Kish-Mnlo/final-project-MANALO/commit/9131b881667fb68511dcb3194710a4a1afdc471c
- **What it does and why it is built this way: I only used the sightings API as a template and was able to add this to all of the tables needed. There are slight differences to the services and artworks API since they have an image upload.**

- **File: Debugging of most files**
- **Commit:** https://github.com/Kish-Mnlo/final-project-MANALO/commit/7069d5ee6b072eca42dd15a634f148f234e00a72 (most recent commit but previous commits are also included)
- **What it does and why it is built this way: I was also apart of debugging most of the mistakes AI created which means I have been learning and involved in the proccess of creating this website.**

### The AI-written part I understand best

- **File: auth.js and AuthContext.jsx**
- **Commit:** https://github.com/Kish-Mnlo/final-project-MANALO/commit/7423e5109eb800e82dee9a31be1ecdb8316f1ad6
- **What it does and why I kept it: It essentially adds a one-way admin login to be able to access the add, edit, delete features. The reason why jwt is used is to be able to query the database repeatedly without having to verify the user each time. It keeps the token of the admin while logged in and if there is no token attached, that means the user is a guest and will only be able to view. The auth.js handles the back-end tokenization part and blocks the request unless a valid admin token is present while the AuthContext.jsx is the front-end part which handles the login, logout part using tokenization as well and is used to wrap around the whole App so that it will need authorization before being able to access the add, edit, delete features.**
