<h3> # JustAnotherBlogApp

Blog App using RESTful Routing


This is a Blog App I created with RESTful Routing and MongoDB.
The user can create a new blog post with a title, an image url and a body, edit the post or delete it.
I used express-sanitizer in order to prevent the user from using script tags inside the blog body, but still be able to style
the blog post in any way he desires using html and css.
I styled the app with Semantic UI.


The app is created in Cloud9, so If you want to run it on your own machine, you will have to download and run MongoDB and Nodejs,
and install all the dependencies from the package.json file. Also, you will have to use your own PORT and IP listener.


Currently there is an issue at the blogSchema, as I wanted to add a default image for users that don't insert a specific image url,
but the default image isn't inserted when the image form input is empty.
</h3>
