# Singlish to Sinhala Translator - Playwright Automation Testing

This repository contains automated functional and UI test cases for the **Swift Translator** (Singlish to Sinhala) web application. The testing is performed using **Playwright with JavaScript** to ensure the accuracy of transliteration and the stability of the user interface.

## 📌 Project Overview
The objective of this project is to validate the transliteration logic from Singlish (Romanized Sinhala) to Unicode Sinhala characters across various sentence structures, punctuation, and mixed-language inputs.

## 🚀 Key Features Tested
- **Positive Functional Testing (24 Cases):** Simple, Compound, and Complex sentences, tech abbreviations, currency, and date formats.
- **Negative Functional Testing (10 Cases):** Handling of nonsense characters, typos, and unsupported abbreviations.
- **UI Testing:** Validating real-time updates and output mirroring.

## 🛠️ Tech Stack
- **Framework:** Playwright (Node.js)
- **Language:** JavaScript
- **Reporting:** Playwright HTML Report

## 📂 Folder Structure
```text
├── tests/
│   ├── positive_fun.spec.js   # 24 Positive Functional Test Cases
│   ├── negative_fun.spec.js   # 10 Negative Functional Test Cases
├── playwright.config.js       # Global configuration (Workers: 1, Headed mode)
├── package.json               # Project dependencies
└── README.md                  # Project documentation
