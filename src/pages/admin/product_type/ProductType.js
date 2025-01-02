import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import { CustomeButton, Modal } from "~/components";
import { getType } from "./api/get-type";
import styles from "./cate.module.scss";
import ModelType from "./ModelType";

const cx = classNames.bind(styles);

const ProductType = () => {
    const [type, seType] = useState([]);
    const [isOpenModal, setIsOpenModel] = useState(false);
    const [faqSelected, setFaqSelected] = useState(null);
    const [typeModal, setTypeModal] = useState("");

    const handleOpenModel = (type, faq) => {
        setIsOpenModel(true);
        setTypeModal(type);
        setFaqSelected(faq);
    };

    const handleCloseModel = (type, newType) => {
        let newTypes;
        switch (type) {
            case "EDIT":
                // newTypes = type.map((item) => {
                //     if (item.id === newType.id) {
                //         return newType;
                //     } else {
                //         return item;
                //     }
                // });
                break;
            case "CREATE":
                // newTypes = [...type, newType];
                break;
            case "DELETE":
                // newTypes = type.filter((item) => item.id !== newType.id);
                break;
            default:
                break;
        }
        seType(newTypes);
        setIsOpenModel(false);
    };
    useEffect(() => {
        const fetch = async () => {
            const res = await getType();
            if (res.status === 200) {
                seType(res?.data?.data || []);
            }
        };
        fetch();
    }, []);
    return (
        <div className={cx("wrapper")} style={{ fontSize: "14px" }}>
            <div className={cx("container")}>
                <div>
                    <h1>Loại Sản Phẩm Theo Danh Mục</h1>
                </div>
                <div className={cx("content")}>
                    <div className={cx("header-content")}>
                        <div style={{ display: "flex" }}></div>
                        <div onClick={() => handleOpenModel("CREATE", null)}>
                            <CustomeButton
                                className={cx("cus-button")}
                                title={"Thêm Type"}
                                icon={<MdAdd fontSize={20} />}
                                isLeft={true}
                                bgHover={"#2f5acf"}
                                textColorHover={"white"}
                                containStyles={{
                                    width: "150px",
                                    backgroundColor: "black",
                                    color: "white",
                                    borderRadius: "8px",
                                    padding: "10px 10px",
                                    marginTop: "6px",
                                    marginRight: "12px",
                                }}
                            />
                        </div>
                    </div>
                    <div
                        style={{
                            padding: "10px 32px 40px",
                            width: "100%",
                            minHeight: "550px",
                        }}
                    >
                        <table
                            style={{
                                width: "100%",
                                borderRadius: "10px",
                                borderColor: "transparent",
                                border: "none",
                                position: "relative",
                            }}
                        >
                            <thead
                                className={cx("thead")}
                                style={{
                                    width: "100%",
                                    borderRadius: "10px",
                                    borderColor: "transparent",
                                    border: "none",
                                }}
                            >
                                <tr
                                    style={{
                                        width: "100%",
                                        backgroundColor: "#e6f1fe",
                                        color: "black",
                                        borderRadius: "10px",
                                    }}
                                >
                                    <th
                                        className={cx("col-tbl")}
                                        style={{ paddingLeft: "20px" }}
                                    >
                                        Tên loại sản phẩm
                                    </th>
                                    <th className={cx("col-tbl")}>Loại Danh Mục</th>
                                    <th
                                        className={cx("col-tbl col-action")}
                                        style={{ textAlign: "center" }}
                                    >
                                        Tác vụ
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={cx("tbody")}>
                                {type && type.length > 0
                                    ? type.map((item, index) => {
                                          return (
                                              <tr
                                                  key={index}
                                                  className={cx("row-item")}
                                              >
                                                  <td
                                                      style={{
                                                          paddingLeft: "34px",
                                                          width: "30%",
                                                      }}
                                                  >
                                                      {item?.productTypeName}
                                                  </td>
                                                  <td style={{ width: "50%" }}>{item?.productCategory?.productCategoryName ? item?.productCategory?.productCategoryName :"Chưa cập nhật" }</td>
                                                  <td>
                                                      <div
                                                          style={{
                                                              display: "flex",
                                                              justifyContent:
                                                                  "center",
                                                              gap: "10px",
                                                          }}
                                                      >
                                                          <button
                                                              style={{
                                                                  border: "1px solid #ccc",
                                                                  borderRadius:
                                                                      "8px",
                                                                  marginRight:
                                                                      "4px",
                                                              }}
                                                              onClick={() =>
                                                                  handleOpenModel(
                                                                      "EDIT",
                                                                      item
                                                                  )
                                                              }
                                                          >
                                                              <AiOutlineEdit
                                                                  fontSize={20}
                                                                  color="blue"
                                                              />
                                                          </button>
                                                          <button
                                                              style={{
                                                                  border: "1px solid #ccc",
                                                                  borderRadius:
                                                                      "8px",
                                                              }}
                                                              onClick={() =>
                                                                  handleOpenModel(
                                                                      "DELETE",
                                                                      item
                                                                  )
                                                              }
                                                          >
                                                              <BiTrash
                                                                  fontSize={20}
                                                                  color="red"
                                                              />
                                                          </button>
                                                      </div>
                                                  </td>
                                              </tr>
                                          );
                                      })
                                    : null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <footer className={cx("sticky-footer")} style={{ zIndex: 10 }}>
                <div className={cx("container")}>
                    <div className="copyright text-center my-auto">
                        <span>Copyright &copy; Your Website 2023</span>
                    </div>
                </div>
            </footer>
            <Modal visible={isOpenModal} setModal={setIsOpenModel}>
                <ModelType
                    typeModelFaq={typeModal}
                    onClose={handleCloseModel}
                    data={faqSelected}
                />
            </Modal>
        </div>
    );
};

export default ProductType;
