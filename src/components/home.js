import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './home.css';
import { Link } from 'react-router-dom';
import { events } from './sample';

const Home = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumbers, setPageNumbers] = useState([]);
    const eventsPerPage = 9;
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchTitle, setSearchTitle] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [searchTopic, setSearchTopic] = useState('');
    const [filteredEvents, setFilteredEvents] = useState(events);

    // Khởi tạo filteredEvents và pageNumbers khi trang được tải
    useEffect(() => {
        setFilteredEvents(events);
        const newPageNumbers = [];
        for (let i = 1; i <= Math.ceil(events.length / eventsPerPage); i++) {
            newPageNumbers.push(i);
        }
        setPageNumbers(newPageNumbers);
    }, []);


    // Lọc sự kiện theo tiêu chí tìm kiếm
    const handleSearch = () => {
        console.log("Mảng events: ", events); // Kiểm tra xem mảng có đầy đủ sự kiện không
        if (!searchTitle && !searchLocation && !searchTopic && !startDate && !endDate) {
            // Nếu không có điều kiện tìm kiếm, trả về tất cả sự kiện
            setFilteredEvents(events); // Reset lại filteredEvents
            setCurrentPage(1);
            const newPageNumbers = [];
            for (let i = 1; i <= Math.ceil(events.length / eventsPerPage); i++) {
                newPageNumbers.push(i);
            }
            setPageNumbers(newPageNumbers);
            return; // Kết thúc hàm
        }

        const results = events.filter(event => {
            const matchesTitle = event.title.toLowerCase().includes(searchTitle.toLowerCase());
            const matchesLocation = event.location.toLowerCase().includes(searchLocation.toLowerCase());
            const matchesTopic = event.topic.toLowerCase().includes(searchTopic.toLowerCase());
            // Kiểm tra giá trị date hợp lệ
            const eventDate = new Date(event.date);

            const formattedEventDate = eventDate.toISOString().split('T')[0]; // Lấy chỉ phần ngày
            const matchesStartDate = startDate ? formattedEventDate >= startDate : true;
            const matchesEndDate = endDate ? formattedEventDate <= endDate : true;

            console.log({
                title: event.title,
                matchesTitle,
                location: event.location,
                matchesLocation,
                topic: event.topic,
                matchesTopic,
                formattedEventDate,
                matchesStartDate,
                matchesEndDate
            }); // Log điều kiện lọc

            return matchesTitle && matchesLocation && matchesTopic && matchesStartDate && matchesEndDate;
        });
        console.log("Kết quả tìm kiếm: ", results); // Log kết quả tìm kiếm

        setFilteredEvents(results);
        setCurrentPage(1); // Reset về trang 1 khi tìm kiếm

        // Cập nhật số trang
        const newPageNumbers = [];
        for (let i = 1; i <= Math.ceil(results.length / eventsPerPage); i++) {
            newPageNumbers.push(i);
        }
        setPageNumbers(newPageNumbers);
    };

    // Tính toán chỉ số của sự kiện bắt đầu và kết thúc
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    // Chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Số trang
    // const pageNumbers = [];
    //for (let i = 1; i <= Math.ceil(filteredEvents.length / eventsPerPage); i++) {
    //  pageNumbers.push(i);
    //}

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
            <div className="container my-4" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div className=' d-flex align-items-center'>
                    <input
                        type='search'
                        className='form-control'
                        placeholder='Tên sự kiện'
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                        style={{ border: '1px solid black', borderRadius: '10px', width: '260px' }}
                    />
                </div>
                <div className="d-flex align-items-center">
                    <input
                        className="form-control"
                        style={{ border: '1px solid black', borderRadius: '10px', width: '260px' }}
                        type='search'
                        placeholder='Địa điểm'
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                    />
                </div>
                <div className=" d-flex align-items-center" style={{}}>
                    <input
                        className="form-control"
                        style={{ border: '1px solid black', borderRadius: '10px', width: '260px' }}
                        type='search'
                        placeholder='Lĩnh vực'
                        value={searchTopic}
                        onChange={(e) => setSearchTopic(e.target.value)}
                    />

                </div>
                <div className='d-flex align-items-center' style={{ borderRadius: '10px', width: '265px', paddingInline: '0px', border: '1px solid black' }} >
                    <div >
                        <input
                            type="date"
                            className="form-control"
                            style={{ border: 'none', width: '125px', paddingInline: '2px 0px', marginInline: '0px' }}
                            value={startDate}
                            onChange={(e) => {
                                const selectedStartDate = e.target.value;
                                if (new Date(selectedStartDate) < new Date()) {
                                    alert('Ngày bắt đầu không thể trước ngày hiện tại!')
                                } else {
                                    setStartDate(selectedStartDate);
                                }
                            }}
                        />
                    </div>
                    <p style={{ padding: '0px', fontWeight: 'bold', margin: '0px' }}>-</p>
                    <div>
                        <input
                            type="date"
                            className="form-control"
                            style={{ border: 'none', width: '125px', paddingInline: '0px', marginInline: '2px 0px' }}
                            value={endDate}
                            onChange={(e) => {
                                const selectedEndDate = e.target.value;
                                if (new Date(selectedEndDate) < new Date(startDate)) {
                                    alert("Ngày kết thúc không thể trước ngày bắt đầu!");
                                } else {
                                    setEndDate(selectedEndDate);
                                }
                            }}
                        />
                    </div>
                </div>
                <button
                    style={{ borderRadius: "50%", display: 'flex', alignContent: "center", justifyContent: "center", paddingInline: "20px", width: '40px', height: '40px', marginLeft: '10px' }}
                    className="btn beebut"
                    onClick={handleSearch}>
                    <img src='search.svg' alt='Tìm' style={{ height: '20px', width: '20px' }} />
                </button>
            </div>

            <div className="container">
                <div className="row">
                    {currentEvents.length > 0 ? (
                        currentEvents.map(event => (
                            <div className="col-md-4 event-card" key={event.id}>
                                <div style={{ margin: "20px" }} className="card">
                                    <img src={event.image} className="card-img-top" alt={event.title} />
                                    <div className="card-body">
                                        <Link to={`/eventinfo/${event.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                            <h5 style={{ fontWeight: "bold" }} className="card-title">{event.title}</h5>
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
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <p style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Helvetica' }}>Không tìm thấy kết quả nào!</p>
                        </div>
                    )}
                </div>
                {currentEvents.length > 0 && (
                    <div style={{ justifyContent: 'center', display: 'flex' }}>
                        <nav>
                            <ul className="pagination" style={{ border: "1px solid black", borderRadius: '5px' }}>
                                {pageNumbers.map(number => (
                                    <li key={number} className="page-item">
                                        <a onClick={() => paginate(number)} href="#" className="page-link">
                                            {number}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </div >
    );
}

export default Home;