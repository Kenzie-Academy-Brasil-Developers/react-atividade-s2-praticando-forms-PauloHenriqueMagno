import { useParams } from "react-router";
import "./style.css"

const User = ({ users }) =>{
    const params = useParams()
    const member = users.filter(object => object.id === Number(params.id))[0]

    return (
        <section className="User_section">
            <h2>Olá, {member.userName}</h2>
            <p>Nome completo: {member.fullName}</p>
            <p>Nome de usuário: {member.userName}</p>
            <p>Email: {member.email}</p>
            <p>Id: {member.id}</p>
            <p>Senha: {member.password}</p>
        </section>
    )
}

export default User;