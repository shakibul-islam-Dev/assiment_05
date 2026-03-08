if (signUp) {
  window.onload = () => {
    const savedId = localStorage.getItem('saveId')
    const savePassword = localStorage.getItem('savePassword')
    if (savedId && savePassword) {
      user_id.value = savedId
      user_password.value = savePassword
      rememberMe.checked = true
    }
  }
  signUp.addEventListener('click', () => {
    // Error decetor
    const id = user_id.value
    const password = user_password.value

    if (password.length > 9) {
      alert('Password cannot be more than 9 characters')
      user_password.value = ''
      return
    }
    //Sucess code
    if (id === 'admin' && password === 'admin123') {
      my_modal_3.showModal()
      if (rememberMe && rememberMe.checked) {
        localStorage.setItem('saveId', id)
        localStorage.setItem('savePassword', password)
      }
      setTimeout(() => {
        window.location.assign('./home.html')
      }, 1000)
    } else {
      alert('Login Failed: Wrong ID or Password')
      user_password.value = ''
      return
    }
  })
}
