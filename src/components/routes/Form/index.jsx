import "./style.css";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from "react-router-dom";

const Form = ({users, setUsers}) =>{
    const history = useHistory()

    const regex = /^.*(?=.{4})((?=.*[^0-9A-Za-z]){1})(?=.*[0-9])((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/

    const formRules = yup.object().shape({
        name: yup.string().required("Nome de usuário obrigatório"),
        fullName: yup.string().required("Nome completo obrigatório"),
        email: yup.string().email("Email obrigatório").required("Email obrigatório"),
        confirmEmail:  yup.string().oneOf([yup.ref("email")], "Emails não são iguais").required('Confirme o email'),
        password: yup.string().required("Senha obrigatória").matches(regex,
            "A senha deve conter pelo menos: Uma letra maiúscula, uma letra minuscula, um numero e uma caracter especial"
        ),
        confirmPassword: yup.string().oneOf([yup.ref("password")], "Senhas não são iguais").required("Confirme a senha"),
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
        if(users.some(e => e.userName===data.name)){
            alert("Este nome de usuário já está sendo usado");
            return false
        }
        if(users.some(e => e.email===data.email)){
            alert("Este email já está sendo usado");
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
                        {...register("email")} />
                        {errors.email?.message}
                    </div>
                    <div className="inputs">
                        <input type="email" placeholder="Confirme seu Email*"
                        {...register("confirmEmail")} />
                        {errors.confirmEmail?.message}
                    </div>
                </div>
            </div>
            
            <div className="Password">
                <div className="password_container">
                    <div className="inputs">
                        <input type="password" placeholder="Senha*"
                        {...register("password")} />
                        {errors.password?.message}
                    </div>
                    <div className="inputs">
                        <input type="password" placeholder="Confirme sua senha*"
                        {...register("confirmPassword")} />
                        {errors.confirmPassword?.message}
                    </div>
                </div>
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
                Já possui uma conta?
            </p>
        </form>
    )
}

export default Form;