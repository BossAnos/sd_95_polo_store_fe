import React from "react";
import { Link } from "react-router-dom";
import iconHome from "../../assets/icon/home.svg";
import iconAccount from "../../assets/icon/user.svg";
import iconDataset from "../../assets/icon/gallery.svg";
import iconLabeling from "../../assets/icon/tag.svg";
import iconTraning from "../../assets/icon/briefcase.svg";
import iconModel from "../../assets/icon/award.svg";
import avatar from "../../assets/image/avatar.svg";

const Sidebar = () => {
    return (
        <>
            <div className="max-w-[290px] bg-black h-screen text-white flex flex-col justify-between">
                <div className="p-6 flex flex-col justify-start items-start space-y-6 font-semibold">
                    <Link to="/">
                        <div className="flex justify-center space-x-4">
                            <img src={iconHome} alt="" />
                            <p>Dashboard</p>
                        </div>
                    </Link>
                    <Link to="/account">
                        <div className="flex justify-center space-x-4">
                            <img src={iconAccount} alt="" />
                            <p>Account Management</p>
                        </div>
                    </Link>
                    <Link to="/dataset">
                        <div className="flex justify-center space-x-4">
                            <img src={iconDataset} alt="" />
                            <p>Dataset Management</p>
                        </div>
                    </Link>
                    <Link to="/labeling">
                        <div className="flex justify-center space-x-4">
                            <img src={iconLabeling} alt="" />
                            <p>Labeling Management</p>
                        </div>
                    </Link>
                    <Link to="/training">
                        <div className="flex justify-center space-x-4">
                            <img src={iconTraning} alt="" />
                            <p>Training Management</p>
                        </div>
                    </Link>
                    <Link to="/model">
                        <div className="flex justify-center space-x-4">
                            <img src={iconModel} alt="" />
                            <p>Model Management</p>
                        </div>
                    </Link>
                </div>
                <div className="bg-[#2B2B2B] h-[60px] py-2 px-6 flex items-center space-x-4">
                    <img src={avatar} alt="" />
                    <p className="font-semibold">Thành Hưng</p>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
