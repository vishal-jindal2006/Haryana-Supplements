// Login Button

const loginBtn = document.getElementById("loginBtn");


// Demo Accounts

const users = [

    {
        email: "owner@haryanasupplements.com",
        password: "owner123",
        role: "owner"
    },

    {
        email: "admin@haryanasupplements.com",
        password: "admin123",
        role: "admin"
    }

];


// Login System

loginBtn.addEventListener("click", () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check User

    const user = users.find(user =>
        user.email === email &&
        user.password === password
    );

    // Success Login

    if(user){

        // Save Login

        localStorage.setItem("role", user.role);

        // Owner Access

        if(user.role === "owner"){

            alert("Welcome Owner 👑");

            window.location.href = "owner-dashboard.html";

        }

        // Admin Access

        else if(user.role === "admin"){

            alert("Welcome Admin 🛠️");

            window.location.href = "admin-dashboard.html";

        }

    }

    // Wrong Credentials

    else{

        alert("Invalid Email Or Password!");

    }

});

// =========================
// SIDEBAR FUNCTIONS
// =========================

function scrollToSection(id){

    document.getElementById(id)

    .scrollIntoView({

        behavior: "smooth"

    });

}


// LOGOUT

function logoutAdmin(){

    window.location.href =
    "admin-login.html";

}