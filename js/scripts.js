let BOOKS = []; //global array of address book object
let ADDRESSBOOKINDEX = 0; 
function nextAddressBook() {
  if(ADDRESSBOOKINDEX + 1 < BOOKS.length){
    ADDRESSBOOKINDEX++;
  } else {
    ADDRESSBOOKINDEX = 0;
  }
}
function addNewAddressBook(name){
  if(name) {
    BOOKS.push(new AddressBook(name));
    return true;
  } else {
    return false;
  }
  
}

// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}
function AddressBook(name) {
  this.contacts = [],
  this.currentId = 0
  this.name = name;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
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

AddressBook.prototype.deleteContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}
// business logic for address
function Address(workEmail, personalEmail, workAddress, homeAddress) {
  this.workEmail = workEmail;
  this.personalEmail = personalEmail;
  this.workAddress = workAddress;
  this.homeAddress = homeAddress;
}


// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, address) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber;
  this.address = address;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
//let addressBook = new AddressBook();
addNewAddressBook('Personal');

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo); 
};

function showContact(contactId) {
  const contact = BOOKS[ADDRESSBOOKINDEX].findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".work-email").html(contact.address.workEmail);
  $(".personal-email").html(contact.address.personalEmail);
  $(".home-address").html(contact.address.homeAddress);
  $(".work-address").html(contact.address.workAddress);

  //$("#lastname").remove(".last-name");

 // $('#show-contact').not('.first-name').html('not first name');
  if (contact.address.workEmail) {
     $("#work-email-id").show();
  }else {
    $("#work-email-id").hide();
    //$('p').remove('#work-email-id');
  }
  if (contact.address.personalEmail) {
    $("#personal-email-id").show();
  } else {
    $("#personal-email-id").hide();
  }
  if (contact.address.workAddress) {
    $("#work-address-id").show();
  } else {
    $("#work-address-id").hide();
  }
  if (contact.address.homeAddress) {
    $("#home-address-id").show();
  } else {
    $("#home-address-id").hide();
  }
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    BOOKS[ADDRESSBOOKINDEX].deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(BOOKS[ADDRESSBOOKINDEX]);
  });

  
  // $('ul#contacts').hover("li",function() {
  //   showContact($(this.id).fadeIn( 500 ));
  //   $(this).fadeOut( 100 ); 
  // });
  $('ul#contacts').on('mouseenter', 'li', function () {
    $(this).css('background-color', 'black');
    $(this).css('color', 'white');
    $(this).css('cursor', 'no-drop');
  });
  $('ul#contacts').on('mouseleave', 'li', function () {
    $(this).css('background-color', 'inherit');
    $(this).css('color', 'inherit');
    $(this).css('cursor', 'inherit');
  });

  
};


function resetInputs () {
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input#new-phone-number").val("");
  $("input#new-personal-email").val("");
  $("input#new-work-email").val("");
  $("input#new-home-address").val("");
  $("input#new-work-address").val("");
}



$(document).ready(function() {
  attachContactListeners();
  $('#bookHeader').text(BOOKS[ADDRESSBOOKINDEX].name + ' address book');
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedWorkEmail = $("input#new-work-email").val();
    const inputtedPersonalEmail = $("input#new-personal-email").val();
    const inputtedHomeAddress = $("input#new-home-address").val();
    const inputtedWorkAddress = $("input#new-work-address").val();
    resetInputs();
    let newAddress = new Address(inputtedWorkEmail, inputtedPersonalEmail, inputtedWorkAddress, inputtedHomeAddress);
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, newAddress);
    BOOKS[ADDRESSBOOKINDEX].addContact(newContact);
    displayContactDetails(BOOKS[ADDRESSBOOKINDEX]);
  });
  $('#address-add').submit(function () {
    const newAddresBookName = $("input#new-address-book").val();
    addNewAddressBook(newAddresBookName);
    $("input#new-address-book").val('');
  });
  $('#next-button').click(function () {
    nextAddressBook();
    displayContactDetails(BOOKS[ADDRESSBOOKINDEX]);
    $('#show-contact').hide();
    $('#bookHeader').text(BOOKS[ADDRESSBOOKINDEX].name + ' address book');
  });
})