import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getInfoUser } from '~/api/user/get-user-info';
import ChangePass from './ChangePass';
import styles from './Info.module.scss';
import UpdateInfo from './UpdateInfo';

const cx = classNames.bind(styles);
function Info(){
    const [openUpdInfo, setOpenUpdInfo] = useState(false)
    const [openUpdPass, setOpenUpdPass] = useState(false)

    const convertDate = (d) => {
        const date = new Date(d);

        // Lấy thông tin ngày, tháng, năm
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();

        // Tạo chuỗi ngày tháng định dạng 'DD-MM-YYYY'
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }
    let currentUser = useSelector((state) => state.auth.login.currentUser)
    const notify = (type, message) => toast(message, { type: type });

    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetch = async() => {
            const data = await getInfoUser(currentUser._id);
            if(data.data) {
                setUserData(data.data)
            }
        }

        fetch();
    },[])

    return (
        <>
            <ToastContainer />

            <div className={cx('container')}>
                <Link to={'/user-profile'} className={cx('account-page__icon')}>
                        <BiArrowBack /> 
                </Link>
                <div className={cx('account-info__form')}>
                    <h1 className={cx('account-page__title')}>Thông tin tài khoản</h1>
                    <div className={cx('account-info__content')}>
                        <div className={cx('account-info__field')}>
                            <div className={cx('account-info__label')}>Họ và tên</div>
                            <div className={cx('account-info__value')}>{currentUser?.fullName}</div>
                        </div>
                        <div className={cx('account-info__field')}>
                            <div className={cx('account-info__label')}>Email</div>
                            <div className={cx('account-info__value')}>{currentUser?.email ?? 'Chưa cập nhật'}</div>
                        </div>
                        <div className={cx('account-info__field')}>
                            <div className={cx('account-info__label')}>Giới tính</div>
                            <div className={cx('account-info__value')}>{currentUser?.gender === 0 ? "Nam" : currentUser?.gender=== 1 ? "Nữ" : currentUser?.gender=== 2 ? "Khac" :'Chưa cập nhật'}</div>
                        </div>
                        <div className={cx('account-info__field')}>
                            <div className={cx('account-info__label')}>Ngày sinh    
                            <span style={{fontSize: '14.4px', color: '#999999', fontStyle:'italic', marginLeft: '3px'}}>(ngày/tháng/năm)</span></div>
                            <div className={cx('account-info__value')}>{convertDate(currentUser?.dob) ?? 'Chưa cập nhật'}</div>
                        </div>
                        <div className={cx('account-info__field')}>
                            <div className={cx('account-info__label')}>Chiều cao</div>
                            <div className={cx('account-info__value')}>{currentUser?.heightUser?currentUser?.heightUser+' cm':'Chưa cập nhật'}</div>
                        </div>
                        <div className={cx('account-info__field')}>
                            <div className={cx('account-info__label')}>Chiều cao</div>
                            <div className={cx('account-info__value')}>{currentUser?.heightUser?currentUser?.heightUser+' cm':'Chưa cập nhật'}</div>
                        </div>
                        <div className={cx('account-info__field')}>
                            <div className={cx('account-info__label')}>Trạng thái tài khoản</div>
                            <div className={cx('account-info__value')}>{userData?.is_verify ? "Đã xác minh" : <a href={`http://localhost:3001/api/auth/active_account?_id=${userData._id}`}>Xác minh ngay</a>}</div>
                        </div>                    </div>
                    <label for={cx('popup__editInfo')}>
                        <div className={cx('account-info__btn')} >
                            <span className={cx('account-info__btn-text')}>Cập nhật</span>
                        </div>
                    </label>
                    <input checked={openUpdInfo} onChange={()=>{setOpenUpdInfo(prev=>!prev)}} type="checkbox" hidden id={cx('popup__editInfo')} className={cx('popup__editInfo')}/>
                    <label for={cx('popup__editInfo')} className={cx('backdrop')}>
                    </label>
                    <div className={cx('outer_popup')}>
                        <div className={cx('popup')}>
                            <UpdateInfo item={currentUser} notify={notify} setPopUp={setOpenUpdInfo}/>
                        </div>
                    </div>
                </div>
                <div className={cx('account-info__form')}>
                    <h1 className={cx('account-page__title')}>Thông tin đăng nhập</h1>
                    <div className={cx('account-info__content')}>
                        <div className={cx('account-info__field')}>
                            <div className={cx('account-info__label')}>Số điện thoại</div>
                            <div className={cx('account-info__value_lower')} style={{textDecoration: 'lowercase'}}>{currentUser?.phoneNumber ?? 'Chưa cập nhật'}</div>
                        </div>
                        <div className={cx('account-info__field')}>
                            <div className={cx('account-info__label')}>Mật khẩu</div>
                            <div className={cx('account-info__value')}>******************</div>
                        </div>
                    </div>
                    <label for={cx('popup__editPass')}>
                        <div className={cx('account-info__btn')}>
                            <span className={cx('account-info__btn-text')}>Cập nhật</span>
                        </div>
                    </label>
                    <input type="checkbox" checked={openUpdPass} onChange={()=>{setOpenUpdPass(prev=>!prev)}} hidden id={cx('popup__editPass')} className={cx('popup__editInfo')}/>
                    <label for={cx('popup__editPass')} id={cx('backdrop_pass')}>
                    </label>
                    <div id={cx('outer_popup_pass')}>
                        <div className={cx('popup')}>
                            <ChangePass item={currentUser} notify={notify} setPopUp={setOpenUpdPass}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default Info;