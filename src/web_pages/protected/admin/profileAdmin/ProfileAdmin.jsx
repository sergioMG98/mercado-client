import NavbarAccount from "../../../../components/navbarAccount/NavbarAccount";
import { useEffect, useState } from "react"

export default function ProfileAdmin() {
    let token = localStorage.getItem('TokenUserMercado');

    // condition pour le mot de passe
    let passwordPattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$";
    // condition email
    let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    const [profileData, setProfileData] = useState();

    const [lastname, setLastname] = useState();
    const [firstname, setFirstname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    // obtient les informations du profil
    const getProfileData = async() => {
        let options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = await fetch("http://127.0.0.1:8000/api/getProfileData", options);
        const data = await response.json();

        /* console.log("data profile", data); */
        if (data.status == true) {
            setProfileData(data.values)
        }
    }
    // modifie le profil
    const updateProfile = async(e) => {
        e.preventDefault();
        
        const form = e.target;

        const formData = new FormData(form);
        const lastname = formData.get('lastnameProfile');
        const firstname = formData.get('firstnameProfile');
        const email = formData.get('emailProfile');
        const password = formData.get('passwordProfile')


        if (email.match(emailPattern)) {
            if (password.length != 0) {
                if (password.match(passwordPattern)) {
                    let options = {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            "id" : profileData.id,
                            "email" : email != null ? email : profileData.email,
                            "lastname": lastname != null ? lastname : profileData.lastname,
                            "firstname": firstname != null ? firstname : profileData.firstname,
                            "password" : password != null ? password : null,
                        })
    
                    }
    
                    try {
                        const response = await fetch('http://127.0.0.1:8000/api/updateProfile', options);
                        const data = await response.json();

                        alert(data.message);

                    } catch (error) {
                        alert("error when updating profile")
                    }
                } else {
                    alert(`the password is invalid
                            - between 8 and 16 characters,
                            - minimum one capital letter,
                            - minimum one number,
                            - one special character`
                        );
                }
            } else {
                
                let options = {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        "id" : profileData.id,
                        "email" : email != null ? email : profileData.email,
                        "lastname": lastname != null ? lastname : profileData.lastname,
                        "firstname": firstname != null ? firstname : profileData.firstname,
                        "password" : password != null ? password : null,
                    })

                }

                try {
                    const response = await fetch('http://127.0.0.1:8000/api/updateProfile', options);
                    const data = await response.json();

                    alert(data.message);

                } catch (error) {
                    alert("error when updating profile")
                }
                
            }         
        } else {
            alert(`the email ${email} is invalid! \n 
            email valid => exemple@gmail.com`)
        }

    }
    // change les informations de la personne
    const changeValue = (e, key) => {
        let newProfileData = profileData;

        switch (key) {
            case 'lastname':
                newProfileData.lastname = e.target.value
                break;

            case 'firstname':
                newProfileData.firstname = e.target.value
                break;

            case 'email':
                 newProfileData.email = e.target.value
                break;

            case 'password':
                newProfileData.password = e.target.value
                break;
        
            default:
                break;
        }

        setFirstname(newProfileData.firstname);
        setLastname(newProfileData.lastname);
        setEmail(newProfileData.email);
        setPassword(newProfileData.password);

        setProfileData(newProfileData);
    }

    useEffect(() => {
        getProfileData();
    }, []);
    
    return (
        <div className="profileAdmin">
            <header className="header-navbarContainer-profileCustomer">
                <nav>
                    <NavbarAccount/>
                </nav>
            </header>

            <section className="section-contentContainer-profileCustomer">
                <form onSubmit={updateProfile} method="post" className="form-profileCustomer">
                    <div className="inputContainer-form-profileCustomer">
                        <input type="text" name="lastnameProfile" id="lastnameProfile" value={profileData?.lastname} onChange={(e) => changeValue(e, "lastname")} required/>
                        <label htmlFor="lastnameProfile">lastname</label>
                    </div>

                    <div className="inputContainer-form-profileCustomer">
                        <input type="text" name="firstnameProfile" id="firstnameProfile" value={profileData?.firstname} onChange={(e) => changeValue(e, "firstname")} required/>
                        <label htmlFor="firstnameProfile">firstname</label>
                    </div>

                    <div className="inputContainer-form-profileCustomer">
                        <input type="email" name="emailProfile" id="emailProfile" value={profileData?.email} onChange={(e) => changeValue(e, "email")} required/>
                        <label htmlFor="emailProfile">email</label>
                    </div>

                    <div className="inputContainer-form-profileCustomer">
                        <input type="password" name="passwordProfile" id="passwordProfile" value={profileData?.password} onChange={(e) => changeValue(e, "password")} />
                        <label htmlFor="passwordProfile">password</label>
                    </div>

                    <button type="submit">validate</button>
                </form>
            </section>

        </div>
    )
}