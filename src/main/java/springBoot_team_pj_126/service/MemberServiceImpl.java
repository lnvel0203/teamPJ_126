package springBoot_team_pj_126.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import springBoot_team_pj_126.dao.MemberMapper;
import springBoot_team_pj_126.dao.MemberRepository;
import springBoot_team_pj_126.dto.MemberDTO;
import springBoot_team_pj_126.dto.UserDTO;


@Component
@Service
public class MemberServiceImpl implements MemberService{

	@Autowired
	private MemberRepository mapper;
	
    // Spring이 자동으로 Bean폴더를 DI를 해줌
    //  EncrypterConfig encoder = new EncrypterConfig().encodePwd(); 와 같은 의미
  //  private EncrypterConfig encrypterConfig;

    // 위에 처럼 내가 설정한 Config파일을 호출하여 사용해도 되지만  Spring에서는 기존 BCryptPasswordEncoder 클래스를
    // DI를 하겠다 선언하면 알아서 해당 설정 Bean파일인 EncrypterConfig과 매칭을 시켜서 사용할 수 있게 해준다.
   // private BCryptPasswordEncoder encoder;

	@Override
	public List<UserDTO> listAll(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		System.out.println("서비스 - list");
		List<UserDTO> list = mapper.memberList();
		
		model.addAttribute("list", list);
		System.out.println("list : " + list);
		return list;
	}
	
// < 4월 28일 김희수 미승인 상태 변경 - 상태업데이트문 >	
	@Override
	public void editEmployee(UserDTO dto) 
			throws ServletException, IOException {
		System.out.println("서비스 - update");
		mapper.editEmployee(dto);
	}

// < 5월 2일 김희수 추가 >	
	@Override
	public void deleteMember(String id) throws ServletException, IOException {
		System.out.println("서비스 - delete");
		mapper.deleteById(id);
		
		
	}
	
	//5월 4일 김성훈 추가 직원 리스트 
	@Override
	public List<UserDTO> memberPositionList(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		System.out.println("서비스 - memberPositionList");
		
		List<UserDTO> list = mapper.memberPosition();
		model.addAttribute("list", list);
		return list;
	}
	
	//5월 4일 김성훈 추가  직급 수정 
	@Override
	public void editPosition(String id , String positionName) 
			throws ServletException, IOException {
		System.out.println("서비스 - editPosition");
		mapper.editPosition(id,positionName);
	}
	
	// 5월 8일 김성훈 추가 팀 수정
	@Override
	public void editDeptname(String id, String DeptName) 
			throws ServletException, IOException {
		System.out.println("서비스 -editDeptname");

		mapper.editDeptname(id, DeptName);
	}



}