import { Outlet } from "react-router-dom";
import { Button } from "antd-mobile";
import { useEffect } from "react";
import { getBillList } from "@/store/modules/billStore";
import { useDispatch } from "react-redux";

const Layout=()=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getBillList())
    },[dispatch])
    return (
    <div>
        <Outlet />
        <div>我是layout</div>
        <Button color="primary">按钮</Button>
    </div>
    )
}

export default Layout;