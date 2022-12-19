# addressBook

--- you test addressBook app by postman using this file---->
{addressBook.postman_collection.json}

      in postman

      -----> to register
            POST https://address-book-green.vercel.app/auth/register

                  in body insert these fields
                      username
                      email
                      password
                      confirmPassword



      -----> to login
            POST https://address-book-green.vercel.app/auth/login

                  in body insert these fields
                      email
                      password


      -----> to get all contacts
            GET https://address-book-green.vercel.app/contacts?page=1


      -----> to get single contact
            GET https://address-book-green.vercel.app/contacts/id/:id


      -----> to get contacts by search
            GET https://address-book-green.vercel.app/contacts/search?search=alaa


      -----> to add new contacts
            POST https://address-book-green.vercel.app/contacts

                in body insert these fields
                      name
                      phone


      -----> to add many contacts
            POST https://address-book-green.vercel.app/contacts/bulkContacts

                in body insert these fields
                      [
                        {
                          name,
                          phone
                        }
                      ]


      -----> to update contact
            PUT https://address-book-green.vercel.app/contacts/id/:id

                in body insert these fields
                          name
                          phone


      -----> to delete contact
            DELETE https://address-book-green.vercel.app/contacts/id/:id
