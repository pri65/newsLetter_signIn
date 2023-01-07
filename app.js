const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({encoded: true}));

app.get("/", function(req,res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req,res) {
 const firstName = req.body.fname;
 const lastName = req.body.lname;
 const email = req.body.e;
const data = {
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME:firstName,
                LNAME:lastName
            }
        }
    ]
};

const jsonData = JSON.stringify(data);

const url = "https://us21.api.mailchimp.com/3.0/lists/7fda1abd16";
const options = {
    method: "POST",
    auth: "priyanka:3544ef4a8268570125abceded2fa67f1-us21",
}

const request = https.request(url,options,function(response) {

    if(response.statusCode === 200) {
        res.send("Successfully subscribed!")
    } else {
        res.send("There was an error with signing up, please try again!");
    }

response.on("data",function(data) {
    console.log(JSON.parse(data))
});
});

request.write(jsonData);
request.end();
});

// {"name":"Freddie'\''s Favorite Hats", "contact":{"company":"Mailchimp","address1":"675 Ponce de Leon Ave NE","address2":"Suite 5000","city":"Atlanta","state":"GA","zip":"30308","country":"US","phone":""},"permission_reminder":"You'\''re receive this email because you signed up for updates about Freddie'\''s newest hats.","campaign_defaults":{"from_name":"Freddie","from_email":"freddie$freddiehats.com","subject":"","language":"en"},"email_type_option":true}

app.listen(3000, function() {
    console.log("Server is running on port 3000")
})


//3544ef4a8268570125abceded2fa67f1-us21

//7fda1abd16