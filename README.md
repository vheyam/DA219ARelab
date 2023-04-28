# DA219ARelab
This Album database application is able to perform the following operations from postman

Show all albums using the GET verb and URL -> http://server:port/api/albums this returns a JSON array with all the albums.

Retrieve specifics albums by title using the GET verb and URL -> http://server:port/api/albums/:title this returns a JSON object 
with the attributes of the album for example, a JSON object for the album with the title= “Abbey Road” is returned 
if you used the URL http://localhost:3000/api/albums/Abbey Road

If the {title} is not found, an error message is returned as well as HTTP-status code 404. 
If more than one albums have the same title, all are returned.

Create a new album using the POST verb and URL -> http://server:port/api/albums 
i. 
If the album is not added before (not found in the database), the new album is added to the database 
and a JSON object of the newly added album is returned as well as HTTP-status code 201 (created). 
ii. 
If the album already exists in the database, an error message is returned as well as HTTP-status code 409 (conflict).

Updates an album using the PUT verb and the URL -> http://server:port/api/albums/:id 
i. If the {id} is not found, an error message is returned as well as HTTP-status code 404

Deletes an album using the DELETE verb and the URL -> http://server:port/api/albums/:id 
i. If the {id} is not found, an error message is returned as well as HTTP-status code 404.

From the browser using localhost:3000 the index.html file is served from there you can add albums, update an album title or delete an album, 
the database collection is displayed on the page in the browser. After working for so long the tiredness prevented me from working 
any further for the sake of including field validation.

There is a refresh button that will refresh the page after an action has been performed 
to show that the changes (deletion/update) are sent to the database.

When deleting the action produces an error dialogbox which suggests that the record is not deleted 
but when you click refresh the deletion is in fact confirmed. I did not have the energy to fix this 
as at the point of submission my energy for working on this lab was depleted
