/////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
const signUp = document.getElementById('login-btn')
const user_id = document.getElementById('user_Id')
const user_password = document.getElementById('user_password')
const rememberMe = document.getElementById('remember-me')
let currentStatus = 'all'

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
    if (id === '' || !isNaN(id)) {
      alert('Wrong Id ')
      user_id.value = ''
      return
    }

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
// Login form
/////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
//Home Page Design

const all = document.getElementById('all')
const open = document.getElementById('open')
const close = document.getElementById('close')

const toggle = (id) => {
  const selectBtn = document.getElementById(id)
  console.log(' this ', selectBtn)
  currentStatus = id
  console.log(' this ', id)
}
// document.addEventListener('click', () => {
//   toggle()
// })
