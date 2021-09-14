import "./style.css";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Form = ({users, setUsers}) =>{
    const history = useHistory()
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const set = (ev, setState) =>{
        setState(ev.currentTarget.value)
    }

    const formRules = yup.object().shape({
        name: yup.string().required("Nome de usuário obrigatório"),
        fullName: yup.string().required("Nome completo obrigatório"),
        email: yup.string().required("Email obrigatório"),
        confirmEmail: yup.string().required("Confirme o email"),
        password: yup.string().required("Senha obrigatória"),
        confirmPassword: yup.string().required("Confirme a senha"),
        acceptTerms : yup.bool().oneOf([true], "É necessario concordar com os termos")
    });

    const { register, handleSubmit,
        formState: { errors } } = useForm({
            resolver: yupResolver(formRules)
        }) 

    const submit = (data) =>{
        if(data.email!==data.confirmEmail ||
           data.password!==data.confirmPassword){
            return false
        }
        setUsers([...users, {
            id: users.length,
            userName: data.name,
            fullName: data.fullName,
            email: data.email,
            password: data.password
        }])
        alert("Cadastrado com sucesso")
        history.push("/login")
    }

    return (
        <form className="Form" onSubmit={handleSubmit(submit)}>
            <div type="text" className="inputs">
                <input placeholder="Nome de usuário*" {...register("name")} />
                {errors.name?.message}
            </div>

            <div type="text" className="inputs">
                <input placeholder="Nome completo*" {...register("fullName")} />
                {errors.fullName?.message}
            </div>

            <div className="email">
                <div>
                    <div className="inputs">
                        <input type="email" placeholder="Endereço de Email*"
                        {...register("email")} onChange={ev => set(ev, setEmail)} />
                        {errors.email?.message}
                    </div>
                    <div className="inputs">
                        <input type="email" placeholder="Confirme seu Email*"
                        {...register("confirmEmail")}  onChange={ev => set(ev, setConfirmEmail)} />
                        {errors.confirmEmail?.message}
                    </div>
                </div>
                {(email!==confirmEmail)? <p>Emails não estão compatíveis</p>: <></>}
            </div>
            
            <div className="Password">
                <div className="password_container">
                    <div className="inputs">
                        <input type="password" placeholder="Senha*"
                        {...register("password")} onChange={ev => set(ev, setPassword)} />
                        {errors.password?.message}
                    </div>
                    <div className="inputs">
                        <input type="password" placeholder="Confirme sua senha*"
                        {...register("confirmPassword")} onChange={ev => set(ev, setConfirmPassword)} />
                        {errors.confirmPassword?.message}
                    </div>
                </div>
                {(password!==confirmPassword)? <p>As senhas não são compativeis"</p>: <></>}
            </div>

            <div className="CheckBox">
                <div className="row">
                    <input name="acceptTerms" type="checkbox" {...register("acceptTerms")} />
                    <label for="acceptTerms">Eu aceito os termos de uso da aplicação</label>
                </div>
                <p>{errors.acceptTerms?.message}</p>
            </div>

            <input className="Button" type="submit" value="CADASTRAR" />
            
            <p className="Link" onClick={()=> history.push('/login')}>
                Já possuí uma conta?
            </p>
        </form>
    )
}

export default Form;