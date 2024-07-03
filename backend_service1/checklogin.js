function LoginFunction() {
    const inpObj = 'http://localhost:3001/login';

    const inputUserName = document.getElementById("username").value;
    const inputPassword = document.getElementById("password").value;
    const linkElement = document.getElementById("BtnLogin");
    console.log(inputUserName);
    // Gửi yêu cầu kiểm tra đăng nhập đến API
  fetch(inpObj, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ usersname: inputUserName, password: inputPassword })
  })
  .then(response => {
    if (response.ok) {
        // Chuyển đến trang HTML mới nếu đăng nhập thành công
        // res.sendFile(__dirname + '/main.html');
        res.redirect('/main');
        // linkElement.href="http://localhost:3001/seach";
      } else {
        // Xử lý khi đăng nhập không thành công
        alert("Tên đăng nhập hoặc mật khẩu không chính xác");
      }
    })
    .catch(error => {
      // Xử lý khi có lỗi trong quá trình gửi yêu cầu
      console.error("Có lỗi xảy ra: ", error);
  });
  
    
  }


