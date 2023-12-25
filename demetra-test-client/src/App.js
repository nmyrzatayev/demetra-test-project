import { Button, Card, Container, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [userId, setUserId] = useState('')
  const [userData,setUserData] = useState(null)

  const proxyConfig = {
    host: '45.196.48.9',
    port: 5435,
    auth: {
      username: 'jtzhwqur',
      password: 'jnf0t0n2tecg',
    },
  };

  const axiosInstance = axios.create({
    proxy: {
      host: proxyConfig.host,
      port: proxyConfig.port,
      auth: {
        username: proxyConfig.auth.username,
        password: proxyConfig.auth.password,
      },
    },
  });


  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance.post('http://localhost:5000/user', formValues).then((response) => {
      if (response.status == 201) {
        alert('Пользователь успешно зарегистрирован')
      }
    }).catch((e) => {
      if(e.response.data.message=="ERR_USER_EMAIL_EXISTS") {
        alert('Пользователь с таким Email уже существует')
      }
    });

  }

  const handleGetUser = (e) => {
    e.preventDefault();
    axiosInstance.get('http://localhost:5000/user/get-user-by-id/' + userId).then((response) => {
      if (response.status == 200) {
        setUserData(response.data)
      }
    }).catch((e)=>{
      if(e.response.data.message="ERR_USER_NOT_FOUND") {
        setUserData(null)
        alert('Пользователь не найден')
      }
    })
  }

  return (
    <div className="App">
      <Container style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 100,
        gap: 30
      }}>
        <Form onSubmit={(e) => handleSubmit(e)} >
          <Card>
            <Card.Header>
              <h5>Регистрация</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className='mb-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  required={true}
                  placeholder='Иван'
                  value={formValues.name}
                  onChange={(e) => {
                    setFormValues((prev) => ({
                      ...prev,
                      name: e.target.value
                    }))
                  }} />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required={true}
                  placeholder='ivan@example.com'
                  value={formValues.email}
                  onChange={(e) => {
                    setFormValues((prev) => ({
                      ...prev,
                      email: e.target.value
                    }))
                  }} />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required={true}
                  placeholder='********'
                  value={formValues.password}
                  onChange={(e) => {
                    setFormValues((prev) => ({
                      ...prev,
                      password: e.target.value
                    }))
                  }} />
              </Form.Group>
            </Card.Body>
            <Card.Footer>
              <Button type="submit" className='w-100'>Создать пользователя</Button>
            </Card.Footer>
          </Card>




        </Form>

        <Form onSubmit={(e) => handleGetUser(e)}>
          <Card>
            <Card.Header>
              <h5>Найти пользователя по ID</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className='mb-3'>
                <Form.Label>ID пользователя</Form.Label>
                <Form.Control
                  type="text"
                  required={true}
                  placeholder='1'
                  value={userId}
                  onChange={(e) => {
                    setUserId(e.target.value)
                  }} />
              </Form.Group>

              {
                userData && <ul className='list-group'>
                  <li className='list-group-item'>Имя: {userData.name}</li>
                  <li className='list-group-item'>Почта: {userData.email}</li>
                </ul>
              }

            </Card.Body>
            <Card.Footer>
              <Button type="submit" className='w-100'>Найти</Button>
            </Card.Footer>
          </Card>
        </Form>
      </Container>
    </div>
  );
}

export default App;
