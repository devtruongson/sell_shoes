import classNames from "classnames/bind";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DetailPopup.module.scss";

const cx = classNames.bind(styles);
function DetailPopup({ onMouseLeave, category }) {
  const navigate = useNavigate();
  const wrapper = useRef(null);
  const [isSticky, setSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    var offset = wrapper.current.offsetTop;
    window.onscroll = function () {
      if (window.scrollY > 80) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
  }, []);
  const handleCategoryClick = (type) => {
    // Hide the popup
    setIsVisible(false);
    // Navigate to the desired route
    navigate(`/collection/type=${type}`);
  };

  const images = useMemo(() => [
      {
          src: "https://image.donghohaitrieu.com/wp-content/uploads/2023/11/BST-dong-ho-nam-ban-chay.jpg", // Replace with actual image URL for Analog Watch
          alt: "Đồng hồ analog",
      },
      {
          src: "https://image.donghohaitrieu.com/wp-content/uploads/2023/11/BST-dong-ho-nu-ban-chay.jpg", // Replace with actual image URL for Digital Watch
          alt: "Đồng hồ kỹ thuật số",
      },
      {
          src: "https://image.donghohaitrieu.com/wp-content/uploads/2023/10/bst-dong-ho-moi.jpg", // Replace with actual image URL for Smartwatch
          alt: "Đồng hồ thông minh",
      },
  ],[])
  
  return isVisible ? (
    <div ref={wrapper} className={cx("wrapper", { sticky: isSticky })}>
      <div onMouseLeave={() => onMouseLeave()} className={cx("inner")}>
        <div className={cx('content-inner')}>
          <div className={cx("container_item")}>
            <div className={cx("title")}>
              Theo sản phẩm
              <div className={cx("seprate-bar")}></div>
            </div>

            <div className={cx("container-product-type")}>
              <div className={cx("product-type")}>
                {category.listProductType.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={cx("product-type-item")}
                      onClick={() => handleCategoryClick(item.productTypeName)}
                    >
                      {item.productTypeName}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
            {/* <div className={cx('seprate-vertical')}></div>
          <div className={cx("container_item")}>
            <div className={cx("title")}>
              Top sản phẩm bán chạy nhất
              <div className={cx("seprate-bar")}></div>
            </div>

            <div className={cx("container-product-type")}>
              <div className={cx("product-type")}>
                {category.listTypes.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={cx("product-type-item")}
                      onClick={() => handleCategoryClick(item.name)}
                    >
                      {item.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div> */}
        </div>

        <div className={cx("product-list-img")}>
          <div className={cx("product-list-1")}>
            <div className={cx("img-wrapper")}>
              <img src={images[0].src} />
              <div className={cx("overlay2")}></div>
              <span>{images[0].alt}</span>
            </div>
            <div className={cx("img-wrapper")}>
              <img src={images[1].src} />
              <div className={cx("overlay2")}></div>
              <span>{images[1].alt}</span>
            </div>
          </div>
          <div className={cx("product-list-2")}>
            <div className={cx("img-wrapper")}>
              <img src={images[2].src} />
              <div className={cx("overlay2")}></div>
              <span>{images[2].alt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default DetailPopup;
