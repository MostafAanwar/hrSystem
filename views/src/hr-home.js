let url = "http://localhost:3000/session";

fetch(url, {
    mode: "cors",
    method: "POST"
})
    .then(res => {
        return res.json()
    })
    .then(res => {
        let welcomeMessage = "Welcome "+res['name'];
        document.getElementById("head").innerHTML = welcomeMessage;
    });