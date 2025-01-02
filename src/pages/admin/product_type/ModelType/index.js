import classNames from "classnames/bind";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MdAdd } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { CustomeButton } from "~/components";
import { getCate } from "../../cate/api/get-cate";
import { createType } from "../api/create-type";
import { deleteType } from "../api/delete-type";
import { updateType } from "../api/update-type";
import styles from "./ModelFaq.module.scss";
const cx = classNames.bind(styles);

const ModelType = ({ typeModelFaq, onClose, data }) => {
    const [type, setType] = useState(data);
    const [cate, setCate] = useState([]);

    const notify = useCallback(
        (type, message) => toast(message, { type: type }),
        []
    );

    useEffect(() => {
        if(type?.productCategory) {
            setType(prev => {
                return {
                    ...prev,
                    productCategoryId: type.productCategory  ? type.productCategory.id: null
                }
            })
        }
        
        const fetch = async () => {
            const res = await getCate();
            console.log(("res ", res));
            if (res.status === 200) {
                setCate(res?.data?.data || []);
            }
        };
        fetch();
    }, [type?.productCategory]);

    const handleValidate = () => {
        if (!type?.productTypeName || !type?.productCategoryId) {
            notify("success", "Hãy chọn và nhập đầy đủ các trường!");
            return false;
        }

        return true;
    };

    const handleUpdateType = async () => {
        console.log(type)
        const isValid = handleValidate();
        if (!isValid) {
            return;
        }
        const res = await updateType({
            productTypeId: type.id,
            productTypeName: type.productTypeName,
            productCategoryId: type.productCategoryId
        });

        if (res.status === 200) {
            onClose("EDIT", res.data.data);
            notify("success", "Sửa Type tthành công");
            setTimeout(() => {
                window.location.reload();
            }, 500)
        } else {
            console.log(res);
            notify("error", "Có lỗi xảy ra vui lòng thử lại sau");
        }
    };

    const handleCreate = async () => {
        const isValid = handleValidate();
        if (!isValid) {
            return;
        }
        const res = await createType({
            productTypeName: type.productCategoryName,
            productCategoryId: type.productCategoryId
        });

        if (res.status === 200) {
            onClose("CREATE", res.data.data);
            notify("success", "Tạo Cate tthành công");
            setTimeout(() => {
                window.location.reload();
            }, 500)
        } else {
            console.log(res);
            notify("error", "Có lỗi xảy ra vui lòng thử lại sau");
        }
    };

    const handleDelete = async () => {
        const res = await deleteType(type?.id);

        if (res.status === 200) {
            onClose("DELETE", type);
            notify("success", "Xóa Cate thành công");
            setTimeout(() => {
                window.location.reload();
            }, 500)
        } else {
            console.log(res);
            notify("error", "Có lỗi xảy ra vui lòng thử lại sausau");
        }
    };

    const infoModal = useMemo(() => {
        switch (typeModelFaq) {
            case "EDIT":
                return {
                    title: "Edit Type",
                    action: handleUpdateType,
                };
            case "CREATE":
                return {
                    title: "Create Type",
                    action: handleCreate,
                };

            case "DELETE":
                return {
                    title: "Confim Delete Type",
                    action: handleDelete,
                };
            default:
                return {};
        }
    }, [typeModelFaq, type]);


    return (
        <div
            className={cx("wrapper")}
            style={{ animation: "dropTop .3s linear" }}
        >
            <ToastContainer />

            <div
                style={{
                    fontWeight: 500,
                    fontSize: "18px",
                    marginBottom: "20px",
                    backgroundColor: "black",
                    color: "white",
                    padding: "20px",
                    width: "20%",
                    borderRadius: "4px",
                }}
            >
                {infoModal.title}
            </div>

            <div style={{ padding: "20px", width: "100%" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        paddingBottom: "20px",
                    }}
                >
                    <div className={cx("form-common")}>
                        <label>Name</label>
                        <br />
                        <textarea
                            type="text"
                            style={{
                                minHeight: "40",
                                marginTop: "12px",
                                border: "1px solid #ccc",
                                borderRadius: "10px",
                                padding: "8px",
                                width: "100%",
                            }}
                            value={type?.productTypeName || ""}
                            onChange={(e) => {
                                setType((prev) => ({
                                    ...prev,
                                    productTypeName: e.target.value,
                                }));
                            }}
                        />
                    </div>
                    <div className={cx("form-common")}>
                        <label>Danh Mục</label>
                        <br />
                        <select style={{
                                minHeight: "40px",
                                marginTop: "12px",
                                border: "1px solid #ccc",
                                borderRadius: "10px",
                                padding: "8px",
                                width: "100%",
                            }}
                            value={type?.productCategory?.id || ""}
                            onChange={(e) => {
                                setType((prev) => ({
                                    ...prev,
                                    productCategoryId: e.target.value,
                                }));
                            }}
                        >
                            <option value="">Chọn danh mục</option>
                            {cate.map((item, index) => {
                                return <option value={item._id}>{item.productCategoryName}</option>
                            })}
                        </select>
                    </div>
                </div>

                {typeModelFaq !== "VIEW" && (
                    <div style={{ display: "flex", justifyContent: "right" }}>
                        <CustomeButton
                            onClick={infoModal.action}
                            type={"Submit"}
                            className={cx("cus-button")}
                            title={"Xác nhận"}
                            icon={<MdAdd fontSize={20} />}
                            isLeft={true}
                            bgHover={"#2f5acf"}
                            textColorHover={"white"}
                            containStyles={{
                                width: "120px",
                                backgroundColor: "black",
                                color: "white",
                                borderRadius: "8px",
                                padding: "10px 10px",
                                marginTop: "16px",
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModelType;
