
##Assumptions
The app assumes a local web server is setup your machine. If not, please add the following line to your /etc/hosts file 
`127.0.0.1 localhost`

The app requires npm, f you do not have npm, please install npm : https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

The app assumes port 3000 (for the client) and port 8080 (for the node server) area available for it. 

Please ensure that no other processes are running on your machine on these ports. 

##Design assumptions
Historical orders orders that have reached a 'DELIVERED' or 'CANCELLED' state. Orders in other states are assumed to be in process and hence, 
not a order in the past. 

#Test assumptions
The tests for main app have been created, as it renders the search bar and the tables and tests the app behavior as a user would use the app.
For the sub-components, snapshot tests are sufficient. Some tests are prone to false positives if the mockData is modified. These could be made
a bit more robust. 



## Setting up the app.
1. Unzip the zipped file (cloudkitchens) into a directory of your choice 
2. From inside the unzipped folder, run `npm install`. This will install the dependencies the app requires
3. Now start the app, `npm start`. 
4. To run the test suite, run the command `npm test`. 

##Libraries used and the reasoning behind their selection
1. React starter kit: https://reactjs.org/community/starter-kits.html
   Strongly recommended by the React team, easy to kickstart development and comes bundled with necessary packages. 
2. Material-UI for react, to create the UI look & feel: https://material-ui.com/
   I like material design, and wanted to use this as an opportunity to learn a bit more about it. It's also a widely used
   React library, so support would be available. 
3. ExpressJS for setting up a minimal node web server: https://expressjs.com/
   Bare bones Node server, I chose it because of familiarity and ease of use.  
4. Socket.io for setting up a server and client socket connection: https://socket.io/
   Recommended by your team. 
5. React testing library for creating Unit tests: https://github.com/testing-library/react-testing-library
   and Enzyme: https://airbnb.io/enzyme/ 
