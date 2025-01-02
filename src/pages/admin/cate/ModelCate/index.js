import classNames from "classnames/bind";
import { useCallback, useMemo, useState } from "react";
import { MdAdd } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { CustomeButton } from "~/components";
import { createCate } from "../api/create-cate";
import { deleteCate } from "../api/delete-cate";
import { updateCate } from "../api/update-cate";
import styles from "./ModelFaq.module.scss";
const cx = classNames.bind(styles);

const ModelFaq = ({ typeModelFaq, onClose, data }) => {
    const [cate, setCate] = useState(data);

    const notify = useCallback(
        (type, message) => toast(message, { type: type }),
        []
    );

    const handleValidate = () => {
        if (!cate?.productCategoryName) {
            notify("success", "Hãy chọn và nhập đầy đủ các trường!");
            return false;
        }

        return true;
    };

    const handleUpdateCate = async () => {
        const isValid = handleValidate();
        if (!isValid) {
            return;
        }
        const res = await updateCate({
            id: cate.id,
            productCategoryName: cate.productCategoryName,
        });

        if (res.status === 200) {
            onClose("EDIT", res.data.data);
            notify("success", "Sửa Cate tthành công");
            setTimeout(() => {
                window.location.reload();
            }, 1000)
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
        const res = await createCate({
            name: cate.productCategoryName,
        });

        if (res.status === 200) {
            onClose("CREATE", res.data.data);
            notify("success", "Tạo Cate tthành công");
        } else {
            console.log(res);
            notify("error", "Có lỗi xảy ra vui lòng thử lại sau");
        }
    };

    const handleDelete = async () => {
        const res = await deleteCate(cate?.id);

        if (res.status === 200) {
            onClose("DELETE", cate);
            notify("success", "Xóa Cate thành công");
        } else {
            console.log(res);
            notify("error", "Có lỗi xảy ra vui lòng thử lại sausau");
        }
    };

    const infoModal = useMemo(() => {
        switch (typeModelFaq) {
            case "EDIT":
                return {
                    title: "Edit Cate",
                    action: handleUpdateCate,
                };
            case "CREATE":
                return {
                    title: "Create Cate",
                    action: handleCreate,
                };

            case "DELETE":
                return {
                    title: "Confim Delete Cate",
                    action: handleDelete,
                };
            default:
                return {};
        }
    }, [typeModelFaq, cate]);

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
                                minHeight: "100px",
                                marginTop: "12px",
                                border: "1px solid #ccc",
                                borderRadius: "10px",
                                padding: "8px",
                                width: "100%",
                            }}
                            value={cate?.productCategoryName || ""}
                            onChange={(e) => {
                                setCate((prev) => ({
                                    ...prev,
                                    productCategoryName: e.target.value,
                                }));
                            }}
                        />
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

export default ModelFaq;
