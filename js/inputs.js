export const inputs = () =>{
     const inputName = document.getElementById("name");
   const inputSurname = document.getElementById("surname");
   const inputPhone = document.getElementById("phone");
   const inputEmail = document.getElementById("email");
   const inputAddress = document.getElementById("address");
   const inputNotes = document.getElementById("notes");


   return newArray(inputName,
inputSurname,
inputPhone,
inputEmail,
inputAddress,
inputNotes)
}