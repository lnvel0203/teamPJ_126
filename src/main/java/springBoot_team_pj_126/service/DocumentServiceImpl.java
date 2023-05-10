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

import springBoot_team_pj_126.dao.DocumentMapper;
import springBoot_team_pj_126.dao.MemberMapper;
import springBoot_team_pj_126.dto.DocumentDTO;
import springBoot_team_pj_126.dto.UserDTO;
import springBoot_team_pj_126.dto.UserDTO;


@Component
@Service
public class DocumentServiceImpl implements DocumentService{

	@Autowired
	private DocumentMapper mapper;

	@Override
	public List<DocumentDTO> documentList(String id,HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		System.out.println("서비스 - list");
		
		List<DocumentDTO> list = mapper.documentList(id);
		System.out.println("servicelist"+list);
		
		model.addAttribute("list", list);
		return list;
	}

	@Override
	   public List<UserDTO> approverList(HttpServletRequest req, Model model) 
	         throws ServletException, IOException {
	      System.out.println("서비스 - approverList");
	      List<UserDTO> list = mapper.approverList();
	      System.out.println(list);
	      
	      model.addAttribute("list", list);
	      return list;
	   }


	@Override
	public void addDocument(DocumentDTO dto) 
			throws ServletException, IOException {
		
		System.out.println("<<< 서비스 - 문서작성 >>>");
		
		mapper.addDocument(dto);		
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
