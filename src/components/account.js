import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './modal';
import { users } from './sample';


const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState(users[0]);
    const [tempInfo, setTempInfo] = useState({ ...userInfo });
    const [newImage, setNewImage] = useState('');

    const handleEdit = () => {
        const isValid = tempInfo.name.trim() !== "" && tempInfo.des.trim() !== "";
        if (!isValid) {
            alert('Tên và mô tả không được để trống!');
            return;
        } else {
            const userExists = users.some(user => user.email === tempInfo.email && user.email !== userInfo.email);
            if (userExists) {
                alert('Email đã tồn tại. Vui lòng sử dụng email khác!');
                return;
            }
            if (newImage) {
                tempInfo.image = newImage;
            }
            setUserInfo(tempInfo);
            setIsEditing(false);
            alert('Chỉnh sửa thông tin thành công!');
        }
    };

    const handleCancel = () => {
        setTempInfo({ ...userInfo });
        setIsEditing(false);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const navigate = useNavigate();
    const handleDelete = () => {
        alert('Đã xoá tài khoản thành công!');
        navigate('/');
    };
    return (
        <div>
            <header>
                <div className="header d-flex justify-content-between align-items-center">
                    <div className="logo mx-3">
                        <img src="eventure.png" alt="Logo" height="40" />
                    </div>

                    <nav>
                        <ul className="nav d-flex">
                            <Link className="nav-link" to="/home" title='Trang chủ'><img src="home.svg" alt="Trang chủ" /></Link>
                            <Link className="nav-link" to="/account" title='Tài khoản'><img src="user-circle.svg" alt="Tài khoản" /></Link>
                            <Link className="nav-link" to="/myevent" title='Danh sách sự kiện'><img src="star.svg" alt="Sự kiện" /></Link>
                            <Link className="nav-link" to="/noti" title='Thông báo'><img src="bell.svg" alt="Thông Báo" /></Link>
                            <Link className="nav-link" to="/create" title='Tạo sự kiện'><img src='plus.svg' alt="Tạo sự kiện" /></Link>
                        </ul>
                    </nav>
                </div>
            </header>

            <div className="container justify-content-center">
                <h3 style={{
                    display: "flex", margin: "20px", marginTop: "50px", fontWeight: "bold", borderBottom: "3px solid #f9a603",
                    paddingBottom: "10px"
                }}>Thông tin tài khoản</h3>
                <div style={{ border: "1px solid black", borderRadius: "5px", padding: "20px" }} className="container mt-5 justify-content-center">
                    <div className="d-flex align-items-center mr-4 mt-3">
                        <img
                            src={userInfo.image}
                            alt="Avatar"
                            className="rounded-circle"
                            width="150"
                            height="150"
                        />
                        <div>
                            <h2 style={{ marginLeft: "20px" }}>
                                {isEditing ? (
                                    <input className='typeplace'
                                        type='text'
                                        style={{ width: '330px', marginLeft: '0px' }}
                                        value={tempInfo.name}
                                        onChange={(e) => setTempInfo({ ...tempInfo, name: e.target.value })}
                                        placeholder='Nhập tên người dùng'
                                        required //ko có tác dụng khi can thiệp xử lí js, khi ko nằm trong <form>
                                    />
                                ) : (
                                    userInfo.name
                                )}
                            </h2>
                        </div>

                    </div>
                    {isEditing && (
                        <div style={{ marginTop: '10px' }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setNewImage(URL.createObjectURL(e.target.files[0]))}
                            />
                        </div>
                    )}
                    <div style={{ marginTop: "200px", marginLeft: "30px" }} className="mt-4">
                        <p>
                            <strong>Email:</strong> {isEditing ? (
                                <input
                                    type="text"
                                    className=" typeplace"
                                    style={{ width: '300px', marginLeft: '0px' }}
                                    value={tempInfo.email}
                                    onChange={(e) => setTempInfo({ ...tempInfo, email: e.target.value })}
                                    placeholder="Nhập email của bạn"
                                />
                            ) : (
                                userInfo.email
                            )}
                        </p>
                    </div>
                    <div style={{ marginTop: "200px", marginLeft: "30px" }} className="mt-4">
                        <p>
                            <strong>Mô tả:</strong> {isEditing ? (
                                <input
                                    type="text"
                                    className=" typeplace"
                                    style={{ width: '300px', marginLeft: '0px' }}
                                    value={tempInfo.des}
                                    onChange={(e) => setTempInfo({ ...tempInfo, des: e.target.value })}
                                    placeholder="Nhập mô tả của bạn"
                                />
                            ) : (
                                userInfo.des
                            )}
                        </p>
                    </div>
                    <div>
                        {isEditing ? (
                            <>
                                <button className="btn m-4 px-4 okbut" onClick={handleEdit}>Hoàn tất</button>
                                <button className="btn beebut m-4 px-4" onClick={handleCancel}>Huỷ</button>
                            </>
                        ) : (
                            <>
                                <div className='form-inline'>
                                    <button className="btn m-4 beebut" onClick={() => setIsEditing(true)}>Chỉnh sửa</button>
                                    <button className="btn dangerbut" onClick={openModal} >Xoá tài khoản</button>
                                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                                        <h2>Lưu ý:</h2>
                                        <p>Bạn có chắc muốn xoá tài khoản vĩnh viễn không? Hành động này sẽ không thể hoàn tác! </p>
                                        <p style={{ fontSize: '13px', color: '#dc3546' }}>Không thể xoá tài khoản khi sự kiện đã tạo sẽ diễn ra trong vòng 7 NGÀY tới</p>
                                        <button className='btn dangerbut' onClick={handleDelete}> Xoá tài khoản</button>
                                        <button className='beebut' onClick={closeModal} style={{ marginLeft: '20px' }}>Huỷ</button>
                                    </Modal>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div >
        </div>
    );
};

export default UserProfile;
