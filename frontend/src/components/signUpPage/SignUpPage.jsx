import Header from '../header/Header'
import SignUpForm from './SignUpForm'

function SignUpPage({ user }) {
    return (
        <div>
            <Header user={user} />

            <div className="h-screen flex items-center justify-center mt-[6rem]">
                <SignUpForm />
            </div>
        </div>
    )
}

export default SignUpPage
