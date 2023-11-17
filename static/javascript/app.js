token = localStorage.getItem('accessToken')


const get_users = async () => {  
  const response = await fetch('http://localhost:8000/api/users', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  console.log(response.status, response.statusText)
  if (response.status === 200) {
    result = await response.json()
    users.innerHTML = ''
    for (user of result) {
      el = document.createElement('li')
      el.className = 'list-group-item'
      el.innerHTML = `ID: ${user.id} email: ${user.email}`
      users.appendChild(el)
    }
  }
}


const birthday_users = async () => {  
  const response = await fetch('http://localhost:8000/api/users/birthdays/', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  console.log(response.status, response.statusText)
  if (response.status === 200) {
    result = await response.json()
    
    // const birthdaysElement = document.getElementById("birthdays");
    birthdays.innerHTML = ''
    for (user of result) {
      el = document.createElement('li')
      el.className = 'list-group-item'
      el.innerHTML = `ID: ${user.id} email: ${user.email} birthday: ${user.born_date}`
      birthdays.appendChild(el)
    }
  }
}

get_users()
birthday_users()

usersCreate.addEventListener('submit', async (e) => {
  e.preventDefault()
  const response = await fetch('http://localhost:8000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: usersCreate.email.value,
    }),
  })
  if (response.status === 201) {
    console.log('Ви успішно створили користувача')
    get_users()
  }
})
