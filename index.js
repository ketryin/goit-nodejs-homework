const contacts = require("./contacts");
const argv = require("yargs").argv;

function onError(error) {
    console.log(error.message);
}

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.getAllContacts().then(console.table);
      break;

    case "get":
      contacts.getContactById(id).then(contact => console.table(contact || "No such contact found."));
      break;

    case "add":
      contacts.addContact(name, email, phone, onError).then(() => console.log("Contact created."));
      break;

    case "remove":
      contacts.removeContact(id, onError).then(() => console.log("Contact deleted."));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);