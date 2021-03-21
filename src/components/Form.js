import React, { useState, useEffect } from "react"
import axios from "axios"
import * as yup from "yup"
import styled from "styled-components"

const StyledForm = styled.form`
border: 1px black solid;
display: flex;
flex-direction: column;
text-align: center;
background-color: red;
width: 80%;
margin: 0 auto;

div {
    padding: 20px 0;
}

button {
    font-size: 20px;
    padding: 10px 25px;
    border: 3px solid black;
    box-shadow: 2px 2px 5px black;
}
`

const schema = yup.object().shape({
    name: yup.string().trim().required("Name is required").min(2, "Must be at least 2 characters long."),
    size: yup.string().trim().required("Size is required."),
    pepperoni: yup.boolean(),
    mushrooms: yup.boolean(),
    onions: yup.boolean(),
    sausage: yup.boolean(),
    instructions: yup.string().trim()
})

const Form = () => {
    
    const [orders, setOrders] = useState([])
    const [disabled, setDisabled] = useState(true)

    const [ form, setForm ] = useState({
        name: "",
        size: "",
        pepperoni: false,
        mushrooms: false,
        onions: false,
        sausage: false,
        instructions: ""
     })

     const [ errors, setErrors] = useState({
        name: "",
        size: "",
        pepperoni: "",
        mushrooms: "",
        onions: "",
        sausage: "",
        instructions: ""

     })

     const setFormErrors = (name, value) => {
         yup.reach(schema, name).validate(value)
            .then(() => setErrors({...errors, [name]: ""}))
            .catch(err => setErrors({...errors, [name]: err.errors[0]}))
     }

     const changeHandler = event => {
        const { checked, value, name, type } = event.target
        const valueToUse = type === "checkbox" ? checked : value
        setFormErrors(name, valueToUse)
        setForm({ ...form, [name]: valueToUse })
     }

     const handleSubmit = event => {
        event.preventDefault();
        const newOrder = {
            name: form.name,
            size: form.size,
            pepperoni: form.pepperoni,
            mushrooms: form.mushrooms,
            onions: form.onions,
            sausage: form.sausage,
            instructions: form.instructions            
        }
    
        axios.post("https://reqres.in/api/users", newOrder)
             .then(res => {
                setOrders(...orders, res.data)
                setForm({
                    name: "",
                    size: "",
                    pepperoni: false,
                    mushrooms: false,
                    onions: false,
                    sausage: false,
                    instructions: ""
                })
             })
             .catch(err => console.log(err.res))
     }

     useEffect(() => {
         schema.isValid(form).then(valid => setDisabled(!valid))
     }, [form])

    return (
        <StyledForm onSubmit={handleSubmit}>

            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter name here"
                    onChange={changeHandler}
                    value={form.name}
                />
            </div>

            <div>
                <label>Pizza Size: </label>
                <select
                    name="size"
                    onChange={changeHandler}
                >
                    <option value="">--Select a size--</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="extralarge">Extra Large</option>
                </select>
            </div>

            <div>
                <input
                    type="checkbox"
                    name="pepperoni"
                    checked={form.pepperoni}
                    onChange={changeHandler}
                />
    
                <label>
                    Pepperoni
                </label>
            </div>

            <div>
                <input
                    type="checkbox"
                    name="mushrooms"
                    checked={form.mushrooms}
                    onChange={changeHandler}
                />

                <label>
                    Mushrooms
                </label>
            </div>

            <div>
                <input
                    type="checkbox"
                    name="onions"
                    checked={form.onions}
                    onChange={changeHandler}
                />
            
                <label>
                    Onions
                </label>
            </div>
                
            <div>
                <input
                    type="checkbox"
                    name="sausage"
                    checked={form.sausage}
                    onChange={changeHandler}
                />

                <label>
                    Sausage
                </label>
            </div>

            <div>
                <textarea
                    rows={5}
                    cols={50}
                    placeholder="Enter special instructions here"
                    type="text"
                    onChange={changeHandler}
                    value={form.instructions}
                    name="instructions"
                / >
            </div>

            <div>
                <button
                    type="submit"
                   disabled={disabled}
                >
                   Submit Order
                </button>
            </div>

        </StyledForm>
    )
}

export default Form