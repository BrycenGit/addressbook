// let test = new AdressBook();
// test.contacts;
// test.addContact(somecontact)
function AddressBook() {
  this.contacts = [];
  this.currentId = 0;
}
//methods instead of functions//
AddressBook.prototype.addContact = function(contact) { //<constructor 
  contact.id = this.assignId(); 
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findByLast = function(lastName) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]){
      if (this.contacts[i].lastName == lastName){
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.findContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}
//elements in the contacts array are empty, or undefined, they won't have an id property//
AddressBook.prototype.deleteContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i]; //< new addition from .findContact
        return true;
      }
    }
  };
  return false;
}
// let test = new Contact('john', 'doe', 5550123);
function Contact(firstName, lastName, phoneNumber) { //<constructor 
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}


let addressBook = new AddressBook();
let contact = new Contact("Ada", "Lovelace", "503-555-0100");
let contact2 = new Contact("Grace", "Hopper", "503-555-0199");
addressBook.addContact(contact);
addressBook.addContact(contact2);
addressBook.contacts