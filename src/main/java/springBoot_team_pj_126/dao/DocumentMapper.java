package springBoot_team_pj_126.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import springBoot_team_pj_126.dto.DocumentDTO;
import springBoot_team_pj_126.dto.UserDTO;

@Mapper
public interface DocumentMapper {

	
	public List<UserDTO> approverList();
	
	public void addDocument(DocumentDTO dto);
	
	public DocumentDTO documentDetail(int documentNo);
	
	public List<UserDTO> findApproverByNo(List<Long> approverNo, int documentNo);
	
	public void updateDocument(DocumentDTO dto);
	
	public List<DocumentDTO> approvalPendingList(String id);
	
	public List<DocumentDTO> approvalScheduledList(String id);
	
	public List<DocumentDTO> approvalCompletedList(String id);
	
	public List<DocumentDTO> draftDocumentList(String id);
	
	public List<DocumentDTO> rejectionDocumentList(String id);
	
	public int getEmployeeNo(String id);
	
	public DocumentDTO getDocument(int documentNO);
	
	public int getApproverCount(DocumentDTO dto);
	
	public int getApproverOrder(DocumentDTO dto, int no);
	
	public void documentApprove(DocumentDTO dto);
	
	public void documentRejection(DocumentDTO dto);
	
}


