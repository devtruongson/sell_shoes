import "bootstrap/dist/css/bootstrap.min.css";
import classNames from "classnames/bind";
import { MdEmail } from "react-icons/md";
import { PiPhoneCall } from "react-icons/pi";
import ModalReport from "~/components/ModalReport/index.js";
import styles from "./Footer.module.scss";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import CustomeButton from "~/components/CustomeButton/CustomeButton";
import baseUrl from "~/utils/baseUrl";
const cx = classNames.bind(styles);
function Footer() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const [footerData, setFooterData] = useState({
    title: {
      slogan: "",
      desc: "",
    },
    contact: {
      hotline: [],
      email: "",
    },
    addresses: [
      { city: "", details: "" },
      { city: "", details: "" },
    ],
  });

  useEffect(() => {
    const _fetch = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/footer`);
            if(res.data) {
                setFooterData(res.data.data[0])
            }
        } catch (error) {
            console.log(error);
        }

    }
    _fetch();
  },[])

  return (
    <footer className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("footer-inner")}>
          <div className={cx("footer-inner_sidebar")}>
            <div className={cx("layout2")}>
              <div>
                <h4 className={cx("title")}>{footerData.title.slogan}</h4>
                <p style={{ marginBottom: "30px" }}>
                  {footerData.title.desc}
                </p>
                <div>
                  <CustomeButton
                    onClick={handleOpenModal}
                    title={"Đóng góp ý kiến"}
                    bgHover={"white"}
                    textColorHover={"black"}
                    containStyles={{
                      width: "150px",
                      backgroundColor: "#2f5acf",
                      color: "white",
                      borderRadius: "20px",
                      padding: "10px 0px 10px 24px",
                      border: "0",
                      marginBottom: "30px",
                    }}
                  />
                </div>
              </div>
              <div className={cx("separate")}></div>
              <div className={cx("item-middle")}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ marginRight: "12px" }}>
                    <PiPhoneCall size={35} />
                  </div>
                  <div>
                    <div>Hotline</div>
                    <div style={{ fontWeight: "700", fontSize: "16px" }}>
                      {footerData.contact.hotline.join(" - ")}
                    </div>
                    <div>(8:30 - 22:00)</div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ marginRight: "12px" }}>
                    <MdEmail size={35} />
                  </div>
                  <div>
                    <div>Email</div>
                    <div style={{ fontWeight: "700", fontSize: "16px" }}>
                      {footerData.contact.email}
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx("separate")}></div>
            </div>

            <div className={cx("footer-social")}>
              <a href="#" className={cx("footer-social-icon")}>
                {" "}
                <FaFacebook />{" "}
              </a>
              <a href="#" className={cx("footer-social-icon")}>
                {" "}
                <FaInstagram />{" "}
              </a>
              <a href="#" className={cx("footer-social-icon")}>
                {" "}
                <FaYoutube />{" "}
              </a>
              <a href="#" className={cx("footer-social-icon")}>
                {" "}
                <FaTiktok />{" "}
              </a>
              <a href="#" className={cx("footer-social-icon")}>
                {" "}
                <FaLinkedin />{" "}
              </a>
            </div>
          </div>
          <div className={cx("footer-inner-menu")}>
            <div className={cx("footer-menu__item")}>
              <h4 className={cx("menu_title")}>SHOPAPPCLUB</h4>
              <ul>
                <li>
                  <a href="#">Đăng kí thành viên</a>
                </li>
                <li>
                  <a href="#">Ưu đãi & Đặc quyền</a>
                </li>
              </ul>
            </div>
            <div className={cx("footer-menu__item")}>
              <h4 className={cx("menu_title")}>CHÍNH SÁCH</h4>
              <ul>
                <li>
                  <a href="#">Chính sách đổi trả 60 ngày</a>
                </li>
                <li>
                  <a href="#">Chính sách khuyến mãi</a>
                </li>
                <li>
                  <a href="#">Chính sách bảo mật</a>
                </li>
                <li>
                  <a href="#">Chính sách giao hàng</a>
                </li>
              </ul>
              <h4 className={cx("menu_title")} style={{ marginTop: "20px" }}>
                WATCHER.APP
              </h4>
              <ul>
                <li>
                  <a href="#">Lịch sử thay đổi website</a>
                </li>
              </ul>
            </div>
            <div className={cx("footer-menu__item")}>
              <h4 className={cx("menu_title")}>CHĂM SÓC KHÁCH HÀNG</h4>
              <ul>
                <li>
                  <a href="#">Trải nghiệm mua sắm 100% hài lòng</a>
                </li>
                <li>
                  <a href="#">Hỏi đáp - FAQs</a>
                </li>
              </ul>
              <h4 className={cx("menu_title")} style={{ marginTop: "20px" }}>
                KIẾN THỨC MẶC ĐẸP
              </h4>
              <ul>
                <li>
                  <a href="#">Hướng dẫn chọn size</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Group mặc đẹp sống chất</a>
                </li>
              </ul>
            </div>
            <div className={cx("footer-menu__item")}>
              <h4 className={cx("menu_title")}>TÀI LIỆU - TUYỂN DỤNG</h4>
              <ul>
                <li>
                  <a href="#">Tuyển dụng</a>
                </li>
                <li>
                  <a href="#">Đăng ký bản quyền</a>
                </li>
              </ul>
              <h4 className={cx("menu_title")} style={{ marginTop: "20px" }}>
                VỀ SHOPAPP
              </h4>
              <ul>
                <li>
                  <a href="#">ShopApp 101</a>
                </li>
                <li>
                  <a href="#">DVKH Xuất sắc</a>
                </li>
                <li>
                  <a href="#">Câu chuyện về ShopApp</a>
                </li>
                <li>
                  <a href="#">Nhà máy</a>
                </li>
                <li>
                  <a href="#">Care & Share</a>
                </li>
              </ul>
            </div>
            <div className={cx("footer-menu__item")}>
              <h4 className={cx("menu_title")}>ĐỊA CHỈ LIÊN HỆ</h4>
              <ul>
                  {footerData.addresses.map((item, index) => {
                    return <li>{item.city + " - " + item.details}</li>
                  })}
              </ul>
            </div>
          </div>

          <div className={cx("footer-final")}>
            <div className={cx("footer-final1")}>
              <div style={{ fontWeight: "bold" }}>
                @ CÔNG TY TNHH FASTECH ASIA
              </div>
              <div style={{ fontSize: "11px" }}>
                Mã số doanh nghiệp: 0108617038. Giấy chứng nhận đăng ký doanh
                nghiệp do Sở Kế hoạch và Đầu tư TP Hà Nội cấp lần đầu ngày
                20/02/2019.
              </div>
            </div>
            <div className={cx("footer-final2")}>
              <img src="https://www.coolmate.me/images/footer/logoSaleNoti.png" />
              <img src="https://www.coolmate.me/images/footer/Coolmate-info.png" />
              <img src="https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2022/dmca_protected_15_120.png" />
              <img src="https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2022/handle_cert.png" />
            </div>
          </div>
        </div>
      </div>
      {openModal && <ModalReport setOpenModal={setOpenModal} />}
    </footer>
  );
}

export default Footer;
