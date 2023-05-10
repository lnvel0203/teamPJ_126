package springBoot_team_pj_126.service;

import java.io.IOException;


import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import springBoot_team_pj_126.dao.MypageMapper;
import springBoot_team_pj_126.dto.UserDTO;


@Component
@Service
public class MypageServiceImpl implements MypageService{

	@Autowired
	private MypageMapper mapper;

	@Override
	public List<UserDTO> mypageList(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		System.out.println("서비스 - list");
		
		
		List<UserDTO> list = mapper.mypageList();
		System.out.println("서비스 : list : " + list);
		
		model.addAttribute("list", list);
		return list;
	}
	
	public UserDTO userinfo(String id) throws ServletException, IOException {
		System.out.println(" 서비스 - userinfo ");
		UserDTO dto = mapper.userinfo(id);  //내정보조회
		
		return dto;
		
	}
	
//	@Override
//	public void insertMember(MemberDTO dto) throws ServletException, IOException {
//		System.out.println("서비스 - insert");
//		
//		mapper.insertMember(dto);
//	}
//
//	@Override
//	public void updateMember(MemberDTO dto) throws ServletException, IOException {
//		System.out.println("서비스 - update");
//		mapper.updateMember(dto);
//	}
//
//	@Override
//	public void deleteMember(int id) throws ServletException, IOException {
//		System.out.println("서비스 - delete");
//		mapper.deleteById(id);
//	}
//
//	@Override
//	public MemberDTO selectMember(MemberDTO dto) throws ServletException, IOException {
//		System.out.println("서비스 - select");
//		
//		
//		Map<String, Object> map = new HashMap<String, Object>();
//
//		map.put("id", dto.getId());
//		map.put("password", dto.getPassword());
//		
//		MemberDTO dot = mapper.findById(map);
//		if(dot !=null) {
//			System.out.println("성공");
//		}
//		return dot;
//	}

}
