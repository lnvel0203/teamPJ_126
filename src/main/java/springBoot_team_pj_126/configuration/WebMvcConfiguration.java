package springBoot_team_pj_126.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


//프로필 이미지 불러오기
@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {
	private static final String RESOURCE_PATH = "file:///C:/images/";
	
	private static final String UPLOAD_PATH = "/images/**";
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler(UPLOAD_PATH)
				.addResourceLocations(RESOURCE_PATH);
	}
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/images/**")
				.allowedOrigins("http://localhost:3000")
				.allowedMethods("GET");
	}
}
