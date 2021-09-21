const fs = require("fs").promises;
const path = require("path");

const contactsFilePath = path.join(__dirname, "db/contacts.json");

async function getAllContacts() {
  const rawContacts = await fs.readFile(contactsFilePath);
  return JSON.parse(rawContacts);
}

async function getContactById(contactId) {
  const contacts = await getAllContacts();
  const requiredContact = contacts.find((contact) => contact.id === contactId);

  return requiredContact || null;
}

async function removeContact(contactId, onError) {
  const oldContacts = await getAllContacts();
  const newContacts = oldContacts.filter(({ id }) => id !== contactId);

  try {
    await fs.writeFile(contactsFilePath, JSON.stringify(newContacts));
  } catch (error) {
    onError(error);
  }
}

async function addContact(name, email, phone, onError) {
  const contacts = await getAllContacts();
  const id = contacts[contacts.length - 1].id + 1;

  contacts.push({ id: id, name, email, phone });

  try {
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts));
  } catch (error) {
    onError(error);
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
};