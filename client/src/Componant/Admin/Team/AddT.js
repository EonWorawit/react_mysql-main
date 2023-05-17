import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddT = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [teamname, setTeamname] = useState("");
  const [leadername, setLeadername] = useState("");
  const [member1, setMember1] = useState("");
  const [member2, setMember2] = useState("");
  const [member3, setMember3] = useState("");
  const [member4, setMember4] = useState("");
  const [member5, setMember5] = useState("");
  const [leader, setLeader] = useState("");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://localhost:3000/users", requestOptions)
    .then((response) => response.json())
    .then((result) => setData(result))
    .catch((error) => console.log("error", error));

  const addTeam = (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      teamname: teamname,
      leadername: leadername,
      member1: member1,
      member2: member2,
      member3: member3,
      member4: member4,
      member5: member5,
      leader: leader,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3000/add/team", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "ok") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "เพิ่มทีมสำเร็จ",
            timer: 2500,
          });
          navigate("/admin/team");
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    const token = localStorage.getItem("Admin");
    fetch("http://localhost:3000/authen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
        } else {
          Swal.fire({
            icon: "error",
            title: "กรุณาลงชื่อก่อนเข้าใช้งาน",
            text: "",
            showConfirmButton: false,
            timer: 3500,
          });
          localStorage.removeItem("Admin");
          navigate("/Login");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);
  return (
    <>
      <AdminNavbar />
      <br />
      <div className="form-container">
        <form className="form-signin row g-3">
          <div>
            <h2>เพิ่มทีม</h2>
          </div>
          <div className="col-md-12">
            <label className="form-label" htmlFor="teamname">
              ชื่อทีม
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              required
              onChange={(event) => {
                setTeamname(event.target.value);
              }}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">หัวหน้าทีม</label>
            <select
              className="form-select"
              htmlFor="leadername"
              required
              onChange={(event) => {
                setLeadername(event.target.value);
              }}
            >
              <option>กรุณาเลือกหัวหน้าทีม</option>
              {data.map((val) => {
                return <option>{val.employeeName}</option>;
              })}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">สมาชิกในทีม 3</label>
            <select
              className="form-select"
              htmlFor="member3"
              onChange={(event) => {
                setMember3(event.target.value);
              }}
            >
              <option>กรุณาเลือกสมาชิกในทีม 3</option>
              {data.map((val) => {
                return <option>{val.employeeName}</option>;
              })}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">สมาชิกในทีม 1</label>
            <select
              className="form-select"
              htmlFor="member1"
              required
              onChange={(event) => {
                setMember1(event.target.value);
              }}
            >
              <option>กรุณาเลือกสมาชิกในทีม 1</option>
              {data.map((val) => {
                return <option>{val.employeeName}</option>;
              })}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">สมาชิกในทีม 4</label>
            <select
              className="form-select"
              htmlFor="member4"
              onChange={(event) => {
                setMember4(event.target.value);
              }}
            >
              <option>กรุณาเลือกสมาชิกในทีม 4</option>
              {data.map((val) => {
                return <option>{val.employeeName}</option>;
              })}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">สมาชิกในทีม 2</label>
            <select
              className="form-select"
              htmlFor="member2"
              required
              onChange={(event) => {
                setMember2(event.target.value);
              }}
            >
              <option>กรุณาเลือกสมาชิกในทีม 2</option>
              {data.map((val) => {
                return <option>{val.employeeName}</option>;
              })}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">สมาชิกในทีม 5</label>
            <select
              className="form-select"
              htmlFor="member5"
              onChange={(event) => {
                setMember5(event.target.value);
              }}
            >
              <option>กรุณาเลือกสมาชิกในทีม 5</option>
              {data.map((val) => {
                return <option>{val.employeeName}</option>;
              })}
            </select>
          </div>
          <div className="col-md-12">
            <label className="form-label">กรุณายืนยันชื่อหัวหน้าทีม</label>
            <select
              className="form-select"
              htmlFor="leader"
              required
              onChange={(event) => {
                setLeader(event.target.value);
              }}
            >
              <option>กรุณายืนยันชื่อหัวหน้าทีม</option>
              {data.map((val) => {
                return <option>{val.employeeName}</option>;
              })}
            </select>
          </div>

          <button onClick={addTeam} class="btn btn-success">
            Add Team
          </button>
        </form>
      </div>
    </>
  );
};

export default AddT;
