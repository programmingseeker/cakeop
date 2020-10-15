# ENDPOINT DOCUMENTATION

## API ENDPOINTS

#### **USER Route**

```
1.
  url       : /api/user/login
  method    : POST
  desc      : send email/username and password to
              login returns a auth jwt token
  protected : protected to logged in user


2.
  url       : /api/user/signup
  method    : POST
  desc      : to register a user send email,
              username,password and confirmPassword returns a
              jwt token
  protected : protected to logged in user


3.
  url       : /api/user/logout
  method    : GET
  desc      : logges out a user sends a logout token
  protected : NO
```

#### **CAKE Route**

```
1.
  url   : /api/cake
  method: GET
  desc  : returns a list of cakes in json data
  protected : NO


2.
  url       : /api/cake/
  method    : POST
  desc      : creates a cakes in the database send the requried
              data as specified in the form
  protected : ADMIN ONLY

3.
  url   : /api/cake/:id
  method: GET
  desc  : returns a of cakes specified cake in json data
  protected : NO


4.
  url   : /api/cake/:id
  method: PATCH
  desc  : to update a cake of specified id
  protected : ADMIN ONLY


5.
  url   : /api/cake/:id
  method: DELETE
  desc  : deletes the record of the cake from the database
  protected : ADMIN ONLY


6.
  url   : /api/cake/:id/review
  method: POST
  desc  : sends a post request for a cake
  protected : authenticated user

```
