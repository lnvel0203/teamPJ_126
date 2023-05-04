package springBoot_team_pj_126.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import springBoot_team_pj_126.dao.CalenderMapper;
import springBoot_team_pj_126.dto.CalenderDTO;



@Service
public class CalenderServiceImpl implements CalenderService{

	@Autowired
	private CalenderMapper dao;

	@Override
	public List<CalenderDTO> listAll(String id, HttpServletRequest req, Model model) 
			throws ServletException,IOException {
		System.out.println("서비스 -calenderlistAll ");
		
		
	
		
		List<CalenderDTO> list = dao.calenderList(id);

		
		System.out.println("list" + list);
		
		return list;
	}

	@Override
	public void insertCalender(CalenderDTO calenderDTO) 
			throws ServletException, IOException {
		System.out.println("서비스- insertCalender");
		
		dao.inserCalender(calenderDTO);
	}
//
//	@Override
//	public void updateCalender(CalenderDTO calenderDTO) 
//			throws ServletException, IOException {
//		
//		
//	}
//
	@Override
	public void deleteCalender(String title) 
			throws ServletException, IOException {
		System.out.println("서비스 -deleteCalender ");
		dao.deleteById(title);
	}
//
//	@Override
//	public CalenderDTO selectCalender(String userid) 
//			throws ServletException, IOException {
//		
//		return null;
//	}



}
