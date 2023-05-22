package springBoot_team_pj_126.auth.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.RequiredArgsConstructor;

//보안 컨텍스트(SecurityContext)에 인증 빈(Authentication)을 추가하면, 모든 컨트롤러에서 @AuthenticationPrincipal 주석을 입력 매개변수로 추가할 수 있다. 
//public ResponseEntity< > reqularEndpoint(@AuthenticationPrincipal UserDTO) => 인증된 사용자를 주입
//따라서 Filter는 인증된 사용자의 개체를 Controller에 제공한다. 인증빈을 반환하기 위해

//JWT 엄청 중요한녀석이다 잘 알아둬라
//초기화 되지않은 final 필드나, @NonNull 이 붙은 필드에 대해 생성자를 생성해 줍니다.
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {	//요청당 한번만  사용되기를 원하므로 - OncePerRequestFilter
	
	private final UserAuthProvider userAuthProvider;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		System.out.println("JwtAuthFilter - doFilterIntenal");
		String header = request.getHeader(HttpHeaders.AUTHORIZATION);
		if(header != null) {	// 길이가 정확해야한다 Bearer 토큰이여야한다.
			String[] elements = header.split(" ");
			//Bearer jwtToken 이니까 0,1의 배열을 갖는다.
			if(elements.length == 2 && "Bearer".equals(elements[0])) {	//0번째가 Bearer 이고 1번부터 jwt이다.
				try {
					// 자격증명이 유효하다. 보안컨택스트에 인증빈을 추가한다.
					SecurityContextHolder.getContext().setAuthentication(userAuthProvider.validateToken(elements[1]));	
				}catch(RuntimeException e) {
					SecurityContextHolder.clearContext(); //문제가 생기면 보안 컨택스트를 지우고 오류를 발생시킨다.
					throw e;
				}
			}
		}
		
		filterChain.doFilter(request, response);//필터 끝에 doFilter() 매서드 호출!!
	}

}
