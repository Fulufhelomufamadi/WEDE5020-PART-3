const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 3000;

//Allow the server to receive JSON data
app.use(express.json());
app.use(cors());

//Homepage route
app.get("/", function(req, res) {
    res.send("Welcome to Tshiawelo Primary School Backend");
});

//Contact from endpoint
app.post("/Contact", function(req,res) {

    const { name, email, messageType, message } = req.body;

    console.log("New Contact Message:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message Type:", messageType);
    console.log("Message:", message);

    res.json({
        success: true,
        message: "Your message has been received successfully!"
    });

});

//Start the serve
app.listen(PORT, function() {
    console.log("Tshiawelo Primary School serve is running on port " + PORT );

    //Enquiry from endpoint
    app.post("/enquiry", function(req, res) {
        const { name, email, phone, enquiry, message } = req.body;

        console.log("New Enquiry Received:");
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Phone:", phone);
        console.log("Enquiry Type:", enquiry);
        console.log("Message:", message);

        res,json({
            success: true,
            message: "Your enquiry has been received successfully!"
        });
    })
});