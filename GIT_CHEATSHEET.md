# Git & GitHub Cheatsheet for Automation Engineers

This guide outlines the essential Git and GitHub commands required to manage and maintain this automation framework. 

---

## 🚀 First-Time Project Setup

Run these commands when setting up a brand new local automation framework and connecting it to a fresh GitHub repository.

//bash
- Initialize a local Git repository in your project's root folder
git init

- Configure your global identity (Only needed once per computer)
git config --global user.name "SiddhardhaTankala"
git config --global user.email "sid.tankala@gmail.com"

- Link your local repository to your remote GitHub repository
git remote add origin [https://github.com/SiddhardhaTankala/Playwright_TS_Automation.git](https://github.com/SiddhardhaTankala/Playwright_TS_Automation.git)

- Rename the default branch to 'main'
git branch -M main

- Stage all project files, commit them, and push to GitHub (Initial Push)
git add .
git commit -m "Initial commit: Set up Playwright TypeScript framework"
git push -u origin main

## The Daily Workflow (Saving & Pushing Code)
- Stage all your changes (prepares modified files for saving)
git add .

- Save a snapshot locally with a clear, descriptive message
git commit -m "feat: added basic CRUD API tests for restful-booker"

- Upload your local commits to the remote GitHub repository
git push

## 🔍 Inspection & Status
- Check which files have been modified, deleted, or are currently untracked
git status

- View your local commit tracking history
git log --oneline
