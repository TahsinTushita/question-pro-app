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
  ### 1. Folder Structure
  <img width="304" height="448" alt="folder_structure_img" src="https://github.com/user-attachments/assets/1558cb89-896c-4370-aef7-1593f4d3a7d5" />

  - **node_modules:** Contains all the dependencies for the app.
  - **public:** Used for storing assets and is currently empty.
  - **src:** This is where the source code is written. It has several other folders inside it.
      - **api:** This folder contains two files **axios.js** and **fetchData.js** which are used to fetch data from the api.
      - **assets:** Used for storing assets and is currently empty.
      - **components:** This folder contains all the **reusable components** which in this app are **Filter**, **Pagination** and **Todo**. If a component has their own module.css file, then that component has its own folder with the jsx and the module.css file. There is an **index.jsx** file in this folder where all the components are imported and then exported. It acts as the entry point for this folder and using this, we can easily import the components in other folders from one place.
      - **pages:** It contains all the pages we can route to in the app. This is set up the **same way** as the **components folder** and contains the **CreateForm, Home, PreviewForm, TodoList** and **NotFound** pages.
      - **react-query:** It consists of the **queryClient** and **persister** for **React Query**.
      - **App.jsx:** Main component from where all the other components are routed.
      - **index.css:** Global css file used for global styling.
      - **List.js:** A file containing all the const lists used throughout the app.
      - **main.jsx:** This is the JavaScript entrypoint of the app.
  - **.gitignore:** This file contains the names of all the files and folders which should not be pushed to the github remote repository.
  - **eslint.config.js:** This is the config file for eslint.
  - **index.html:** This is the html file for our app.
  - **package-lock.json:** This file is the version snapshot of the app.
  - **package.json:** This file showcases the version, main dependencies, scripts and the dev dependencies of the app.
  - **README.md:** This is file which describes the app.
  - **vite.config.js:** It is the config file for vite since this app was created with vite.

  ### 2. Routing
  - Used: **React Router**
  - I used the **BrowserRouter, Routes and Route** component in the App.jsx for routing all components.
  - In all the other pages, I used the **Link** component.
    
  ### 3. Fetch data
  - Used: **Axios**
  - Created a file called fetchData.js in the api folder and fetched all data with the help of **Axios**.
  - I also create a custom instance of Axios in the axios.js file and used that in the fetchData.js file.
    
  ### 4. Combine Todo list and User list
  - In the fetchData.js file, I fetched both the todo list and the user list in the same function. Then I mapped the userId in the todo list with the username of the user list.
  -  Finally I combined both the lists to create a new list where each list item has the properties of id, title, username and status where the status is "Completed" is the complete property in the todo list true and otherwise it is set to "Pending". This is the list that I worked with in the Todo List page.

  ### 5. State Management and Persistence
  - Used: **React Query, useState, localstorage**
  - **React Query Setup:**
      - I created a react-query folder with two files inside. The **queryClient.js** file creates a react query client and the **persister.js** file creates async storage persister using the localstorage as the storage to persist the state of the application.
      - Then in the **main.jsx** file, I imported the **PersistQueryClientProvider**, wrapped the App component with it and sent the afore mentioned queryClient and persister as props. This makes sure that the state managed and persisted by React Query will be available to the App component including all its children.
  - **Todo List page:**
      - I fetched the todo list and the user list and placed them in **React Query** states called **todoList** and **userList**.
      - After filtering the list according to the set filters, the data is further stored in a **React Query** state called **filteredList** which is persisted, paginated and rendered in the app.
      - For pagination, a state called **currentPage** is stored in **React Query** which represents the current page number.
  - **Build Form page:**
      - I used the **useState** hook for all of the state and the **localStorage** for the **formInputList** state which is the list of the input fields added to build the form.
      - After an input field is added, the formInputList updates and the updated list is set to the localStorage.
  - **Preview Form page:**
      - Just like the Build Form page, I used **useState** and **localStorage** for the state management here.
      - The main state here is the **inputList** state which receives its value from the localStorage list that we set at the Build Form page.
   
   ### 6. Filtering
   - Used: **React Query**
   - The list of todos in the Todo List page can be filtered by **username** and **status**.
   - The **React Query** states used to store the selected username, selected status and filtered list are **selectedUser**, **selectedStatus** and **filteredList** respectively and all of these states are persisted meaning we set a filter value in this page, go visit another page and come back to visit this to find the same filter value and the filtered list is still there.
   - There are also functions called **setSelectedUser** and **setSelectedStatus** using the queryClient to set these values.
   - A custom Filter component is used to filter the values.
   - The filtering logic is that if only a username is selected then the list is filtered by only username, if only a status is select then it the list is filtered by only status. However, if both values are selected, the list is filtered using both the username and the status.

  ### 7. Pagination
  - Used: **React Query, useState, useEffect**
  - The pagination controls are at the bottom of the Todo List page where the page numbers can be seen.
  - The background of the current page is blue and each page contains 10 list items.
  - Even though the first and the last page numbers are always visible, the numbers portion show a maximum of five page numbers at a time. The other pages are replaced with dots.
  - A **React Query** state called **currentPage** is used to store the current page number of the app and the function which updates this state is **setCurrentPage**.
  - **currentPage** value is updated in a **useEffect** hook depending on the **selectedUser** and **selectedStatus** states so that filtered items can be paginated as well.
  - There is a **paginatedList** const which returns the list of items for current page after slicing the filteredList. This const depends on the **filteredList** and **currentPage** state and is memoized using the **useMemo** hook for faster calculation results. This paginatedList is rendered in the Todo List page.
  - The other const is the **totalPages** which calculates the number of pages needed to show the list.
  - A custom **component** called **Pagination** is used to render the pagination controls and it takes the **currentPage**, **setCurrentPage** and **totalPages** as **props**.
  - Inside the Pagination component, a function called **getPageNumbers** is used to get the page numbers which are shown at the bottom. Every time the **currentPage** and the **totalPages** prop value change, this function is called in the **useEffect** to set the value of the **pageNumbers** state stored using **useState**.
  - The **pageNumbers** list is then iterated and rendered in the component.

  ### 8. Form Builder
  - Used: **useState, localStorage, useEffect**
  - In the Build Form page, I created a form which consists of a text input filed labeled "label" to add the label for the input field we want to add, a select for the input type and a required checkbox to indicate whether the input field should be required or not.
  - If the selected input type is a **"select"** or **"multi-select"**, another text input field with a button labeled "Add Option" appears to take option inputs for the select input. The "Add Option" button is disabled as long as the "option" input field is empty.
  - There is a button labeled "Add Input Field" which adds the input field to the **formInputField** list state stored using **useState** and sets the updated formInputField list to the **localStorage** so that it is available in the Preview Form page. This button is disabled as long as the form is not valid.
  - The **label** input field and the **select** input type fields are **required** and the **option** input field is **required** is well if the seledted input type is **select** or **multi-select**. Unless these fields are filled, the form is not valid and can not be submitted and this validation is checked inside a **useEffect** hook.
  - After submission, the input field is added to the **formInputList** and this list is displayed underneath the form. The form is then reset.
  - Each list item has a button labeled **Remove** which upon clicking, removed the input field from both **formInputList** and the **localStorage**. The list item shows the label of the field, the input type, if the field is required and the list of options if there are options for field.
  - All the other states required to make the Build Form page work are managed with **useState**.
  - In the **initial render**, the previously saved form input list is fetched from the **localStorage** inside a **useEffect** hook and set to the **formInputList** state. 

  ### 9. Preview Form
  - Used: **useState, localStorage, useEffect**
  - In the Preview Form page, I fetch the saved form configuration from the **localStorage** on the **initial render** inside a **useEffect** hook and store them in the **useState** state **inputList**.
  - The **formList** is rendered in this page.
  - The form fields can be filled and the value changed are handled by a **handler function** and the **formList** is updated whenever such a change takes place.
  - If a field is required, a red "*" is shown on the right side of its label and the form can not be submitted until all the required fields are all filled.
  - Upon submission, the input field values are printed in the console and the form is reset.

  ### 10. Modular CSS
  - For most of the components, I used separate css files titled "FileName.module.css", imported them as `import styles from "./FileName.module.css";` and used the classes.
  - I placed the css classes which are used across all the components inside the **index.css** file.
    



