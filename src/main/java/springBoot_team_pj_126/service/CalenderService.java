package springBoot_team_pj_126.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import springBoot_team_pj_126.dto.CalenderDTO;




public interface CalenderService {
	
	public List<CalenderDTO> listAll(String id, HttpServletRequest req,Model model)
			throws ServletException,IOException;

	public void insertCalender(CalenderDTO calenderDTO)
			throws ServletException,IOException;

//	public void updateCalender(CalenderDTO calenderDTO)
//			throws ServletException,IOException;
//		
	public void deleteCalender(String title)
			throws ServletException,IOException;
//		
//		
//	public CalenderDTO selectCalender(String userid)
//			throws ServletException,IOException;
}
