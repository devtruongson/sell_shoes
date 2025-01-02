import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "~/utils/baseUrl";
import './Footer.scss';


const FooterEditor = () => {
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
  
  const handleTitleChange = (field, value) => {
    setFooterData((prevData) => ({
      ...prevData,
      title: { ...prevData.title, [field]: value },
    }));
  };

  // Handler for contact
  const handleContactChange = (field, value) => {
    setFooterData((prevData) => ({
      ...prevData,
      contact: { ...prevData.contact, [field]: value },
    }));
  };

  const handleAddHotline = () => {
    setFooterData((prevData) => ({
      ...prevData,
      contact: {
        ...prevData.contact,
        hotline: [...prevData.contact.hotline, ""],
      },
    }));
  };

  const handleHotlineChange = (index, value) => {
    const updatedHotlines = [...footerData.contact.hotline];
    updatedHotlines[index] = value;
    setFooterData((prevData) => ({
      ...prevData,
      contact: { ...prevData.contact, hotline: updatedHotlines },
    }));
  };

  // Handler for addresses
  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...footerData.addresses];
    updatedAddresses[index][field] = value;
    setFooterData((prevData) => ({
      ...prevData,
      addresses: updatedAddresses,
    }));
  };

  const handleAddAddress = () => {
    setFooterData((prevData) => ({
      ...prevData,
      addresses: [...prevData.addresses, { city: "", details: "" }],
    }));
  };

  const handleSubmit =  async () => {
    try {
        await axios.put(`${baseUrl}/api/footer`, footerData);
        // eslint-disable-next-line no-restricted-globals
        confirm("Bạn đã cập nhật thành công!")
    } catch (error) {
        console.log(error);
    }

  };

  return (
    <div className="footer-editor">
      <h1>Chỉnh sửa Footer</h1>

      {/* Title Section */}
      <div className="section">
        <h2>Tiêu đề Footer</h2>
        <input
          type="text"
          placeholder="Slogan"
          value={footerData.title.slogan}
          onChange={(e) => handleTitleChange("slogan", e.target.value)}
        />
        <textarea
          placeholder="Mô tả"
          value={footerData.title.desc}
          onChange={(e) => handleTitleChange("desc", e.target.value)}
        />
      </div>

      {/* Contact Section */}
      <div className="section">
        <h2>Thông tin liên hệ</h2>
        <label>Email:</label>
        <input
          type="text"
          placeholder="Email"
          value={footerData.contact.email}
          onChange={(e) => handleContactChange("email", e.target.value)}
        />
        <h4>Hotlines:</h4>
        {footerData.contact.hotline.map((hotline, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Hotline ${index + 1}`}
            value={hotline}
            onChange={(e) => handleHotlineChange(index, e.target.value)}
          />
        ))}
        <button onClick={handleAddHotline}>Thêm hotline</button>
      </div>

      {/* Addresses Section */}
      <div className="section">
        <h2>Địa chỉ</h2>
        {footerData.addresses.map((address, index) => (
          <div key={index} className="address">
            <input
              type="text"
              placeholder="Thành phố"
              value={address.city}
              onChange={(e) => handleAddressChange(index, "city", e.target.value)}
            />
            <input
              type="text"
              placeholder="Chi tiết địa chỉ"
              value={address.details}
              onChange={(e) => handleAddressChange(index, "details", e.target.value)}
            />
          </div>
        ))}
        <div style={{display: 'flex', justifyContent: "space-between"}}>
            <button onClick={handleAddAddress}>Thêm địa chỉ</button>
            <button className="submit-btn" onClick={handleSubmit}>
                Lưu thay đổi
            </button>
        </div>
      </div>

      {/* Submit Button */}
    
    </div>
  );
};

export default FooterEditor;
