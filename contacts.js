const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function parsedContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    // console.table(JSON.parse(data));
    return JSON.parse(data);
  } catch (error) {
    return console.error(error.message);
  }
}

async function listContacts() {
  try {
    const contactList = await parsedContacts();
    console.log("Contact List:");
    console.table(contactList);
    return contactList;
  } catch (err) {
    return console.error(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const contactList = await parsedContacts();
    const contactById = contactList.find(({ id }) => id === contactId);
    console.log(`Contact by ${contactId} id`);
    console.table(contactById);

    return contactById;
  } catch (err) {
    return console.error(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contactList = await parsedContacts();
    const contactsAfterDeleting = contactList.filter(
      ({ id }) => id !== contactId
    );
    if (contactList.length === contactsAfterDeleting.length) {
      return console.log(
        `Id ${contactId} was deleted previously, try anoder Id`
      );
    }

    await fs.writeFile(
      contactsPath,
      JSON.stringify(contactsAfterDeleting, null, 2),
      "utf8"
    );

    console.log(`Contacts without deleted ${contactId} id`);
    console.table(contactsAfterDeleting);

    return contactsAfterDeleting;
  } catch (err) {
    return console.error(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactList = await parsedContacts();
    const newContact = {
      id: Math.floor(Math.random() * 100),
      name,
      email,
      phone,
    };
    const contactsWithNewID = [...contactList, newContact];
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contactsWithNewID, null, 2),
      "utf8"
    );
    console.log(`${name} was added to Contact List`);
    console.table(contactsWithNewID);
    return contactsWithNewID;
  } catch (err) {
    return console.error(err.message);
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
