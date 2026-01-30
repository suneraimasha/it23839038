it23839038 - Sithuruwan A B K S I

ITPM Playwright assignment 1

IT3040 – ITPM Assignment 1  

Singlish to Sinhala Translator – Playwright Automation



This project automates the testing of a "Singlish to Sinhala transliteration web application" using "Playwright" with "Excel-driven test cases".



Application under test:  

https://www.swifttranslator.com/



All tests are performed at the "UI level", in accordance with the assignment scope.




Objective

Validate the accuracy of Singlish to Sinhala conversion

Identify robustness issues using negative test cases

Verify UI behavior, including real-time Sinhala output updates

Execute all test scenarios automatically using Playwright





Technologies Used

Node.js (LTS)

Playwright (JavaScript)

Visual Studio Code (VS Code)

Excel (.xlsx) – Test case repository

xlsx (npm package) – Excel file reader



Project Structure

playwright-assignment/

│

├─ tests/

│ └─ excel.spec.js # Excel-driven Playwright test script

│

├─ Test\_cases.xlsx # Test cases (Input \& Expected Output)

├─ package.json

├─ playwright.config.js

├─ README.md

└─ node\_modules/




Prerequisites

Ensure the following are installed:



Node.js (LTS)

 https://nodejs.org/

 Visual Studio Code



Verify installation:

```bash

node -v

npm -v



Environment Setup

1\. Open Project in VS Code

	Open VS Code

	Go to File → Open Folder

	Select the project root folder (playwright-assignment)


2.Install Playwright

Open the VS Code terminal (`Ctrl + ``) and run:

	npm init playwright@latest


Choose the following options:

	JavaScript
	Tests folder: tests
	GitHub Actions: No
	Install Playwright browsers: Yes

3. Install Playwright VS Code Extension

	Open Extensions (Ctrl + Shift + X)
	Search for Playwright Test for VSCode
	Install the extension


This provides:

	Test Explorer
	Playwright Inspector
	Locator picker
	Debugging support

4. Install Excel Reader Dependency

	npm install xlsx

5.Test Case Design (Excel)

	All test cases are stored in:

		Test\_cases.xlsx


Relevant Columns

Column		Description

A		Test Case ID (Pos\_Fun / Neg\_Fun / Pos\_UI)

B		Test Case Name

D		Singlish Input

E		Expected Sinhala Output



	Header rows end at row 5
	Test data starts from row 6

6.Automation Approach

	Data-Driven Testing



		Test cases are read dynamically from Excel
		Each Excel row is converted into a Playwright test
		This avoids hard-coded values and improves maintainability



7.Functional Test Flow

	For each Singlish test case:



		1.Navigate to https://www.swifttranslator.com/
		2.Enter Singlish input into the input textbox
		3.Wait for automatic Sinhala output generation
		4.Capture the Sinhala output
		5.Compare the actual output with the expected output from Excel



Positive Functional Tests (Pos\_Fun)

	Input is valid Singlish
	Expected output is valid Sinhala
	Focus: Accuracy validation



Negative Functional Tests (Neg\_Fun)

	Input may include slang, formatting issues, or mixed language
	Focus: Robustness validation
	Ensures Sinhala output is generated even for imperfect input



UI Test – Neg\_UI\_0001



	Validates real-time Sinhala output updates
	Singlish input is typed character-by-character
	Sinhala output should update without clicking a convert button
	Focus: UI responsiveness and usability

8.Running the Tests

	Run All Excel-Driven Tests

		npx playwright test tests/excel.spec.js

	Run Tests in Debug Mode (Optional)

		npx playwright test tests/excel.spec.js --debug



9.View HTML Test Report

	npx playwright show-report

10.Test Coverage Summary

	*24 Positive Functional Test Cases (Accuracy validation)
	*10 Negative Functional Test Cases (Robustness validation)
	*1 UI Test Case 
	*Fully Excel-driven automation
	*UI-level testing only (as per assignment requirements)



Notes

	Backend APIs, performance testing, and security testing are out of scope
	English technical terms (e.g., Email, WhatsApp) are expected to remain unchanged
	The automation focuses on functional correctness and UI behavior

SITHURUWAN A B K S I

BSc (Hons) special IT

IT3040 – ITPM Assignment 1



