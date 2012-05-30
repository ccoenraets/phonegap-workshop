# PhoneGap Workshop #

## Setting Up Your Environment ##

Download the zip file for this repository, and expand it on your file system.

## Step 1: Implement the Employee Search View ##

1. Using your favorite code editor, open blank/index.html and familiarize yourself with the single HTML page for the Employee Directory application.
1. Open blank/js/dao.js and familiarize yourself with the three methods of the EmployeeDAO data access object: findByName(), findById(), and initialize().
2. Open blank/js/main.js and add the code available [here](https://github.com/ccoenraets/phonegap-workshop/blob/master/final/js/step1.js) to implement the Employee Search View.
3. Open blank/index.html in your web browser and test the application.

## Step 2: Implement the Employee Details View ##

1. In blank/js/main.js, comment out the last line: app.showHomeView();
2. At the bottom of blank/js/main.js, add the code available [here](https://github.com/ccoenraets/phonegap-workshop/blob/master/final/js/step2.js) to implement URL routing and the Employee Details View.
2. Open blank/index.html in your web browser and test the application: click an employee in the list to open the details view for the selected employee.

## Step 3: Implement the device integration features ##

1. Open blank/js/main.js and add the code available [here](https://github.com/ccoenraets/phonegap-workshop/blob/master/final/js/step3.js) to implement the device integration features: Add current location, add employee as contact, and add employee picture.
2. Open blank/index.html in your web browser and test the application.


## Bonus Exercise ##

Based on the code available [here](https://github.com/ccoenraets/phonegap-workshop/blob/master/final/js/main.js), modify your own version of the application to highlight the selected row in the employee list, and to cache the HomeView.

## Build ##

Follow the instructions provided by your instructor to build the application for different mobile platforms using [build.phonegap.com](http://build.phonegap.com).

## On-Device Debugging ##

Follow the instructions provided by your instructor to remotely debug the application using [debug.phonegap.com](http://debug.phonegap.com).