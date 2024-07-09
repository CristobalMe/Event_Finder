import Header from "../header/Header";
import UserPageContent from "./UserPageContent";

const UserPage = () => {
  const current_link = window.location.pathname;
  const current_userId = current_link.split("/")[2];
  let isUser = false;

  if (JSON.parse(localStorage.getItem("user")).id == current_userId) isUser=true;

  return (
    <div>
        <Header />

        {isUser && <div className="flex items-center justify-center mt-[10rem]"><UserPageContent /></div>}

        {!isUser && <div>
            <h1 className="text-white mt-[10rem]">This page is forbiden</h1>
        </div>}
    </div>
  );
};

export default UserPage;