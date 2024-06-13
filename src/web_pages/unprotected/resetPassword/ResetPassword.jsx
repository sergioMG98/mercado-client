import "./ResetPassword.css";

export default function ResetPassword () {
    let url = document.URL?.split('resetPassword?');
    // condition mot de passe 
    let passwordPattern = `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$`;

    const resetPassword = async(e) => {
        e.preventDefault();

        const form = e.target.parentElement;
        console.log("->", form);
        // try {
        //     console.log("try", e.target);
        //     form = e.target;
        // } catch (error) {
        //     console.log("try", e.target.parentElement);
        //     form = e.target.parentElement;
        // }
        //console.log("form", form);
        const formData = new FormData(form);
        
        const firstPassword = formData.get('firstPassword');
        const secondPassword = formData.get('secondPassword');

        if (firstPassword == secondPassword) {

            if (firstPassword.match(passwordPattern)) {
                let options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "values": url[1],
                        "newPassword" : firstPassword
                    })
                }
    
                const response = await fetch('http://127.0.0.1:8000/api/resetPassword', options);
                const data = await response.json();
    
                alert(data.message);
            } else {
                alert(`the password is invalid
                        - between 8 and 16 characters,
                        - minimum one capital letter,
                        - minimum one number,
                        - one special character`
                    );
            }

        } else {
            alert ("Passwords are not the same.")
        }

    }

    return (
        <div className="resetPasswordPage">
            <form onSubmit={resetPassword} method="post">
                <h1>Password reset</h1>
                <div className="password-resetPasswordPage">
                    <input name="firstPassword" type="password" id="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$" required/>
                    <label htmlFor="password">new password</label>
                </div>

                <div className="password-resetPasswordPage">
                    <input name="secondPassword" type="password" id="passwordAgain" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$" required/>
                    <label htmlFor="passwordAgain">new password again</label>
                </div>

                <button onClick={resetPassword}>validate</button>
            </form>
        </div>
    )
}