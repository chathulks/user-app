function OnclickNewUser() {

    let u_id = document.getElementById("u_id").value;
    let u_email = document.getElementById("u_email").value;
    let u_fulln = document.getElementById("u_fulln").value;
    let u_pw = document.getElementById("u_pw").value;

    if (u_id == "") {
        showAlert("new-user-alert", "danger", "Please Enter User ID.");
    } else if (u_email == "") {
        showAlert("new-user-alert", "danger", "Please Enter Email.");
    } else if (u_fulln == "") {
        showAlert("new-user-alert", "danger", "Please Enter Full Name.");
    } else if (u_pw == "") {
        showAlert("new-user-alert", "danger", "Please Enter Password.");
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
                    showAlert("new-user-alert", "success", data.message);
                } else {
                    showAlert("new-user-alert", "danger", data.message);
                }
            })
            .catch(error => {
                console.error(error);
                showAlert("new-user-alert", "danger", "Something went wrong!");
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

                showAlert("sign-in-alert", "success", data.message);
            } else {
                showAlert("sign-in-alert", "danger", data.title);
            }
        });
}

function onClickResetPassword() {

    let email = document.getElementById("email-address").value;
    let your_email_setSpan = document.getElementById("your-email");

    if (email == "") {
        showAlert("forget-pw-modal", "danger", "Please Enter Your Email.");
    } else if (email !== "") {
        fetch(`https://api.freeprojectapi.com/api/UserApp/send-reset-otp?emailId=${email}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(null)
        })
            .then(response => response.json())
            .then(data => {

                showAlert("forget-pw-modal", "success", data.message);

                localStorage.setItem("useEmail", email);

                document.getElementById("email-address").value = "";

                const modal = new bootstrap.Modal(
                    document.getElementById("modal-2")
                );

                modal.show();

                const modalElement = document.getElementById("modal-1");
                const modal_one = bootstrap.Modal.getInstance(modalElement);
                modal_one.hide();

            })
            .catch(error => {
                console.error(error);
                showAlert("token-alert", "danger", "Something went wrong!");
            });

        your_email_setSpan.innerHTML = email;
    }

}

function onclickOTPcheck() {

    let vc_1 = document.getElementById("vc_1").value;
    let vc_2 = document.getElementById("vc_2").value;
    let vc_3 = document.getElementById("vc_3").value;
    let vc_4 = document.getElementById("vc_4").value;
    let vc_5 = document.getElementById("vc_5").value;
    let vc_6 = document.getElementById("vc_6").value;

    if (vc_1 == "") {
        showAlert("otp-check", "danger", "Please Enter First Value.");
    } else if (vc_2 == "") {
        showAlert("otp-check", "danger", "Please Enter Second Value.");
    } else if (vc_3 == "") {
        showAlert("otp-check", "danger", "Please Enter Thrird Value.");
    } else if (vc_4 == "") {
        showAlert("otp-check", "danger", "Please Enter Four Value.");
    } else if (vc_5 == "") {
        showAlert("otp-check", "danger", "Please Enter Five Value.");
    } else if (vc_6 == "") {
        showAlert("otp-check", "danger", "Please Enter Six Value.");
    } else {
        let verfycationCode = vc_1 + "" + vc_2 + "" + vc_3 + "" + vc_4 + "" + vc_5 + "" + vc_6;

        localStorage.setItem("verifyCode", verfycationCode);

        const modal = new bootstrap.Modal(
            document.getElementById("modal-3")
        );

        modal.show();

        const modalElement = document.getElementById("modal-2");
        const modal_one = bootstrap.Modal.getInstance(modalElement);
        modal_one.hide();
    }
}

async function onClickOTPcode() {

    const useEmail = localStorage.getItem("useEmail");
    const verifyCode = localStorage.getItem("verifyCode");

    let password = document.getElementById("n_pw").value;
    let conform_password = document.getElementById("nc_pw").value;

    if (password == "") {
        showAlert("conform-password", "danger", "Please Enter Your Password.");
    } else if (conform_password == "") {
        showAlert("conform-password", "danger", "Please Enter Conform Password.");
    } else {
        if (password == conform_password) {

            const verfy_data = {
                "email": useEmail,
                "otp": verifyCode,
                "newPassword": conform_password
            }

            try {
                const res = await fetch(`https://api.freeprojectapi.com/api/UserApp/verify-otp-reset-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(verfy_data)
                })

                const result = await res.text();

                if (res.ok) {
                    showAlert("conform-password", "success", result);

                    document.getElementById("n_pw").value = "";
                    document.getElementById("nc_pw").value = "";

                    localStorage.clear();

                } else {
                    showAlert("conform-password", "danger", result);
                }

            } catch (error) {
                console.error(error);
                showAlert("conform-password", "danger", "Something went wrong!");
            }

        } else {
            showAlert("conform-password", "danger", "Your Password Not Same!.");
        }
    }

}

async function updateOnClick() {

    let user_id = document.getElementById("us_id").value;

    let exitPassword = document.getElementById("epw_id").value;
    let newPassword = document.getElementById("npw_id").value;

    if (user_id == "") {
        showAlert("update-password", "danger", "Please Enter User ID");
    } else if (exitPassword == "") {
        showAlert("update-password", "danger", "Please Enter Exit Password");
    } else if (newPassword == "") {
        showAlert("update-password", "danger", "Please Enter New Password");
    } else {
        const pw_details = {
            "existingPassword": exitPassword,
            "newPassword": newPassword
        }

        try {
            const res = await fetch(`https://api.freeprojectapi.com/api/UserApp/update-password/${user_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pw_details)
            })

            const result = await res.text();

            if (res.ok) {
                showAlert("update-password", "success", result);

                document.getElementById("us_id").value = "";
                document.getElementById("epw_id").value = "";
                document.getElementById("npw_id").value = "";
            } else {
                showAlert("update-password", "danger", result);
            }
        } catch (error) {
            console.error(error);
            showAlert("conform-password", "danger", "Something went wrong!");
        }
    }

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
            if (data.result == true) {
                showAlert("token-alert", "success", data.message);
            }
        })
        .catch(error => {
            console.error(error);
            showAlert("token-alert", "danger", "Something went wrong!");
        });
}

function setTokent() {
    const user = localStorage.getItem("user");
    const userJson = JSON.parse(user);

    document.getElementById("token_id").value = userJson.token;
    document.getElementById("refresh_token_id").value = userJson.refreshToken;
}

function showAlert(id, type, msg) {
    document.getElementById(`${id}`).innerHTML = `<div class='alert alert-${type}'>${msg}</div>`;
}

function logUserEmailSet() {
    const user = localStorage.getItem("user");
    const userJson = JSON.parse(user);

    document.getElementById("log_User").innerHTML = userJson.emailId;
}

function logOut() {
    localStorage.clear();
    window.location.href = "/index.html";
}