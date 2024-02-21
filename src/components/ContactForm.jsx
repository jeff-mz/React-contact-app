import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./ContactForm.module.css";
import ContactList from "./ContactList";

function ContactForm() {
  const inputs = [
    { id: 1, type: "text", name: "name", placeholder: "Name" },
    { id: 2, type: "text", name: "lastName", placeholder: "Last Name" },
    { id: 3, type: "email", name: "email", placeholder: "E-mail" },
    { id: 4, type: "number", name: "phone", placeholder: "Phone" },
  ];

  const [contacts, setContacts] = useState([]);
  const [alert, setAlert] = useState("");
  const [contact, setContact] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    id: "",
  });
  // handlers
  const changeHandler = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setContact((contact) => ({ ...contact, [inputName]: inputValue }));
  };
  const submitHandler = (event) => {
    event.preventDefault();

    if (
      !contact.name ||
      !contact.lastName ||
      !contact.phone ||
      !contact.email
    ) {
      setAlert("please enter valid data!");
      return;
    }

    const newContact = { ...contact, id: uuidv4() };
    setContacts((prevContacts) => [...prevContacts, newContact]);
    setContact({
      name: "",
      lastName: "",
      email: "",
      phone: "",
    });
    setAlert("");
  };
  const deleteHandler = (index) => {
    const filteredContacts = contacts.filter(
      (contactObj) => contactObj.id !== index
    );
    setContacts(filteredContacts);
  };
  return (
    <div className={styles.app_wrapper}>
      <h1 className={styles.app_title}>Contact App</h1>
      <form onSubmit={submitHandler} className={styles.app_form}>
        {inputs.map((input) => {
          return (
            <input
              className={styles.form_control}
              key={input.id}
              type={input.type}
              placeholder={input.placeholder}
              name={input.name}
              value={contact[input.name]}
              onChange={changeHandler}
            />
          );
        })}
        <button className={styles.submit_btn} type="submit">
          Add Contact
        </button>
      </form>

      {alert && <p className={styles.alert}> {alert}</p>}
      <ContactList data={contacts} deleteFunc={deleteHandler} />
    </div>
  );
}

export default ContactForm;
