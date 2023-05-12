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

	@Override
	public DocumentDTO documentDetail(int documentNo)
			throws ServletException, IOException {
		
		DocumentDTO dto = mapper.documentDetail(documentNo); 
		return dto;
	}

	@Override
	public List<UserDTO> findApproverByNo(List<Long> approverNo) 
			throws ServletException, IOException {
		
		List<UserDTO> list = mapper.findApproverByNo(approverNo);
		return list;
	}

	@Override
	public void updateDocument(DocumentDTO dto) 
			throws ServletException, IOException {
		
		System.out.println("<<< 서비스 - 문서수정 >>> ");
		
		mapper.updateDocument(dto);
	}
	
	@Override
	public List<DocumentDTO> getApprovalPendingList(String id) 
			throws ServletException, IOException {
		System.out.println("서비스 - getApprovalPendingList");
		
		List<DocumentDTO> list = mapper.approvalPendingList(id);
		System.out.println("servicelist"+list);
		
		return list;
	}
	
	@Override
	public List<DocumentDTO> getApprovalScheduledList(String id) 
			throws ServletException, IOException {
		System.out.println("서비스 - getApprovalScheduledList");
		
		List<DocumentDTO> list = mapper.approvalScheduledList(id);
		System.out.println("servicelist"+list);
		
		return list;
	}
	
	@Override
	public List<DocumentDTO> getApprovalCompletedList(String id) 
			throws ServletException, IOException {
		System.out.println("서비스 - getApprovalCompletedList");
		
		List<DocumentDTO> list = mapper.approvalCompletedList(id);
		System.out.println("servicelist"+list);
		
		return list;
	}
	
	@Override
	public List<DocumentDTO> getDraftDocumentList(String id) 
			throws ServletException, IOException {
		System.out.println("서비스 - getDraftDocumentList");
		
		List<DocumentDTO> list = mapper.draftDocumentList(id);
		System.out.println("servicelist"+list);
		
		return list;
	}
	
	@Override
	public List<DocumentDTO> getRejectionDocumentList(String id) 
			throws ServletException, IOException {
		System.out.println("서비스 - getRejectionDocumentList");
		
		List<DocumentDTO> list = mapper.rejectionDocumentList(id);
		System.out.println("servicelist"+list);
		
		return list;
	}
	

	@Override
	public int getEmployeeNo(String id)
			throws ServletException, IOException {
		
		return mapper.getEmployeeNo(id);
		
	}
	
	@Override
    public DocumentDTO getDocument(int documentNo)
    		throws ServletException, IOException {
		
        DocumentDTO document = mapper.getDocument(documentNo);
        
        return document;
    }
    
	


	@Override
	public int getApproverCount(DocumentDTO dto) 
			throws ServletException, IOException {
		
		int count = 0;
	    if (dto.getFirstApproverNo() != null) {
	        count++;
	    }
	    if (dto.getSecondApproverNo() != null) {
	        count++;
	    }
	    if (dto.getThirdApproverNo() != null) {
	        count++;
	    }
	    if (dto.getFourthApproverNo() != null) {
	        count++;
	    }
	    return count;
        
    }
		
	@SuppressWarnings("unlikely-arg-type")
	@Override
	public int getApproverOrder(DocumentDTO dto, int no) 
			throws ServletException, IOException {
		
	    if (no == dto.getFirstApproverNo()) {
            return 1;
        } else if (no == dto.getSecondApproverNo()) {
            return 2;
        } else if (no == dto.getThirdApproverNo()) {
            return 3;
        } else if (no == dto.getFourthApproverNo()) {
            return 4;
        } else {
            return -1; // 현재 사용자가 결재자 목록에 없는 경우
        }
	    
	}


	@Override
	public void documentApprove(DocumentDTO dto) 
			throws ServletException, IOException {

		mapper.documentApprove(dto);
	}
	



}
