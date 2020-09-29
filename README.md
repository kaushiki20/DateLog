This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `Mock Api`

I have used Postman's mock server to create the api request
(https://learning.postman.com/docs/designing-and-developing-your-api/mocking-data/setting-up-mock/)
the api url is-(https://20fbaad1-1df2-4700-9c31-17213065cea7.mock.pstmn.io/api)
please refer to Public\Desktop\fullthrottle\public\Screenshot11.png file for api url
url-{initialvalue:(https://20fbaad1-1df2-4700-9c31-17213065cea7.mock.pstmn.io)
currentValue:(https://20fbaad1-1df2-4700-9c31-17213065cea7.mock.pstmn.io)}
and structure of the object and sending back as response is :-
{"ok": true,
"members": [{
"id": "W012A3CDE",
"real_name": "Egon Spengler",
"tz": "America/Los_Angeles",
"activity_periods": [{
"start_time": "Feb 1 2020 1:33PM",
"end_time": "Feb 1 2020 1:54PM"
},]
}}

### `Project`

You can start the project by using ### `npm start`
Data flow:-
-Data is requested from the mock server and is saved in an array(data/setData).
-The data array is mapped into a table to show the user data in structured mannner.
-Onclick event on the row of the table opens a model which shows a calender

- If there is activity data related to that particular date ,it will show the hours active of the user
  -Lastly on clicking oustide of the modal will trigger handleClose which is a function being used to close the modal .
