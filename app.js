function OnclickNewUser() {

    let u_id = document.getElementById("u_id").value;
    let u_email = document.getElementById("u_email").value;
    let u_fulln = document.getElementById("u_fulln").value;
    let u_pw = document.getElementById("u_pw").value;

    const user = {
        "userId": u_id,
        "emailId": u_email,
        "fullName": u_fulln,
        "password": u_pw
    }

    fetch('https://api.freeprojectapi.com/api/UserApp/CreateNewUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(data => console.log(data));

}

fetch('https://api.freeprojectapi.com/api/UserApp/searchUsers').then(response => response.json())
    .then(res => {

        const user = res.data;

        let body = `
                    <tr>
                        <th>User ID</th>
                        <th>E-mail</th>
                        <th>Full Name</th>
                        <th>Password</th>
                    </tr>
            `;
        let usertable = document.getElementById("userTableLoading");

        user.forEach(element => {
            body += `
                    <tr>
                        <td>${element.userId}</td>
                        <td>${element.emailId}</td>
                        <td>${element.fullName}</td>
                        <td>${element.password}</td>
                    </tr>
                `;
        });
        usertable.innerHTML = body;

    });

function searchOnClick() {

    let st_input = document.getElementById("st_input").value;
    let pn_input = document.getElementById("pn_input").value;
    let ps_input = document.getElementById("ps_input").value;

    fetch(`https://api.freeprojectapi.com/api/UserApp/searchUsers?searchText=${st_input}&pageNumber=${pn_input}&pageSize=${ps_input}`).then(response => response.json())
        .then(res => {

            const user = res.data;

            let body = `
                    <tr>
                        <th>User ID</th>
                        <th>E-mail</th>
                        <th>Full Name</th>
                        <th>Password</th>
                    </tr>
            `;
            let usertable = document.getElementById("userTableLoading");

            user.forEach(element => {
                body += `
                    <tr>
                        <td>${element.userId}</td>
                        <td>${element.emailId}</td>
                        <td>${element.fullName}</td>
                        <td>${element.password}</td>
                    </tr>
                `;
            });
            usertable.innerHTML = body;

        });

}