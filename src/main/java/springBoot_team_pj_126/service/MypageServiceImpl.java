package springBoot_team_pj_126.service;

import java.io.IOException;



import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import springBoot_team_pj_126.dao.AttendanceMapper;
import springBoot_team_pj_126.dao.MypageMapper;
import springBoot_team_pj_126.dto.EmployeeSalaryDTO;
import springBoot_team_pj_126.dto.UserDTO;


@Service
public class MypageServiceImpl implements MypageService{

	@Autowired
	private MypageMapper mapper;
	
	@Autowired
	private AttendanceMapper attendanceMapper;
	
	

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
		
		// 2. 사용자의 ID로 지각횟수를 가져온다.
		int tardy = attendanceMapper.tardy(id);
		
		// 3. 가져온 지각횟수 값을 UserDTO에 세팅을 해준다.
		dto.setTardy(tardy);
		
		// return한 dto값에는 지각횟수, 직급, 부서명 등 회원정보가 담겨서 응답된다.
		return dto;
		
	}
	
	
	//프로필 사진 저장
	@Override
	public void photo(String id, String photoUrl) {
		UserDTO userDTO = new UserDTO();
		userDTO.setId(id);
		userDTO.setPhoto(photoUrl);
		
		mapper.photo(userDTO);
	}
	
	
	@Override
	public void userInfoUpdate(UserDTO dto) {
	    System.out.println("서비스 - userInfoUpdate");
	    System.out.println("NewLists  :" + dto);

	    mapper.infoupdate(dto);
	   
	}
	
	// 급여 상세 가져오기
	@Override
	public EmployeeSalaryDTO mySalary(String empId) {
		System.out.println("SalaryServiceImpl - invoiceDetail()");
		
		EmployeeSalaryDTO dto = mapper.mySalary(empId);
		
		return dto;
	}
	
	
//	
////	@Override
////	public void insertMember(MemberDTO dto) throws ServletException, IOException {
////		System.out.println("서비스 - insert");
////		
////		mapper.insertMember(dto);
////	}
////
////	@Override
////	public void updateMember(MemberDTO dto) throws ServletException, IOException {
////		System.out.println("서비스 - update");
////		mapper.updateMember(dto);
////	}
////
////	@Override
////	public void deleteMember(int id) throws ServletException, IOException {
////		System.out.println("서비스 - delete");
////		mapper.deleteById(id);
////	}
////
////	@Override
////	public MemberDTO selectMember(MemberDTO dto) throws ServletException, IOException {
////		System.out.println("서비스 - select");
////		
////		
////		Map<String, Object> map = new HashMap<String, Object>();
////
////		map.put("id", dto.getId());
////		map.put("password", dto.getPassword());
////		
////		MemberDTO dot = mapper.findById(map);
////		if(dot !=null) {
////			System.out.println("성공");
////		}
////		return dot;
////	}

}
