import { useParams } from "react-router";
import { useHistory } from "react-router"
import "./style.css"

const User = ({ users, isLogged, setIsLogged}) =>{
    const params = useParams();
    const history = useHistory();
    const member = users.filter(object => object.id === Number(params.id))[0]

    if(isLogged){
        return (
            <section className="User_section">
                <h2>Olá, {member.userName}</h2>
                <p>Nome completo: {member.fullName}</p>
                <p>Nome de usuário: {member.userName}</p>
                <p>Email: {member.email}</p>
                <p>Id: {member.id}</p>
                <p>Senha: {member.password}</p>

                <button className="logOut" onClick={()=> {setIsLogged(false); history.push("/login")}}>
                    Sair
                </button>
            </section>
        )
    }
}

export default User;