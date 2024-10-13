import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './home.css';
import { Link } from 'react-router-dom';
import { events } from './sample';

const MyEvent = () => {
    // Các ID sự kiện bạn muốn hiển thị
    const joinedEventIds = [1, 2, 3]; // ID của sự kiện đã tham gia
    const createdEventIds = [4, 5, 6]; // ID của sự kiện đã tạo

    // Lọc sự kiện dựa trên ID
    const joinedEvents = events.filter(event => joinedEventIds.includes(event.id));
    const createdEvents = events.filter(event => createdEventIds.includes(event.id));

    const [isJoinedOpen, setIsJoinedOpen] = useState(false);
    const [isCreatedOpen, setIsCreatedOpen] = useState(false);
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
            <div className='container justify-content-center'>
                <h3 style={{
                    display: "flex", margin: "20px", marginTop: "50px", fontWeight: "bold", borderBottom: "3px solid #f9a603",
                    paddingBottom: "10px"
                }}>Sự kiện đã tham gia
                    <button className="btn btn-link" onClick={() => setIsJoinedOpen(!isJoinedOpen)}>
                        {isJoinedOpen ? <img style={{}} src='triangle-up.svg' /> : <img src='triangle-down.svg' />}
                    </button>
                </h3>
                {isJoinedOpen && (
                    <div className="row">
                        {joinedEvents.map(event => (
                            <div className="col-md-4 event-card" key={event.id}>
                                <div style={{ margin: "20px" }} className="card">
                                    <img src={event.image} className="card-img-top" alt={event.title} />
                                    <div className="card-body">
                                        <Link to={`/eventinfo/${event.id}`} style={{ textDecoration: 'none', color: 'black', }}>
                                            <h5 className="card-title" style={{ fontWeight: "bold" }}  >{event.title}</h5>
                                        </Link>
                                        <span style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '0px',
                                            backgroundColor: 'black',
                                            color: 'white',
                                            border: '1px solid black',
                                            borderRadius: '0px',
                                            padding: '5px 10px',
                                            fontSize: '0.9em',
                                            zIndex: 1 // Đảm bảo tag hiển thị trên ảnh
                                        }}>
                                            {event.topic}
                                        </span>
                                        <p className="card-text">Địa Điểm: {event.location}</p>
                                        <p className="card-text">Thời Gian: {event.date}</p>
                                        <p className="card-text">Host: {event.host}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="container justify-content-center">
                <h3 style={{
                    display: "flex", margin: "20px", marginTop: "50px", fontWeight: "bold", borderBottom: "3px solid #f9a603",
                    paddingBottom: "10px"
                }}>Sự kiện đã tạo
                    <button className="btn btn-link" onClick={() => setIsCreatedOpen(!isCreatedOpen)}>
                        {isCreatedOpen ? <img style={{}} src='triangle-up.svg' /> : <img src='triangle-down.svg' />}
                    </button>
                </h3>
                {isCreatedOpen && (
                    <div className="row">
                        {/*events}.filter(event => event.type === 'tạo').map(event => (   // khi lấy dữ liệu từ api thì dùng dòng này thay cho dòng dưới*/}
                        {createdEvents.map(event => (
                            <div className="col-md-4 event-card" key={event.id}>
                                <div style={{ margin: "30px" }} className="card">
                                    <img src={event.image} className="card-img-top" alt={event.title} />
                                    <div className="card-body">
                                        <Link to={`/eventinfo/${event.id}`} style={{ textDecoration: 'none', color: 'black', }}>
                                            <h5 className="card-title" style={{ fontWeight: "bold" }}  >{event.title}</h5>
                                        </Link>
                                        <span style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '0px',
                                            backgroundColor: 'black',
                                            color: 'white',
                                            border: '1px solid black',
                                            borderRadius: '0px',
                                            padding: '5px 10px',
                                            fontSize: '0.9em',
                                            zIndex: 1 // Đảm bảo tag hiển thị trên ảnh
                                        }}>
                                            {event.topic}
                                        </span>
                                        <p className="card-text">Địa Điểm: {event.location}</p>
                                        <p className="card-text">Thời Gian: {event.date}</p>
                                        <p className="card-text">Host: {event.host}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
export default MyEvent