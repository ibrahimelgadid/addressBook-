# addressBook

--- you test addressBook app by postman using this file---->
{addressBook.postman_collection.json}

      in postman

      -----> to register
            POST https://address-book2022.herokuapp.com/auth/register

                  in body insert these fields
                      username
                      email
                      password
                      confirmPassword



      -----> to login
            POST https://address-book2022.herokuapp.com/auth/login

                  in body insert these fields
                      email
                      password


      -----> to get all contacts
            GET https://address-book2022.herokuapp.com/contacts?page=1


      -----> to get single contact
            GET https://address-book2022.herokuapp.com/contacts/id/:id


      -----> to get contacts by search
            GET https://address-book2022.herokuapp.com/contacts/search?search=alaa


      -----> to add new contacts
            POST https://address-book2022.herokuapp.com/contacts

                in body insert these fields
                      name
                      phone


      -----> to add many contacts
            POST https://address-book2022.herokuapp.comcontacts/bulkContacts

                in body insert these fields
                      [
                        {
                          name,phone
                        }
                      ]


      -----> to update contact
            PUT https://address-book2022.herokuapp.com/contacts/id/:id

                in body insert these fields
                          name
                          phone


      -----> to delete contact
            DELETE https://address-book2022.herokuapp.com/contacts/id/:id
