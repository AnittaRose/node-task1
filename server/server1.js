const http = require('http');
const port = 3002;
const url = require('url');
const fs = require('fs');
const queryString = require('querystring')

const server = http.createServer((req, res)=>{
    const req_url = req.url;
    console.log("req_url : ",req_url);

    const parsed_url = url.parse(req_url);
    console.log("parsed_url : ",parsed_url);

    if(parsed_url.pathname === '/'){
        
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(fs.readFileSync('../client/index.html'));

    }else if(parsed_url.pathname === '/style.css'){
        res.writeHead(200, {'Content-Type' : 'text/css'});
        res.end(fs.readFileSync('../client/style.css'));

    }else if (parsed_url.pathname === '/test'){
        res.writeHead(200, {'Content-Type' : 'text/plain'});
        res.end('test successful');

    }else if(parsed_url.pathname === '/anitta'){
        res.writeHead(299,{'Content-Type':'text/json'});
        res.end(fs.readFileSync('../server/datas.json'))
    }else if(parsed_url.pathname === '/submit' && req.method === 'POST'){
        console.log("Reached here.....");

        let body = '';

        req.on('data',(chunks)=>{
            console.log("chunks : ",chunks);
            body += chunks.toString();
        });

        req.on('end' , ()=>{
            console.log("body : ", body);

            let datas = queryString.parse(body);
            console.log("datas : ", datas);

            console.log("name : ", datas.name);
            console.log("email : ", datas.email);
            console.log("password: ", datas.password);
        })
    }

})
server.listen(port, () =>{
    console.log(`server running at http://localhost:${port}`)
});


// fetch('http://localhost:3000/anitta')
//     .then((response)=>{
//         console.log("Response : ",response);

//         response.json()
//         .then((parsed_datas)=>{
//             console.log("parsed_datas : ",parsed_datas);
//         })
//         .catch((error)=>{
//             console.log("response error : ",error);
    
//         })

//     })

//     .catch((error)=>{
//         console.log("fetch error : ",error);

//     })