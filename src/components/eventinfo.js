import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './home.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { events } from './sample';
import Modal from './modal';

const Eventinfo = () => {
    const { id } = useParams(); //truyền id sự kiện
    const navigate = useNavigate();
    const idset = new Set([4, 5, 6]);

    // State để quản lý tham gia và bình luận
    const [event, setEvent] = useState(null);
    const [isJoined, setIsJoined] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [tempInfo, setTempInfo] = useState({});
    const [newImage, setNewImage] = useState('');

    useEffect(() => {
        const foundEvent = events.find(event => event.id === parseInt(id));
        if (foundEvent) {
            setEvent(foundEvent);
            setTempInfo(foundEvent); // Khởi tạo tempInfo với sự kiện tìm thấy
        } else {
            setError('Không tìm thấy sự kiện.');
        }
        setLoading(false);
    }, [id]);

    const handleJoin = () => {
        if (isJoined) {
            alert('Huỷ tham gia sự kiện thành công!');
            setIsJoined(prev => !prev);
        } else {
            alert('Tham gia sự kiện thành công!');
            setIsJoined(prev => !prev);
        }
    };
    const handleEdit = () => {
        setTempInfo(event);
        setIsEditing(true);
    };
    const handleCancelEdit = () => {
        setIsEditing(false);
        setTempInfo(event);
    };

    const handleSaveEdit = () => {
        const isValid = tempInfo.title.trim() !== "" && tempInfo.location.trim() !== "";
        if (!isValid) {
            alert('Tên và địa điểm không được để trống!');
            return;
        } else {
            // Nếu có ảnh mới, cập nhật ảnh cho sự kiện
            if (newImage) {
                tempInfo.image = newImage;
            }
            setEvent({ ...tempInfo }); // Cập nhật sự kiện với thông tin mới
            setIsEditing(false);
            alert('Chỉnh sửa thông tin thành công!');
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleDelete = () => {
        alert('Sự kiện đã được huỷ thành công!');
        navigate('../myevent');
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            // Giả lập thêm bình luận vào mảng
            setComments([...comments, { uid: 1, name: 'Admin', content: newComment, createAt: new Date() }]);
            setNewComment('');
        }
    };

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>{error}</p>;
    if (!event) return <h2>Không tìm thấy sự kiện</h2>;

    return (
        <div>
            <header>
                <div className="header d-flex justify-content-between align-items-center">
                    <div className="logo mx-3">
                        <img src="../eventure.png" alt="Logo" height="40" />
                    </div>

                    <nav>
                        <ul className="nav d-flex">
                            <Link className="nav-link" to="/home" title='Trang chủ'><img src="../home.svg" alt="Trang chủ" /></Link>
                            <Link className="nav-link" to="/account" title='Tài khoản'><img src="../user-circle.svg" alt="Tài khoản" /></Link>
                            <Link className="nav-link" to="/myevent" title='Danh sách sự kiện'><img src="../star.svg" alt="Sự kiện" /></Link>
                            <Link className="nav-link" to="/noti" title='Thông báo'><img src="../bell.svg" alt="Thông Báo" /></Link>
                            <Link className="nav-link" to="/create" title='Tạo sự kiện'><img src='../plus.svg' alt="Tạo sự kiện" /></Link>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className='container justify-content-center mb-5'>
                <div className='container justify-content-center mb-5'>
                    {isEditing ? (
                        <h3 style={{
                            display: "flex", margin: "20px", marginTop: "50px", fontWeight: "bold", borderBottom: "3px solid #f9a603",
                            paddingBottom: "10px"
                        }} className="event-info">
                            <input
                                type="text"
                                value={tempInfo.title}
                                className='typeplace'
                                onChange={(e) => setTempInfo({ ...tempInfo, title: e.target.value })}
                            />
                        </h3>
                    ) : (
                        <h3 style={{
                            display: "flex", margin: "20px", marginTop: "50px", fontWeight: "bold", borderBottom: "3px solid #f9a603",
                            paddingBottom: "10px"
                        }} className="event-info">{event.title}</h3>
                    )}
                    <img src={`${process.env.PUBLIC_URL}/${event.image}`} alt={event.title} style={{ height: "380px", width: "500px", margin: "20px auto", display: "block", borderRadius: '5px', paddingTop: '20px' }} />
                    {isEditing && (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setNewImage(URL.createObjectURL(e.target.files[0]))}
                            className='form-control mt-2 typeplace'
                            style={{ marginLeft: '40px' }}
                        />
                    )}
                    <div className="event-body">
                        <h4 className='small-underline'>Địa Điểm</h4>
                        {isEditing ? (
                            <input
                                type="text"
                                style={{ marginLeft: '40px' }}
                                value={tempInfo.location}
                                className='typeplace'
                                onChange={(e) => setTempInfo({ ...tempInfo, location: e.target.value })}
                            />
                        ) : (
                            <p style={{ marginLeft: '40px' }}>{event.location}</p>
                        )}
                        <h4 className='small-underline'>Thời Gian</h4>
                        <p style={{ marginLeft: '40px' }}>{event.date}</p>
                        <h4 className='small-underline'>Host</h4>
                        <p style={{ marginLeft: '40px' }}>{event.host}</p>
                        <h4 className='small-underline'>Lĩnh Vực</h4>
                        {isEditing ? (
                            <input
                                type="text"
                                value={tempInfo.topic}
                                className='typeplace'
                                style={{ marginLeft: '40px' }}
                                onChange={(e) => setTempInfo({ ...tempInfo, topic: e.target.value })}
                            />
                        ) : (
                            <p style={{ marginLeft: '40px' }}>{event.topic}</p>
                        )}
                        <h4 className='small-underline'>Mô Tả</h4>
                        {isEditing ? (
                            <textarea
                                value={tempInfo.des}
                                className='typeplace'
                                style={{ marginLeft: '40px' }}
                                onChange={(e) => setTempInfo({ ...tempInfo, des: e.target.value })}
                            />
                        ) : (
                            <p style={{ marginLeft: '40px' }}>{event.des}</p>
                        )}
                    </div>
                    <div className='d-flex justify-content-center'>
                        {idset.has(parseInt(id)) ? (
                            <>
                                {isEditing ? (
                                    <>
                                        <button onClick={handleSaveEdit} className="btn okbut" style={{ marginTop: '20px' }}>Hoàn tất</button>
                                        <button onClick={handleCancelEdit} className="btn beebut" style={{ marginLeft: '20px', marginTop: '20px' }}>Huỷ</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={handleEdit} className="btn beebut">Chỉnh sửa</button>
                                        <button onClick={openModal} className="btn dangerbut" style={{ marginLeft: '20px' }}>Huỷ bỏ sự kiện</button>
                                        <Modal isOpen={isModalOpen} onClose={closeModal}>
                                            <h2>Lưu ý:</h2>
                                            <p>Bạn có chắc muốn huỷ bỏ sự kiện vĩnh viễn không? Hành động này sẽ không thể hoàn tác! </p>
                                            <p style={{ fontSize: '13px', color: '#dc3546' }}>Không thể huỷ bỏ sự kiện khi sự kiện đã tạo sẽ diễn ra trong vòng 7 NGÀY tới</p>
                                            <button className='btn dangerbut' onClick={handleDelete}>Huỷ bỏ sự kiện</button>
                                            <button className='beebut' onClick={closeModal} style={{ marginLeft: '20px' }}>Huỷ</button>
                                        </Modal>
                                    </>
                                )}
                            </>
                        ) : (
                            isJoined ? (
                                <>
                                    <button onClick={handleJoin} className="btn beebut">Huỷ Tham Gia</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={handleJoin} className="btn nav-link-ap">Tham Gia</button>
                                </>
                            )
                        )}
                    </div>
                    <div className="comments-section mt-4">
                        <h4 className='small-underline'>Bình luận</h4>
                        <div style={{ marginLeft: "40px" }}>
                            {comments.map((comment, index) => (
                                <div key={index} className="comment" style={{ paddingBottom: '20px' }}>
                                    <strong>{comment.name}:</strong>
                                    <p>{comment.content}</p>
                                    <small style={{ float: 'right' }}>{new Date(comment.createAt).toLocaleString()}</small>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleCommentSubmit}>
                            <textarea style={{ marginLeft: '40px', width: '500px', border: '1px solid black' }}
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Thêm bình luận..."
                                className="form-control mt-2"
                            />
                            <div >
                                <button style={{ borderRadius: '20px', padding: '7px 20px', marginLeft: '40px' }} type="submit" className="btn beebut mt-2">Gửi</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Eventinfo