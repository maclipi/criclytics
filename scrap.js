const rp = require('request-promise');
const $ = require('cheerio');
var fs = require("fs");


var atoz = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n'];

for ( let t = 1;t<=43;t++)
atoz.forEach(ele =>{

const url = `http://www.espncricinfo.com/ci/content/player/country.html?country=${t};alpha=${ele.toUpperCase()}`;
let DataArray = [];
const masterurl =`http://www.espncricinfo.com`;
 rp(url)
  .then(async function(html){
    //success!
    // console.log($('big > a', html).length);
    // console.log($('.ciPlayerbycapstable', html).children());
    var rows = $(".ciPlayerbycapstable",html).find("table");
    console.log(rows.length)
    
    for (let i =0; i< rows.length;i++)
    {
        let path = `table > tbody > tr:nth-child(${i}) > td > table > tbody > tr > td.ciPlayernames > a`;
        DataArray.push(
     {
        ['id'] :i,
       ['url'] :`${masterurl}${$(path,html).attr('href')}`,
       ['name'] : $(path,html).text().trim()
     }
        )
       
     }
     console.log(DataArray);
     fs.writeFile(`test/${ele.toUpperCase()} ${t}.json`,JSON.stringify(DataArray), (err) =>{
         if (err) console.log(err)
         console.log('Written Successfully');
         
     })
     

    
  })
  .catch(function(err){
  console.log(err)
  });
    
})
