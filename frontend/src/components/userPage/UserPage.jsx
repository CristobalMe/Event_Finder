import Header from '../header/Header'
import UserPageContent from './UserPageContent'

// To Do
// Re-design Userpage to fetch data here, to enable the implementation of the loading screen
const UserPage = ({ user }) => {
    const current_link = window.location.pathname
    const current_userId = current_link.split('/')[2]
    let isUser = false

    if (user.id == current_userId) isUser = true

    return (
        <div>
            <Header user={user} />

            {isUser && (
                <div className="flex items-center justify-center mt-[10rem]">
                    <UserPageContent user={user} />
                </div>
            )}

            {!isUser && (
                <div>
                    <h1 className="text-white mt-[10rem]">
                        This page is forbiden
                    </h1>
                </div>
            )}
        </div>
    )
}

export default UserPage
