import { Outlet } from "react-router-dom";
import { Button } from "antd-mobile";

const Layout=()=>{
    return (<div>
        <Outlet />
        <div>我是layout</div>
        <Button color="primary">按钮</Button>
        </div>
    )
}

export default Layout;