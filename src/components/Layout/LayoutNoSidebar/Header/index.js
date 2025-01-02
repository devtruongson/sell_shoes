import axios from "axios";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { BiAlignLeft } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoBagHandle, IoClose, IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "~/components/Modal";
import { ChangePass, Login, SignUp } from "~/pages/auth";
import baseUrl from "~/utils/baseUrl";
import CartPopup from "./CartPopup";
import DetailPopup from "./DetailPopup";
import styles from "./Header.module.scss";
import SearchPopup from "./SearchPopup";
import SettingPopup from "./SettingPopup";

const cx = classNames.bind(styles);

function Header() {
    let [login, setLogin] = useState(false);
    let currentUser = useSelector((state) => state.auth.login.currentUser);
    const navigate = useNavigate();
    const overLay = useRef();
    const hideOverLay = () => {
        overLay.current.checked = false;
    };
    let cartProducts = useSelector((state) => state.user?.cart?.cartProducts);
    let cartProductsNonUser = useSelector(
        (state) => state.nonUser?.cart?.cartProductsNonUser
    );
    const [indexCategoryActive, setIndexCategoryActive] = useState(-1);
    const [showDetailPopUp, setShowDetailPopup] = useState(false);
    const [showSearchPopUp, setShowSearchPopup] = useState(false);
    const [showCartPopUp, setShowCartPopup] = useState(false);
    const [valueSearch, setValueSearch] = useState("");
    const [popup, setPopup] = useState("login");
    const [openSideBar, setOpenSidebar] = useState(true);

    const handleCategoryClick = (index) => {
        setShowDetailPopup(false);

        // Chuyển hướng đến trang collection
        navigate(`/collection/${categories[index].category}`);
    };
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const _fetch = async()=>{
            try {
                const res1 = await axios.get(`${baseUrl}/api/productCategory/getAllProductCaterogies`)
                const res2 = await axios.get(`${baseUrl}/api/productType/getAllProductType`);
                if (res1 && res1.data && res2 && res2.data) {
                    const list = res1.data.data.reduce((acc, cur) => {
                        let tmp = res2.data.data.filter(item => {
                            return item.productCategory === cur._id;
                        });
                     
                        return acc.concat({
                            productCategoryName: cur.productCategoryName,
                            productCategoryId: cur._id,
                            listProductType: [...tmp].map(item => ({ productTypeId: item._id, productTypeName: item.productTypeName }))
                        })
                    }, [])
                    setCategories(list);
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        _fetch();
    },[])

    const handleMouseOver = (index) => {
        setIndexCategoryActive(index);
        setShowDetailPopup(true);
    };
    const dispatch = useDispatch();

    const handleNav = (e) => {
        if (e === "login") setPopup("login");
        else if (e === "signup") setPopup("signup");
        else setPopup("forgot");
    };

    const handleCategoryClickUrl = (type) => {
        setOpenSidebar(false)
        navigate(`/collection/type=${type}`);
    };

    const [openedCategory, setOpenedCategory] = useState(null); // State to track which category is open

    const handleCategoryClickOutSide = (categoryIndex) => {
        // Toggle the category open/close
        setOpenedCategory(prevIndex => prevIndex === categoryIndex ? null : categoryIndex);
    };
    
    return (
        <div className={cx("wrapper")}>
            <Modal visible={login} setModal={setLogin}>
                {popup === "login" ? (
                    <Login navSignup={handleNav} navForgot={handleNav} />
                ) : popup === "signup" ? (
                    <SignUp navLogin={handleNav} />
                ) : (
                    <ChangePass navLogin={handleNav} />
                )}
            </Modal>

            {openSideBar ? (
                <BiAlignLeft
                    onClick={() => setOpenSidebar(!openSideBar)}
                    className={cx("icon-menu")}
                />
            ) : (
                <>
                    <div
                        onClick={() => setOpenSidebar(!openSideBar)}
                        className={cx("overlay-sidebar", {
                            active: !openSideBar,
                        })}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className={cx("sidebar-wrapper")}
                        >
                            <IoClose
                                onClick={() => setOpenSidebar(!openSideBar)}
                                className={cx("icon-close")}
                            />
                            <div className={cx("list-categorys")}>
            {categories.map((item, index) => {
                return (
                    <div
                        key={index}
                        className={cx("item-list-category")}
                    >
                        <strong 
                            style={{ fontSize: 16 }}
                            onClick={() => handleCategoryClickOutSide(index)} // Handle category click
                        >
                            {item.productCategoryName}
                        </strong>
                        {openedCategory === index && ( // Show item list only if the category is open
                            <ul className={cx("")}>
                                {item.listProductType.map((itemChild, index) => {
                                    return (
                                        <li
                                            key={index}
                                            onClick={() => {
                                                handleCategoryClickUrl(itemChild.productTypeName);
                                                setOpenSidebar(true);
                                            }}
                                        >
                                            {itemChild.productTypeName}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                );
            })}
        </div>
                        </div>
                    </div>
                </>
            )}

            <a href="/" className={cx("logo-wrapper")}>
                <div>SHOP</div>
                <div className={cx("child2")}>APP</div>
            </a>

            <div className={cx("container-middle")}>
                <div
                    onMouseLeave={() => setShowDetailPopup(false)}
                    className={cx("categories")}
                >
                    {
                        <>
                            <div className={cx("item-category")}>Tất cả</div>

                            {categories.map((item, index) => {
                                return (
                                    <div
                                        onMouseOver={() =>
                                            handleMouseOver(index)
                                        }
                                        // onClick={() =>
                                        //     handleCategoryClick(index)
                                        // }
                                        className={cx("item-category")}
                                    >
                                        <strong style={{fontSize: 16}}>{item.productCategoryName}</strong>
                                    </div>
                                );
                            })}
                        </>
                    }
                    {showDetailPopUp && (
                        <DetailPopup
                            category={categories[indexCategoryActive]}
                            onMouseLeave={() => setShowDetailPopup(false)}
                        />
                    )}
                </div>

                <div
                    onMouseLeave={() => setShowSearchPopup(false)}
                    className={cx("search-wrapper")}
                >
                    <div className={cx("search")}>
                        <div style={{ padding: "0 12px", cursor: "pointer" }}>
                            <IoSearch
                                style={{ color: "#000", fontSize: "24px" }}
                            />
                        </div>
                        <div className={cx("input-wrapper")}>
                            <input
                                onClick={() =>
                                    setShowSearchPopup((prev) => !prev)
                                }
                                onChange={(e) => {
                                    setValueSearch(e.target.value);
                                    console.log(e);
                                }}
                                className={cx("input-search")}
                                type="text"
                                value={valueSearch}
                                placeholder="Tìm kiếm"
                            />
                        </div>
                        <div
                            onClick={() => setValueSearch("")}
                            style={{ padding: "0 12px", cursor: "pointer" }}
                        >
                            <IoMdClose
                                style={{ color: "#000", fontSize: "24px" }}
                            />
                        </div>
                        {showSearchPopUp && (
                            <SearchPopup
                                searchKey={valueSearch}
                                onMouseLeave={() => setShowSearchPopup(false)}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className={cx("user")}>
                <input
                    ref={overLay}
                    type="checkbox"
                    hidden
                    className={cx("main__header-navBar-hide-open")}
                    id={cx("main__header-navBar-hide-open")}
                />
                <div className={cx("main__header-navBar")}>
                    <SettingPopup closeBtn={hideOverLay} />
                </div>
                <label
                    for={cx("main__header-navBar-hide-open")}
                    className={cx("main__header-navbar-overlay")}
                ></label>
                <label
                    for={cx(currentUser ? "main__header-navBar-hide-open" : "")}
                >
                    <div
                        onClick={() => {
                            !currentUser && setLogin(true);
                        }}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            cursor: "pointer",
                        }}
                    >
                        <div style={{ cursor: "pointer" }}>
                            <FaUserCircle
                                style={{ color: "#fff", fontSize: "24px" }}
                            />
                        </div>
                        {currentUser ? (
                            <div
                                style={{ marginLeft: "5px", marginTop: "5px" }}
                            >{`Hi, ${
                                currentUser.fullName.split(" ")[
                                    currentUser.fullName.split(" ").length - 1
                                ]
                            }`}</div>
                        ) : null}
                    </div>
                </label>
                <div
                    onClick={() => {
                        navigate("/cart");
                    }}
                >
                    <div
                        style={{ cursor: "pointer" }}
                        onMouseMove={() => {
                            setShowCartPopup(true);
                        }}
                        onMouseLeave={() => {
                            setShowCartPopup(false);
                        }}
                    >
                        <IoBagHandle
                            style={{ color: "#fff", fontSize: "24px" }}
                        />
                        {showCartPopUp && (
                            <CartPopup
                                cartProducts={
                                    currentUser
                                        ? cartProducts
                                        : cartProductsNonUser
                                }
                                onMouseLeave={() => setShowCartPopup(false)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
