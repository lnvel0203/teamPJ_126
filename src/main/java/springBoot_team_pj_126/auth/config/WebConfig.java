package springBoot_team_pj_126.auth.config;

import java.util.Arrays;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;	//주의 reactive가 없다
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
public class WebConfig {

	@Bean
	public FilterRegistrationBean cosrFilter() {
		
		System.out.println("WebConfig - cosrFilter 진단");
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		
		//프론트 엔드가 일부 자격증명을 보내면 그것들을 받아드려야한다.
		CorsConfiguration config = new CorsConfiguration();
		
		System.out.println("WebConfig - 1");
		config.setAllowCredentials(true);
		config.addAllowedOrigin("http://localhost:3000");	//프론트엔드 URL
		//config.addAllowedOrigin("http://localhost:3001");	//프론트엔드 URL
		config.setAllowedHeaders(Arrays.asList(
				HttpHeaders.AUTHORIZATION,
				HttpHeaders.CONTENT_TYPE,
				HttpHeaders.ACCEPT
				));
		
		System.out.println("WebConfig - 2");
		config.setAllowedMethods(Arrays.asList(
				HttpMethod.GET.name(),
				HttpMethod.POST.name(),
				HttpMethod.PUT.name(),
				HttpMethod.DELETE.name()
				));
		//옵션 요청이 수락되는 시간 30분
		config.setMaxAge(3600L);
		// 스프링 시큐리터 필터전에 사용하기 위해 모든 요청전(URL)에 적용한다. 위의 인증절차가 모두 해결되기위한것
		source.registerCorsConfiguration("/**", config);
		System.out.println("WebConfig - 3");
		FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source)); //import org.springframework.web.filter.CorsFilter;
		bean.setOrder(-102);
		System.out.println("WebConfig - 4");
		return bean;
	}
	
	
}
