# AI-Assisted App Development Workshop  
Welcome to the AI-Assisted app development workshop! 🚀

In this session, we’ll explore AI coding tools and use Cursor AI to build a simple web application quickly.

## Overview
- Learn about AI-powered coding tools
- Use Cursor AI to assist in building an application
- Hands-on experience with AI-assisted development

## **Prerequisites**
Before we begin, please ensure you have the following installed:

### **Required Tools**
- [Cursor AI](https://www.cursor.com/) (Code editor with AI assistance)
- [Node.js](https://nodejs.org/en/download) (Backend JavaScript runtime)

### **Optional Tools**
- [Git Fork](https://git-fork.com/) (Makes reviewing changes and reverting a bit easier) 

### Alternative Tools

- [Replit](https://replit.com/) (Web-based alternative to Cursor, useful if there's setup problems during the session)

Replit is a useful alternative if for some reason you're having problems with setting up Cursor. 

To use Replit in the workshop, create an account, go to "**Templates**", find Next.js in the list, click "**Use Template**". 

## **Installation Guide**
Follow these steps to set up your development environment.

### 1. Install Cursor AI
**Mac:**  
1. Download **Cursor AI** from [cursor.com](https://www.cursor.com/)
2. Open the `.dmg` file and drag **Cursor** into the `Applications` folder
3. Open **Cursor AI** and sign in (if required)

**Windows:**  
1. Download **Cursor AI** from [cursor.com](https://www.cursor.com/)
2. Run the `.exe` installer and follow the setup instructions
3. Open **Cursor AI** and sign in (if required)

### 2. Install Node.js
**Mac (Using Homebrew)**:
  
  ```sh
  brew install node
  ```

**Windows**:

  1. Download Node.js from [nodejs.org](https://nodejs.org/en/download)
  2. Run the installer and follow the setup instructions
  3. Verify installation:

  ```
  node -v
  npm -v
  ```

### 3. Clone or download the template project

A template project has been created to make setup a bit easier, you can use one of the options below.

**Option 1: Clone using Git (Recommended)**

```
git clone git@github.com:KomodoHQ/ai-app-development-workshop.git
cd ai-app-development-workshop
```

**Option 2: Download as ZIP**

1. Open **[this repo](http://bit.ly/41HQKH5)**
2. Click **"Download ZIP"**
3. Extract the folder to a convenient location on your computer

### 4. Open the project in Cursor AI

1. Launch Cursor AI
2. Click **"Open Folder"** and select the project directory
3. Open `README.md` in Cursor AI and follow the next steps

### 5. Start the project

Inside Cursor AI, open a **Terminal** and run:

```
npm install
npm run dev
```

Your app should now be running at **http://localhost:3000** and you should be able to visit this in your browser.

## **Example Ideas and Prompts**

Below are some example projects you can try building using Cursor AI, feel free to try your own ideas!

### Simple Todo List

Add tasks, mark them as complete, delete tasks.

#### **Prompt:**

```
Create a simple Todo List in Next.js with Tailwind CSS.
- Use React state to manage todos
- Each todo should have a "Mark as Done" button
- Display completed todos with a strikethrough effect
- Style it using Tailwind CSS
```

### **Recipe Manager**

Add meals, ingredients, and randomly pick a meal.

#### Prompt:

```
Create a Recipe Manager app in Next.js with TypeScript.
- Users should be able to add a new recipe with a name, ingredients, and description
- Display a list of all recipes
- Add a "Pick a Random Recipe" button
- Style it using Tailwind CSS
```

### Pomodoro Timer

A simple timer for productivity with 25-minute work sessions.

#### Prompt:

```
Create a Pomodoro Timer in Next.js with React state.
- Display a countdown timer starting from 25 minutes
- Include "Start", "Pause", and "Reset" buttons
- When time is up, play a sound or show an alert
- Style it using Tailwind CSS
```

## **Prompting Best Practices**

- Instead of “Create a todo app,” try “Create a todo app with add, complete and delete functionality.”
- If an output isn’t perfect, refine your prompt rather than expecting a full app in one go.
- If something breaks, ask Cursor “Why isn’t this working?”
- Copy/paste errors into Cursor to help debug the issue.
- Break large tasks into smaller prompts, for example, first ask for a form, then ask for state management, then ask for styling.

## **Deploying (Optional)**

If you want to share your app online, you can use **Vercel** for free hosting.

### Install Vercel CLI

```
npm install -g vercel
```

### Deploy

Run:

```
vercel
```

## Useful Links

- Keyboard Shortcuts: https://docs.cursor.com/kbd
- An idiots guide to big projects with Cursor: https://forum.cursor.com/t/an-idiots-guide-to-bigger-projects/23646
- Mastering big codebases: https://forum.cursor.com/t/mastering-long-codebases-with-cursor-gemini-and-claude-a-practical-guide/38240

## Workshop Goals

By the end of this workshop, you’ll have: 

- Installed AI-powered coding tools
- Built a functional web app
- Learned how to guide AI for development
- (Optional) Deployed your app online

Enjoy! 🏆
