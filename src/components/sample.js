import React from 'react';

const users = [
    {
        uid: 1,
        email: 'admin@gmail.com',
        password: '123',
        name: 'Nguyễn Thị Admin',
        des: 'Yêu thích công nghệ và lập trình',
        image: 'avatarex.webp',
        vericode: 'abc',
        create: [4, 5, 6]
    },
    {
        uid: 2,
        email: 'user@gmail.com',
        password: '456',
        name: 'Nguyễn Văn User',
        des: 'Người dùng mới',
        image: 'avatarex2.jpg',
        vericode: 'abc',
        create: [4, 5, 6]
    }
];
export { users };

const events = [
    {
        id: 1,
        title: 'Sự Kiện 1',
        location: 'Hà Nội',
        date: '2024-10-15',
        host: 'Công Ty ABC',
        topic: 'Thể thao',
        image: 'badminton.jpg',
        des: 'Sự kiện thể thao hấp dẫn nhất năm.'
    },
    {
        id: 2,
        title: 'Sự Kiện 2',
        location: 'TP. Hồ Chí Minh',
        date: '2024-10-16',
        host: 'Công Ty XYZ',
        topic: 'Giải trí',
        image: 'party.webp',
        des: 'Tiệc mừng cho nhân viên công ty.'
    },
    {
        id: 3,
        title: 'Sự kiện 3',
        location: 'Hà Nội',
        date: '2024-11-12',
        host: 'Trường DEF',
        topic: 'Kỷ niệm',
        image: 'celebration.jpg',
        des: 'Kỷ niệm 10 năm thành lập trường DEF.'
    },
    {
        id: 4,
        title: 'Sự Kiện 4',
        location: 'Đà Nẵng',
        date: '2024-10-18',
        host: 'Công Ty MNO',
        topic: 'Âm nhạc',
        image: 'yearend.jpg',
        des: 'Lễ hội cuối năm tuyệt vời tại Đà Nẵng.'
    },
    {
        id: 5,
        title: 'Sự Kiện 5',
        location: 'Cần Thơ',
        date: '2024-11-19',
        host: 'Công Ty QRS',
        topic: 'Giáo dục',
        image: 'conference.jpg',
        des: 'Hội nghị giáo dục quốc gia tại Cần Thơ.'
    },
    {
        id: 6,
        title: 'Sự Kiện 6',
        location: 'Đà Lạt',
        date: '2024-12-05',
        host: 'Công Ty TUV',
        topic: 'Âm nhạc',
        image: 'musicfestival.jpg',
        des: 'Lễ hội âm nhạc lớn tại Đà Lạt.'
    },
    {
        id: 7,
        title: 'Sự Kiện 7',
        location: 'Điện Biên',
        date: '2025-01-20',
        host: 'Công Ty WXY',
        topic: 'Giải trí',
        image: 'reunion.jpg',
        des: 'Họp mặt cộng đồng tại Điện Biên.'
    },
    {
        id: 8,
        title: 'Sự Kiện 8',
        location: 'Hải Phòng',
        date: '2025-02-28',
        host: 'Công Ty ABCD',
        topic: 'Ẩm thực',
        image: 'foodparty.jpeg',
        des: 'Tiệc ẩm thực tại Hải Phòng với nhiều món ngon.'
    },
    {
        id: 9,
        title: 'Sự Kiện 9',
        location: 'Hà Nội',
        date: '2025-03-30',
        host: 'Công Ty EFG',
        topic: 'Thể thao',
        image: 'sportscelebration.jpg',
        des: 'Kỷ niệm thành công của đội thể thao quốc gia.'
    },
    {
        id: 10,
        title: 'Sự Kiện 10',
        location: 'Đà Nẵng',
        date: '2025-03-10',
        host: 'Công Ty HIJ',
        topic: 'Giáo dục',
        image: 'educationconference.jpg',
        des: 'Hội nghị giáo dục với sự tham gia của nhiều diễn giả nổi tiếng.'
    }
];
export { events };

const comments = [
    { uid: 1, name: 'Admin', content: "Bình luận 1", createAt: new Date() },
    { uid: 2, name: 'User', content: "Bình luận 2", createAt: new Date() }
];
export { comments };