import { useEffect, useState } from "react";
import NavbarAccount from "../../../../components/navbarAccount/NavbarAccount";
import "./CategoriesAdmin.css";

export default function CategoriesAdmin() {
    const [count, setCount] = useState(0);
    const [categories, setCategories] = useState()
    let formStatus = false;

    // fait apparaitre le formulaire 
    const newCategoryForm = () => {
        let form = document.querySelector('.addCategory-form');

        if (formStatus == false) {
            form.classList.add('active');
            formStatus = true;
        } else {
            form.classList.remove('active');
            formStatus = false;
        }
    }

    // ajouter une nouvelle catégorie
    const addCategory = async(e) => {
        e.preventDefault();
        const form = e.target;

        const formData = new FormData(form);
        const newCategory = formData.get('newCategory');

        try {
            let options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "category" : newCategory.toLowerCase()
                }),
            }

            const response = await fetch(`http://127.0.0.1:8000/api/addCategory`, options);
            const data = await response.json();

            alert(data.message);

            if(data.status == true) {
                // ferme le formulaire
                newCategoryForm(),
                // rest l'input
                form.reset()
                
                setCount(count == 3 ? 0 : count + 1);
                
            }
            

        } catch (error) {
            alert(`problem when creating the category`)
        }

    }

    // recupere les categories
    const getCategories = async() => {
        
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/getCategories`);
            const data = await response.json();
            
            let categories = data.categories;

            // met dans l'ordre alphabetique
            categories.sort(function(a, b){
                if (a[0] < b[0]) {
                    return -1;
                }
                if (a[0] > b[0]) {
                    return 1;
                }
                return 0
            })

            setCategories(categories)
           
        } catch (error) {
            alert(`problem when retrieving categories`);
        }

    }

    // delete category 
    const deleteCategory = async(category) => {
        try {
            let options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "category" : category.toLowerCase()
                }),
            }

            const response = await fetch(`http://127.0.0.1:8000/api/deleteCategory`, options);
            const data = await response.json();

            if (data.status == true) {
                setCount(count == 3 ? 0 : count + 1);
            }

        } catch (error) {
            alert('problem when deleting the category')
        }
    }

    useEffect(() => {
        getCategories();
    }, [count])
    return (
        <div className="admin-categories">
            <header>
                <nav>
                    <NavbarAccount/>
                </nav>
            </header>

            <section className="section-categories-admin">
                <div className="header-section">
                    <h1>categories</h1>
                    <button type="button" className="addCategory" onClick={newCategoryForm} >add category</button>
                    <form onSubmit={addCategory} method="post" className="addCategory-form">
                        <div className="newCategory-container">
                            <input type="text" name="newCategory" id="newCategory" required/>
                            <label htmlFor="newCategory"> new category</label>
                        </div>

                        <button type="submit">validated</button>
                    </form>
                </div>
                <div className="section-categories-container" >
                    <div className="bar-namValue-container">
                        <ul>
                            <li>category</li>
                            <li>numbers of products</li>
                            <li>delete</li>
                        </ul>
                    </div>
                    <div className="categories-container-admin">
                        <ul>
                            {categories?.map(element => {
                                /* console.log("ele", element[0]); */
                                return(
                                    <li>
                                        <div className="categories-element-admin-category">{element[0]}</div>
                                        <div className="categories-element-admin-number">{element[1]}</div> 
                                        <div className="categories-element-admin-btn">
                                            <button onClick={() => deleteCategory(element[0])}>delete</button>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                        
                    </div>
                </div>
            </section>
        </div>
    )
}