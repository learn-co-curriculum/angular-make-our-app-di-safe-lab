# Making our application minification safe

## Objectives

- Add relevant dependency injection annotations

## Instructions

Let's take the code from this repo and change the parameter names. Change `$scope` and `$timeout` to random words of your choosing.

Refresh the page - you'll notice we get a load of errors in the console. Not good!!

Now, with our knowledge about the `$inject` property, add the property to our controller with the correct values for what we want to inject (`$scope` and `$timeout`).

Refresh the page again - you'll see that everything is in working order!
