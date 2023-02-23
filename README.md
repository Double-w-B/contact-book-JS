# :ledger: ContactBook

## Table of contents

- [Authentication](#authentication)
- [Add new contact](#add-a-new-contact)
- [Contact's data](#contacts-data)
- [Manage the data](#manage-your-private-and-the-contacts-data)
- [Remove contacts](#remove-contacts)
- [Search for a contact](#search-for-a-contact)
- [Dark mode](#dark-mode)

## General info

Full-stack web application with an authentication logic where users store entries called contacts located in the database. Each contact entry consists of a few standard fields (first name, last name, phone number, e-mail address, address and notes). A list of contacts displayed in alphabetical order of contact's names. Functionality of the app enables user to find a contact via a search of their name or phone number. Furthermore, there is a logic to modify its own or the contact's data. As an extra feature, on purpose to reduce the luminance emitted by device screens, there is an option of a dark mode.

Back-end part of a project: https://github.com/Double-w-B/contactBook-API-NODE

#### Technology: <JavaScript + SCSS + REST API + RWD + Webpack>

##

#### In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.
The page will reload if you make edits.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles app in production mode and optimizes the build for the best performance.

##

## Authentication

To access private contacts stored in the database, it's required to pass the authentication first.

![img_1](https://user-images.githubusercontent.com/75247773/220439121-9b9cf562-d42a-4c61-ac67-4f68ff5b0b53.jpg)

![img_2](https://user-images.githubusercontent.com/75247773/218705923-ad09898e-deff-40bc-961c-58e06111e6b7.jpg)

## Add a new contact

To add a new contact, click "Add New" button and fulfill required form fields marked with an asterisk. A new contact will be added to the list of contacts after passing the form validation.

![img_3](https://user-images.githubusercontent.com/75247773/218706103-170357fe-7757-4a6a-9992-0ed2059d70d5.jpg)

## Contact's data

To check the specific contact data click on contact's name in the contact list.

![img_4](https://user-images.githubusercontent.com/75247773/218706188-a8ee0144-dc7d-4c5d-bef3-5b24b5bdccaa.jpg)
![img_5](https://user-images.githubusercontent.com/75247773/218706195-85c95870-601f-4a13-85fb-0f89983696df.jpg)

## Manage your private and the contact's data

By clicking on a side arrow in a field of specific contact will be shown the submenu to manage the contact. There are 3 options: "Edit" - enables to edit contact details, "Send email" - launches Email Client installed on the user's device and adds a predefined email address (if it was defined), "Delete" - removes the contact from a contact list.

![img_6](https://user-images.githubusercontent.com/75247773/218706367-cbe30410-ba6d-40dd-921f-9ba81c3ade17.jpg)

![img_7](https://user-images.githubusercontent.com/75247773/218706370-aa09dca9-860e-4b3d-a9a7-9712d872d65f.jpg)

![img_8](https://user-images.githubusercontent.com/75247773/218706373-7159921e-779b-4be3-803e-80ee6a70d1bc.jpg)

To update personal data click the button "Update data" in the menu.

![img_9](https://user-images.githubusercontent.com/75247773/218706377-3478f250-c3fe-4a39-a5b6-e4415d8d2a1c.jpg)

![img_10](https://user-images.githubusercontent.com/75247773/218706379-8bb7e0f8-6ea9-4352-a91f-5c395f7c8614.jpg)

## Remove contacts

There is a possibility to remove selected contacts or all the contacts. By clicking on a menu button in a top right corner of the app and choosing among options "Select all" and "Remove selected".

![img_11](https://user-images.githubusercontent.com/75247773/220439125-20da3149-f62e-49d2-9ce3-6a33e933e24f.jpg)

![img_12](https://user-images.githubusercontent.com/75247773/218706529-b0250bce-dc44-4575-90de-99f7ed886912.jpg)

## Search for a contact

To find a specific contact from a contact list, simply type the name or phone number into a search field.

![img_13](https://user-images.githubusercontent.com/75247773/218706601-6af6dc17-b71a-48f1-bd66-efda32d13fe4.jpg)

## Dark mode

To switch to the dark click on a menu button in a top right corner and choose "Change theme".

![img_14](https://user-images.githubusercontent.com/75247773/218706634-e42fe180-52b0-458e-ba8f-43ca8933e74b.jpg)