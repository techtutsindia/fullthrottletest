# fullthrottlelabs Front-End Test
Application to calculate the interest rate and monthly EMI based on the loan amount value and EMI tenure selected by user.



# [Live Demo of Application](https://interestratecalculator-p2000410784trial.dispatcher.hanatrial.ondemand.com/index.html)

Interest Rate calculator is a tool to build using SAPUI5 framework. It takes the two parameters from user, first one is loan amount and second is EMI month tenure. Based on the values given by user, application pass the values to one API which returns an object of monthly EMI amount and interest rate. Calculation logic is written in backend.

## Technology and Concept

* SAPUI5 Javascript Framework.
* SAPUI5 follows the MVC architecture.
* It has large set of controls to manage UI, which can be used in a form of XML to create the front-end of an application.
* SAPUI5 supports JSON and OData Model.

## Project Structure
```
neo-app.json           * Entry point of the application, hold the destination path inorder to access the Odata services.
index.html             * Bootstraping the UI5 application, process of initializing and loading of SAPUI5 library
Component.js           * metadata configuration and enable routing module   	this.getRouter().initialize();
manifest.json          * metadata configuration objects sap.app, sap.ui,sap.ui5 objects
View1.view.xml         * Interface of the application, All standard UI controls
View1.controller.js    * Application logic
i18n.properties        * all static text properties
style.css              * global css classes

```
 



## SAPUI5 Controls

```
sap.m.Input
sap.m.StepInput
sap.m.Slider
sap.m.BusyDialog
sap.m.SemanticPage
sap.m.VBox
sap.m.HBox
sap.m.GenericTag
```



# How Application Works

Following will be the initial screen for the user with default values selected in the control.
Below mentioned screeenshot is the initial screen of the application. Here user can selecte the loan amount value by using slider control, and select the EMI tenure from 6 months to 24 months by using step input control.


## Application

![Open Image in a new](https://github.com/techtutsindia/fullthrottletest/blob/master/screenshots/screen1.PNG?raw=true "Initial Screen")


Once user will select the loan amount using slider, livechange function will call the API and it will take two parameter from user first is the loan amount selected by user using slider control and second is the EMI tenure selected in step input tab.
API will written an object consisting of relevant key value pair like interest rate and monthly EMI amount calculated based on the input provided by user.

* Result will be displayed on Generic Tags available below slider control.
* The latest user input data will be visible as list item on the left sidebar.

![Open Image in a new](https://github.com/techtutsindia/fullthrottletest/blob/master/screenshots/screen2.PNG?raw=true "Initial Screen")

* User can also select the loan amount manually by typing the loan amount in loan amount input.
* User needs to click on Calculate button in order to obtain result. 

![Open Image in a new](https://github.com/techtutsindia/fullthrottletest/blob/master/screenshots/screen3.PNG?raw=true "Initial Screen")

* For each search, Object list items are storing the value of user input on runtime.
* By clicking on object list item, user can get the same results as previous.

![Open Image in a new](https://github.com/techtutsindia/fullthrottletest/blob/master/screenshots/screen4.PNG?raw=true "Initial Screen")


* To reset the default values in the application click on the Reset button available on bottom right corner.
* It will restore the default values for the inputs and will remove all the dynamically addded object list items from the DOM

![Open Image in a new tab](https://github.com/techtutsindia/fullthrottletest/blob/master/screenshots/screen5.PNG?raw=true "Initial Screen")




