import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './home.css';
import { Link } from 'react-router-dom';

const Noti = () => {
    const notifications = [
        { id: 1, title: 'Thay đổi về sự kiện bạn tham gia', message: 'Sự kiện 4 đã có những cập nhật mới' },
        { id: 2, title: 'Thông báo 2', message: 'Đây là nội dung thông báo 2' },
        { id: 3, title: 'Thông báo 3', message: 'Đây là nội dung thông báo 3' },
        { id: 4, title: 'Thông báo 4', message: 'Đây là nội dung thông báo 4' },
        { id: 5, title: 'Thông báo 5', message: 'Đây là nội dung thông báo 5' },
    ];

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
            <div className='justify-content-center'>
                <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
                    <h2 style={{
                        display: "flex", margin: "20px", marginTop: "50px", fontWeight: "bold", borderBottom: "3px solid #f9a603",
                        paddingBottom: "10px", marginBottom: '40px'
                    }}>Danh sách thông báo</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {notifications.map((notification) => (
                            <div key={notification.id} style={{
                                border: '1px solid black',
                                borderRadius: '5px',
                                padding: '15px',
                                backgroundColor: '#ffff93'
                            }}>
                                <h4>{notification.title}</h4>
                                <p>{notification.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Noti;