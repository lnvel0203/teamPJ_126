package springBoot_team_pj_126.auth.config;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import lombok.RequiredArgsConstructor;
import springBoot_team_pj_126.auth.entities.User;
import springBoot_team_pj_126.auth.serivce.UserService;

@RequiredArgsConstructor
@Component
public class UserAuthProvider {

	private final UserService userService;

	//JWT를 생성하고 읽으려면 비밀키가 반드시 필요하다.
	//에플리케이션 yml파일에서 구성하고 여기 주입한다.
	//그러나 JVM에서 기본값을 가질수도있다.
	//토큰의 시크릿 키값을 설정하기위함이다.
	//-JVM기본값 갖는 형식이다.
	@Value("${key:secret-value}")	//import org.springframework.beans.factory.annotation.Value;
	private String secretKey;

	@PostConstruct
	protected void init() {
		// 일단 text로 된 비밀키를 피하기 위해 base64로 인코딩한다.
		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}
	public String createToken(String id) {
		System.out.println("UserAuthProvider - token");
		Date now = new Date();
		Date validity = new Date(now.getTime() + 360000000); // 토큰 유효시간 1시간

		return JWT.create()
				.withIssuer(id)
				.withIssuedAt(now)
				.withExpiresAt(validity)
				.sign(Algorithm.HMAC256(secretKey));
	}

	public Authentication validateToken(String token) {	//import org.springframework.security.core.Authentication;
		System.out.println("UserAuthProvider - validateToken");

		//import com.auth0.jwt.JWTVerifier; -- class인걸로 가져와야함.
		JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secretKey)).build();
		DecodedJWT decoded = verifier.verify(token);	// JWT를 확인하기 위해 디코딩을 먼저한다.
		// 유효시간을 초과하면 - 예외를 발생시켜야한다.

		User user = userService.findById(decoded.getIssuer());
		//사용자가 내 데이터베이스에 존재하는지 확인하기.
		return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());

	}
}
