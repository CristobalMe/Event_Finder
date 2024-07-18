import LoginForm from './LoginForm'
import Header from '../header/Header'

function LoginPage({ user }) {
    return (
        <div>
            <Header user={user} />

            <div className="h-screen flex items-center justify-center">
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage
