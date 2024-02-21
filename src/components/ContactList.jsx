import styles from "./ContactList.module.css";

function ContactList(props) {
  const contacts = props.data;
  const deleteHandler = props.deleteFunc;
  return (
    <div className={styles.contacts_list}>
      <h1 className={styles.contacts_title}>Contact List: </h1>
      {!props.data.length ? (
        <p className={styles.msg}>No contacts yet!</p>
      ) : (
        <>
          <div className={styles.contacts_card}>
            {contacts.map((contact) => {
              return (
                <div key={contact.id} className={styles.contact_card}>
                  <p className={styles.detail}>{contact.name}</p>
                  <p className={styles.detail}>{contact.lastName}</p>
                  <p className={styles.detail}>{contact.email}</p>
                  <p className={styles.detail}>{contact.phone}</p>
                  <button
                    className={styles.delete}
                    onClick={() => deleteHandler(contact.id)}
                  >
                    ❌
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default ContactList;
