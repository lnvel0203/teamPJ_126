package springBoot_team_pj_126.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import springBoot_team_pj_126.dto.DocumentDTO;
import springBoot_team_pj_126.dto.UserDTO;


public interface DocumentService {

		
	public List<UserDTO> approverList(HttpServletRequest req, Model model) 
			throws ServletException, IOException;
	
	public void addDocument(DocumentDTO dto) throws ServletException, IOException;
	
	public DocumentDTO documentDetail(int documentNo)
			throws ServletException, IOException;
	
	public List<UserDTO> findApproverByNo(List<Long> approverNo)
			throws ServletException, IOException;
	
	public void updateDocument(DocumentDTO dto) throws ServletException, IOException;
	
	public List<DocumentDTO> getApprovalPendingList(String id) 
			throws ServletException, IOException;
	
	public List<DocumentDTO> getApprovalScheduledList(String id) 
			throws ServletException, IOException;
	
	public List<DocumentDTO> getApprovalCompletedList(String id) 
			throws ServletException, IOException;
	
	public List<DocumentDTO> getDraftDocumentList(String id) 
			throws ServletException, IOException;
	
	public List<DocumentDTO> getRejectionDocumentList(String id) 
			throws ServletException, IOException;
		
//	public void insertMember(MemberDTO dto) throws ServletException, IOException;
//	
//	public void updateMember(MemberDTO dto) throws ServletException, IOException;
//	
//	public void deleteMember(int id) throws ServletException, IOException;
//	
//	public MemberDTO selectMember(MemberDTO dto) throws ServletException, IOException;
	
	
	
}
