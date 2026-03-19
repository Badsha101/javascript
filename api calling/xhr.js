console.clear();
//AJAX AND XMLHTTPREQUEST:F
//event- onload(), onerror()
//property - response, rsponsetext, responsetype, responsURL, status, statustext
//function - open(), send(), setRquestheader()

// const makeRequest = (method, url, data)=>{
//     const xhr = new XMLHttpRequest();
//     xhr.open(method, url);

//     xhr.setRequestHeader('Content-Type', 'application/json');

//     xhr.onload = () =>{
//         let data = xhr.response;
//         console.log(JSON.parse(data));
//         console.log(xhr.status)
//     }

//     xhr.onerror = ()=>{
//         console.log('error is here');
//     }

//     xhr.send();

// }


// const getData = () => {

//     makeRequest('GET', 'https://jsonplaceholder.typicode.com/posts')
// } 


// const sendData = () => {

//     makeRequest('PUT', 'https://jsonplaceholder.typicode.com/posts/1', 
//         {
//     title: 'fooma',
//     body: 'barma',
//     userId: 1,
//   }
//     );
    
// }
// sendData()

//fetch api:

// fetch("https://jsonplaceholder.typicode.com/posts", {
//     method: "POST",
//     headers: {
//         "Content-type": "application/json: charset=utf-8",
//     },
//     body: JSON.stringify({
//         title: "foo",
//         body: "bar",
//         userId: 1
//     })
// })
// .then((res)=>{
//     if(!res.ok){
//         const message = `Error: ${res.status}`;
//         throw new Error(message);
//     }
//     return res.json();
// })
// .then((res) => console.log(res))


//axios: it returns promise.

axios.post("https://jsonplaceholder.typicode.com/posts/",{
  method: 'POST',
  body: JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
 
})
    

.then((res) => console.log(res.data))
.catch((err) => console.log(err));

