function OnclickNewUser() {

    let u_id = document.getElementById("u_id").value;
    let u_email = document.getElementById("u_email").value;
    let u_fulln = document.getElementById("u_fulln").value;
    let u_pw = document.getElementById("u_pw").value;

    if (u_id == "") {
        showAlert("danger", "Please Enter User ID.");
    } else if (u_email == "") {
        showAlert("danger", "Please Enter Email.");
    } else if (u_fulln == "") {
        showAlert("danger", "Please Enter Full Name.");
    } else if (u_pw == "") {
        showAlert("danger", "Please Enter Password.");
    } else {
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
            .then(data => {
                console.log(data);
                if (data.result == true) {
                    showAlert("success", data.message);
                } else {
                    showAlert("danger", data.message);
                }
            })
            .catch(error => {
                console.error(error);
                showAlert("danger", "Something went wrong!");
            });

        document.getElementById("u_id").value = "";
        document.getElementById("u_email").value = "";
        document.getElementById("u_fulln").value = "";
        document.getElementById("u_pw").value = "";
    }

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

function onClickSignin() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const login_user = {
        "emailId": email,
        "password": password
    }

    fetch('https://api.freeprojectapi.com/api/UserApp/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(login_user)
    })
        .then(response => response.json())
        .then(data => {
            if (data.result == true) {
                localStorage.setItem("user", JSON.stringify(data.data));
                window.location.href = "/usermange.html";
            } else {
                console.log("Invalid Details");
            }
        });
}

function onClickResetPassword() {

    let email = document.getElementById("email-address").value;
    let your_email_setSpan = document.getElementById("your-email");

    fetch(`https://api.freeprojectapi.com/api/UserApp/send-reset-otp?emailId=${email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(null)
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        });

    your_email_setSpan.innerHTML = email;

}

function onClickOTPcode() {

    let vc_1 = document.getElementById("vc_1").value;
    let vc_2 = document.getElementById("vc_2").value;
    let vc_3 = document.getElementById("vc_3").value;
    let vc_4 = document.getElementById("vc_4").value;
    let vc_5 = document.getElementById("vc_5").value;
    let vc_6 = document.getElementById("vc_6").value;

    let verfycationCode = vc_1 + "" + vc_2 + "" + vc_3 + "" + vc_4 + "" + vc_5 + "" + vc_6;

    let email = document.getElementById("email-address").value;
    let password = document.getElementById("n_pw").value;
    let conform_password = document.getElementById("nc_pw").value;

    if (password == conform_password) {
        const verfy_data = {
            "email": email,
            "otp": verfycationCode,
            "newPassword": conform_password
        }

        fetch(`https://api.freeprojectapi.com/api/UserApp/verify-otp-reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(verfy_data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });

    }

}

function updateOnClick() {

    let user_id = document.getElementById("us_id").value;

    let exitPassword = document.getElementById("epw_id").value;
    let newPassword = document.getElementById("npw_id").value;

    const pw_details = {
        "existingPassword": exitPassword,
        "newPassword": newPassword
    }

    fetch(`https://api.freeprojectapi.com/api/UserApp/update-password/${user_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pw_details)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.status);
        });

}

// function onClickGenarateToken() {

//     const user = localStorage.getItem("user");
//     const userJson = JSON.parse(user);

//     let token = document.getElementById("token_id").value;
//     let refreshToken = document.getElementById("refresh_token_id").value;

//     const token_data = {
//         "emailId": userJson.emailId,
//         "token": token,
//         "refreshToken": refreshToken
//     }

//     fetch(`https://api.freeprojectapi.com/api/UserApp/refresh`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(token_data)
//     })
//         .then(response => response.json())
//         .then(data => {
//             if (result.data == true) {
//                 showAlert("success", data.message);
//             } else {
//                 showAlert("danger", data.message || "Genarate Token feiald.!");
//             }
//         });
// }

function onClickGenarateToken() {

    const user = JSON.parse(localStorage.getItem("user"));
    
    const token_data = {
        emailId: user.emailId,
        token: user.token,
        refreshToken: user.refreshToken
    };

    fetch("https://api.freeprojectapi.com/api/UserApp/refresh", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(token_data)
    })
        .then(response => response.json())
        .then(data => {            
            showAlert("success", data.message);
        })
        .catch(error => {
            console.error(error);
            showAlert("danger", "Something went wrong!");
        });
}

function setTokent() {
    const user = localStorage.getItem("user");
    const userJson = JSON.parse(user);

    document.getElementById("token_id").value = userJson.token;
    document.getElementById("refresh_token_id").value = userJson.refreshToken;
}

function showAlert(type, msg) {
    document.getElementById("new-user-alert").innerHTML = `<div class='alert alert-${type}'>${msg}</div>`;
    document.getElementById("token-alert").innerHTML = `<div class='alert alert-${type}'>${msg}</div>`;
}

function logUserEmailSet() {
    const user = localStorage.getItem("user");
    const userJson = JSON.parse(user);

    document.getElementById("log_User").innerHTML = userJson.emailId;
}