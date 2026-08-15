function OnclickNewUser(){

    let u_id = document.getElementById("u_id").value;
    let u_email = document.getElementById("u_email").value;
    let u_fulln = document.getElementById("u_fulln").value;
    let u_pw = document.getElementById("u_pw").value;

    let user = {
        "userId": u_id,
        "emailId": u_email,
        "fullName": u_fulln,
        "password": u_pw
    }

    
}