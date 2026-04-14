# QuestionPro App

This is a React application containing two features which are -

1. Todo List Viewer
2. Dynamic Form Builder

## Setup Instructions

- Clone the repository in your local computer
- In the terminal, navigate to the application folder and execute the command `npm install`
- After all the dependencies have been installed, execute `npm run dev`
- Now the application will start running and can be accessed in the browser by visiting <http://localhost:5173>

## Tech Stack

- React (functional components + hooks)
- React Router
- Modular CSS
- React Query
- Axios

## Features

This project is consisted of four pages. Each page has links at the top for navigating to other pages.

### 1. Home

This page contains the links to other three pages.

### 2. Todo List

  <img width="930" height="788" alt="todo_list_img" src="https://github.com/user-attachments/assets/3051aa1a-538c-454c-a997-19815562e12c" />
  
  #### i. View List
  `React Query` `Axios`
  - The list is being **fetched** by **Axios** using the provided api and its **state** is being **managed** by **React Query**.
  - Each todo displays **Title, Status (Completed / Pending) and User Name**.

#### ii. Filter list

`React Query`

- The list can be filtered using **username** and **status** and the **state** is being **managed** and **persisted** across the application by **React Query**.

#### iii. Pagination

`React Query`

- Pagination is implemented and being **managed** by **React Query** as well.

### 3. Build Form

  <img width="657" height="797" alt="build_form_img" src="https://github.com/user-attachments/assets/cd46b922-a2f9-4315-b3af-ed4b62ec3a31" />

#### i. Add Input Field

`localstorage`

- Different input fields can be added with **labels, input types, options and requirement** to make a custom form and the configuration is stored in the **localstorage**.
- Added fields are shown at the bottom of the page with their properties.

#### ii. Remove Input Field

`localstorage`

- Input fields can be removed from the form using the remove button beside them. When they are removed from the form, they get removed from the **localstorage** as well.

### 4. Preview Form

  <img width="783" height="753" alt="preview_form_img" src="https://github.com/user-attachments/assets/c0f2f68f-4979-4038-8dc0-7588c20fce9c" />
  <img width="611" height="190" alt="preview_form_console_img" src="https://github.com/user-attachments/assets/c66356a3-2e05-44a5-9ca8-a4d140107467" />

#### i. Fill the form and Submit

`localstorage`

- The form that was built in the build form page is fetched from the **localstorage** and can be viewed in this page. The fields can be filled and submitted and after submission, the field values will be printed in the console.

## Contributor

Name: Kazi Tushita Tahsin
Email: tahsintushita@gmail.com
