# :ledger: ContactBook

## Table of contents

- [Add new contact](#add-a-new-contact)
- [Contact details](#contact-details)
- [Manage the contact](#manage-the-contact)
- [Remove contacts](#remove-contacts)
- [Search for a contact](#search-for-a-contact)
- [Dark mode](#dark-mode)

## General info

A web application where the user stores entries called contacts. Each contact entry consists of a few standard fields (first name, last name, phone number, e-mail address, address and notes). A list of contacts is stored in alphabetical order of contact's names. Functionality of the app enables user to find a contact via a search of their name or phone number. Furthermore, enables to modify the data or to remove the contacts. As an extra feature, on purpose to reduce the luminance emitted by device screens, there is an option of a dark mode.

#### Technology: <JavaScript + SCSS + RWD + Webpack>

##

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.
The page will reload if you make edits.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles app in production mode and optimizes the build for the best performance.

## Add a new contact

To add a new contact, click a button "Add New" and fulfill required form fields marked with an asterisk. A new contact will be added to the list of contacts after passing the form validation.

![img-1](https://user-images.githubusercontent.com/75247773/213426111-eebeddd9-43cf-459c-a749-68b71cef68e8.jpg)

## Contact details

To check the specific contact details click on the name of that contact.

![img-2](https://user-images.githubusercontent.com/75247773/213426114-89a42f91-9162-4ad2-a265-9fbf1a282ddd.jpg)
![img-3](https://user-images.githubusercontent.com/75247773/213426120-1dcb2e74-2443-4705-85bb-34fe743421a5.jpg)

## Manage the contact

By clicking on a side arrow in a field of specific contact will be shown the submenu to manage the contact. There are 3 options: "Edit" - enables to edit contact details, "Send email" - launches Email Client installed on the user's device and adds a predefined email address (if it was defined), "Delete" - removes the contact from a contact list.

![img-4](https://user-images.githubusercontent.com/75247773/213426121-d56acd0d-9f2e-49e8-8a36-cc468c2b814b.jpg)

![img-5](https://user-images.githubusercontent.com/75247773/213426126-a14293e2-4931-4ca7-adf6-f4b0db935741.jpg)

![img-6](https://user-images.githubusercontent.com/75247773/213426128-99811686-ff88-446d-9c28-ce71f53fffa8.jpg)

## Remove contacts

There is a possibility to remove selected contacts or all the contacts. By clicking on a menu button in a top right corner of the app and choosing among options "Select all" and "Remove selected".

![img-7](https://user-images.githubusercontent.com/75247773/213426129-291d9972-b149-4cba-8d9c-618231a72ae3.jpg)

![img-8](https://user-images.githubusercontent.com/75247773/213426133-6a3d451b-6488-4db0-94bd-3592f34c5503.jpg)

## Search for a contact

To find a specific contact from a contact list, simply type the name or phone number into a search field.

![img-9](https://user-images.githubusercontent.com/75247773/213426136-362646e2-97ee-4810-86b6-4a0416d5223f.jpg)

## Dark mode

To switch to the dark click on a menu button in a top right corner and choose "Change theme".

![img-10](https://user-images.githubusercontent.com/75247773/213426140-90536885-1692-4850-9977-6028c6ca3e3a.jpg)
