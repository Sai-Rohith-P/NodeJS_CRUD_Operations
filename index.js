const express = require('express');
const StudentDetails = require('./StudentDetails.json');
const fs = require('fs');
const app = express();
// const port = process.env.PORT;
// let port = 3000;
let port = process.env.PORT || 3000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send("<center><h1>Hello Developer</h1></center>");
})


// GET Method
app.get('/studentdetails', (req, res) => {
    res.send(StudentDetails);
})


// POST Method
app.post('/newstudent', (req, res) => {
    let newstudent = req.body;
    StudentDetails.push({ ...newstudent, id: StudentDetails.length + 1 });
    fs.writeFile('./StudentDetails.json', JSON.stringify(StudentDetails), (err, data) => {
        console.log(({ status: "sucesss", id: StudentDetails.length }))
    })
    console.log(newstudent);
    res.send("New data Added.");
})


// Access By ID
app.get('/studentdetails/:id', (req, res) => {
    let id = parseInt(req.params.id);
    const user = StudentDetails.find((user) => user.id === id); // using Find() Method.
    // const user = StudentDetails.filter((e) => e.id === id); // using filter() Method.
    res.send(user);
})


//Update Merhod
app.patch('/update/:id', (req, res) => {
    let data = req.body;
    // console.log(data.name);
    // res.send("success");
    let id = parseInt(req.params.id);
    let user = StudentDetails.find((userr) => userr.id === id);
    // console.log(user.name);
    // res.send("Update Sucessfully.")
    // user.name = "Ammayi"; //by default
    // user.age = 30; //  // bydefault
    user.name = data.name;
    user.age = data.age;
    fs.writeFile('./StudentDetails.json', JSON.stringify(StudentDetails), (err, data) => {
        res.send({ status: "sucesss", id: StudentDetails.length })
    })
    res.json(user)
})


app.delete('/deleteStudent/:id', (req, res) => {
    let id = parseInt(req.params.id);

    if (id >= 0) {
        const user = StudentDetails.findIndex((user) => user.id === id);
        if (user) {
            delete StudentDetails[id - 1];
            fs.writeFile('./StudentDetails.json', JSON.stringify(StudentDetails), (error, data) => {
                res.send("Deleted SucessFully...");
            })
        } else {
            res.send("Sorry ");
        }
    } else {
        res.send("Sorry there is No user Regarding Above give ID.")
    }

})


app.listen(port, () => {
    console.log("Server Running....");
})