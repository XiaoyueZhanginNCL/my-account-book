import { Outlet } from "react-router-dom";

const Layout=()=>{
    return (<div>
        <Outlet />
        <div>我是layout</div>
        </div>
    )
}

export default Layout;