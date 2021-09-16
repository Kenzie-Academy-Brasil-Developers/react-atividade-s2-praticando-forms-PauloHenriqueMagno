import "./style.css"
import { useHistory } from "react-router";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

const Login = ({users, setIsLogged}) =>{
    const history = useHistory();

    const formSchema = yup.object().shape({
        name_email: yup.string().required("Nome ou email invalidos"),
        password: yup.string().required("Senha incorreta"),
    });

    const submit = (data) =>{
        const index = users.findIndex(item=>{
            return (
                (item.userName === data.name_email||
                item.email === data.name_email)&&
                item.password === data.password
            )
        })
        if(index===-1){
            return alert("Usuário não encontrado")
        }

        const user = users[index];
        setIsLogged(true);
        history.push(`/user/${user.id}`)
    };

    const { register, handleSubmit,
        formState: { errors } } = useForm({
            resolver: yupResolver(formSchema)
        });

    return (
        <form className="Form_login" onSubmit={handleSubmit(submit)}>
            <h2>Fazer login</h2>
            <input type="text" placeholder="Nome de usuário ou email" {...register("name_email")} />
            <input type="password" placeholder="Senha" {...register("password")} />
            {errors.name_email?.message||errors.password?.message}
            <input className="Button Button_login" type="submit" value="Entrar" />
            <p className="Link Link_login" onClick={()=> history.push("/")}>
                Fazer cadastro
            </p>
        </form>
    )
}

export default Login;