package springBoot_team_pj_126.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import springBoot_team_pj_126.auth.config.UserAuthProvider;
import springBoot_team_pj_126.auth.dto.CredentialsDTO;
import springBoot_team_pj_126.auth.dto.SignDTO;
import springBoot_team_pj_126.auth.entities.User;
import springBoot_team_pj_126.auth.serivce.UserService;
import springBoot_team_pj_126.dao.UserMapper;

@RequiredArgsConstructor
@RequestMapping(value="/members")
@RestController
public class AuthController {
   
   private final UserService userService;
   private final UserAuthProvider userAuthProvider;
   private final UserMapper userMapper;
   // localhost:8081
   // localhost:8081/
   
   @PostMapping("/login")
   public ResponseEntity<User> login(@RequestBody CredentialsDTO credentialsDTO) {
      
      System.out.println("<<< login >>>");
      // UserDTO user = userService.login(credentialsDTO);
      User user = userService.login(credentialsDTO);
      
      System.out.println("token : " + userAuthProvider.createToken(user.getId()));
      user.setToken(userAuthProvider.createToken(user.getId()));
      
      return ResponseEntity.ok(user);  // 새로운 JWT를 반환
   }
   
   @PostMapping("/register")
   public String register(@RequestBody SignDTO signUpDTO) {
      
      System.out.println("<<< register >>>");
      // 엔티티를 생성할 때 새 엔티티를 찾을 수 있는 URL과 함께 201 HTTP 코드를 반환하는 것이 가장 좋다.
      userService.register(signUpDTO);
      //회원가입을 할때도 토큰을 발생시킨다.
      //user.setToken(userAuthProvider.createToken(user.getLogin()));
      return "1";
   }
   
   @PostMapping("/dupleChk")
   public String dupleChk(@RequestBody SignDTO signUpDTO) {
	   
	   System.out.println("id : " + signUpDTO.getId() );
	   String dupleChk = "0";
	   User user = userMapper.findById(signUpDTO.getId());
	   if(user == null) {
		   dupleChk = "1";
	   }
	   
	   return dupleChk;
   }
   
   

}