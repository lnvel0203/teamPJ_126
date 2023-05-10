package springBoot_team_pj_126.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {

	private final UserAuthenticationEntryPoint userAuthenticationEntryPoint;
	private final UserAuthProvider userAuthProvider;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
	
		System.out.println("SecurityConfig - SecurityFilterChain 진입");
		http
			.exceptionHandling().authenticationEntryPoint(userAuthenticationEntryPoint)	//보안문제 발생시 사용자 지정메세지 반환
			.and()
			//.addFilterBefore(new JwtAuthFilter(userAuthProvider), BasicAuthenticationFilter.class)//Spring 시큐리티 인증필터 앞에 jwt필터를 추가
			.addFilterBefore(new JwtAuthFilter(userAuthProvider), BasicAuthenticationFilter.class)//Spring 시큐리티 인증필터 앞에 jwt필터를 추가
			.csrf().disable()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)	//스프링에게 세션과 쿠키를 생성하지 않고 jwt가 직접 들고다닌다.
			.and()
			.authorizeHttpRequests((requests) -> requests
					.antMatchers(HttpMethod.POST, "/members/login", "/members/register", "/members/dupleChk").permitAll()		// 반드시 리액트와 일치시켜야한다. 내생각엔 여기에 /members/login이나 join도  붙여야하나?
					//.antMatchers(HttpMethod.GET, "/members/calender").authenticated()	
//					.antMatchers(HttpMethod.POST, "/members/insert").authenticated()
					//.anyRequest().authenticated()//나머지는 토큰 인증을 해야한다.
					.anyRequest().permitAll()	
			);
			
		//이 설정을 리턴하라.
		return http.build();
	}
	
}
