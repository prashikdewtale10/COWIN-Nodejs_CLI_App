const axios = require('axios');
const Table = require('tty-table');
const chalk = require('chalk');
const config={
   headers:{
    "User-Agent":"axios app",
   } ,
}

const options = {
    borderStyle: "solid",
    borderColor: "blue",
    headerAlign: "center",
    align: "left",
    color: "white",
    truncate: "...",
    width: "90%"
  }

module.exports  = function(){
  console.log(chalk.blue.bgWhite.bold('List of States and their Ids'));
// Make a request for a user with a given ID
axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states',config)
  .then(function (response) {
    // handle success
    // console.table(response.data.states);
    let header = [{
        value: "state_id",
        headerColor: "cyan",
        color: "white",
        alias:'State ID',
        align: "left",
        width: 20
      },
      {
        value: "state_name",
        color: "red",
        alias:"State Name",
        width: 40,
        
      }]
      const out = Table(header,response.data.states,options).render()
    console.log(out); //prints output
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });


}
