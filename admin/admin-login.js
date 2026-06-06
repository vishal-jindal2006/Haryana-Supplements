console.log("LOGIN JS LOADED");

const loginBtn =
document.getElementById(
    "adminLoginBtn"
);

loginBtn.addEventListener(

    "click",

    async () => {

        const username =
        document.getElementById(
            "adminUsername"
        ).value;

        const password =
        document.getElementById(
            "adminPassword"
        ).value;

        try{

            const res =
            await fetch(

                "https://haryana-supplements-api.onrender.com/api/auth/login",

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                        "application/json"

                    },

                    body: JSON.stringify({

                        username,
                        password

                    })

                }

            );

            const data =
            await res.json();

            if(!data.success){

                document.getElementById(
                    "loginError"
                ).innerText =

                data.message;

                return;

            }

            // SAVE SESSION

            localStorage.setItem(

                "loggedInUser",

                JSON.stringify(data)

            );

            // OWNER

            if(
                data.role === "owner"
            ){

                window.location.href =
                "./owner-dashboard.html";

            }

            // ADMIN

            else{

                window.location.href =
                "./owner-dashboard.html";

                // Later:
                // admin-dashboard.html

            }

        }

        catch(error){

            console.log(error);

            document.getElementById(
                "loginError"
            ).innerText =

            "Server Error";

        }

    }

);