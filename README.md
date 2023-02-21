Calculator 

The goal of this project was to create a calculator that has all the functionality of a regular calculator along with keyboard support!
It combines HTML, CSS and Javascript.

Challenges/Learning Points: 

- Working around the size of the calculator to ensure large numbers wouldn’t exceed the screen size 
- If my result was going to be longer than 18 digits, I needed to round it down in some way so it didn’t overflow the screen
- If it was a floating point number under 18 digits I needed to round it to 2 decimal places
- I opted for scientific notation for the larger numbers to keep them within the size of the screen
- I then reduced floating point numbers with the toFixed method.
- The previous display couldn’t handle large numbers without expanding the size of the calculator. After trying many different methods to achieve line breaks - none of which worked - the simplest answer was to add white space into my CSS and then add the line break into JS with a conditional statement