## Features

This project is consisted of four pages. Each page has buttons at the top for navigating to other pages.

### 1. Home
<img width="848" height="146" alt="home_img" src="https://github.com/user-attachments/assets/3857caf3-ac26-4b8e-87b1-af36d4ba82c7" />

- This page contains buttons which can be used to route to the other three pages.

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
  <img width="512" height="811" alt="build_form_img" src="https://github.com/user-attachments/assets/8a2bf8e7-a022-4145-818f-38459a619fca" />

#### i. Add Input Field

`localstorage`

- Different input fields can be added with **labels, input types, options and requirement** to make a custom form and the configuration is stored in the **localstorage**.
- Added fields are shown at the bottom of the page with their properties.

#### ii. Remove Input Field

`localstorage`

- Input fields can be removed from the form using the remove button beside them. When they are removed from the form, they get removed from the **localstorage** as well.

### 4. Preview Form
   <img width="699" height="839" alt="preview_form_img" src="https://github.com/user-attachments/assets/9ab2f49e-6706-4532-a106-f0d40d6deb98" />
   <img width="613" height="206" alt="preview_form_console_img" src="https://github.com/user-attachments/assets/1b8d3ad1-ecc5-4ee6-bdcc-959405c1cc4e" />


#### i. Fill the form and Submit

`localstorage`

- The form that was built in the build form page is fetched from the **localstorage** and can be viewed in this page. The fields can be filled and submitted and after submission, the field values will be printed in the console.

## Contributor

Name: Kazi Tushita Tahsin

Email: tahsintushita@gmail.com
