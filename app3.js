const http = require('node:http');
const port = 3001;
const fs = require('node:fs');
const os = require('node:os');
const { error } = require('node:console');
const osType = os.type();
console.log(osType);

const htmlContent = `<!DOCTYPE html><html><h3>Your operation system is ${osType}</h3></html>`;

const server = http.createServer((req , res) => {
    if(req) {
// non sync way to write a file
        fs.writeFile('./index.html' , htmlContent, err => {
            if(err) {
                console.log("Problem in writing file", err);
            } else {
                fs.readFile('index.html', (err, content) => {
                    if(err) {
                        console.log("Problem in reading file")
                    } else {
                        console.log("This is a request")
                        res.setHeader('Content-Type', 'text/html')
                        res.end(content);
                    }
                })
            }
        })
    } else{
        console.log("Problem in request")
    }
})

server.listen(port , ()=>{
    console.log(`Server is up in port:${port}`)
})