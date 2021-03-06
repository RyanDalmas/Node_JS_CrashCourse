const url = require('url');

const myUrl = new URL('http://mywebsite.com:8000/hello.html?id=100&status=active');

// Serialized URL
console.log(myUrl.href);
console.log(myUrl.href.toString());

// Host (root domain) (gets port)
console.log(myUrl.host);

//Host name (doesnt get port)
console.log(myUrl.hostname);

//Path name
console.log(myUrl.pathname);

//Serialized query
console.log(myUrl.search);

//Params object
console.log(myUrl.searchParams);

//Add param
myUrl.searchParams.append('abc','123');

//Params object
console.log(myUrl.searchParams);

//Loop through params
myUrl.searchParams.forEach((value, name) => console.log(`${name} : ${value}`));