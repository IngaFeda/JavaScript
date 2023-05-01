import { useState, useEffect } from 'react';
import './App.scss';
import { v4 as uuidv4 } from 'uuid';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Error from './components/messError';
import Success from './components/messSuccess';
import Add from './components/messAdd';
import Minus from './components/messMinus';
import Submit from './components/messSubmit';
import Sort from './components/messSort';
import Warning from './components/messWarning';
import axios from 'axios';

const url = 'http://localhost:3009/clients';

function App() {

  const [users, setUsers] = useState([]);
  const [inputs, setInputs] = useState({});
  const id = uuidv4().slice(0, 2);

  const [isSuccess, setIsSuccess] = useState(null);
  const [isAdded, setIsAdded] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(null);
  const [isWarn, setIsWarn] = useState(null);

  //set users
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsers(users => [...users, { id: id, name: inputs.firstName, last_name: inputs.lastName, account: 0 }])
    setIsSubmitted(true);
  }

  useEffect(() => {
    if (localStorage.getItem('users')) {
      axios.get(url)
        .then(res => {
          setUsers(res.data.clients);
        });
    } else {
      setUsers([]);
    }
  }, []);

  useEffect(() => {
    if (!users) {
      return;
    }
    axios.post(url, { client: users })
      .then(res => {
        localStorage.setItem('users', JSON.stringify(users));
      });

  }, [users]);

  //delete user with 0 account 

  const removeIt = id => {
    const data = JSON.parse(localStorage.getItem('users'));
    const key = data.findIndex(row => id === row.id);
    if (data[key].account) {
      setIsSuccess(false);
      return;
    }
    data.splice(key, 1);
    setIsSuccess(true);
    localStorage.setItem('users', JSON.stringify(data));
    setUsers(data);
  }

  //type amount in input
  const [text1, setText1] = useState(0);

  const handleChange1 = e => {
    setText1(e.target.value);
  }

  //add amount
  const add = id => {
    const data = JSON.parse(localStorage.getItem('users'));
    const key = data.findIndex(row => id === row.id);
    data[key].account += +text1;
    setIsAdded(true);
    localStorage.setItem('users', JSON.stringify(data));
    setUsers(data);
  }

  //withdraw amount
  const minus = id => {
    const data = JSON.parse(localStorage.getItem('users'));
    const key = data.findIndex(row => id === row.id);
    data[key].account -= +text1;
    if (text1 > data[key].account) {
      return setIsWarn(true);
    }
    setIsAdded(false);
    localStorage.setItem('users', JSON.stringify(data));
    setUsers(data);
  }

  //sort by surname
  const sorting = _ => {
    const data = JSON.parse(localStorage.getItem('users'));
    data.sort((a, b) => a.last_name > b.last_name ? 1 : -1);
    setIsSubmitted(false);
    localStorage.setItem('users', JSON.stringify(data));
    setUsers(data);
  }

  //show all users
  const show = _ => {
    const data = JSON.parse(localStorage.getItem('users'));
    localStorage.setItem('users', JSON.stringify(data));
    setUsers(data);
  }

  //filter array
  const filtered = _ => {
    const data = JSON.parse(localStorage.getItem('users')).filter(s => s.account > 0);
    setUsers(data);
  }

  return (

    <div className="main">
      <div className="amount d-flex m-3 gap-3">
        <div>
          <p>The number of customers: {('' + users.length) || users.length < 0}</p>

        </div>
        <div>
          <p>The total amount: {('' + users.map(item => item.account).reduce((prev, curr) => prev + curr, 0))}</p>
        </div>
      </div>

      <div className="box2">
        <div className="box1">
          <div className="container col-10">
            <h3>Add new account</h3>
            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <label className="form-label" htmlFor="name">First name:</label>
                <input
                  type="type"
                  className="field"
                  name="firstName"
                  value={inputs.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <label className="form-label" htmlFor="name">Last name:</label>
                <input
                  type="type"
                  className="field"
                  name="lastName"
                  value={inputs.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="btn btn-outline-light d-block ms-auto mt-2" type="submit">Submit</button>
            </form>
            <div className="mt-5">
              <button className="btn btn-outline-light" type="submit" onClick={sorting}>To sort by surname</button>
            </div>
            <div className="mt-3">
              <button className="btn btn-outline-light" type="submit" onClick={show}>Current accounts</button>
            </div>
            <div className="mt-3">
              <button className="btn btn-outline-light" type="submit" onClick={filtered}>Filter accounts</button>
            </div>
          </div>
        </div>

        <div className="d-flex">
          <div className="box">
            <div className="table" >
              <h3>All accounts</h3>
              <table style={{ textAlign: 'center' }}>
                <thead>
                  <tr>
                    <th>Full name</th>
                    <th>Total amount</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {
                      users.map(s =>
                        <tr key={s.id}>
                          <td>{s.name} {s.last_name}</td>
                          <td>{s.account}</td>
                          <td><button className="btn btn-outline-light" onClick={() => removeIt(s.id)}>Delete</button></td>
                          <td>
                            <div className="input gap-1 ">
                              <input
                                type="type"
                                className="field1"
                                name="account"
                                prefix="£"
                                value={text1.account}
                                onChange={handleChange1}
                              />
                              <button className="btn btn-outline-light" type="submit" onClick={() => add(s.id)}>Add</button>
                              <button className="btn btn-outline-light" type="submit" onClick={() => minus(s.id)}>Withdraw</button>
                            </div></td>
                        </tr>)
                    }
                  </>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="msg">
        {isSuccess === true && <Success />}
        {isSuccess === false && <Error />}
        {isAdded === true && <Add />}
        {isAdded === false && <Minus />}
        {isSubmitted === true && <Submit />}
        {isSubmitted === false && <Sort />}
        {isWarn === true && <Warning />}
      </div>
    </div>
  );

}



export default App;
