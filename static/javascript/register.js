const form = document.forms[0]

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const response = await fetch('http://localhost:8000/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
        username: form.username.value,
        email: form.email.value,
        password: form.password.value,
    }),
  })
  console.log(response.status, response.statusText)
  if (response.status === 200) {
    result = await response.json()
    localStorage.setItem('accessToken', result.access_token)
    localStorage.setItem('refreshToken', result.refresh_token)
    window.location = '/index.html'
  }
})