import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import "./Login.css";


export default function Login(params) {

    // condition pour le mot de passe
    let passwordPattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$";
    // condition email
    let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    let navigate = useNavigate();

    let btn_conditions_password;

    const conditionPasswordBtn = (btn) => {
        
        let registerBtn = document.querySelector('.password-conditions-container-register');
        let loginBtn = document.querySelector('.password-conditions-container-login')

        if(btn == btn_conditions_password) {
            registerBtn.classList.remove('active');
            loginBtn.classList.remove('active');
            btn_conditions_password = "";
        } else {
            if (btn == 'login') {
                loginBtn.classList.add('active');
                registerBtn.classList.remove('active');
                btn_conditions_password = btn;
            } else {
                registerBtn.classList.add('active');
                loginBtn.classList.remove('active');
                btn_conditions_password = btn;
            }
        }
        
    }

    // alterne les formulaires
    const changeForm = async(buttonValue) => {
        const loginForm = document.querySelector('.formLogin');
        const registerForm = document.querySelector('.formRegister');

        if (buttonValue == "login") {
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
        } else {
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        }
    }
    
    // login 
    const loginRequest = async(e) => {
        e.preventDefault();
        const form = e.target;
        const elements = form.elements;
        
        const email = elements.emailLogin.value;
        const password = elements.passwordLogin.value;
        // verifie si l'email respect les conditions
        if (email.match(emailPattern)) {
            // verifie si le mot de passe rescpect les condition 
            if(password.match(passwordPattern)){
                
                try {

                    let options = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email,
                            password
                        }),
                    }


                    const response = await fetch(`http://127.0.0.1:8000/api/login`, options);
                    const data = await response.json();
                    console.log("reponse login", data);

                    alert(data.message);
                    if (data.status == true) {
                        localStorage.setItem('TokenUserMercado', data.token);

                        navigate(data.link)                        
                    }
                    
                    // reset form
                    form.reset();

                } catch (error) {
                    alert(`problem when connecting ${error}`)
                }
                

            } else {
                alert(`the password is invalid
                    - between 8 and 16 characters,
                    - minimum one capital letter,
                    - minimum one number,
                    - one special character
                `)
            }

        } else {
            alert(`the email ${email} is invalid! \n 
            email valid => exemple@gmail.com`)
        }


    }
    // register
    const registerRequest = async(e) => {
        e.preventDefault();
        const form = e.target;
        const elements = form.elements;
        
        //const email = elements.emailRegister.value;
        //const password = elements.passwordRegister.value;
        //const confirmationPassword = elements.confirmationPasswordRegister.value;

        // ou 
        const formData = new FormData(form);

        const email = formData.get("emailRegister");
        const password = formData.get("passwordRegister");
        const confirmationPassword = formData.get("confirmationPasswordRegister");
        
        // verifie l'email
        if (email.match(emailPattern)) {
            // verifie les mot de passe
            if (password.match(passwordPattern) && password == confirmationPassword) {
                
                try {
                    let options = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email,
                            password
                        }),
                    }

                    const response = await fetch(`http://127.0.0.1:8000/api/register`, options);
                    const data = await response.json();
                    console.log("register", data);
                    alert(data.message);

                    if (data.status == true) {
                        localStorage.setItem("TokenUserMercado",data.token);
                    }

                    form.reset();

                } catch (error) {
                    alert(`problem during registration`);
                }

                
            } else {
                if (password != confirmationPassword) {
                    alert(`passwords do not match`);
                } else {
                    alert(`the password is invalid
                        - between 8 and 16 characters,
                        - minimum one capital letter,
                        - minimum one number,
                        - one special character`
                    );
                }

                
            }

        } else {
            alert(`the email ${email} is invalid! \n 
            email valid => exemple@gmail.com`)
        }

        
    }

    return (
        <div className="login-page page-unprotected">
            <header>
                <nav className="navbar-container">
                    <Navbar/>
                </nav>
            </header>

            <section className="sectionLogin">
                <div className="formLogin active">
                    <h1>Login</h1>
                    <form onSubmit={loginRequest}>
                        <div className="emailLogin loginPageInput">
                            <input type="email" name="emailLogin" id="emailLogin" placeholder="exemple@gmail.com" required/>
                            <label htmlFor="emailLogin">email</label>
                        </div>

                        <div className="passwordLogin loginPageInput">
                            <input type="password" name="passwordLogin" id="passwordLogin" placeholder="exemple: azerty" required/>
                            <label htmlFor="passwordLogin">password</label>
                        </div>

                        <button type="submit" >log in</button>
                    </form>
                    <p onClick={() => changeForm('login')}>create an account</p>

                    <button type="button" className="conditions-password-login" onClick={() => conditionPasswordBtn('login')}>password conditions</button>
                    <div className="password-conditions-container-login">
                        <ul>
                            <li>between 8 and 16 characters</li>
                            <li>minimum one capital letter</li>
                            <li>minimum one number</li>
                            <li>one special character</li>
                        </ul>
                    </div>
                </div>

                <div className="formRegister">
                    <h1>create an account</h1>
                    <form onSubmit={registerRequest}>
                        <div className="emailRegister loginPageInput">
                            <input type="email" name="emailRegister" id="emailRegister" required/>
                            <label htmlFor="emailRegister">email</label>
                        </div>
                        <div className="passwordRegister loginPageInput">
                            <input type="password" name="passwordRegister" id="passwordRegister" required/>
                            <label htmlFor="passwordRegister">password</label>
                        </div>
                        <div className="confirmationPasswordRegister loginPageInput">
                            <input type="password" name="confirmationPasswordRegister" id="confirmationPasswordRegister" required/>
                            <label htmlFor="confirmationPasswordRegister"> confirmation password</label>
                        </div>

                        <button type="submit">create account</button>
                    </form>
                    <p onClick={() => changeForm('register')}>I already have an account</p>

                    <button type="button" className="conditions-password-register" onClick={() => conditionPasswordBtn('register')}>password conditions</button>
                    <div className="password-conditions-container-register">
                        <ul>
                            <li>between 8 and 16 characters</li>
                            <li>minimum one capital letter</li>
                            <li>minimum one number</li>
                            <li>one special character</li>
                        </ul>
                    </div>
                </div>

                
            </section>
        </div>
    )
}
