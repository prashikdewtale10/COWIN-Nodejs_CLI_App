const axios = require('axios');
const Table = require('tty-table');
const chalk = require('chalk');
var inquirer = require('inquirer');
const notifier = require('node-notifier');
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

module.exports  = function(districtid){
    var date = new Date();
    var todaysDate = `${date.getDate()}-${String(date.getMonth()+1).padStart(2,"0")}-${date.getFullYear()}`;

    inquirer
    .prompt([
    {
        type:'list',
        name:'choice',
        message:'Please Choose Age Group',
        choices:[
            {
                name:"All ages",
                value:""
            },
            {
                name:"45+",
                value:"45"
            },
            {
                name:"18-45",
                value:"18"
            },
        ]
    },
    ])
    .then((answers) => {
      // Make a request for a user with a given ID
axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtid}&date=${todaysDate}`,config)
.then(function (response) {
  // handle success
  // console.table(response.data.states);
  let header = [{
      value: "center",
      headerColor: "cyan",
      color: "white",
      alias:'Center Name',
      align: "left",
      width: 40
    },
    {
      value: "address",
      headerColor: "cyan",
      color: "white",
      alias:'Address',
      align: "left",
      width: 60
    },
    {
      value: "available",
      headerColor: "cyan",
      color: "white",
      alias:'Available Slots',
      align: "left",
      width: 20
    },
    {
      value: "age",
      headerColor: "cyan",
      color: "white",
      alias:'Age',
      align: "left",
      width: 10
    },
    {
      value: "date",
      headerColor: "cyan",
      color: "white",
      alias:'Date',
      align: "left",
      width: 20
    }

  
  ]

  var finalData =[];
  var districtname;
  response.data.centers.forEach(item => {
      districtname=item.district_name;
      item.sessions.forEach((session)=>{
          if(answers.choice==""){
          let ourData={
              center:item.name,
              address:item.address,
              available:session.available_capacity,
              age:session.min_age_limit,
              date:session.date
          };
          finalData.push(ourData);
        }else if(answers.choice==session.min_age_limit){
            let ourData={
                center:item.name,
                address:item.address,
                available:session.available_capacity,
                age:session.min_age_limit,
                date:session.date
            };
            finalData.push(ourData);
        }

      })
      
  });
  // console.log(finalData);
  console.log(chalk.blue.bgWhite.bold(`Data:${todaysDate}`));
  console.log(chalk.blue.bgWhite.bold(`District Name:${districtname}`))
   const out = Table(header,finalData,options).render()
  console.log(out); //prints output
  notifier.notify({
    title:"Cowin Notification",
    sound:true,
    message:'Cowin Slots Executed ',
    wait:true
  })
})
.catch(function (error) {
  // handle error
  console.log(error);
})
.then(function () {
  // always executed
});
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });




}