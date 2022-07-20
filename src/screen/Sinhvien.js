import React, { useEffect, useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import './Css/dashboard.css'
import { FaUserGraduate, FaTachometerAlt, FaSignInAlt } from 'react-icons/fa'
import { IoEyeSharp } from 'react-icons/io5'
import { ImProfile } from 'react-icons/im'
import { BsPencilSquare, BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { MdDelete, MdPersonAdd } from 'react-icons/md'
import { Link, useNavigate } from "react-router-dom";
import { Table, Modal, Text } from "@nextui-org/react";
import Avatar from 'react-avatar';
import { db } from "./firebase";
import Pagination from './Paginate';
import { Form, Button } from "react-bootstrap"
import { collection, getDocs, deleteDoc, onSnapshot, where, query, doc, orderBy, limit, getDoc } from 'firebase/firestore'
const Sinhvien = () => {
  const [sinhvien, setSinhvien] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const sinhvienCollectionRel = collection(db, "sinhvien")
  const getSinhvien = async () => {
    const data = await getDocs(sinhvienCollectionRel, orderBy("tensv"), limit(2));
    setSinhvien(data.docs.map((doc) => ({
      ...doc.data(), id: doc.id
    })));
  };
  useEffect(() => {
    getSinhvien();
  }, []);
  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Xác nhận xóa',
      message: 'Bạn có chắc chắn muốn xóa Sinh viên này không ?',
      buttons: [
        {
          label: 'Có',
          onClick: async () => {
            const sinhvienDef = doc(db, "sinhvien", id);
            await deleteDoc(sinhvienDef);
            getSinhvien();
          }
        },
        {
          label: 'Không',
          onClick: () => true
        }
      ]
    })
  }
  const handelLogOut = () => {
    localStorage.clear();
    navigate("/")
  }
  const clickHoc = async (e) => {
    console.log("clickHoc")
    e.preventDefault();
    const collectionClick = collection(db, "sinhvien");
    const query1 = query(collectionClick, where("trangthai", "==", `Đang học`));
    const unsub1 = onSnapshot(query1, (snapshot) =>
      setSinhvien(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, key: doc.id })))

    );
    return (unsub1)
  }
  const clickXong = async (e) => {
    e.preventDefault();
    const collectionXong = collection(db, "sinhvien");
    const queryXong = query(collectionXong, where("trangthai", "==", `Đã tốt nghiệp`));
    const Xong = onSnapshot(queryXong, (snapshot) =>
      setSinhvien(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, key: doc.id })))
    );
    console.log("sinhvien", sinhvien);
    return (Xong);
  }
  const handleUp = async (e) => {
    e.preventDefault();
    const collectionSort = collection(db, "sinhvien");
    const querySort = query(collectionSort, orderBy("masv", "asc"));
    const SortOko = onSnapshot(querySort, (snapshot) =>
      setSinhvien(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, key: doc.id })))
    );
    console.log("sinhvien", sinhvien);
    return (SortOko);
  }
  const handleDow = (e) => {
    e.preventDefault()
    const collectionDow = collection(db, "sinhvien");
    const queryDow = query(collectionDow, orderBy("masv", "desc"));
    const SortDow = onSnapshot(queryDow, (snapshot) =>
      setSinhvien(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, key: doc.id })))
    );
    console.log("sinhvien", sinhvien);
    return (SortDow);
  }
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 5;
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = sinhvien.slice(indexOfFirstTodo, indexOfLastTodo);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  //
  const [masv, setMa] = useState('');
  const [tensv, setTen] = useState('');
  const [email, setEmail] = useState('');
  const [trangthai, setTrangthai] = useState('');
  const [diachi, setDiachi] = useState('');
  const [khoa, setKhoa] = useState('');
  const [sdt, setSdt] = useState('');
  const [ngaysinh, setNgaysinh] = useState('');
  const [lop, setLop] = useState('');
  const [img, setImg] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const handleModel = async (id) => {
    setVisible(true);
    const sinhvien = await getDoc(doc(db, "sinhvien", id))
    if (sinhvien.exists()) {
      setMa(sinhvien.data().masv)
      setTen(sinhvien.data().tensv)
      setKhoa(sinhvien.data().khoa)
      setTrangthai(sinhvien.data().trangthai)
      setEmail(sinhvien.data().email)
      setDiachi(sinhvien.data().diachi)
      setLop(sinhvien.data().lop)
      setNgaysinh(sinhvien.data().ngaysinh)
      setSdt(sinhvien.data().sdt)
      setImg(sinhvien.data().img)
    } else {

    }

  }
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  return (
    <div className="body">
      <div className='main_left'>
        <div className='mf_content'>
          <h5>Quản lý sinh viên</h5>
        </div>
        <hr className='hr' />
        <div id="menu">
          <ul>
            <Link className="a" to="/sinhvien"><li className='active'><div className='icon'><FaUserGraduate size={22} /></div>Sinh viên</li></Link>
            <Link className="a" to="/profile"><li className='li'><div className='icon'><ImProfile size={22} /></div>Tiểu sử</li></Link>
            {/* <li className='li'><div className='icon'><ImTable size={22} /></div>Thời khóa biểu</li> */}
            <button className="buttonLog" onClick={handelLogOut}>
              <li className='li'><div className='icon'><FaSignInAlt size={22} /></div>
                Đăng xuất
              </li>
            </button>
          </ul>
        </div>
      </div>
      <div className='main_right'>
        <div className='mr_top'>
          <div className='mr_top_ql'>
            <div className='top_ql_right'>
              <div className='top_ql_right_1'>
                <div className='right_1_icon'>
                  <Link to="/"><FaUserGraduate color='silver' /></Link>
                </div>
                <div className='right_1_text'> / Sinh viên </div>
              </div>
              <div className='top_ql_right_1'>
                <h6 className='ql_h6'>Sinh viên</h6>
              </div>
            </div>
            <div className='right_2_icon'>
              <div className='icon_2'>
                <h6>Hello, {localStorage.getItem("email")}</h6>
                {/* <Link to="/"><FaUserCircle color='silver' size={25} /></Link> */}
              </div>
              {/* <div className='icon_2'>
                <Link to="/"><IoNotificationsCircle color='silver' size={30} /></Link>
              </div> */}
            </div>
          </div>
        </div>
        <div className="mr_mid">
          <div>
            <h4>Danh sách sinh viên</h4>
          </div>
          <div>
            <Link to="/add" ><MdPersonAdd size={40} color="Silver" /></Link>
          </div>
        </div>
        <div className="search">
          <Form>
            <div className="form">
              <div className="input">
                {/* <Form.Control className="t_input" type="text" placeholder="Tìm kiếm ..."
                  onChange={(e) => setSearch(e.target.value)} value={search} onKeyUp={searchRecords} /> */}
                <Form.Control className="t_input" type="text" placeholder="Tìm kiếm ..."
                  onChange={(e) => setSearch(e.target.value)} value={search} />
              </div>
              <div className="input2">
                <label>Trạng thái:</label>
                <div><Button onClick={clickHoc}>Đang học</Button></div>
                <div><Button onClick={clickXong}>Đã tốt nghiệp</Button></div>
              </div>
            </div>
          </Form>
          {/* <div>
            <select>
              <option>Đang học</option>
              <option>Bảo lưu</option>
            </select>
          </div> */}
        </div>
        <div className="change_list">
          <Link to="/sinhvien"><Button>Xem sinh viên theo dạng bảng</Button></Link>
          <Link to="/gridview"><Button>Xem sinh viên theo dạng lưới</Button></Link>
        </div>
        <div className="list_sv">
          <Table
            aria-label="Example table with static content"
            css={{
              height: "auto",
              minWidth: "100%",
              zIndex: "0",
              boxShadow: "1px 2px 10px 1px #888888"
            }}
          >
            <Table.Header>
              <Table.Column>STT</Table.Column>
              <Table.Column>SINH VIÊN</Table.Column>
              <Table.Column style={{ display: 'flex', alignItems: 'center' }}>MÃ SINH VIÊN
                <button onClick={handleDow}><BsArrowDown size={18} /></button>
                <button onClick={handleUp}><BsArrowUp size={18} /></button>
              </Table.Column>
              {/* <Table.Column>LỚP</Table.Column> */}
              <Table.Column>TRẠNG THÁI</Table.Column>
              <Table.Column>XỬ LÝ</Table.Column>
            </Table.Header>
            <Table.Body>
              {currentTodos.filter((sinhvien) => {
                if (search === "") {
                  return sinhvien;
                } else if (
                  sinhvien.masv.toLowerCase().includes(search) ||
                  sinhvien.tensv.toLowerCase().includes(search.toLowerCase())
                ) {
                  return sinhvien;
                }
              }).map((sinhvien, i) => {
                return (
                  <Table.Row key={sinhvien.id} >
                    <Table.Cell>{i + 1}</Table.Cell>
                    <Table.Cell>{sinhvien.tensv}
                    </Table.Cell>
                    <Table.Cell>{sinhvien.masv}</Table.Cell>
                    {/* <Table.Cell>{sinhvien.lop}</Table.Cell> */}
                    <Table.Cell>{sinhvien.trangthai}</Table.Cell>
                    <Table.Cell>
                      <div style={{ display: 'flex' }}>

                        <button className="button1" onClick={(e) => handleModel(sinhvien.id)}>
                          <IoEyeSharp size={22} color="silver" />
                        </button>
                        <Link to={`/edit/${sinhvien.id}`}>
                          <BsPencilSquare size={22} color="silver" />
                        </Link>
                        <button className="button1" onClick={(e) => handleDelete(sinhvien.id)} ><MdDelete size={22} color="silver" /></button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
          <Modal
            closeButton
            width="600px"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            open={visible}
            onClose={closeHandler}
          >
            <Modal.Header>
              <Text b size={18}>
                Thông tin sinh viên
              </Text>
            </Modal.Header>
            <Modal.Body>
              <div className="modal_detail">
                <Avatar
                  size={150}
                  src={img} />
                <div className="modal_tail">
                  <h5>Họ tên: {tensv}</h5>
                  <p>Khoa: {khoa}</p>
                  <p>Lớp: {lop}</p>
                  <p>Mã sinh viên: {masv}</p>
                  <p>Ngày sinh: {ngaysinh}</p>
                  <p>Email: {email}</p>
                  <p>Số điện thoại: {sdt}</p>
                  <p>Địa chỉ: {diachi}</p>
                  <p>Trạng thái: <span style={{ color: 'red' }}>{trangthai}</span></p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button auto flat color="error" onClick={closeHandler}>
                Đóng
              </Button>
            </Modal.Footer>
          </Modal>
          <div className="div_pagin">
            <Pagination
              todosPerPage={todosPerPage}
              totalTodos={sinhvien.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Sinhvien