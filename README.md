# Not complete


## DB Info
./only_dev/DBTableInfo

* UserAccount
  * : 사용자 정보와 엑세스 권한

* RequestSignUp
  * : 요청된 회원가입 리스트


## routers Info
./only_dev/routerInfo

* router.post /User/DeleteAccount
  * : 계정을 삭제

* router.get /User/SignOut
  * : 로그아웃

* router.post /user/SingIn
  * : 로그인

* router.post /user/SingUp
  * : 회원가입 및 회원가입 요청을 마무리할 수 있는 메일 전송

* router.get /user/SingUpConfirm
  * : 요청된 회원가입을 마무리

* router.get /user/UpdateAccess
  * : 엑세스 권한을 업데이트