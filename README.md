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


## Explanation of my Approach
  ### 1. Routing
  - **Technology**: React Router
  - I used the **BrowserRouter, Routes and Route** component in the App.jsx.
  - In all the other pages, I used the **Link** component.
    
  ### 2. Fetch data
  - **Technology**: Axios
  - Created a file called fetchData.js in the api folder and fetched all data with the help of **Axios**.
  - I also create a custom instance of Axios in the axios.js file and used that in the fetchData.js file.
    
  ### 3. Combine Todo list and User list
  - In the fetchData.js file, I fetched both the todo list and the user list in the same function. Then I mapped the userId in the todo list with the username of the user list.
  -  Finally I combined both the lists to create a new list where each list item has the properties of id, title, username and status where the status is "Completed" is the complete property in the todo list true and otherwise it is set to "Pending". This is the list that I worked with in the Todo List page.

  ### 4. State Management and Persistence
  - **Technology**: React Query, useState, localstorage
  - **React Query Setup:**
      - I created a react-query folder with two files inside. The **queryClient.js** file creates a react query client and the **persister.js** file creates async storage persister using the localstorage as the storage to persist the state of the application.
      - Then in the **main.jsx **file, I imported the **PersistQueryClientProvider**, wrapped the App component with it and sent the afore mentioned queryClient and persister as props. This makes sure that the state managed and persisted by React Query will be available to the App component including all its children.
  - **Todo List page:**
      - I fetched the todo list and the user list and placed them in **React Query** states called **todoList** and **userList**.
      - After filtering the list according to the set filters, the data is further stored in a **React Query** state called **filteredList** which is persisted and rendered in the app.
      - For pagination, a state called **currentPage** is stored in **React Query** which represents the current page number.
  - **Build Form page:**
      - I used the **useState** hook for all of the state and the **localStorage** for the **formInputList** state which is the list of the input fields added to build the form.
  - **Preview Form page:**
      - Just like the Build Form page, I used **useState** and **localStorage** for the state management here.
    



## Features

This project is consisted of four pages. Each page has links at the top for navigating to other pages.

### 1. Home
<img width="848" height="146" alt="home_img" src="https://github.com/user-attachments/assets/3857caf3-ac26-4b8e-87b1-af36d4ba82c7" />

- This page contains the links to other three pages.

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
